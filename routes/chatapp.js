const express=require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const chatappcontroller=require('../controllers/chatapp');
const Authorization=require('../middleware/authorization');
const router=express.Router();



router.post('/main-page',Authorization.authenticate,chatappcontroller.message);

router.get('/get-message',Authorization.authenticate,chatappcontroller.getmsg);

router.post('/upload-media',upload.single('media'),chatappcontroller.uploadmedia);


module.exports=router;
