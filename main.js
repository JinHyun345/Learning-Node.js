var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function HTMLtemplate(title, list, body, control){
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            <h1><a href = "/">EU</a></h1>

            ${list}
            ${control}

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
                    var Body = `<h3>${title}</h3><p>${data}</p>`;
                    var control = `<a href="/add">add</a>`;
                    var template = HTMLtemplate(title, linklist(filelist), Body, control);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
        else {
            fs.readdir('./data', function(err, filelist) {

                fs.readFile(`data/${title}`, 'utf8', function(err, data){
                    var control = `<a href="/add">add</a> <a href="/update?id=${title}">update</a>`;
                    var Body = `<h3>${title}</h3><p>${data}</p>`;
                    var template = HTMLtemplate(title, linklist(filelist), Body, control);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        } 
    }
    else if(pathname === "/add"){
        fs.readdir('./data', function(err, filelist) {
            var title = 'EU-add';
            var template = HTMLtemplate(title, linklist(filelist), `
            <form action = "http://localhost:3000/add_process" method = "post">
                <p>
                    <input type="text" name="title" placeholder ="title">
                </p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>`, '');
            response.writeHead(200);
            response.end(template);         
            
        });
    }
    else if (pathname ==='/add_process'){

        var body = '' ;
        request.on('data', function(data){
            body = body + data;
        });
        console.log(body);
        request.on('end', function(){
            var postpost = qs.parse(body);
            var post = Object.assign({}, postpost);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.writeHead(302, {Location : `/?id=${title}`});
                response.end(); 
            });
        }); 
    }
    else {
        response.writeHead(404);
        response.end('Not Found');
    }
});
app.listen(3000);
