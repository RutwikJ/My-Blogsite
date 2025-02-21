import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './Route/user.route.js'
import authRoutes from './Route/auth.route.js'
import cookieParser from "cookie-parser";
import postRoutes from './Route/post.route.js'
import commentRoutes from './Route/comment.route.js'
import path from 'path';

const __dirname=path.resolve()
const app = express();
const PORT = 3000;
dotenv.config();
app.use(express.json())
app.use(cookieParser())



mongoose
  .connect(
    process.env.MONGO
  )
  .then(()=>{
    console.log('mongo DB connected successfully')
  }).catch((err)=>{
    console.log(err)
  });

  app.use('/api/user',userRoutes)

  app.use('/api/auth',authRoutes)

  app.use('/api/post',postRoutes)
  app.use('/api/comment',commentRoutes)
  
  app.use(express.static(path.join(__dirname,'/Frontend/dist')))
  
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'Frontend','dist','index.html'))
  })
 app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message= err.message || 'Internal Server Error';

    return res.status(statusCode).json({
      success:false,
      statusCode,
      message
    })
 })
 app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});
 

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT} !!`);
});
