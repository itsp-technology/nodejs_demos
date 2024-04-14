let expres = require('express');
let app =  expres();
let http = require('http');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 5050
console.log(port);



const emp =[{
  "empid":11,
  "empname":"vivek" 
},{
    "empid":12,
    "empname":"vivek" 
  }]

app.get('/emp',(req,res)=>{
    res.send(emp)
})

app.get('/',(req,res)=>{
    res.send("New / method is ther");
})

let server =app.get('/',(req,res)=>{
    res.send("hello vivek");
});

app.listen(port,(err)=>{
    if(err){
        throw err;
    }else{
       console.log(`Server is running on port ${port}`);
    }
})



