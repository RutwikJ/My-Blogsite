import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="border border-blue-500 border-t-8 rounded-lg">
      <div>
        <div >
          {/* //logo div */}
          <div className="mt-4">
            <Link to="/">
              <h1 className="text-xl font-bold">
                My{" "}
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                  Blogspot
                </span>
              </h1>
            </Link>
          </div>
          {/* //different links */}
          <div className="flex justify-evenly mt-3 mx-auto ">
            <div>
              <h3>About</h3>
              <ul>
                <li>
                  <a href="/" className="text-gray-600 hover:underline ">
                    My Blogspot
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3>Follow us</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-600 hover:underline ">
                    Github
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:underline ">
                    X
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3>Privacy</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-600 hover:underline ">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:underline ">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="m-3">
          <p className=" text-gray-500 text-sm ">
            &copy; {new Date().getFullYear()} My Blogspot
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
