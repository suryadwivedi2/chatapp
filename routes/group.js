const express=require('express');

const groupcontroller=require('../controllers/group');
const Authorization=require('../middleware/authorization');

const router=express.Router();


router.get('/getuser',groupcontroller.getuser);
router.post('/creategroup',Authorization.authenticate,groupcontroller.adduser);
router.post('/addmessage',Authorization.authenticate,groupcontroller.addmessage);
router.get('/getmessage',Authorization.authenticate,groupcontroller.getmessage);

module.exports=router;