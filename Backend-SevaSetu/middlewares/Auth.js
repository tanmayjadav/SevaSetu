import jwt from "jsonwebtoken";
import { Foundations } from "../models/foundationsModels.js";

export const isAuthenticated = async (req,res,next)=>{
    const token = req.cookies.token
    console.log(token)
    if (!token) return res.status(404).json({
       success:false,
       message:"Login First",
   });
    
    const decoded =  jwt.verify(token,process.env.jwt_secret);
    console.log(decoded)
    req.foundation = await Foundations.findById(decoded._id);
    if (!req.foundation) console.log("not found")
    next();
}