const express=require('express')
const createBlogController = require('../controller/Blog/createBlog.controller')
const fetchuser = require('../middleware/fetchuser')
const getAllBlog = require('../controller/Blog/getallBlog.controller')
const getBlogById = require('../controller/Blog/getBlogById.controller')
const updateBlog = require('../controller/Blog/updateBlog.controller')
const deleteBlog = require('../controller/Blog/deleteBlog.controller')
const router=express.Router()

/**
 * @swagger
 * /blog/create:
 *  post:
 *    description: Use to create a new blog
 *    parameters:
 *    - name: auth-token
 *      description: authorization token
 *      required: true
 *      in: header
 *      type: string
 *    - name: title
 *      description: Blog title
 *      required: true
 *      in: formData
 *      type: string
 *    - name: content
 *      description: Blog content
 *      required: true
 *      in: formData
 *      type: string
 *    responses:
 *      200:
 *        description: Blog successfully created
 *      400:
 *        description: Invalid title or content
 *      500:
 *        description: Internal server error
 *
 */
router.post('/create',fetchuser,createBlogController)

/**
 * @swagger
 * /blog/:
 *  get:
 *    description: Get all blog
 *    parameters:
 *    - name: auth-token
 *      description: authorization token
 *      required: true
 *      in: header
 *      type: string
 *    responses:
 *      200:
 *        description: Retrieved blog successfully
 *      500:
 *        description: Internal server error
 *
 */
router.get("/",fetchuser,getAllBlog)

/**
 * @swagger
 * /blog/{id}:
 *  get:
 *    description: Get blog by id
 *    parameters:
 *    - name: auth-token
 *      description: authorization token
 *      required: true
 *      in: header
 *      type: string
 *    - name: id
 *      description: blog id
 *      required: true
 *      in: path
 *      type: string
 *    responses:
 *      200:
 *        description: Blog found
 *      400:
 *        description: Blog not found
 *      500:
 *        description: Internal server error
 *
 */
router.get("/:id",fetchuser,getBlogById)

/**
 * @swagger
 * /blog/{id}:
 *  put:
 *    description: Use to update a blog
 *    parameters:
 *    - name: auth-token
 *      description: authorization token
 *      required: true
 *      in: header
 *      type: string
 *    - name: id
 *      description: blog id
 *      required: true
 *      in: path
 *      type: string
 *    - name: title
 *      description: Blog title
 *      in: formData
 *      type: string
 *    - name: content
 *      description: Blog content
 *      in: formData
 *      type: string
 *    responses:
 *      200:
 *        description: Blog successfully updated
 *      400:
 *        description: Invalid title or content
 *      401:
 *        description: Unauthorized access
 *      500:
 *        description: Internal server error
 *
 */
router.put("/:id",fetchuser,updateBlog)


/**
 * @swagger
 * /blog/{id}:
 *  delete:
 *    description: Delete blog by id
 *    parameters:
 *    - name: auth-token
 *      description: authorization token
 *      required: true
 *      in: header
 *      type: string
 *    - name: id
 *      description: blog id
 *      required: true
 *      in: path
 *      type: string
 *    responses:
 *      200:
 *        description: Blog deleted
 *      400:
 *        description: Blog not found
 *      401:
 *        description: Unauthorized access
 *      500:
 *        description: Internal server error
 *
 */
router.delete("/:id",fetchuser,deleteBlog)

module.exports=router