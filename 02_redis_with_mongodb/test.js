// import express from express;
// import { createClient } from "redis";
// import { MongoClient } from "mongodb";

import {createClient} from 'redis';
import express from 'express';
import {MongoClient} from 'mongodb';

const app = express();

const port = process.env.PORT || 4321;
const dburl = 'mongodb://localhost:27017';
const mClient = new MongoClient(dburl);
const rClient = createClient({host:'localhost',port:6379});

// connecting redis 
rClient.on('err',err=>console.log(err));

// connection mongodb
async function main(){
    await mClient.connect();
}

const collection = mClient.db('inventory').collection('inventory');

app.get('/data',async(req,res)=>{
    await rClient.connect()
    let uInput = req.query.item.trim();

    let result = await rClient.get(uInput);

    if(result){
        const  output = JSON.parse(result);
        res.send(output);
    }else{
        const output = [];

        const cursor = collection.find({item:uInput});
        for await ( const data of cursor){
            output.push(data);
        }
        await rClient.set(uInput,JSON.stringify({source:'Redis Cache',output}),{EX:10,NX:true})
        cursor.closed;
        res.send({source:'MongoDB',output});
    }
    await rClient.disconnect();
})

app.listen(port,(err) => {
    main()
    console.log(`Server is runnig on port ${port}`)
})






