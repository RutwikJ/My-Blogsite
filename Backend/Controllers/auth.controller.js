import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';

export const signUp=async(req,res)=>{
const {username,email,password}=req.body

if(!username || !email || !password || username ==='' || email==='' || password ===''){
    return res.status(500).json({message:'All fields required'})

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
   return  res.json({message:err.message})
}
}