let express = require('express');
// import express from 'express';
// import dotenv from 'dotenv';
// import request from 'request';
let request = require('request');
let dotenv = require('dotenv');
let port = process.env.PORT || 2020

let app = express();

app.use(express.static(__dirname+'/public'));

app.set('views','./src/views');
app.set('view engine','ejs');

app.get('/weather',(req,res)=>{
    let city = req.query.city ? req.query.city : 'Delhi';
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
    
    //calling the api 
    request(url,(err,response)=>{
        const output = JSON.parse(response.body);
        res.render('index',{title:'Weather App ',result:output})
    })
})

app.listen(port,(err)=>{
    if(err) throw err;
    else console.log('running port is ',port)
})


