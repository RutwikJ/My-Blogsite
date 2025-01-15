import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const CommentSection = ({postId}) => {
    const {currentUser}=useSelector((state)=>state.user)
    const [comment,setComment]=useState('')
    const [commentError,setCommentError]=useState(null)
   const [comments,setComments]=useState([])
    
   console.log(comments);
   
   const handleSubmit=async(e)=>{
        e.preventDefault()
        if(comment.length>200){
            return
        }
        try {
            const res= await fetch('/api/comment/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'

                },
                body:JSON.stringify({
                    content:comment,
                    postId,
                    userId:currentUser._id
                })
                
            })
            const data =await res.json()
            if(res.ok){
                setComment('')
                setCommentError(null)
            }
         
        } catch (error) {
            setCommentError(error)
        }
    
    }
    useEffect(()=>{
        const getComments= async()=>{
            try {
                const res= await fetch(`/api/comment/getPostComment/${postId}`)
                if(res.ok){
                    const data=await res.json()
                        setComments(data)
                }
                
            } catch (err) {
                console.log(err.message);
                
            }
        }
        getComments()
    },[postId])
    return (
    <div className='mx-auto max-w-2xl w-full p-3'>

        {currentUser ?(
            <div className='flex items-center gap-1 text-gray-500 text-sm my-5' >
                <p>Signed as:</p>
            <img src={currentUser.profilePic} className='w-6 h-6 object-cover rounded-full' alt=''/>
            <Link 
            to={'/dashboard?tab=profile'} 
            className='text-green-700 hover:underline'
             >
            @{currentUser.username}
            </Link>
            </div>
        )
        
        :(
            <div className='text-teal-500 my-5 flex gap-1'>You must be signed in to comment
                <Link to={'/sign-in'} className='text-blue-500 hover:underline'>
                Sign in
                </Link>
            </div>
        )}
        {currentUser && (
            <form className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
                <textarea 
                placeholder=' Add a comment...'
                className='outline-blue-500 bg-slate-100 rounded-md w-full p-3'
                rows='3'
                maxLength='200'
                onChange={(e)=>setComment(e.target.value)}
                value={comment}
                />
                <div className='flex justify-between items-center my-5'>
                    <p className='text-gray-500 text-xs'>{200-comment.length} characters remaining </p>
                    <button
                    type='submit'
                    className='hover:bg-indigo-500 hover:text-white rounded-md p-2 outline outline-indigo-500'
                    >
                    Submit
                    </button>

                </div>
                {commentError ? <div className='p-3 bg-red-400 text-white mt-5'>
                <p>{commentError}</p>
            </div>:<></>
            }
            </form>
           
            
        )}
    </div>
  )
}

export default CommentSection