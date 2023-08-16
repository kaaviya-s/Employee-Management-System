const express=require('express');
const bodyparser=require("body-parser");
const mongose=require('mongoose');
const cors=require('cors')
//routes
const employeeRoutes=require("./controllers/employee.controller")

//Databse Connection
const db=require('./db');
const { errorHandler } = require('./middlewares');
mongose.connect(db.dburl,{useNewUrlParser:true,useUnifiedTopology:true});
mongose.connection.on('connected',()=>{
    console.log("Connected to db");
});
mongose.connection.on('error',err=>{
    console.log(err);
})

const app=express();
app.use(bodyparser.json());
app.use(errorHandler)
//Should be place before routes
app.use(cors({origin:"http://localhost:4200"}))

app.use("/employees",employeeRoutes)


app.listen(3000,()=>{
    console.log("Server is running in port 3000");
})