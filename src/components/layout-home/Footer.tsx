import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white border-t border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4">DevToolBox</h3>
            <p className="text-sm text-gray-300">Simplifying development tasks</p>
          </div>
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Home</Link></li>
                <li><Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">About</Link></li>
                <li><Link href="/services" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Blog</Link></li>
                <li><Link href="/docs" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Documentation</Link></li>
                <li><Link href="/faq" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Contact Us</Link></li>
                <li><a href="mailto:info@devtoolbox.com" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">info@devtoolbox.com</a></li>
                <li><a href="tel:+1234567890" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">+1 (234) 567-890</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 sm:mb-0">&copy; {new Date().getFullYear()} DevToolBox. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;