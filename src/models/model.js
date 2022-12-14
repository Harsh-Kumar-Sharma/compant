const mongoose =require('mongoose');

const crypto =new mongoose.Schema({
    name:String, 
    last:Number,
    buy:Number, 
    sell:Number,
    volume:Number,
    base_unit:String 
},{ timestamps: true })

module.exports=mongoose.model("Axios",crypto);