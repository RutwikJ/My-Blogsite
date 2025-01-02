import React,{ useEffect,useState }  from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaCheck, FaTimes } from 'react-icons/fa';

const DashUsers = () => {
const {currentUser} =useSelector((state)=>state.user)
const [users,setUsers]=useState([])
const [showMore, setShowMore] = useState(true);
// console.log(users);

useEffect(() => {
const fetchUsers = async () => {
  try {
    const res = await fetch('/api/user/getusers');
    const data = await res.json();
    if (res.ok) {
      setUsers(data.users);
      if (data.users.length < 9) {
        setShowMore(false);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
if (currentUser.isAdmin) {
  fetchUsers();
}
}, [currentUser._id]);

const handleShowMore = async () => {
  const startIndex = users.length;
  try {
    const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
    const data = await res.json();
    if (res.ok) {
      setUsers((prev) => [...prev, ...data.users]);
      if (data.users.length < 9) {
        setShowMore(false);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
const handleDeleteUser=async(userId)=>{
  try{
    const res=await fetch(`/api/user/delete/${userId}`,{
      method:'DELETE',
     })
     const data =await res.json()
     if(res.ok){
      setUsers((prev)=>prev.filter((user)=>user._id !==userId))
     }else{
      console.log(data.message);
      
     }
  }catch(err){
    console.log(err.message);
    
  }
}
  return (
    <div className='overflow-x-scroll  p-3'>
      {currentUser.isAdmin && users.length>0 ? 
      (<>
        <table className='min-w-full divide-y divide-gray-400 shadow-md'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-gray-500  tracking-wider text-left'>Date Created</th>
              <th className='px-6 py-3 text-gray-500  tracking-wider text-left'>User Image</th>
              <th className='px-6 py-3 text-gray-500  tracking-wider text-left'>Username</th>
              <th className='px-6 py-3 text-gray-500  tracking-wider text-left'>Email</th>
              <th className='px-6 py-3 text-gray-500  tracking-wider text-left'>Admin</th>
              <th className='px-6 py-3 text-gray-500  tracking-wider text-left'>Delete</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user)=>(
              <tr key={user._id}>
                 <td className='px-6 py-4'>{new Date(user.createdAt).toLocaleDateString()}</td> 
                 <td className='px-6 py-4 '>
                 <img src={user.profilePic} alt={user.username} className='w-11 h-11 object-cover rounded-full bg-slate-600 '/>
                 </td> 
                 <td className='px-6 py-4'>
                 {user.username}
                  </td> 
                 <td className='px-6 py-4'>{user.email}</td> 
                 <td className='px-6 py-4'>{user.isAdmin ? (<FaCheck className='text-green-500'/>):(<FaTimes className='text-red-500'/>)}</td> 
                 <td className='px-6 py-4 hover:underline text-red-500'><span onClick={()=>handleDeleteUser(user._id)}>Delete</span></td> 
                 
            </tr>))}

            </tbody>
        </table>
      
      
      </>)
      
      :(<p>You have no posts </p>)}
    </div>
  )
}

export default DashUsers