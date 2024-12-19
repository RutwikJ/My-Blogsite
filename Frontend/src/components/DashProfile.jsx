import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage';
import { app } from "../../Firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,updateSuccess,updateFailure } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const fileImageRef = useRef();
  const [imageFileUploadProgress,setImageFileUploadProgress]=useState(null)
  const [imageFileUploadError,setImageFileUploadError]=useState(null)
  const [formData,setFormData]=useState({})
  const [imageFileUploading,setImageFileUploading]=useState(false)
  const [updateUserSuccess,setUpdateUserSuccess]=useState(null)
  const [updateUserError, setUpdateUserError] = useState(null);
  const dispatch=useDispatch()
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      
      // console.log(file,URL.createObjectURL(file));
    }
  };

  useEffect(()=>{
    if(imageFile){
      uploadImage()
    }
  },[imageFile])

  const uploadImage=async()=>{
    setImageFileUploading(true)
    setImageFileUploadError(null)
     const storage= getStorage(app);
     const fileName=new Date().getTime()+imageFile.name
     const storageRef=ref(storage,fileName)
     const uploadTask=uploadBytesResumable(storageRef,imageFile)
     uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress=
          (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setImageFileUploadProgress(progress.toFixed(0));

      },
      (error)=>{
        setImageFileUploadError('Could not upload image (file must be less than 2MB)')
        setImageFileUploadProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
        setImageFileUploading(false)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePic: downloadURL });
          setImageFileUploading(false)
        })
      }

     )
  }

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})

  }
  console.log(formData);
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setUpdateUserError(null);
    console.log('Submitting form with data:', formData); 
    if(Object.keys(formData).length ===0){
      setUpdateUserError('No changes made');
      return ;
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart())
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data= await res.json()

      if(!res.ok){
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message);
      
      }else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess('Profile updated Successfully')
        console.log('data:',data);
        console.log('Image File URL:', imageFileUrl);
        
      }



    } catch (err) {
      dispatch(updateFailure(err.message))
      setUpdateUserError(err.message)
    }
    

  }
  return (
    <div className="max-w-lg p-4 mx-auto">
      <h1 className="text-3xl my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileImageRef}
          hidden
        />
        <div
          className="relative w-24 h-24 md:w-32 md:h-32 self-center overflow-hidden mb-4"
          onClick={() => fileImageRef.current.click()}
        >
           {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePic}
            alt="user"
            className={`w-full h-full rounded-full object-cover border-8 border-gray-300  ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && 
        <p className='bg-red-300 text-sm text-center p-2'>{imageFileUploadError}</p>}
        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className="p-3 bg-slate-300 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          id="username"
          placeholder="email"
          defaultValue={currentUser.email}
          className="p-3  bg-slate-300 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          id="username"
          placeholder="password"
          className="p-3  bg-slate-300 rounded-lg"
          onChange={handleChange}
        />
        <button 
          className={`text-white p-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg cursor-pointer  ${!(imageFileUploadProgress === "100"  || Object.keys(formData).length > 0) ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!(imageFileUploadProgress === "100") || (Object.keys(formData).length>0)}
        >
          Update
        </button>
      </form>
      <div className="text-red-400 flex justify-between mt-5">
        <span className=" cursor-pointer">Delete Account </span>
        <span className=" cursor-pointer">Sign Out</span>
      </div>

      {updateUserSuccess && (
        <p className='bg-green-400 text-white text-center mt-4 p-2 rounded-lg'>{updateUserSuccess}</p>
      )}
        {updateUserError && (
        <p className='bg-red-400 text-white text-center mt-4 p-2 rounded-lg'>{updateUserError}</p>
      )}
    </div>
  );
};

export default DashProfile;