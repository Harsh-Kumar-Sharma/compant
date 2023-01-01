const express =require('express')
const router = express.Router();
const usercontroller = require('../controllers/user')

router.post('/register' ,usercontroller.createUser )
router.post('/login' ,usercontroller.userLogin)


module.exports=router;