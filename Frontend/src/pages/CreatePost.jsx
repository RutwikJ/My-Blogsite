import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>

      <h1 
          className='text-center text-3xl font-semibold my-7 '>
        Create a post
        </h1>

        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <input 
                type='text'
                placeholder='Title'
                id='title'
                className='flex-1 border border-gray-400 p-2 rounded'
                required
          />
          <select 
                className='flex-1 border border-gray-400 p-2 rounded' >
            <option value='uncategorised'>Select a category</option>      
            <option value='javascript'>Javascript</option>
            <option value='react js'>React.js</option>
            <option value='react js'>Next.js</option>
            <option value='AI'>AI</option>
          </select>
          </div>
          <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dashed p-3' >
          <input 
                type='file'
                accept='image/*'
                
                
              />
            <button
                type='button'
                className='hover:bg-gradient-to-r from-green-300 via-green-400 to-green-700 hover:text-white px-4 py-2 rounded-lg border-2 border-blue-500 '
                
                > Upload Image</button>
            

          </div>
          <ReactQuill 
                    theme="snow" 
                    placeholder='Scribble Something...' 
                    required 
                    className='h-72 mb-11'
                    />
            <button 
                    type='submit' 
                    className='bg-purple-600 text-white px-4 py-3 rounded-lg'
            >
          Publish
        </button>
        </form>
    </div>
  )
}

export default CreatePost