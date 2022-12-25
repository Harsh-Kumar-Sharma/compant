const mongoose = require('mongoose')

const custmerSchema= new mongoose ({

    firstName:{type:String,
                required:true},  
    lastName:String ,
    mobileNumber:{type:String,required:true},
    DOB:{type:Date,required:true},
    emailID:{type:String,required:true},
    address:String,
     customerID:String  


}) 

module.exports= mongoose.model('custmer',custmerSchema)



 