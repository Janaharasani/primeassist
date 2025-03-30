"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);



  return (
    <>
      {/* Desktop Navbar */}
      <nav className="flex h-16 rounded-4xl w-full items-center justify-center bg-white shadow-sm">
        <div className="flex w-[90%] max-w-6xl items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/logo.png" width={30} height={30} alt="Logo" />
            <span className="ml-2 text-xl font-bold text-blue-600">Primeassistsa</span>
          </div>

          {/* Center-aligned Navigation Links */}
          <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
            <Link href="/" className="px-3 py-2 text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/booking" className="px-3 py-2 text-gray-700 hover:text-blue-600">
              Booking
            </Link>
            <Link href="/admin" className="px-3 py-2 text-gray-700 hover:text-blue-600">
              Admin
            </Link>
            <Link href="/chatbot" className="px-3 py-2 text-gray-700 hover:text-blue-600">
              Chatbot
            </Link>
            <Link href="/about" className="px-3 py-2 text-gray-700 hover:text-blue-600">
              About
            </Link>
          </div>


            <Image src="/avater.png" width={40} height={40} alt="Logo" className="rounded-full" />

            {/* Mobile Menu Button */}
            <button
              className="text-gray-700 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-16 md:hidden">
          <div className="flex flex-col items-center space-y-4 p-4">
            <Link href="/" className="w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100">
              Home
            </Link>
            <Link href="/booking" className="w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100">
              Booking
            </Link>
            <Link href="/admin" className="w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100">
              Admin
            </Link>
            <Link href="/chatbot" className="w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100">
              Chatbot
            </Link>
            <Link href="/about" className="w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100">
              About
            </Link>

           
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;