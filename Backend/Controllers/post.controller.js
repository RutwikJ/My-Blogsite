import Post from "../models/post.model.js"
import { errorHandler } from "../Utils/errorHandler.js"

export const createPost=async(req,res,next)=>{
    console.log(req.user) 
    console.log(req.body);
    
    //send from cookie 
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You do not have credentials to create post'))
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,'Please fill all the required fields'))
    }
 
 
    const slug= req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'')
 //create post
    const newPost = new Post({...req.body,slug,userId:req.user.id})

    //save post
    try {
        const savedPost=await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }
}