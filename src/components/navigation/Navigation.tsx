'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'firebase/auth';
import { signInWithGoogle, signOutUser, onAuthStateChanged } from '../../auth/googleAuth';
import LogoAndBranding from '../logo-branding/LogoAndBranding';
import Image from 'next/image';
import SettingsModal from '../settings/SettingsModal';
import { useTheme } from '../../contexts/ThemeContext';
import { Menu, Globe } from 'lucide-react';
import { PersonCircle } from 'react-bootstrap-icons'; // Import the PersonCircle icon

const navClasses = {
  container: "bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200",
  inner: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  content: "flex justify-between items-center py-4",
  menuButton: "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white",
  navLinks: "hidden md:flex space-x-4",
  navLink: "text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
  authButton: "ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
};

const Navigation: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const { theme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Failed to sign in with Google', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setShowMenu(false);
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
    setShowMenu(false);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    // Implement language change logic here
  };

  return (
    <nav className={`bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <LogoAndBranding />
          <ul className="hidden md:flex space-x-4">
            <li><Link href="/" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150">Home</Link></li>
            <li><Link href="/contact" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150">Contact</Link></li>
            <li><Link href="/author" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150">About</Link></li>
          </ul>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent text-gray-700 dark:text-gray-300 text-sm focus:outline-none"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                {/* Add more language options as needed */}
              </select>
            </div>
            {user ? (
              <div className="flex items-center relative">
                <Image
                  src={user.photoURL || "/images/user-icon.png"}
                  alt="User Icon"
                  width={32}
                  height={32}
                  className="rounded-full cursor-pointer"
                  onClick={() => setShowMenu((prevShowMenu: boolean) => !prevShowMenu)}
                />
                {showMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-700 rounded-md overflow-hidden shadow-xl z-10 border border-gray-200 dark:border-gray-600">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" onClick={handleOpenSettings}>Settings</li>
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" onClick={handleSignOut}>Log out</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
              >
                <Image src="/images/google-icon.png" alt="Google Icon" width={20} height={20} className="mr-2" />
                Sign In
              </button>
            )}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open settings</span>
            </button>
          </div>
        </div>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </nav>
  );
};

export default Navigation;