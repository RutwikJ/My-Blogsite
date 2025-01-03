import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../features/user/userSlice.js'
import GoogleAuth from '../components/GoogleAuth.jsx';

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const {loading,error:errorMessage}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleChange=(e)=>{
    const {id,value}=e.target
    setFormData((prevFormData)=>({...prevFormData,[id]:value.trim()}))

  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try{
     
      dispatch(signInStart())
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data= await res.json()
      if(data.success==false){
      dispatch(signInFailure(data.message))
      }

      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }

      
    }catch(err){
     dispatch(signInFailure(err.message))
    }
  }
  return (
    <div className='min-h-screen bg-red-200'>
      <div className='p-3 max-w-lg mx-auto '>
        <h1 className='text-3xl font-semibold text-center my-7'>Sign in</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input type='email' id='email' placeholder='email' className='p-3 rounded-lg bg-orange-100 focus:ring-2 focus:ring-purple-500 focus:outline-none'  onChange={handleChange}/>
          <input type='password' id='password' placeholder='password' className='p-3 rounded-lg bg-orange-100 focus:ring-2 focus:ring-purple-500 focus:outline-none' onChange={handleChange}/>

          <button
            className='text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-3 hover:opacity-95 disabled:80'
            disabled={loading}
            type='submit' 
          >
            {loading ? ('Loading'):('SIGN IN')}

          </button>
          <GoogleAuth/>
          <div className='flex gap-2 mt-3 justify-center'>
            <Link to={'/sign-up'}>
            <p className='text-blue-500 hover:cursor-pointer hover:opacity-90'>Don't have an account yet ?</p>
            </Link>
          </div>
          <p className='text-red-600 mt-4'>{errorMessage }</p>

        </form>
      </div>

    </div>
    
  )
}

export default SignIn