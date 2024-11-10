import express from 'express'
import { signIn, signUp } from '../controllers/userController.js';
import { forgotPassword, resetPassword, verifyEmail } from '../utils/nodemailer.js';

const router = express.Router()

router.post('/sign-up',signUp);
router.post('/sign-in',signIn)
router.get('/verify-email/:token',verifyEmail)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)


export default router;