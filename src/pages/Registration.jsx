import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSignup = async (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    const name = e.target.name?.value;
    const photoUrl = e.target.photoUrl?.value;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!email || !password) {
      toast.error('Please enter your email and password');
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must be at least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
      );
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: name || null,
        photoURL: photoUrl || null,
      });
      toast.success('Signup Successful');
      // console.log('Signup successful:', res);
      navigate('/Profile');
    } catch (e) {
      toast.error(e.message);
      // console.error('Signup error:', e.code, e.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // console.log('User Info:', result.user);
      toast.success('Google Sign-In Successful');
      navigate(from, { replace: true });
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fffdf9]">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 my-20">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-black text-xl mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border text-green-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600" // ✅ text-gray-800 for better readability
            />
          </div>
          <div>
            <label className="block text-black text-xl mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border text-green-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block text-black text-xl mb-1">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              placeholder="Enter your photo URL"
              className="w-full px-4 py-2 border text-green-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block text-black text-xl mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a password"
                required
                className="w-full px-4 py-2 border text-green-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-700 hover:text-green-600"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 cursor-pointer rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Register
          </button>
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-16 bg-gray-800"></div>
            <span className="text-lg text-black">or</span>
            <div className="h-px w-16 bg-gray-800"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 bg-green-700 text-white px-5 py-2 rounded-lg w-full font-semibold hover:bg-green-600 transition-colors cursor-pointer"
          >
            <span className="text-2xl">
              <FcGoogle />
            </span>
            Continue with Google
          </button>
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-green-700 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
