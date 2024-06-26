const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient()

const updateBlog=async(req,res)=>{
    try {
        const {title,content}=req.body;
        const blogId=req.params.id;
        const existblog=await prisma.blog.findFirst({
            where:{
                id:parseInt(blogId)
            }
        })
        if(!existblog){
        return res.status(404).json({success:false,message:`Blog with id:-${blogid} doesn't exist`});   
        }
        else{
            if(existblog.authorId!=req.user.id){
                return res.status(401).json({success:false,message:"Unauthorized access"});   
            }else{
                if(!title && !content){
                    return res.status(400).json({success:false,message:"Enter a title or content"});
                }
                if(title.length<3){
                    return res.status(400).json({success:false,message:"Title must be of length greater than 2"});
                }
                if(content.trim().length<11){
                    return res.status(400).json({success:false,message:"Content must be of length greater than 10"});
                }
                if(!content){
                    const newblog=await prisma.blog.update({
                        where:{
                            id:parseInt(blogId)
                        },
                        data:{
                            title
                        }
                    })
                    return res.status(200).json({success:true,message:`Updated blogId:-${blogId}`,newblog})
                }
                else if(!title){
                    const newblog=await prisma.blog.update({
                        where:{
                            id:parseInt(blogId)
                        },
                        data:{
                            content
                        }
                    })
                    return res.status(200).json({success:true,message:`Updated blogId:-${blogId}`,newblog})
                }
                else{
                    const newblog=await prisma.blog.update({
                        where:{
                            id:parseInt(blogId)
                        },
                        data:{
                            title,
                            content
                        }
                    })
                    return res.status(200).json({success:true,message:`Updated blogId:-${blogId}`,newblog})
                }
                
            }
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error"});   
    }
}

module.exports=updateBlog