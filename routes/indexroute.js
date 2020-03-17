const express=require('express')
const router=express.Router({
    mergeParams: true
});
const Story=require('../models/story')

router.get('/',function(req,res){
    Story.find({},(err,storys)=>{
        if(err)
        {
            res.send({success:true,message:'Document has been updated'})
        }
        else{
            res.render('index',{storys:storys})
        }
    })
})



module.exports=router;