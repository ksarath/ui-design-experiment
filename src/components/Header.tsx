'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and main text */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image
                alt="Logo"
                src={"/nonsolus-elsevier.svg"}
                className="h-8 w-auto"
                width={58}
                height={64}
              />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Get Your Manuscript Ready
            </h1>
          </div>

          {/* Right side - Find Journals link and Login button */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/find-journals" 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Find Journals
            </Link>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
