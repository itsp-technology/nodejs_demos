let http = require('http');
let server = http.createServer((req,res)=>{
    res.write('<h1> welcome to itsp tech  auto refres</h1>');
    res.closed;
})

server.listen(2020);