const User=require('../models/user-details');
const bcrypt=require('bcrypt');


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
                return res.status(201).json({message:"succesfull"});
            } 
            if(result===false)
            {
                return res.status(400).json({message:'failed'});
            }
        })
    }else{
       throw new Error('email is invalid');
    }
}catch{
    return res.status(501).json({"message":"email not found"});
}
}