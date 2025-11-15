
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { auth } from '../firebase/firebase.config';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

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
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login Successful');
            navigate(from, { replace: true });
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('profile email');
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
            <div className="bg-white p-8 my-20 rounded-2xl shadow-2xl w-96">
                <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">Welcome Back</h2>
                <p className="text-sm font-semibold text-center text-gray-600 mb-7">
                    Log in to continue your PlateShare
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-black text-xl mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border text-green-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                        />
                    </div>

                    <div>
                        <label className="block text-black text-xl mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border text-green-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-700 hover:text-green-600"
                            >
                                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <Link to=""
                        state={{ email }} className="text-sm text-green-700 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 cursor-pointer rounded-lg font-semibold hover:bg-green-600 transition"
                    >
                        Login
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
                        <span className="text-2xl"><FcGoogle /></span>
                        Continue with Google
                    </button>

                    <p className="text-center text-gray-600 text-sm mt-4">
                        Don’t have an account?{' '}
                        <Link to="/registration" className="text-green-700 hover:underline">
                            Registration
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;