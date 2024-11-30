import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    profilePic:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2013/07/13/12/47/girl-160326_640.png'
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
}
)

const User= mongoose.model('User',userSchema);
export default User;
