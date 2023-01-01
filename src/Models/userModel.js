const mongoose = require ('mongoose')


const userShema = new mongoose.Schema ({

     Name:{
        type:String,
        required:true
     }, 
     PhoneNumber:{
        type:Number,
        required:true
     }, 
     Age:{
        type:Number,
        required:true
     },
      Pincode:{
        type:Number,
        required:true
     },
    Aadhar_no:{
        type:String,
        required:true,
        unquie:true
     },
     password:{
        type:String,
        required:true
     },
     usertype:{
      type:String,
      required:true,
      enum:["User","Admin"]
     }

})

module.exports= mongoose.model("uservann",userShema)