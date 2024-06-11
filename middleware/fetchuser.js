const { decodeAccessToken } = require("../utils/jwt.util");

const fetchuser=(req,res,next)=>{
const token=req.header('auth-token');
if(!token){
    res.status(401).send({success:false,message:"Please authenticate using a valid token"})
}
try{
    const data=decodeAccessToken(token);
    req.user=data.user;
    next();
}catch(error){
    res.status(401).send({success:false,message:"Please authenticate using a valid token"})
}
}
module.exports=fetchuser;