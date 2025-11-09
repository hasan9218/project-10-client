import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-700 to-gray-900 text-white py-10">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className='flex flex-col space-y-7'>
      <h3 className="text-lg font-semibold mb-7">Contact Info</h3>
      <p className="text-sm">Email: contact@yourcompany.com</p>
      <p className="text-sm">Phone: +88-01719103858</p>
      <p className="text-sm">Location: 96/4 Dhanmondi , Dhaka</p>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-7">Social Media</h3>
      <div className="flex flex-col space-y-7">
        <a href="https://facebook.com" className="text-sm hover:text-purple-200">Facebook</a>
        <a href="https://twitter.com" className="text-sm hover:text-purple-200">Twitter</a>
        <a href="https://linkedin.com" className="text-sm hover:text-purple-200">LinkedIn</a>
      </div>
    </div>
    <div className='flex flex-col space-y-7'>
      <h3 className="text-lg font-semibold mb-7">Legal</h3>
      <a href="#" className="text-sm block hover:text-purple-200">Privacy Policy</a>
      <a href="#" className="text-sm block hover:text-purple-200 mt-1">Terms of Service</a>
      <p className="text-xs mt-3">&copy; 2025 Your Company. All rights reserved.</p>
    </div>
  </div>
</footer>
    );
};

export default Footer;