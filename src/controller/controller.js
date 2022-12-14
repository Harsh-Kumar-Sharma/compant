const axios= require('axios');
const model=require('../models/model')
const getapi=async (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    try{
        let options ={
            method: "get",
            url :`https://api.wazirx.com/api/v2/tickers`
        }
      await model.deleteMany();
   const result = await axios(options);
   const jon=[]
   for(let i in result.data)
   jon.push(result.data[i])
   jon.sort((a,b)=>b.last-a.last)
   for(let j=0;j<10;j++){
        await model.create(jon[j])
   }
const getdata = await model.find().select({createdAt:0,updatedAt:0})
   return res.status(200).send({status:true,no:getdata.length,data:getdata})
}
catch(err){
    return res.send({status:false,data:err.message})
}
}
module.exports.getapi=getapi