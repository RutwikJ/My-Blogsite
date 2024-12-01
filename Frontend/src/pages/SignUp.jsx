import React from 'react'

const SignUp = () => {
  return (
    <div className='bg-red-200 min-h-screen'>
      <div className=' p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
        <form className='flex flex-col gap-4'>
          <input type='text' id='username' placeholder='username' className='bg-orange-100 rounded-lg p-3'/>
          <input type='text' id='email' placeholder='email' className='bg-orange-100 rounded-lg p-3'/>
          <input type='text' id='password' placeholder='password' className='bg-orange-100 rounded-lg p-3'/>
          <button
            className='text-white bg-orange-900 rounded-lg p-3'>

            SIGN UP
          </button>
        </form>


      </div>
    </div>
    
  )
}

export default SignUp