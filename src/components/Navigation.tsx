import React from 'react';
import Link from 'next/link';

const Navigation: React.FC = () => {
  return (
    <nav className="mt-4">
      <ul className="flex space-x-4">
        <li><Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
        <li><Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link></li>
        <li><Link href="/author" className="text-blue-600 hover:text-blue-800">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;