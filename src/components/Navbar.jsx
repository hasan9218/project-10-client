import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import toast, { Toaster } from 'react-hot-toast';
import MyContainer from './MyContainer';
import MyLink from './MyLink';
import { FaBars } from "react-icons/fa";
import profileImg from '../assets/profile.jpg';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logout Successful');
      navigate('/');
    } catch (e) {
      toast.error(e.message);
    }
  };

 

  return (
    <div className="bg-white shadow-sm">
      <MyContainer>
        <div className="navbar">
          {/* Left side */}
          <div className="navbar-start">
            {/* Mobile Dropdown */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost text-gray-600 text-xl lg:hidden">
                <FaBars />
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content text-black bg-gray-200 font-semibold z-10 mt-3 w-52 p-2 shadow"
              >
                {/* Always Visible Links */}
                <li><MyLink to="/">Home</MyLink></li>
                <li><MyLink to="/availablefoods">Available Foods</MyLink></li>

                {/* Private Links (Only When Logged In) */}
                {user && (
                  <>
                    <li><MyLink to="/add-food">Add Food</MyLink></li>
                    <li><MyLink to="/manage-foods">Manage My Foods</MyLink></li>
                    <li><MyLink to="/my-requests">My Food Requests</MyLink></li>
                  </>
                )}
              </ul>
            </div>

            {/* Website Logo & Name */}
            <Link to="/" className="flex items-center text-green-800">
              <h2 className="text-lg md:text-3xl font-extrabold italic">
                Plate<span className='text-green-600'>Share</span>
              </h2>
            </Link>
          </div>

          {/* Center menu (Desktop) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu text-lg text-black menu-horizontal px-1">
              <li><MyLink to="/">Home</MyLink></li>
              <li><MyLink to="/availablefoods">Available Foods</MyLink></li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="navbar-end gap-2 md:gap-5 list-none">
            {user ? (
              <>
                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full border border-gray-300">
                      <img
                        src={user?.photoURL || profileImg}
                        alt=""
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.src = profileImg;
                        }}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
                  >
                    <li className='text-black text-2xl font-medium'><MyLink to="/add-food">Add Food</MyLink></li>
                    <li className='text-black text-2xl font-medium'><MyLink to="/manage-foods">Manage My Foods</MyLink></li>
                    <li className='text-black text-2xl font-medium'><MyLink to="/my-requests">My Food Requests</MyLink></li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-red-600 font-medium hover:text-red-800"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                {/* Login Button */}
                <li className="bg-green-700 text-white font-medium hover:bg-green-600 px-3 py-2 rounded-lg">
                  <MyLink to="/login">Login</MyLink>
                </li>
              </>
            )}
          </div>
        </div>
      </MyContainer>
      <Toaster position="top-right" />
    </div>
  );
};

export default Navbar;
