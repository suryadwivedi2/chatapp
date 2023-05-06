const express=require('express');

const usercontroller=require('../controllers/user')
const router=express.Router();



router.post('/add-user',usercontroller.adduser);



module.exports=router;
