const user=require('../models/user-details');
const bcrypt=require('bcrypt');


exports.adduser=async(req,res,next)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const phonenumber=req.body.phonenumber;
        const password = req.body.password;
        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            console.log(err);
            await user.create({
                name: name,
                email: email,
                phonenumber:phonenumber,
                password: hash,
            })
            res.status(201).json({ email });
        })
    }catch{
        res.status(500).json('something went wrong');
    }
}
