import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col gap-2 sm:flex-row p-3 justify-center items-center rounded-tl-3xl rounded-br-3xl border  border-indigo-500'>

        <div className='justify-center flex flex-col flex-1 my-2 items-center'>
            <h2 className='text-2xl '>Want to learn more about Javascript</h2>
            <p className='text-gray-500 my-2'>Checkout our Workshop for free </p>
            <button className='text-white font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-pink-600 p-3  rounded-tl-3xl rounded-br-3xl'>Subcribe to us </button>
        </div>
        <div className='flex-1'>
            <img src="https://miro.medium.com/v2/resize:fit:800/1*4iXLdAjcfF7jn4QT_wjbhQ.png" alt='Javascript image' className='rounded-br-3xl'/>
        </div>
    </div>
  )
}

export default CallToAction

