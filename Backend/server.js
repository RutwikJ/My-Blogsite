import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './Route/user.route.js'
import authRoutes from './Route/auth.route.js'
const app = express();
const PORT = 3000;
dotenv.config();
app.use(express.json())

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

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT} !!`);
});
