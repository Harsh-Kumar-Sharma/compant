const mongoose = require('mongoose')

const custmerSchema= new mongoose ({
 
    cardNumber:String,
    cardType:{type:String,
        enum:["REGULAR","SPECIAL"]},
         customerName:String,
          status:{type:String,
            enum:["ACTIVE","INACTIVE"],
            Default:"ACTIVE"
           },
           vision:String,
             customerID:{type:String,ref:"custmer"}

}) 

module.exports= mongoose.model('custmer',custmerSchema)
