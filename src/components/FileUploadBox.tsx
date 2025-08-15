'use client';

import { useState, useCallback } from 'react';
import { DocumentArrowUpIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface FileUploadBoxProps {
  onFileAnalyze?: (file: File) => void;
}

export default function FileUploadBox({ onFileAnalyze }: FileUploadBoxProps) {
  const [dragActive, setDragActive] = useState(false);
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileAnalyze && onFileAnalyze(file);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileAnalyze && onFileAnalyze(file);
    }
  }, []);

  return (
    <div className="w-full h-full">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
        />
        
        <div className="space-y-4">
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div>
                <p className="text-sm text-gray-600">
                    <label htmlFor="file-upload" className="font-medium text-blue-600 cursor-pointer hover:text-blue-500">
                    Click to upload
                    </label>{' '}
                    or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX, or TXT files
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
