import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../Utils/errorHandler.js";

export const signUp=async(req,res,next)=>{
const {username,email,password}=req.body

if(!username || !email || !password || username ==='' || email==='' || password ===''){
    next(errorHandler(500,'All fields are required'))
    

} 

const hashedPassword= bcryptjs.hashSync(password,10) // hashSync has inbuilt await 

const newUser= new User({
    username,
    email,
    password:hashedPassword
})

try{
    await newUser.save()
    return res.json('user created successfully')
}catch(err){
   next(err)
}
}