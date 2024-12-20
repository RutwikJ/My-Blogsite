import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutSuccess } from "../features/user/userSlice";

const Header = () => {
  const{currentUser}=useSelector((state)=>state.user)
  const dispatch= useDispatch()

  const handleUserSignOut = async (req,res,next) => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }else{
        dispatch(signOutSuccess())
      }
   
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <div className="border-b-2 bg-orange-200">
      <div className="flex justify-between p-3 items-center ">
       <Link to='/'>
       <h1 className="text-xl font-bold">My <span  className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blogspot</span></h1>

       
       </Link>
        <ul className="flex gap-3 items-center ">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          {currentUser ? (
            <>
              <Link to="/dashboard?tab=profile">
                <li className="flex items-center">
                  <img
                    src={currentUser.profilePic }
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2"
                    onError={(e) => { e.target.onerror = null; e.target.src="/default_image.png"; }} 
                   
                  />
                  Profile
                </li>
              </Link>
              <button onClick={handleUserSignOut} className="text-red-500">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <li>Sign in</li>
              </Link>
              <Link to="/sign-up">
                <li>Sign up</li>
              </Link>
            </>
          )}

        </ul>
      </div>
    </div>
  );
};

export default Header;
