var http = require('http');
var fs = require('fs');
var url = require('url');

function HTMLtemplate(title, list, body){
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            <h1><a href = "/?id=EU">EU</a></h1>

            ${list}

            ${body}
        </body>
        </html>
        `;
}

function linklist(filelist){
    var i = 0;
    var list = '<ul>';
    while(i < filelist.length){
        if(filelist[i] == 'EU'){
            i+=1;
        }
        else {
            list = list + `<li><a href=/?id=${filelist[i]}>${filelist[i]}</a></li>`
            i +=1;
        }
    };
    list = list + '</ul>';
    return list;
}

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    if(pathname === '/'){
        if(queryData.id === undefined){

            fs.readdir('./data', function(err, filelist) {
                var title = 'EU';
                
                fs.readFile(`data/${title}`, 'utf8', function(err, data){
                    var template = HTMLtemplate(title, linklist(filelist), `<h3>${title}</h3><p>${data}</p>`);
                    response.writeHead(200);
                    response.end(template);
                }) 
            })
        }
        else {
            fs.readdir('./data', function(err, filelist) {

                fs.readFile(`data/${title}`, 'utf8', function(err, data){
                    var template = HTMLtemplate(title, linklist(filelist), `<h3>${title}</h3><p>${data}</p>`);
                    response.writeHead(200);
                    response.end(template);
                })
            })
        } 
    }
    else {
        response.writeHead(404);
        response.end('Not Found');
    }
});
app.listen(3000);
