import React,{ useEffect,useState }  from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const DashPosts = () => {
const {currentUser} =useSelector((state)=>state.user)
const [userPosts,setUserPosts]=useState([])
const [showMore,setShowMore]=useState(true)

useEffect(()=>{
  const fetchPosts= async()=>{
    try {
      const res= await fetch(`/api/post/getposts?userId=${currentUser._id}`)
      const data= await res.json()
      if(res.ok){
        setUserPosts(data.posts)
        if(data.posts.length<9){
          setShowMore(false)
        }
      }

    } catch (error) {
      console.log(error.message);
      
    }
  }
  if(currentUser.isAdmin){
    fetchPosts()
  }
},[currentUser._id])

const handleShowMore=async()=>{
  const startIndex=userPosts.length;
  try {
    const res=await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
    const data= await res.json()
    if(res.ok){
      setUserPosts((prev)=>[...prev,...data.posts])
      if(data.posts.length<9){
        setShowMore(false)
      }
    }
  } catch (error) {
    console.log(error.message);
    
  }
}
const handleDeletePost=async(postId)=>{
  
  try {
    const res= await fetch(`/api/post/deletepost/${postId}/${currentUser._id}`,{
      method:'DELETE'
    })
    const data= await res.json()
    if(!res.ok){
      console.log(data.message);
      
    }else{
      setUserPosts((prev)=>prev.filter((post)=>post._id!==postId))
    }
  }
  
  catch (error) {
    console.log(error.message);
  }
}
  return (
    <div className='overflow-x-scroll  p-3'>
      {currentUser.isAdmin && userPosts.length>0 ? 
      (<>
        <table className='min-w-full divide-y divide-gray-400 shadow-md'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-gray-500  tracking-wider text-left'>Date Updated</th>
              <th className='px-6 py-3 text-gray-500  tracking-wider text-left'>Post Image</th>
              <th className='px-6 py-3 text-gray-500  tracking-wider text-left'>Post Title</th>
              <th className='px-6 py-3 text-gray-500  tracking-wider text-left'>Category</th>
              <th className='px-6 py-3 text-gray-500  tracking-wider text-left'>Delete</th>
              <th className='px-6 py-3 text-gray-500  tracking-wider text-left'>Edit</th>
            </tr>
            </thead>
            <tbody>
            {userPosts.map((post)=>(
              <tr key={post._id}>
                 <td className='px-6 py-4'>{new Date(post.updatedAt).toLocaleDateString()}</td> 
                 <td className='px-6 py-4 '><Link to={`/post/${post.slug}`}>
                 <img src={post.image} alt={post.title} className='w-20 h-10 object-cover '/>
                 </Link>
                 </td> 
                 <td className='px-6 py-4'>
                  <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </td> 
                 <td className='px-6 py-4'>{post.category}</td> 
                 <td className='px-6 py-4 hover:underline text-red-500'><span onClick={()=>handleDeletePost(post._id)}>Delete</span></td> 
                 <td className='px-6 py-4 hover:underline text-green-400'><Link>Edit</Link></td> 
            </tr>))}

            </tbody>
        </table>
              {showMore ? (<div className=' flex mt-5'><button onClick={handleShowMore} className='mx-auto text-blue-600'>Show More</button></div>):<></>}
      
      </>)
      
      :(<p>You have no posts </p>)}
    </div>
  )
}

export default DashPosts