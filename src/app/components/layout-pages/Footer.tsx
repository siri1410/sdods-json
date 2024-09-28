import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-xl font-bold mb-3">DevToolBox</h3>
            <p className="text-sm text-gray-300 mb-3">A powerful tool to meet all developer needs.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <i className="fab fa-github text-lg"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <i className="fab fa-linkedin text-lg"></i>
              </a>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</Link></li>
              <li><Link href="/author" className="text-gray-300 hover:text-white transition-colors duration-300">Author</Link></li>
              <li><Link href="/isr" className="text-gray-300 hover:text-white transition-colors duration-300">ISR Demo</Link></li>
              <li><Link href="/ssg" className="text-gray-300 hover:text-white transition-colors duration-300">SSG</Link></li>
              <li><Link href="/ssr" className="text-gray-300 hover:text-white transition-colors duration-300">SSR</Link></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <p className="text-sm text-gray-300 mb-2"><i className="fas fa-envelope mr-2"></i>admin@sdods.com</p>
            <p className="text-sm text-gray-300 mb-2"><i className="fas fa-phone mr-2"></i>(747) 666-5934</p>
            <p className="text-sm text-gray-300"><i className="fas fa-map-marker-alt mr-2"></i>456 Tech Avenue, Developer City, 67890</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} DevToolBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;