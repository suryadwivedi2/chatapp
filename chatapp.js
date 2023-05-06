const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const sequelize=require('./util/database');


const userroute=require('./routes/user');


const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use('/chatapp',userroute);



sequelize
.sync()
.then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})

