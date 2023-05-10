const express=require('express');

const chatappcontroller=require('../controllers/chatapp');
const Authorization=require('../middleware/authorization');
const router=express.Router();


router.post('/main-page',Authorization.authenticate,chatappcontroller.message)



module.exports=router;
