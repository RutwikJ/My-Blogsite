import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage';
import { app } from "../../Firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const fileImageRef = useRef();
  const [imageFileUploadProgress,setImageFileUploadProgress]=useState(null)
  const [imageFileUploadError,setImageFileUploadError]=useState(null)
  
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
        // setImageFileUpoading()
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileUrl(downloadURL);
        })
      }

     )
  }
  return (
    <div className="max-w-lg p-4 mx-auto">
      <h1 className="text-3xl my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-3">
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
        />
        <input
          type="text"
          id="username"
          placeholder="email"
          defaultValue={currentUser.email}
          className="p-3  bg-slate-300 rounded-lg"
        />
        <input
          type="text"
          id="username"
          placeholder="password"
          className="p-3  bg-slate-300 rounded-lg"
        />
        <button className="text-white p-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg cursor-pointer">
          Update
        </button>
      </form>
      <div className="text-red-400 flex justify-between mt-5">
        <span className=" cursor-pointer">Delete Account </span>
        <span className=" cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
