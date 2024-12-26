import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../../Firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const CreatePost = () => {
  const [file,setFile]=useState(null)
  const[imageUploadProgress,setImageUploadProgress]=useState(null)
  const[imageUploadError,setImageUploadError]=useState(null)
  const [formData,setFormData]=useState({})

  const handleUpload=async()=>{
    try{
      if(!file){
        setImageUploadError('Please Select an Image to be uploaded')
        return;
      }
      setImageUploadError(null)
      const storage=getStorage(app)
      const fileName=new Date().getTime()+'-'+file.name
      const storageRef= ref(storage,fileName)
      const uploadTask=uploadBytesResumable(storageRef,file)
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          setImageUploadProgress(progress.toFixed(0));

        },
        (error)=>{
          setImageUploadError('Image upload failed')
          setImageUploadProgress(null)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({...FormData,image:downloadURL});
          })
        }
      )
    }catch(err){
      setImageUploadError('failure occured while image uploading')
      setImageUploadProgress(null)
      console.log(err);
      
    }
  }
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
                onChange={(e)=>setFile(e.target.files[0])}
                
              />
            <button
                type='button'
                className='hover:bg-gradient-to-r from-green-300 via-green-400 to-green-700 hover:text-white px-4 py-2 rounded-lg border-2 border-blue-500 '
                onClick={handleUpload}
                disabled={imageUploadProgress}
                >
                  {imageUploadProgress ? (
                    <div className='w-16 h-16' > 
                    <CircularProgressbar
                          value={imageUploadProgress || 0}
                          text={`${imageUploadProgress || 0}%`}

                    />
                    </div>
                  ):(
                    'Upload Image'
                  )}
                
                
                </button>
            

          </div>
          {imageUploadError && <p className='text-center text-white mt-4 p-2 bg-red-400 rounded'>{imageUploadError}</p>}
          {formData.image && (
            <img
              src={formData.image}
              alt='image to be uploaded'
              className='w-full h-72 object-cover'/>
          )}
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