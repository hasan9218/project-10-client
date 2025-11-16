import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-[#F0FDF4] text-[#364153] pt-10">
      <div className='max-w-6xl mx-auto mb-10 px-4'>
        <Link to="/" className="flex items-center text-green-800">
        <img src={logo} alt="logo" className='w-60 md:w-48' />
      </Link>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

        <div className='flex flex-col space-y-3'>
          <h3 className="text-lg font-semibold mb-7">Contact Info</h3>
          <p className="text-lg">Email: contact@plateshare.com</p>
          <p className="text-lg">Phone: +88-01821305056</p>
          <p className="text-lg">Location: 96/4 Dhanmondi , Dhaka</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-7">Social Media</h3>
          <div className="flex flex-col space-y-3">
            <a href="https://facebook.com" className="text-lg hover:text-green-600">Facebook</a>
            <a href="https://twitter.com" className="text-lg hover:text-green-600">Twitter</a>
            <a href="https://linkedin.com" className="text-lg hover:text-green-600">LinkedIn</a>
          </div>
        </div>
        <div className='flex flex-col space-y-3'>
          <h3 className="text-lg font-semibold mb-7">Legal</h3>
          <a href="#" className="text-lg block hover:text-green-600">Privacy Policy</a>
          <a href="#" className="text-lg block hover:text-green-600 mt-1">Terms of Service</a>
          
        </div>
        
      </div>
      <div className='bg-green-700'>
        <p className="text-lg text-center text-white py-7 mt-5">&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;