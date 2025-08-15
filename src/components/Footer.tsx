'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Elsevier logo and cookie statement */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Image
                alt="Logo"
                src={"/nonsolus-elsevier.svg"}
                className="h-8 w-auto"
                width={58}
                height={64}
              />
            </div>
            <span className="text-sm text-gray-600">
              Cookie Statement
            </span>
          </div>

          {/* Right side - RELX logo */}
          <div className="flex items-center">
            <Image
              src="/relx.svg"
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
