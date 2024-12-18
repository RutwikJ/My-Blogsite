import jwt from 'jsonwebtoken'
import { errorHandler } from './errorHandler.js'


export const verifyToken= (req,res,next)=>{

    const token=req.cookies.access_token;
    // console.log("token:",token);
    
    if(!token){
        return next(errorHandler(401,'Unauthorised'));

    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(401,'Unauthorised'))

        }
        req.user=user;
        next();
    })

}