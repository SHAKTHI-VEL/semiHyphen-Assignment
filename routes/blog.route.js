const express=require('express')
const createBlogController = require('../controller/Blog/createBlog.controller')
const fetchuser = require('../middleware/fetchuser')
const getAllBlog = require('../controller/Blog/getallBlog.controller')
const getBlogById = require('../controller/Blog/getBlogById.controller')
const updateBlog = require('../controller/Blog/updateBlog.controller')
const deleteBlog = require('../controller/Blog/deleteBlog.controller')
const router=express.Router()

router.post('/create',fetchuser,createBlogController)
router.get("/",fetchuser,getAllBlog)
router.get("/:id",fetchuser,getBlogById)
router.put("/:id",fetchuser,updateBlog)
router.delete("/:id",fetchuser,deleteBlog)

module.exports=router