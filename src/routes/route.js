const express =require('express');
const router = express.Router();
const crypto =require('../controller/controller')

router.get('/something' ,crypto.getapi)



module.exports=router