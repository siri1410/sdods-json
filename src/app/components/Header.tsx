"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Arrow } from "./Arrow";
import { Firebase } from "./Firebase";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Firebase />
        <nav className="flex items-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/author" className="text-gray-600 hover:text-gray-900">Author</Link>
          {/* Add more navigation links as needed */}
        </nav>
        {pathname !== "/" && (
          <Link href="/" className="flex items-center text-blue-500 hover:text-blue-600">
            <Arrow className="mr-2" /> Back to home
          </Link>
        )}
      </div>
    </header>
  );
}
