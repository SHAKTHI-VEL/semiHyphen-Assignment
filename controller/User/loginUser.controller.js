const {PrismaClient}=require('@prisma/client');
const validateEmail = require('../../utils/isEmail.util');
const { createAccessToken } = require('../../utils/jwt.util');
const { comparePassword } = require('../../utils/bcrypt.util');
const prisma=new PrismaClient()

const loginUserController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !validateEmail(email)){
            return res.status(400).json({success:false,message:"Enter appropriate email"});
        }
        if(!password || password.length<6){
            return res.status(400).json({success:false,message:"Password must be of length greater than 6"});
        }
        const user=await prisma.user.findFirst({
            where:{
                email
            }
        })
        if(!user){
            return res.status(405).json({success:false,message:"User does not exist"});
        }else{
            if(await comparePassword(password,user.password)==true){
                const token=createAccessToken({id:user.id,name:user.name,email:user.email})
                return res.status(200).json({success:true,message:"User authenticated successfully",token}); 
            }else{
                return res.status(404).json({success:false,message:"Incorrect password"}); 
            }
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error"});   
    }
}

module.exports=loginUserController