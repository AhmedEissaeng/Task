const express = require('express');
const mongo = require('mongoose');
const User = require('./user');
const server = express();
server.use(express.json());

mongo.connect('mongodb+srv://ahmeddabah123:EA3-1-2003@cluster0.eys46bu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('connected');
    server.listen(3000,()=>{
        console.log('listening');
    });
})
.catch((error)=>{
    console.log(error);
});
server.get('/',(req,res)=>{
});

server.post('/signup',async(req,res)=>{
    const body = req.body;
    const u =await User.findOne({email:body.email});
    if(u){
        res.json('elready exists!');
    }
    else {
        const user = new User({name:body.name,email:body.email,password:body.password});
    user.save()
    .then((result)=>{
        res.json(result);
    });
    }
});

server.post('/login',async(req,res)=>{
    const body = req.body;
    const u=await User.findOne({email:body.email,password:body.password});
    if(u){
        res.json('logged In');
    }
    else {
        res.json('Invalid name or password');
    }
});

