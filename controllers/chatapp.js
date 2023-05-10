const User=require('../models/user-details');
const Msg=require('../models/message');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();


exports.message=async (req,res,next)=>{
   try{
       const message=req.body.message;
       await Msg.create({
           message:message,
           userId:req.user.id,
           username:req.user.name
       })
       res.status(200).json({"message":'successful'})
   }catch(err){
      res.status(401).json(err);
   }
}


exports.getmsg=async(req,res,next)=>{
try{
const allmsg=await Msg.findAll();
//console.log(allmsg);
res.status(200).json(allmsg);
}catch(err){
res.status(400).json(err);
}
}
