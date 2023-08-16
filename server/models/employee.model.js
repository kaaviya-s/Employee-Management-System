const mongoose=require("mongoose");

var schema= new mongoose.Schema({
    fullName:{type:String},
    position:{type:String},
    location:{type:String},
    salary:{type:Number}
})

module.exports=mongoose.model('EmployeeModel',schema)