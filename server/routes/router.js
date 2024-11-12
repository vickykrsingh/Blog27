
import express from 'express'
import authRoutes from './authRoutes.js'
import googleRoutes from './googleAuth.js'
const router = express.Router()

router.use('/api/auth',authRoutes)
router.use('/',googleRoutes)


export default router;