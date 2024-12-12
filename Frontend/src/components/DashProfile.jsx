import React from 'react'
import { useSelector } from 'react-redux'

const DashProfile = () => {
  const {currentUser}=useSelector((state)=>state.user)

  return (
    <div className=' p-4 mx-auto'>
      <h1 className='text-3xl my-7 text-center'>Profile</h1>
      <form className='flex flex-col gap-2  ' >
        <div className='w-24 h-24 md:w-32 md:h-32 self-center overflow-hidden'>
          <img src={currentUser.profilePic}
          alt='user'
          className='w-full h-full rounded-full object-cover border-8 border-gray-300'
        /></div>
        <input type='text' id='username' placeholder='username' defaultValue={currentUser.username} className='p-3 bg-slate-300 rounded-lg'/>
        <input type='text' id='username' placeholder='email' defaultValue={currentUser.email} className='p-3  bg-slate-300 rounded-lg'/>
        <input type='text' id='username' placeholder='password'  className='p-3  bg-slate-300 rounded-lg'/>
        <button  className='p-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg cursor-pointer'>Submit</button>
      </form>
      <div className='text-red-400 flex justify-between mt-5'>
        <span className=' cursor-pointer'>Delete Account </span>
        <span className=' cursor-pointer'>Sign Out</span>
      </div>
      </div>
  )
}

export default DashProfile