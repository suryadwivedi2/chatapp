const { Op } = require("sequelize");
const User = require('../models/user-details');
const Msg = require('../models/message');
const Grp=require('../models/group');
const UserGrp=require('../models/user_group');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.message = async (req, res, next) => {
    try {
        const message = req.body.message;
        await Msg.create({
            message: message,
            userId: req.user.id,
            username: req.user.name
        })
        res.status(200).json({ "message": 'successful' })
    } catch (err) {
        res.status(401).json(err);
    }
}


exports.getmsg = async (req, res, next) => {
    try {
        const id = req.query.lastid;
        if (id == undefined) {
            id = -1;
        }
        const newmsg = await Msg.findAll({
            where: {
                id: {
                    [Op.gt]: id
                },
                groupGroupid:null
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
        for(let i=0;i<group_id.length;i++){
            console.log(group_id[i].groupname)
        }
        //console.log(group_id[2].groupname);
        res.status(200).json({newmsg,group_id});
    } catch (err) {
        res.status(400).json(err);
    }
}
