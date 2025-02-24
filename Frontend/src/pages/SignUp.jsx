import React from 'react'
import { useState } from 'react'
import { Link,Links,useNavigate } from 'react-router-dom'
import GoogleAuth from '../components/GoogleAuth'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate=useNavigate();




  const handleChange=(e)=>{
    const {id,value}=e.target;
    setFormData(prevFormData=>({...prevFormData,[id]:value.trim()}))

  //  setFormData({...formData,[e.target.id]:e.target.value})
  
  
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      setErrorMessage(null)
      
      const res= await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data= await res.json()
      
      if(data.success===false){
       
       return setErrorMessage(data.message)
      }
      setLoading(false)
      if(res.ok){
        navigate('/sign-in')
      }

    }catch(err){
   setErrorMessage(err.message)
   setLoading(false)
    }
  }
  return (
    <div className='bg-red-200 min-h-screen'>
      <div className=' p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
           type='text'
            id='username'
             placeholder='username'
              className='bg-orange-100 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none' 
              onChange={handleChange}
              pattern='^[a-zA-Z0-9_-]{3,16}$'
              title='Username must have 3-16 characters can include letters,numbers ,hyphens and underscores'
              required/>
          <input type='email' 
          id='email'
           placeholder='email'
            className='bg-orange-100 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none' 
            onChange={handleChange}
            pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            required
            title='Please enter a valid email address.'/>
          <input 
          type='password'
           id='password'
            placeholder='password'
             className='bg-orange-100 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none'
              onChange={handleChange}
              pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@\-_])[A-Za-z\d@\-_]{8,}$'
              required
              title='Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'

              />
          <button
            className='text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-3 hover:opacity-95 disabled:80'
            disabled={loading}
            type='submit'
            >
              {loading ? (
              
                'Loading...'
            ) : (
              'SIGN UP'
            )}
          </button>
          <GoogleAuth/> 
        </form>
            <div className='flex gap-2 mt-3'>
              <p>Already have an account ?</p>
          <Link to={'/sign-in'}>
          <span className='text-blue-400'>Sign in</span>
          </Link>      
            </div>
            <p className='text-red-600 mt-4'>{errorMessage && 'Something went wrong !!!'}</p>

      </div>
    </div>
    
  )
}

export default SignUp