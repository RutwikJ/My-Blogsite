import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './Route/user.route.js'

const app = express();
const PORT = 3000;
dotenv.config();

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

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT} !!`);
});
