import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import {FaThumbsUp} from 'react-icons/fa'
const Comment = ({comment,onLikeClick}) => {
  const [user,setUser]=useState({})
  const{currentUser}=useSelector((state)=>state.user)
  useEffect(()=>{
    
    const getUser=async()=>{
      try {
        const res= await fetch(`/api/user/${comment.userId}`)
        const data= await res.json()
        if(res.ok){
          setUser(data)
        }
      } catch (error) {
        console.log(error.message);
        
      }
    }
    getUser()
  },[comment])
  return (
   <div className='flex gap-2 p-4 border-b my-3'>
        <div className='flex-shrink-0'>
          <img className='h-10 w-10 rounded-full bg-slate-400' src={user.profilePic} alt={user.username}/>
        </div>
        <div>
            <div className='flex-1 mb-1 items-center '>
            <span className='font-bold mr-1 text-xs truncate'>{user? `@${user.username}`:'anonymous user'}</span>
            <span className='text-xs text-slate-500'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className='text-sm mb-2 text-slate-600'>{comment.content}</p>
              <div className='flex gap-2'>
                <button
                type='button'
                onClick={()=>onLikeClick(comment._id)}
                className={`text-sm text-slate-400 hover:text-blue-600 ${
                  currentUser && comment.likes?.includes(currentUser._id) ? '!text-blue-500':''
              }`}
              
                >
                  <FaThumbsUp/>
                </button>
                <p className='text-slate-500 text-sm'>
                 {comment.numberOfLikes>0 && comment.numberOfLikes + `${comment.numberOfLikes === 1 ? ' Like':' Likes'}` }
                </p>
              </div>

        </div>



   </div>
  )
}

export default Comment