import React from 'react';
import Image from 'next/image';
import Navigation from './Navigation';
import LogoAndBranding from './LogoAndBranding';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <LogoAndBranding />
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;