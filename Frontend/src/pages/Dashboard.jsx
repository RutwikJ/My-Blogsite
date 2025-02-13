import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers'

const Dashboard = () => {
  const location=useLocation()
  const [tab,setTab]=useState('')
  

  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
    const tabFromUrl= urlParams.get('tab')
    // console.log(tabFromUrl);
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
    
    
  },[location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div >
      {/* left-side or sidebar */}
      <DashSidebar/>
      </div>
      
      <div className='flex-grow'>
        {/* right-side profile */}
        {tab==='profile' && <DashProfile/>}
        {tab==='posts' && <DashPosts/>}
        {tab==='users' && <DashUsers/>}
      </div>
    </div>
  )
}

export default Dashboard