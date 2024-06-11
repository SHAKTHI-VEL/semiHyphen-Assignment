const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient()

const getAllBlog=async(req,res)=>{
    try {
        const blog=await prisma.blog.findMany()
        return res.status(200).json({success:true,message:"All Blogs retrieved successfully",blog})
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error"});   
    }
}

module.exports=getAllBlog