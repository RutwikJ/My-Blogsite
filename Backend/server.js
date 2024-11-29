import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
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

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT} !!`);
});
