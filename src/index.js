const express = require("express")
const app = express();
const route = require('./routes/route')
const mongoose=require('mongoose')

app.use(express.json())

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://harsh:7534981251@projectnode.rzqgdbx.mongodb.net/Axios", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/',route)

app.use((req,res)=>{
  res.status(404).send({status:false,message:"request not found"})
})

app.listen(3001, () => {
  console.log("Express run on 3001");
});