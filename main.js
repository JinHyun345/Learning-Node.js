var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js')

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
                    var html = template.html(title, template.list(filelist), Body, control);
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
        else {
            fs.readdir('./data', function(err, filelist) {

                fs.readFile(`data/${title}`, 'utf8', function(err, data){
                    var control = `
                    <a href="/add">add</a>
                    <a href="/update?id=${title}">update</a>
                    <form action = "/delete_process" method = "post">
                        <input type="hidden" name ="id" value = "${title}">
                        <input type="submit" value="delete">
                    </form>
                    `;
                    var Body = `<h3>${title}</h3><p>${data}</p>`;
                    var html = template.html(title, template.list(filelist), Body, control);
                    response.writeHead(200);
                    response.end(html);
                });
            });
        } 
    }
    else if(pathname === "/add"){
        fs.readdir('./data', function(err, filelist) {
            var title = 'EU-add';
            var html = template.html(title, template.list(filelist), `
            <form action = "/add_process" method = "post">
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
            response.end(html);         
            
        });
    }
    else if (pathname ==='/add_process'){

        var body = '' ;
        request.on('data', function(data){
            body = body + data;
        });
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
    else if (pathname === "/update"){
        fs.readdir('./data', function(err, filelist) {

            fs.readFile(`data/${title}`, 'utf8', function(err, data){
                var control = `<a href="/add">add</a> <a href="/update?id=${title}">update</a>`;
                var Body = `
                    <form action = "/update_process" method = "post">
                    <input type ="hidden" name="id" value = "${title}">
                    <p>
                        <input type="text" name="title" placeholder ="title" value = "${title}">
                    </p>
                    <p>
                        <textarea name="description" placeholder="description" >${data}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                    </form>
                `;
                var html = template.html(title, template.list(filelist), Body, control);
                response.writeHead(200);
                response.end(html);
            });
        });
    }
    else if (pathname ==="/update_process"){
        var body = '' ;
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var postpost = qs.parse(body);
            var post = Object.assign({}, postpost);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function(err){
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    response.writeHead(302, {Location : `/?id=${title}`});
                    response.end();
                });
            });
        }); 
    }
    else if (pathname ==="/delete_process"){
        var body = '' ;
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var postpost = qs.parse(body);
            var post = Object.assign({}, postpost);
            var id = post.id;
            fs.unlink(`data/${id}`, function(err){
                response.writeHead(302, {Location : `/`});
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
