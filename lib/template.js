module.exports = {
    html : function(title, list, body, control){
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
    },
    list : function(filelist){
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
}