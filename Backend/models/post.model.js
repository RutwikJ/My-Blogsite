import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        unique:true,  
    },
    content:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:'https://plus.unsplash.com/premium_photo-1683309565422-77818a287060?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',

    },
    category:{
        type:String,
        default:'uncategorised'
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },



},
{
    timestamps:true
}
)

const Post =mongoose.model('Post',postSchema)
export default Post;