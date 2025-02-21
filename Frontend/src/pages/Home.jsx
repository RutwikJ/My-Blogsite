import React, { useEffect, useState } from 'react'
import CallToAction from '../components/CallToAction'
import PostCard from '../components/PostCard'

const Home = () => {
  const [posts,setPosts]=useState([])
  useEffect(()=>{
    const fetchPosts=async()=>{
      const res=await fetch('/api/post/getPosts')
      const data=await res.json()
      setPosts(data.posts)
    }
    fetchPosts()
  },[])
  return (
    <div>
      <div className='gap-6 p-28 px-3 max-w-6xl flex flex-col mx-auto'>
        <h1 className='text-3xl font-bold lg:text-5xl'>
          Welcome to MyBlogspot
        </h1>
        <p className='text-slate-500'>
          Here you'll find variety of articles on topics such as web development,ai etc 
        </p>

      </div>
      <div className='bg-amber-100 p-3'>
        <CallToAction/>
      </div>
      <div  className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>

        {posts && posts.length > 0 &&(
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post)=>(<PostCard key={post._id} post={post}/>))}
            </div>
          </div>
        )}
      </div>
      





    </div>
  )
}

export default Home