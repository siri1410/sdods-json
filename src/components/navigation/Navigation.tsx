import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'firebase/auth'; // This import should work once we update tsconfig.json
import { signInWithGoogle, signOutUser, onAuthStateChanged } from '../../auth/googleAuth';
import LogoAndBranding from '../logo-branding/LogoAndBranding';
import Image from 'next/image';

const Navigation: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState(false);

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

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <LogoAndBranding />
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
            <li><Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link></li>
            <li><Link href="/author" className="text-blue-600 hover:text-blue-800">About</Link></li>
          </ul>
          <div>
            {user ? (
              <div className="flex items-center relative">
                <Image
                  src={user.photoURL || "/images/default-user-icon.png"}
                  alt="User Icon"
                  width={32}
                  height={32}
                  className="rounded-full cursor-pointer"
                  onClick={() => setShowMenu((prevShowMenu) => !prevShowMenu)}
                />
                {showMenu && (
                  <div className="absolute right-0 mt-10 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 border border-gray-200">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleSignOut}>Log out</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;