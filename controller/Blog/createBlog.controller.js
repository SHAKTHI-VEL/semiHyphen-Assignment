const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient()

const createBlogController=async(req,res)=>{
    try {
        const {title,content}=req.body;
        if(!title || title.length<3){
            return res.status(400).json({success:false,message:"Title must be of length greater than 2"});
        }
        if(!content || content.trim().length<11){
            return res.status(400).json({success:false,message:"Content must be of length greater than 10"});
        }
        const blog=await prisma.blog.create({
            data:{
                title,
                content,
                authorId:req.user.id
            }
        })
        return res.status(200).json({success:true,message:"Blog created successfully",blog})
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error"});   
    }
}

module.exports=createBlogController