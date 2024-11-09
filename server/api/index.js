import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import { dbConnection } from '../utils/db.js';
import routes from '../routes/router.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors({
    origin:process.env.CLIENT_URL
}))
app.use(express.json())
dbConnection()

app.get('/',(req,res)=>{
    console.log(req.body)
    res.status(200).json({
        success:true,
        message:'success',
    })
})

app.use(routes)

// app.use("*",(req,res)=>{
//     res.json({
//         success:false
//     })
// })

app.listen(PORT,()=>{
    console.log(`server is running on the port ${PORT}`)
})