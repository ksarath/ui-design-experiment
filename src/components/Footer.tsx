'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Elsevier logo and cookie statement */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Image
                src="/next.svg"
                alt="Elsevier"
                width={80}
                height={24}
                className="h-6 w-auto"
              />
            </div>
            <span className="text-sm text-gray-600">
              Cookie Statement
            </span>
          </div>

          {/* Right side - RELX logo */}
          <div className="flex items-center">
            <Image
              src="/vercel.svg"
              alt="RELX"
              width={60}
              height={20}
              className="h-5 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
