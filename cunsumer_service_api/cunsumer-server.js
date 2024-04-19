const express = require('express');
const amqp = require('amqplib/callback_api');

const app = express();
const PORT = 3002;


app.get('/cunsume', async (req, res) => {

     amqp.connect('amqp://localhost',function(err,conn){
        conn.createChannel(function(err,ch){
            const quere = 'message_quier'
            ch.assertQueue(quere,{durable:false})
            console.log("waiting for the msg from queue")
            ch.consume(quere, async function(msg){
                console.log("msg ",msg)
               await res.send(msg.content.toString())
            },{noAck:true})
        })
     })

})

app.listen(PORT, () => console.log('PRODUCT SERVICE STARTED',PORT))