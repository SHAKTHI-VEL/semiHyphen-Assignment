const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient()

const deleteBlog=async(req,res)=>{
    try {
        const blogId=req.params.id
        const blog=await prisma.blog.findFirst({
            where:{
                id:parseInt(blogId)
            }
        })
        if(!blog){
            return res.status(404).json({success:false,message:"Blog not found"});   
        }
        else{
            if(blog.authorId==req.user.id){
                const del=await prisma.blog.delete({
                    where:{
                        id:parseInt(blogId)
                    }
                })
            return res.status(200).json({success:true,message:`Successfully deleted blog:${blogId}`});
            }else{
                return res.status(401).json({success:false,message:"Unauthorized access"});   
            }
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error"});   
    }
}

module.exports=deleteBlog