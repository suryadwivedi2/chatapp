const User=require('../models/user-details');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


exports.adduser=async(req,res,next)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const phonenumber=req.body.phonenumber;
        const password = req.body.password;
        const existinguser=await User.findOne({where:{email:email}});
        if(existinguser){
            return res.status(200).json({email});
        }else{
            const saltrounds = 10;
            bcrypt.hash(password, saltrounds, async (err, hash) => {
                console.log(err);
                await User.create({
                    name: name,
                    email: email,
                    phonenumber:phonenumber,
                    password: hash,
                })
              return res.status(201).json({ email });
            })
        }
    }catch{
        res.status(500).json('something went wrong');
    }
}

const generatetoken=(id,phonenumber)=>{
    return jwt.sign({userId:id,userphone:phonenumber},'8738654326758615762675');
}



exports.loginuser=async(req,res,next)=>{
try{
    const email=req.body.email;
    const password=req.body.password;
    const user=await User.findOne({where:{email:email}})
    if (user.email === email) {
        bcrypt.compare(password,user.password,(err, result) => {
            if (err) {
                return res.status(400).json({user:user});
            }
            if (result === true) {
                return res.status(201).json({token:generatetoken(user.id,user.phonenumber)});
            } 
            if(result===false)
            {
                return res.status(401).json({message:'failed'});
            }
        })
    }else{
       throw new Error('email is invalid');
    }
}catch{
    return res.status(404).json({"message":"user not found"});
}
}