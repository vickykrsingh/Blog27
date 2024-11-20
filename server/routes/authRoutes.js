import express from 'express'
import { signIn, signUp } from '../controllers/userController.js';
import { forgotPassword, resetPassword, verifyEmail } from '../utils/nodemailer.js';
import { checkAuth, isValidUser } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/sign-up',signUp);
router.post('/sign-in',signIn)
router.get('/verify-email/:token',verifyEmail)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)
router.get('/check-auth',checkAuth,(req,res)=>{
    return res.status(200).json({
        success:true,
        user:req.user
    })
})

router.get('/is-valid-user',isValidUser,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"true"
    })
})

router.get('/logout',(req,res)=>{

    res.cookie('token',null,{maxAge:0,httpOnly:true,secure:false})
    return res.status(200).json({
        success:true,
        message:"logout successfull"
    })
})

export default router;