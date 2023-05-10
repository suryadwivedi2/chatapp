const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const sequelize=require('./util/database');


const USER=require('./models/user-details');
const MSG=require('./models/message');



const userroute=require('./routes/user');
const chatroute=require('./routes/chatapp');

const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use('/chatapp',userroute);
app.use('/user',chatroute);



USER.hasMany(MSG);
MSG.belongsTo(USER);


sequelize
.sync()
.then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})

