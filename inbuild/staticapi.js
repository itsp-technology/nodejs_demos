let htt = require('http');
let fs = require('fs');

let server = htt.createServer(function(req,res){
    fs.readFile('emp.json','utf-8',function(err,data){
        res.write(data);
        res.end();
    })
    
})

server.listen(2000);