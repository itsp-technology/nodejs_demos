let express = require('express');
let mongodb = require('mongodb');


const url = "mongodb://localhost:27017";
const mClient = new MongoClient(url)

let app = express();

const dbname = 'inventory';

app.get('/data', async (req,res)=>{
    try{
        await client.connect();
    
       console.log('connect to MongDB');
    
       const db  = client.db(dbname);
    
       const collection = db.collection('inventory');
        
       const query = {item : 'journal'};
       const res = await collection.findOne(query);
       console.log("query resutl ",res);
       }finally{
        await client.close();
       }
})


const port = 1000;

app.listen(port,(err)=>{
    if(err) throw err;
    else console.log("port running ",port)
})

