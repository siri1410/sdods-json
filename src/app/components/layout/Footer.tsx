import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* About Us Section */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-2xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">DevToolBox - A powerful tool to meet all developer needs.</p>
          </div>

          {/* Quick Links Section */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/author" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Author
                </Link>
              </li>
              <li>
                <Link href="/isr" className="text-gray-400 hover:text-white transition-colors duration-200">
                  ISR Demo
                </Link>
              </li>
              <li>
                <Link href="/ssg" className="text-gray-400 hover:text-white transition-colors duration-200">
                  SSG
                </Link>
              </li>
              <li>
                <Link href="/ssr" className="text-gray-400 hover:text-white transition-colors duration-200">
                  SSR
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="md:w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">Email: admin@sdods.com</p>
            <p className="text-gray-400">Phone: (747) 666-5934</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-5 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; 2023 DevToolBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;