let fs = require('fs');
// fs.writeFile("test.txt","this my file to write data with callback ", (err)=>{
//     if(err){
//         throw err;
//     }
//     console.log("Taks done");
//     fs.writeFile("inside.txt","create file inside funtion " ,(err)=>{
//         if(err) throw err;
//         console.log("inside the function ");
//     })
// });

// fs.writeFile("text2.txt","this testing paraller execution in node js ",(err)=>{
//     if(err) throw err;
//     console.log("next is done");
//  })

// fs.appendFile("text2.txt","append data ",(err)=>{
//     if(err) throw err;
//     console.log("appned data ");
// })

//delete the file using unlink()
// fs.unlink("text2.txt", function(err){
//     if(err) throw err;
//     console.log("file deleted");
// })

fs.readFile("emp.json" ,'utf-8' ,(err,data)=>{
    if(err) throw err;
    console.log(data);
})

fs.readFile("test.txt","utf-8",(err,data)=>{
    if(err) throw err;
    console.log(data);
})

