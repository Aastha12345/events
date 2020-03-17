const express=require('express');
const router = express.Router({
    mergeParams: true
});

const Story=require('../models/story')

const multer = require("multer");
const middleware=require("../middleware/middleware")



router.get('/',middleware.isLoggedIn,(req,res)=>{ 
    res.render('story');
})  


router.post('/',middleware.isLoggedIn,function(req, res) {
        var title = req.body.title;
        var description = req.body.description;
        var author={
            username:req.user.username,
            _id:req.user._id
        }
        var newStory = { title:title, description: description,author:author};
        Story.create(newStory, function(err, newlyCreated) {
            if (err) {
                console.log(err);
                res.send({success:false,method:'Something went wrong in storyroute'})
            } else {
                res.redirect('/index')
            }
        });

});


router.get('/show/:_id',middleware.isLoggedIn,function(req,res){
    Story.findOne({_id:req.params._id},(err,story)=>{
        if(err)
        {
            console.log({success:false,message:'Something went wrong in storyroute'})
            res.send({success:false,message:'Something went wrong in storyroute'})
        }
        else
        {
            res.render('storyshow',{story:story})
        }
    })
})


router.get('/edit/:_id',function(req,res){
    Story.findOne({_id:req.params._id},(err,story)=>{
        if(err)
        {
            res.send({success:false,message:'something went wrong in storyroute'})
        }
        else{
            res.render('storyedit',{
                story:story
            })
        }
    })
})


router.post('/edit/:_id',function(req,res){
    data1={
        title:req.body.title,
        description:req.body.description
    }
    Story.findOneAndUpdate({_id:req.params._id},{$set: data1},
        (err,story)=>{
        if(err)
        {
            res.send('Something went wrong in storyroute')
        }
        else{
            res.redirect('/story/show/'+story._id)
        }
    })
})


router.get('/find',function(req,res){
    console.log(req.query.searchstory)
    Story.find({title: { "$regex": req.query.searchstory, "$options": "i" }},(err,storys)=>{
        if(err)
        {
            console.log('Something went wrong in storyroute')
        }
        else{
            res.render('findstory',{storys:storys})
        }
    })
})


module.exports=router;