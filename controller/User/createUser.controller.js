const {PrismaClient}=require('@prisma/client');
const { encryptPassword } = require('../../utils/bcrypt.util');
const validateEmail = require('../../utils/isEmail.util');
const { createAccessToken } = require('../../utils/jwt.util');
const prisma=new PrismaClient()

const createUserController=async(req,res)=>{
    try {
    const {email,name,password}=req.body;
    if(!email || !validateEmail(email)){
        return res.status(400).json({success:false,message:"Enter appropriate email"});
    }
    if(!name || name.length<2){
        return res.status(400).json({success:false,message:"Enter appropriate name"});
    }
    if(!password || password.length<6){
        return res.status(400).json({success:false,message:"Password must be of length greater than 6"});
    }    
    const existinguser=await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    if(existinguser){
        return res.status(405).json({success:false,message:"Email already exist"});
    }else{
        const user=await prisma.user.create({
            data:{
                email,
                name,
                password:await encryptPassword(password)
            }
        })
        const token=createAccessToken(user)
        return res.status(200).json({success:true,message:"User created successfully",token});
    }

    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error"});   
    }
    
}

module.exports=createUserController