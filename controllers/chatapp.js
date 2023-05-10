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
           userId:req.user.id
       })
       res.status(200).json({"mesage":'successful'})
   }catch(err){
      res.status(401).json(err);
   }
}
