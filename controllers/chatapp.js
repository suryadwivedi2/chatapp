const { Op } = require("sequelize");
const User = require('../models/user-details');
const Msg = require('../models/message');
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
                }
            }

        });
        console.log(newmsg)
        res.status(200).json(newmsg);
    } catch (err) {
        res.status(400).json(err);
    }
}
