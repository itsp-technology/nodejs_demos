let express = require('express');
let fileUpload = require('express-fileupload');

let app = express();

let port = process.env.PORT || 5050

app.use(express.static(__dirname+"./public"))
app.set('view engine', 'ejs');


//middlware
app.use(fileUpload());

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/profile',(req,res)=>{
    console.log(req.files);
    console.log(req.body);
    let imageFile = req.files.fileName;

    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`,(err,data)=>{
        if(err) throw err;
        res.render('display',{title:req.body.imgName,image:imageFile.name})
    })

})

app.listen(port,()=>{
    console.log('running port is ',port)
})