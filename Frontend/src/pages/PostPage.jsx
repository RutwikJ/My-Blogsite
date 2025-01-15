import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import CommentSection from '../components/CommentSection'
const PostPage = () => {
    const {postSlug}=useParams()
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [post,setPost]=useState(null)
    // console.log(post);
    
    useEffect(()=>{
        // console.log(postSlug);
        const fetchPost=async()=>{
            try {
                setLoading(true)
                const res=await fetch(`/api/post/getposts?slug=${postSlug}`)
                const data=await res.json()
                if(!res.ok){
                    setLoading(false)
                    setError(true)
                    return
                }
                if(res.ok){
                    setLoading(false)
                    setError(false)
                    setPost(data.posts[0])
                }
            } catch (error) {
                setLoading(false)
                    setError(true)
            }
        }
        fetchPost()
    },[postSlug])
  
  if(loading) { return (
    <div className=' text-blue-500 flex justify-center items-center min-h-screen'>Loading...</div>
  )}
  return(
    <main className='flex mx-auto flex-col min-h-screen'>
        <h1 className='text-3xl lg:text-4xl p-3 mx-auto text-center max-w-2xl font-serif '>
            {post && post.title}
        </h1>
        <img 
            src={post && post.image} 
            alt={post && post.title}
            className='mt-5 p-3 object-cover  max-h-[600px] max-w-5xl rounded-3xl mx-auto'/>
        <div className='flex justify-between p-3 mx-auto w-full  max-w-2xl text-xs  border-b border-gray-400 mb-5'>
            <span>
                {post && new Date(post.createdAt).toLocaleDateString('en-GB')}
            </span>
            <span>
                {post && (post.content.length/1000).toFixed(0)} min read
            </span>
        </div>
        <div className='p-3 max-w-2xl mx-auto w-full'
            dangerouslySetInnerHTML={{__html:post && post.content}}
            >

        </div>
        <div className='max-w-4xl mx-auto w-full mb-5'>
            <CallToAction/>

        </div>
        {post._id && <CommentSection postId={post._id} />}
        
    </main>
  )
}

export default PostPage