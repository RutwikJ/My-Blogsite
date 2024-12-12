import React, { useEffect, useState } from 'react'
import { Link, useLocation} from 'react-router-dom'

const DashSidebar = () => {
    const location=useLocation()
    const [tab,setTab]=useState('')
    
    useEffect(()=>{
    
     const urlParams=new URLSearchParams(location.search);
     const tabFromUrl=urlParams.get('tab')
     if(tabFromUrl){
        setTab(tabFromUrl)
     } 

    },[location.search])


  return (
    <div className='w-full md:w-56 bg-gray-500 text-white md:h-screen'>
      <div className='flex flex-col gap-1 p-4'>
        <Link to={'/dashboard?tab=profile'}>
        <div className={`flex items-center p-2 rounded-md hover:opacity-80 ${tab=='profile' ? 'bg-gray-400':''}`}>
            {/* profile */}
            Profile <span className='ml-auto'>USER</span>

        </div>
        </Link>
        
        <div className='items-center p-2 rounded-lg hover:opacity-80'>
            SIGN OUT
        </div>
        
        </div>
    </div>
  )
}

export default DashSidebar