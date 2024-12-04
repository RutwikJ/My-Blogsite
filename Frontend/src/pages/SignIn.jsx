import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate=useNavigate()
  const handleChange=(e)=>{
    const {id,value}=e.target
    setFormData((prevFormData)=>({...prevFormData,[id]:value.trim()}))

  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      setErrorMessage(null)
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data= await res.json()
      if(data.success==false){
        setErrorMessage(data.message)
      }

      if(res.ok){
        navigate('/')
      }

      
    }catch(err){
      setLoading(false)
      setErrorMessage(err.message)
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
          <div className='flex gap-2 mt-3 justify-center'>
            <Link to={'/sign-up'}>
            <p className='text-blue-500 hover:cursor-pointer hover:opacity-90'>Already have an account?</p>
            </Link>
          </div>
          <p className='text-red-600 mt-4'>{errorMessage && 'Something went wrong !!!'}</p>

        </form>
      </div>

    </div>
    
  )
}

export default SignIn