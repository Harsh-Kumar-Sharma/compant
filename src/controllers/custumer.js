const short = require('short-uuid');
const customerModel =require('../models/custumer')


const valid = function (input){
    if(typeof(input)=== undefined || typeof(input)===null){ return false}
    if(typeof(input)==="string" && input.trim().length>0){ return true}
    if(typeof(input)==="object" && input.length>0) {return true}
    }

const createCustmer = async (req,res)=>{
   const body=req.body
   if(Object.keys(body).length==0){
    return res.status(400).send({status:false,message:"please provide something in body"})
   }
   if(!valid(firstName)){
    return res.status(400).send({status:false,message:"please firstName provide"})
   }
   if(!valid(lastName)){
    return res.status(400).send({status:false,message:"please lastName provide"})
   }
   if(!valid(address)){
    return res.status(400).send({status:false,message:"please address  provide"})
   }
   const check=await customerModel.findOne({$or:[{emailID},{mobileNumber},{customerID}]})
   // return res.send({check})
   if(check){
     if(check.emailID==emailID){
       return res.status(400).send({status:false,message:"Email ID is not unique!"})
     }
 
     if(check.mobileNumber==mobileNumber){
       return res.status(400).send({status:false,message:"Mobile No. is not unique!"})
     }
     if(check.customerID==customerID){
       return res.status(400).send({status:false,message:"Customer ID is not"})
     }
   if(!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(emailID)){
    return res.status(400).send({status:false,message:"please valid email  provide"})
   }
   if(!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/).test(mobileNumber)){
    return res.status(400).send({status:false,message:"please  provide valid mobile Nomber"})
   }

}