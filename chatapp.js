const http=require('http')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path=require('path');
const Socket=require('socket.io');


const sequelize = require('./util/database');



const USER = require('./models/user-details');
const MSG = require('./models/message');
const GRP = require('./models/group');
const User_Group=require('./models/user_group');


const userroute = require('./routes/user');
const chatroute = require('./routes/chatapp');
const grouproute=require('./routes/group');

const app = express();
const server=http.createServer(app);
const io=Socket(server);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

io.on('connection',socket=>{
    console.log("socketid:",socket.id);
    socket.on('send-message',message=>{
        io.emit('receive-message'),message})
    })


app.use('/chatapp', userroute);
app.use('/user', chatroute);
app.use('/group',grouproute);
 app.use('/',(req,res,next)=>{
     const url=req.url.split('?');
     //console.log(url[0]);
 res.sendFile(path.join(__dirname,`frontend/${url[0]}`));
 })



USER.hasMany(MSG);
MSG.belongsTo(USER);

GRP.hasMany(MSG);
MSG.belongsTo(GRP);

USER.belongsToMany(GRP, { through: User_Group });
GRP.belongsToMany(USER, { through: User_Group });


 sequelize
     .sync()
     .then(() => {
       server.listen(3000);
     }).catch(err => {
         console.log(err);
     })
    

