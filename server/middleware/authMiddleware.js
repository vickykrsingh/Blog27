import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel.js';
export const checkAuth = async (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(404).json({
            success:false,
            user:"token expired please login again."
        })
    }
    const user = await jwt.verify(token,process.env.JWT_SECRET);
    if(!user._id){
        return res.status(400).json({
            success:false,
            user:user
        })
    }
    req.user=user
    next()
}

export const isValidUser = async (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(404).json({
            success:false,
            user:"token expired please login again."
        })
    }
    const user = await jwt.verify(token,process.env.JWT_SECRET);
    if(!user._id){
        return res.status(400).json({
            success:false,
            user:user
        })
    }
    const existingUser = await userModel.findById(user._id);
    console.log(existingUser)
    if(!existingUser || !existingUser.isVerify){
        return res.status(400).json({
            success:false,
            message:"Unauthorized access"
        })
    }
    next()
}