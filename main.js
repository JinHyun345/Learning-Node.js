var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var template = require('./lib/template.js');

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
    if(pathname ==='/'){
        if(queryData.id === undefined){
            fs.readdir('./data', 'utf8', function(err, filelist){
                var title = 'Animal'
                var body = `<h1>Animal</h1><p>Animal is ...</p>`
                var html = template.html(title, template.List(filelist), body);
                response.writeHead(200);
                response.end(html);
            });
        }
        else {
            fs.readdir('./data', 'utf8', function(err, filelist){
                fs.readFile(`data/${title}`, 'utf8', function(err, data){
                    var body = template.Body(title, data);
                    var html = template.html(title, template.List(filelist), body);
                    response.writeHead(200);
                    response.end(html);
        
                });
            });
        }
    }
    else if (pathname === "/Create"){
        fs.readdir('./data', 'utf8', function(err, filelist){
            var title = 'Create Animal'
            var body = template.CreateBody();
            var html = template.html(title, template.List(filelist), body);
            response.writeHead(200);
            response.end(html);
        });
    }
    else if (pathname === "/Create_process"){
        var body ='';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var data = post.data;
            fs.writeFile(`data/${title}`, `${data}`, function(err){
                response.writeHead(302, {Location : `/?id=${title}`});
                response.end();
            })
        });
    }
    else if (pathname === "/Edit"){
        fs.readdir('./data', 'utf8', function(err, filelist){
            fs.readFile(`data/${title}`, 'utf8', function(err, data){
                var body = template.EditBody(title, data);
                var html = template.html(title, template.List(filelist), body);
                response.writeHead(200);
                response.end(html);
    
            });
        });
    }
    else if (pathname === "/Edit_process"){
        var body ='';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var data = post.data;
            var id = post.id;
            fs.rename(`data/${id}`, `data/${title}`, function(err){
                fs.writeFile(`data/${title}`, `${data}`, function(err){
                    response.writeHead(302, {Location : `/?id=${title}`});
                    response.end();
                });
            }); 
        });
    }
    else if (pathname === "/Delete_process"){
        var body ='';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            console.log(id);
            fs.unlink(`data/${id}`, function(err){
                response.writeHead(302, {Location : '/'});
                response.end();
            });
        });
    }
    else {
        response.writeHead(404);
        response.end('Not Found')
    }
});
app.listen(3000);