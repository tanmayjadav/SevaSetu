import jwt from "jsonwebtoken";

export const sendCookies = (foundation,res,message,statusCode=200)=>{
 
    const token = jwt.sign({_id:foundation._id},process.env.jwt_secret)
    // console.log("cookies was here")
    res.status(statusCode || 201).cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000,
    }).json({
        success:true,
        userId:foundation._id,
        message: message || "Successfully registered",
    });
}