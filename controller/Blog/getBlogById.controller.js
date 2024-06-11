const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient()

const getBlogById=async(req,res)=>{
    try {
        const blogid=req.params.id;
        const blog=await prisma.blog.findFirst({
            where:{
                id:parseInt(blogid)
            }
        })
        if(!blog){
        return res.status(404).json({success:false,message:`Blog with id:-${blogid} doesn't exist`});   
        }
        return res.status(200).json({success:true,message:`Blog with id:-${blogid} retrieved successfully`,blog})
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error"});   
    }
}

module.exports=getBlogById