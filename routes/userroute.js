const express=require('express');
const router = express.Router({
    mergeParams: true
});

const User=require('../models/user');


//LOGOUT THE USER USING PASSPORT
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', "You have logged out");
    res.redirect('/index')
});



router.get('/profile/:_id',function(req,res){
    User.findOne({_id:req.params._id},(err,user)=>{
        if(err)
        {
            res.send({success:false,message:'Something went wrong in userroute.js'})
        }
        else{
            res.render('profileshow',{
                user:user
            })
        }
    })
})

router.get('/profile/edit/:_id',function(req,res){
    User.findOne({_id:req.params._id},(err,user)=>{
        if(err)
        {
            res.send({success:false,message:'Something went wrong in userroute.js'})
        }
        else{
            res.render('profileedit',{
                user:user
            })
        }
    })
})

router.post('/profile/edit/:_id',function(req,res){
    // Check Input Field
    req.check('firstname', 'First Name is required').notEmpty();
    req.check('lastname', 'Last Name is required').notEmpty();
     
    var errors = req.validationErrors();
    if(errors){
        res.render('register',{
            errors : errors
        });
        console.log('Error');
    }
    data1={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        age:req.body.age,
        gender:req.body.gender,
        birthdate:req.body.birthdate,
        role:req.body.role
    }
    User.findOneAndUpdate({_id:req.params._id},{$set: data1},(err,user)=>{
        if(err)
        {
            console.log(err)
            res.send({success:false,message:'Something went wrong in userroute.js'})
        }
        else{
            res.redirect('/user/profile/'+req.params._id)
        }
    })
})

module.exports=router;