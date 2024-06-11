const express=require('express')
const createUserController = require('../controller/User/createUser.controller')
const loginUserController = require('../controller/User/loginUser.controller')
const router=express.Router()

router.post('/create',createUserController)
router.post('/login',loginUserController)

module.exports=router