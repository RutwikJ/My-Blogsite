import bcryptjs from 'bcryptjs';
import { errorHandler } from '../Utils/errorHandler.js';
import User from '../models/user.model.js';

//update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "Unauthorised to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must have characters between 7 and 20")
      );
    }

    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "username must not contain any spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, "Username must be letters and numbers"));
    }
  }

  try{
    const updatedUser=await User.findByIdAndUpdate(req.params.userId,
        {
        $set:{
            username:req.body.username,
            email:req.body.email,
            profilePic:req.body.profilePic,
            password:req.body.password
        },
    },
    {
        new:true
    }
)
    const {password,...rest}=updatedUser._doc;
    res.status(200).json(rest)
  }catch(err){
    console.error("Update User Error:", err); 
    next(err)
  } 
};

//delete user
export const deleteUser=async(req,res,next)=>{
  if(!req.user.isAdmin && req.body.id !==req.params.userId){
      return next(errorHandler(403,'Unauthorised to delete this user'))
  }

  try {
    const deleteUser=await User.findByIdAndDelete(req.params.userId)
    res.status(200).json({message: `successfully deleted user with username ${deleteUser.username}`})
  } catch (error) {
    next(error)
  }
  
}
export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser=async(req,res,next)=>{
  try {
    const user= await User.findById(req.params.userId)
    if(!user){
      return next(errorHandler(404,'User not found'))
    }
    const {password,...rest}=user._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}