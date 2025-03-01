module.exports = {
    html : function(title, list, body){
        return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${title}</title>
                </head>
                <body>
                    <h1><a href = "/">Animal</a></h1>
    
                    ${list}
                    <a href = "/Create">Create</a>
                    ${body}
                </body>
                </html>
                `;
    },
    List : function(filelist){
        var i = 0;
        var list = '<ul>'
        while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
        }
        list = list + '</ul>';
        return list;
    },
    Body : function(title, data){
        return `
        <a href = "/Edit?id=${title}">Edit</a>
        <form action="/Delete_process" method = "post">
            <input type="hidden" name ="id" value="${title}">
            <input type="submit" value="Delete">
        </form>
        <h2>${title}</h2><p>${data}</p>
        `;
    },
    CreateBody : function(){
        return `
            <form action="/Create_process" method="post">
                <div><input type = "text" name = "title" placeholder="Write New animal"></div>
                <div><textarea name = "data" placeholder="Write the description"></textarea></div>
                <div><input type = "submit" value="uplode"></div>
            </form>
            `;
    },
    EditBody : function(title, data){
        return `
            <p>Edit "${title}"...</p>
            <form action="/Edit_process" method="post">
                <input type ="hidden" name = "id" value = "${title}">
                <div><input type = "text" name = "title" placeholder="Edit name" value = "${title}"></div>
                <div><textarea name = "data" placeholder="Edit the description">${data}</textarea></div>
                <div><input type = "submit" value="uplode"></div>
            </form>
            `;
    },
    
}