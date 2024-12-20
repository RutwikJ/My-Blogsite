import React, { useEffect, useState } from 'react'
import { Link, useLocation} from 'react-router-dom'
import { signOutSuccess } from '../features/user/userSlice.js'
import { useDispatch } from 'react-redux'
const DashSidebar = () => {
    const location=useLocation()
    const [tab,setTab]=useState('')
    const dispatch=useDispatch()
    
    useEffect(()=>{
    
     const urlParams=new URLSearchParams(location.search);
     const tabFromUrl=urlParams.get('tab')
     if(tabFromUrl){
        setTab(tabFromUrl)
     } 

    },[location.search])

    const handleUserSignOut=async()=>{
      try{
        const res= await fetch('/api/auth/signout',{
          method:'POST',
    
        });
        const data= await res.json()
        if(!res.ok){
          console.log(data.message);
          }else{
            dispatch(signOutSuccess());
    
          }
      }catch(err){
        console.log(err.message);
        
      }
    }
    


  return (
    <div className='w-full md:w-56 bg-gray-500 text-white md:h-screen'>
      <div className='flex flex-col gap-1 p-4'>
        <Link to={'/dashboard?tab=profile'}>
        <div className={`flex items-center p-2 rounded-md hover:opacity-80 ${tab=='profile' ? 'bg-gray-400':''}`}>
            {/* profile */}
            Profile <span className='ml-auto'>USER</span>

        </div>
        </Link>
        
        <div 
        
        className='cursor-pointer items-center p-2 rounded-lg hover:opacity-80'
        onClick={handleUserSignOut}
        >
            SIGN OUT
        </div>
        
        </div>
    </div>
  )
}

export default DashSidebar