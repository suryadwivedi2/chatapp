const { Op } = require("sequelize");
const User = require('../models/user-details');
const Msg = require('../models/message');
const Grp=require('../models/group');
const Ugrp=require('../models/user_group');
const UserGrp=require('../models/user_group');




exports.getuser = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    }catch(err){
        res.satus(500).json(err);
    }
}


exports.adduser=async(req,res,next)=>{
try
{
    const name=req.body.name;
    await Grp.create({
      groupname:name
}) 

const grp=await Grp.findAll({where:{
    groupname:name
}})
const ug=await UserGrp.create({
    userId:req.user.id,
    groupGroupid:grp[0].groupid

})
res.status(200).json({"message":"created"});
}catch(err){
    res.status(500).json(err);
}
}



exports.addmessage=async(req,res,next)=>{
    try {
        const message = req.body.message;
        await Msg.create({
            message: message,
            userId: req.user.id,
            username: req.user.name,
            groupGroupid:req.query.groupid
        })
        res.status(200).json({ "message": 'successful' })
    } catch (err) {
        res.status(401).json(err);
    }
}

exports.getmessage = async (req, res, next) => {
    try {
        const id = req.query.lastid;
        // if (id == undefined) {
        //     id = -1;
        // }
        const newmsg = await Msg.findAll({
            where: {
                groupGroupid:req.query.groupid
            }

        });
        const usergroup=await UserGrp.findAll({where:{
            userId:req.user.id
        }})

        let groupids=[];
       // let groupids=usergroup.groupGroupid
        for(let i=0;i<usergroup.length;i++){
            groupids.push(usergroup[i].groupGroupid);
        }
        const group_id=await Grp.findAll({where:{
            groupid:
                groupids
        }})
        // for(let i=0;i<group_id.length;i++){
        //     console.log(group_id[i].groupname)
        // }
        //console.log(group_id[2].groupname);
        res.status(200).json({newmsg,group_id});
    } catch (err) {
        res.status(400).json(err);
    }
}