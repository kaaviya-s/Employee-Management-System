const objectId=require("mongoose").Types.ObjectId

const ValidateDbId=(req,res,next)=>{
    if(objectId.isValid(req.params.id)==false)
        res.status(400).json({//badRequest
            error:"Given id isn't valid"
    })
    else{
        next();
    }
    
}

const raiseRecordNotFoundError=(req,res)=>{
    res.status(404).json({error:'No record with given id: '+req.params.id})//NotFound
}

const errorHandler=(error,req,res,next)=>{
    res.status(500).json(error)
}

module.exports={
    ValidateDbId,
    raiseRecordNotFoundError,
    errorHandler
}