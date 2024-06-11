const express=require('express')
const createUserController = require('../controller/User/createUser.controller')
const loginUserController = require('../controller/User/loginUser.controller')
const router=express.Router()

/**
 * @swagger
 * /user/create:
 *  post:
 *    description: Use to create a new user
 *    parameters:
 *    - name: email
 *      description: User email
 *      required: true
 *      in: formData
 *      type: string
 *    - name: name
 *      description: User name
 *      required: true
 *      in: formData
 *      type: string
 *    - name: password
 *      description: User password
 *      required: true
 *      in: formData
 *      type: string
 *    responses:
 *      200:
 *        description: User successfully signed up
 *      400:
 *        description: Invalid email or password
 *      405:
 *        description: User already exist
 *      500:
 *        description: Internal server error
 *
 */
router.post('/create',createUserController)

/**
 * @swagger
 * /user/login:
 *  post:
 *    description: Use to login
 *    parameters:
 *    - name: email
 *      description: User email
 *      required: true
 *      in: formData
 *      type: string
 *    - name: password
 *      description: User password
 *      required: true
 *      in: formData
 *      type: string
 *    responses:
 *      200:
 *        description: User successfully signed up
 *      400:
 *        description: Invalid email or password
 *      404:
 *        description: Incorrect password
 *      405:
 *        description: User already exist
 *      500:
 *        description: Internal server error
 *
 */
router.post('/login',loginUserController)

module.exports=router