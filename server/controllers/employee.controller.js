const express=require("express");
const { ValidateDbId, raiseRecordNotFoundError } = require("../middlewares");
const EmployeeModel=require("../models/employee.model")
const route=express.Router()
const objectId=require("mongoose").Types.ObjectId//To check id validity


route.get("/",(req,res,next)=>{
    EmployeeModel.find()
    .then(data=>res.send(data))
    .catch(err=>next(err))
        
})

route.post("/",(req,res)=>{
    const newRecord={
        fullName:req.body.fullName,
        position:req.body.position,
        location:req.body.location,
        salary:req.body.salary
    }
    console.log("New Record:",newRecord);
    EmployeeModel.create(newRecord)
    .then(data=>res.status(201).json(data))//created
    .catch(err=>next(err))
})

route.get("/:id",ValidateDbId,(req,res,next)=>{
        EmployeeModel.findById(req.params.id)
        .then(data=>{
            if(data)
                res.send(data)
            else
                raiseRecordNotFoundError(req,res)
        })
        .catch(err=>next(err))
})

route.put("/:id",ValidateDbId,(req,res)=>{
    const newRecord={
        fullName:req.body.fullName,
        position:req.body.position,
        location:req.body.location,
        salary:req.body.salary
    }
    EmployeeModel.findByIdAndUpdate(req.params.id,newRecord)
    .then(data=>{
        if(data)
            res.send(data)
        else
            raiseRecordNotFoundError(req,res)
    })
    .catch(err=>next(err))
})

route.delete("/:id",ValidateDbId,(req,res)=>{
    EmployeeModel.findByIdAndDelete(req.params.id)
    .then(data=>{
        if(data)
            res.send(data)
        else
            raiseRecordNotFoundError(req,res)
    })
    .catch(err=>next(err))
})

module.exports=route;