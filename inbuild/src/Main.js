let express = require('express');

//for logs
let morgan = require('morgan');

let app = express();

let dotenv = require('dotenv');
dotenv.config();
let fs = require('fs');
let port = process.env.PORT || 4000; 

app.use(morgan('common',{stream:fs.createWriteStream('./app.log')}));

let ProMod = require('./controller/producte');
let CatMod = require("./controller/category");

app.use('/products',ProMod);
app.use('/category',CatMod);

app.listen(port,(err)=>{
    if(err) throw err;
    else console.log('running port is ',port);
})
