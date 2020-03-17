const express = require('express');
const router = express.Router({
    mergeParams: true
});

var User=require('../models/user');
var mongoose=require('mongoose');
router.get('/',(req,res)=>{
    res.render('register');   
})

router.get('/findUserName/:userName',function(req,res){
    User.findOne({username:req.params.userName},(err,user)=>{
        if(err)
        {
            res.send({
                success:false,message:'Something went wrong in registerroute'
            })
        }
        else{
            res.send(user)
        }
    })
})

router.post('/',function(req,res){
    User.findOne({username:req.body.username},(err,user)=>{
        if(err){
            res.send({success:false,message:'Something went wrong in registerroute'})
        }else if(user)
        {
            res.render('register',{msg:'Try again with another username'});
        }
        else{
            var newuser=new User({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                username:req.body.username,
                password:req.body.password,
                email:req.body.email,
                phonenumber:req.body.phonenumber,
                age:req.body.age,
                gender:req.body.gender,
                birthdate:req.body.birthdate,
                role:req.body.role
            })
            newuser.save(function(err){
                if (err){
                    res.json({success:false,message:'something went wrong'})
                };
                console.log('User created');
                
                res.redirect('/index')
            })
        }
    })
})




router.post('/',(req,res)=>{
    var newuser=new user({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        age:req.body.age,
        gender:req.body.gender,
        birthdate:req.body.birthdate,
        role:req.body.role
    })
    
    newuser.save(function(err){
        if (err){
            res.json({success:false,message:'something went wrong'})
        };
        console.log('User created');
        res.redirect('/index')
    })
})

module.exports=router;