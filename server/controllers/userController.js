import { userModel } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { sendVerificationLink } from "../utils/nodemailer.js";
export const signUp = async (req, res) => {
  const { name, email, password, username } = await req.body;
  if (!name || !email || !password || !username) {
    res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "username already exists please choose another one.",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const salt = 8;
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      username,
    })
    await newUser.save();
    res.status(200).json({
        success:true,
        message:"Registration successfull please login to verify your email."
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const signIn = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const existingUser = await userModel.findOne({email})
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"Invalid user"
            })
        }
        const isMatchPassword = await bcryptjs.compare(password,existingUser.password);
        if(!isMatchPassword){
            return res.status(400).json({
                success:false,
                message:"Invalid user"
            })
        }
        if(!existingUser.isVerify){
            const resp = await sendVerificationLink(existingUser,req,res)
              return res.status(200).json({
                success:true,
                message:"Verification link has been sent please check your email."
              })
        }
        const token = await jwt.sign({_id:existingUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie('token',token,{maxAge:3600000,httpOnly:true,secure:false})
        return res.status(200).json({
          success:true,
          message:"login successfully",
          token
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}