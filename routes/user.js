const express=require('express');

const usercontroller=require('../controllers/user')
const router=express.Router();



router.post('/add-user',usercontroller.adduser);
router.post('login-user',usercontroller.loginuser)



module.exports=router;
