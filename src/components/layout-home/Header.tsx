"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Arrow } from "../../app/components/Arrow";


export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">
              DevToolBox
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-800 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
              Services
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
