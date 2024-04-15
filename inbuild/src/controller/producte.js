let express = require('express');
let productRoute = express.Router();


const data = [
    {
        "id": 1,
        "name": "John Doe",
        "address": "123 Main St",
        "location": "Cityville",
        "phone": "123-456-7890"
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "address": "456 Elm St",
        "location": "Townsville",
        "phone": "987-654-3210"
    }

]

productRoute.route('/').get((req,res)=>{
    res.send(data);
})

productRoute.route('/details').get((req,res)=>{
    res.send("Pro with details ");
})

module.exports=productRoute;

