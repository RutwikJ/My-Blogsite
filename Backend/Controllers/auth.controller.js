import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/errorHandler.js";
import jwt from "jsonwebtoken";
import {body,validationResult} from 'express-validator';


const signUpValidation=[
  body('username')
  .notEmpty().withMessage('Username required').trim().escape(),
  body('email')
  .notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Email is invalid ').normalizeEmail(),
  body('password')
  .notEmpty().withMessage('Password is required')
  .isLength({min:8}).withMessage('Password must be atleast be 8 characters long')
]
export const signUp = async (req, res, next) => {
  
  const { username, email, password } = req.body;
  // console.log(req.body);
  await Promise.all(signUpValidation.map(val=>val.run(req)));
  const errors=validationResult(req)
  if(!errors.isEmpty()){
   
   const errMessage=errors.array().map(error=>error.msg).join(', ')
    return next(errorHandler(400,errMessage))
  }
  const hashedPassword = bcryptjs.hashSync(password, 10); // hashSync has inbuilt await

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.json("user created successfully");
  } catch (err) {
    next(err);
  }
};

//signIn api

const signInValidation=[
  body('email')
  .notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Email is invalid')
  .normalizeEmail(),
  body('password')
  .notEmpty().withMessage('Password is required')
  .isLength({min:8}).withMessage('password must have atleast 8 characters')
  
]
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
 
  await Promise.all(signInValidation.map(val=>val.run(req)))
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    const errMessage=errors.array().map(error=>error.msg).join(', ')
    return next(errorHandler(400,errMessage))

  }


  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      // console.log(validUser);

      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: hashedPass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true, //https needs to be true
        sameSite: "None", // cross
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json(rest);
  } catch (err) {
    next(err);
  }
};



//google auth

export const google=async(req,res,next)=>{
  const{name,email, googlePhotoUrl}=req.body
  try{
    const user= await User.findOne({email});
  if(user){
    const token= jwt.sign({id:user._id,isAdmin:user.isAdmin},
      process.env.JWT_SECRET,
    
    )

      const {password,...rest}=user._doc;
      res
      .status(200)
      .cookie('access_token',token,{
        httpOnly:true,
        secure:true,
        sameSite:'None',
        
      })
      .json(rest)
    }else{
     
      const generatedPassword= 
      Math.random().toString(36).slice(-8)+ 
      Math.random().toString(36).slice(-8)
      const hashedPassword=bcryptjs.hashSync(generatedPassword,10)
      
      const newUser= new User({
        username:name.toLowerCase().split(' ').join('') +  
        Math.random().toString(9).slice(-4),
        email,
        password:generatedPassword,
        profilePic:googlePhotoUrl
      
      })
      await newUser.save()
      console.log((newUser.pro));
      
      const token=jwt.sign(
        {id:newUser._id,isAdmin:newUser.isAdmin},
        process.env.JWT_SECRET,
        
      );
      const {password,...rest}=newUser._doc;
      res
      .status(200)
      .cookie('access_token',token,{
        httpOnly:true,
        secure:true,
        sameSite:'None',
      
      })
      .json(rest)


    }
  }catch(err){
    next(err)
  }
}

export const signOut=(req,res,next)=>{
  try{
    res
    .status(200)
    .clearCookie('access_token')
    .json({message:'User has signed out successfully'})
  }catch(err){
    next(err)
  }
}