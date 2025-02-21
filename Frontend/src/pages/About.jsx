import React from 'react'

const About = () => {
  return (
   <div className=' flex min-h-screen items-center justify-center'>
    <div className='max-w-2xl mx-auto text-center '>
      <div>
      <h1 className=' text-3xl font-semibold text-center my-7'>About My Blopspot</h1>
      <div className='text-xl text-slate-500 flex flex-col gap-7'>
      <p>Hello! Welcome to MyBlogSpot, created by Rutwik Jadhav. Rutwik is a passionate software developer who enjoys writing about technology, AI, coding, and related topics.</p>

      <p>We encourage you to leave comments on your favorite posts to engage with us and the community. Together, we can help each other grow and improve.</p>
      </div>
      </div>
    </div>
   </div>
  )
}

export default About