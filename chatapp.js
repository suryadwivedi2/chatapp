const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path=require('path');

const sequelize = require('./util/database');


const USER = require('./models/user-details');
const MSG = require('./models/message');
const GRP = require('./models/group');
const User_Group=require('./models/user_group');



const userroute = require('./routes/user');
const chatroute = require('./routes/chatapp');
const grouproute=require('./routes/group');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use('/chatapp', userroute);
app.use('/user', chatroute);
app.use('/group',grouproute);
app.use((req,res,next)=>{
    //console.log(req.url);
res.sendFile(path.join(__dirname,`frontend/${req.url}`))
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
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    })

