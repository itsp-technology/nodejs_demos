let express = require('express')
let amqp = require('amqplib/callback_api')

let app = express();

let port = 4000;

app.get('/produce',(req,res)=>{
    const data = {
        id : 11,
        name : "vivek",
        city : "delhi"
    }

    amqp.connect('amqp://localhost',function(err,conn){
        conn.createChannel(function(err,ch){
            const queue = "message_quier";
            const msg = JSON.stringify(data);

            ch.assertQueue(queue ,{durable : false});
            ch.sendToQueue(queue,Buffer.from(msg));
            console.log('Sent ',msg ,' to ',queue);
        });
        setTimeout(function(){conn.close();
        process.exit(0);},500);
    });

    res.send("meessage form prducese succcess ");


})

app.listen(port, (err)=>{
    if(err) throw err;
    else console.log('Message from user service ',port);
})