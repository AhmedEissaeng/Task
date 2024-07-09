const express = require('express');

const mongo = require('mongoose');

const User = require('./user');

const server = express();

server.use(express.json());

const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');

const { error } = require('npmlog');

server.use(cookieParser());

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
        const token = jwt.sign({email:u.email},'Eissa',{expiresIn:'12h'});
        if(token){
            res.cookie('jwt',token).json('logged In');
        }
        else{ 
        res.json('login Failed !');
        }
    }
    else {
        res.json('Invalid name or password');
    }
});
server.get('/home',async(req,res)=>{
    const token = req.cookies.jwt;
    try {
        if(token){
            const decode = jwt.decode(token);
            if(decode && decode.email){
                res.json('Welocme to home !');
            }
            else {
                throw error;
            }
        } 
        else{
            throw error;
        }
    }
    catch (error) {
        res.json('error');
    }
});

