const jwt = require("jsonwebtoken");

//Useing Environment Variable
// let JWT_SECRET = process.env.JWT_SEC
const JWT_SECRET = process.env.JWT_SEC;

const featchuser=(req,res,next)=>{
    //Get the user from the JWT token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please Authenticate using a valid token",message:error})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please Authenticate using a valid token",message:error})
    }
}

module.exports = featchuser;
