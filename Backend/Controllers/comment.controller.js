import Comment from "../models/comment.model.js"
import { errorHandler } from "../Utils/errorHandler.js"


export const createComment=async(req,res,next)=>{
    // console.log(req.body);
    try {
        const {content,postId,userId}=req.body
        if(!content || !postId || !userId){
            next(errorHandler('400','All fields required'))
        }
        if(userId !==req.user.id){
            next(errorHandler(403,'Unauthorised'))
        }
        const newComment= new Comment({
            content,
            postId,
            userId
        })
        await newComment.save()
        res.status(200).json(newComment)

    } catch (error) {
        next(error)
    }
}
export const getPostComment=async(req,res,next)=>{
    try{
        const comments = await Comment.find({postId:req.params.postId}).sort({createdAt:-1})
        res.status(200).json(comments)

    }catch(err){
        next(err)
    }
}