import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">About Us</h3>
            <p className="text-gray-400">JSON Triage & Evaluator v2 - A powerful tool for JSON manipulation and analysis.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link href="/author" className="text-gray-400 hover:text-white">Author</Link></li>
              <li><Link href="/isr" className="text-gray-400 hover:text-white">ISR Demo</Link></li>
              <li><Link href="/ssg" className="text-gray-400 hover:text-white">SSG</Link></li>
              <li><Link href="/ssr" className="text-gray-400 hover:text-white">SSR</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-400">Email: info@yarlis.com</p>
            <p className="text-gray-400">Phone: (747) 666-5934</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; 2023 JSON Triage & Evaluator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;