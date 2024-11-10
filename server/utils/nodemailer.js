import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel.js';
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

const transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})



export const sendVerificationLink = async (user,req,res) => {
    const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
    const verificationLink = `${process.env.BASE_URL}/api/auth/verify-email/${token}`
    const mailOption = {
        from:process.env.EMAIL_USER,
        to:user.email,
        subject:"Email verification from BLOG27",
        text:`Verify your email to login to BLOG27 \n Verification link : ${verificationLink}`
    }
    try {
        await transporter.sendMail(mailOption,(err,info)=>{
            if(err){
                console.log(err,"error occoured")
            }
        })
    } catch (error) {
        return{
            success:false,
            message:"Something went wrong while sending verification link"
        }
    }
}

export const verifyEmail = async (req,res) => {
    try {
        const {token} = req.params;
        console.log(token)
        const decodedData = jwt.verify(token,process.env.JWT_SECRET);
        const existingUser = await userModel.findById(decodedData._id);
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"Invalid user or token is expired plese try again."
            })
        }
        existingUser.isVerify=true;
        await existingUser.save()
        res.redirect(`${process.env.CLIENT_URL}/email-verified`)
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

export const forgotPassword = async (req,res) => {
    const {email} = req.body;
    try {
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Please enter your email."
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid user"
            })
        }
        const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        const resetPasswordLink = `${process.env.BASE_URL}/reset-password?token=${token}`
        const mailOption = {
            from:process.env.EMAIL_USER,
            to:user.email,
            subject:"Reset password of BLOG27",
            text:`Click the link below to reset your password \n ${resetPasswordLink}`
        }
        transporter.sendMail(mailOption,async (err,info)=>{
            if(err){
                console.log(err)
                return res.status(400).json({
                    success:false,
                    message:"Something went wrong while sending reset password link in your mail."
                })
            }
            user.forgetPasswordToken=token;
            user.forgetPasswordExpires=Date.now()+3600;
            await user.save();
            return res.status(200).json({
                success:true,
                message:"Please check your mail to reset your password"
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

export const resetPassword = async (req,res) => {
    try {
        const {password,confirmPassword} = req.body;
        const {token} = req.params;
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Invalid link"
            })
        }
        if(!password||!confirmPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password must be matched."
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded._id){
            return res.status(400).json({
                success:false,
                message:"Token expired please try again"
            })
        }
        const user = await userModel.findById(decoded._id)
        if(user.forgetPasswordToken!==token){
            return res.status(400).json({
                success:false,
                message:"Access denied"
            })
        }
        if(user.forgetPasswordExpires>Date.now()){
            return res.status(400).json({
                success:false,
                messsage:"Token time expired"
            })
        }

        const hashedPassword = await bcryptjs.hash(password,8);
        user.password=hashedPassword;
        await user.save()
        return res.status(200).json({
            success:false,
            message:"Password modified successfully."
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}