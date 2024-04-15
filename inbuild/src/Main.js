let express = require('express');

let app = express();

let dotenv = require('dotenv');
dotenv.config();

let port = process.env.PORT || 4000; 

let ProMod = require('./controller/producte');
let CatMod = require("./controller/category");

app.use('/products',ProMod);
app.use('/category',CatMod);

app.listen(port,(err)=>{
    if(err) throw err;
    else console.log('running port is ',port);
})
