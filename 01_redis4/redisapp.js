import express, { response } from 'express';
import axios  from 'axios';
import * as redis from 'redis';
//import {createClient} from 'redis';
let port = 5000;
let app = express();

let client =redis.createClient({
    host : 'localhost',
    port : 6379
})


client.on('error',err=> console.log('Redis Client Error ',err));

app.get('/data',async (req,res) =>{
    await client.connect();

    let userInput = req.query.country.trim();

    userInput = userInput?userInput: 'India';

    let url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
    
    let result = await client.get(userInput);

    if(result){
     const output =   JSON.parse(result);
    res.send(output);
    }else{
      let r = await  axios.get(url);
      const output = r.data;
      await client.set(userInput,JSON.stringify({source : 'R C',output}),{EX:10,NX:true})
      res.send({source:'API Response ',output});

    }
    await client.quit();
})

app.listen(port ,()=>{
    console.log('listeing in port ',port);
})