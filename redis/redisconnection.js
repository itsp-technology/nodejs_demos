// let express = require('express');
// let axios = require('axios');
// let redis = require('redis');
import express from 'express';
import axios  from 'axios';
import redis from 'redis';
let port = process.env.PORT || 5050

let client = redis.createClient({
    host :'localhost',
    port : 6379
})

let app = express();

app.get('/data',(req,res)=>{
    let userInput = req.query.country.trim();
    userInput = userInput ? userInput :'India';

    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;

    return client.get(userInput,function(err,result){
        // if the data in the redis server
        if(result){
            const  output = JSON.parse(result);
            res.send(output);
        }else{
            axios.get(url)
                .then((response) => {
                const output = response.data
                client.setex(userInput,3600,JSON.stringify({source : 'Redis Cache',output}))
                res.send({source: 'API Response ',output})
            })
        }
    })


})

app.listen(port,(err)=>{
    if(err){
        throw err;
    }else{
       console.log(`Server is running on port ${port}`);
    }
})