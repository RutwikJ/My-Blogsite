import React from 'react'
import { AiFillGoogleCircle } from "react-icons/ai";
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth';
import { app } from '../../Firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../features/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
const GoogleAuth = () => {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () =>{
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      try {
          const resultsFromGoogle = await signInWithPopup(auth, provider)
          // console.log(resultsFromGoogle);
          const res = await fetch('/api/auth/google', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  name: resultsFromGoogle.user.displayName,
                  email: resultsFromGoogle.user.email,
                  googlePhotoUrl: resultsFromGoogle.user.photoURL,
              }),
              })
         
          
          const data = await res.json()
          if (res.ok){
              dispatch(signInSuccess(data))
              navigate('/')
          }
      }catch(err){
        console.log(err);
        
      }

  }
  return (
    <button type='button'
      className=' flex justify-center font-semibold border-red-500 border-2 hover:bg-gradient-to-r from-pink-500 to-orange-400 hover:text-white rounded-lg p-3'
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className='h-6 w-6 mr-1'/>Continue with Google
      </button>
  )
}

export default GoogleAuth