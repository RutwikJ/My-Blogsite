import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="border-b-2 bg-orange-200">
      <div className="flex justify-between p-3 items-center ">
       <Link to='/'>
       <h1 className="text-xl font-bold">My <span>Blogspot</span></h1>
       </Link>
        <ul className="flex gap-3 ">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/sign-in">
            <li>Sign in</li>
          </Link>
          <Link to="/sign-up">
            <li>Sign up</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
