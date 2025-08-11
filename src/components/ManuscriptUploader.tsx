'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { DocumentArrowUpIcon, DocumentTextIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ReviewProgress from './ReviewProgress';
import { extractTextFromFile, ExtractedText } from '../utils/fileExtractor';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  file: File; // Store the actual File object
}

export default function ManuscriptUploader() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [showReviewProgress, setShowReviewProgress] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      file: file // Store the actual File object
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUploading(false);
      setUploadComplete(true);
      
      // Show review progress after a short delay
      setTimeout(() => {
        setShowReviewProgress(true);
      }, 1500);
    } catch (error) {
      console.error('Error processing file:', error);
      setUploading(false);
      // Show error message or fallback
      alert('Error processing file. Please try again.');
    }
  };

  const handleBackToUpload = () => {
    setShowReviewProgress(false);
    setUploadComplete(false);
    setFiles([]);
  };

  // Show review progress if upload is complete and user wants to see progress
  if (showReviewProgress) {
    return <ReviewProgress onBack={handleBackToUpload}  />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Review Manuscript
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Upload your manuscript for a quick review using Elsevier AI
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed transition-all duration-300 ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          } ${files.length > 0 ? 'rounded-t-2xl' : 'rounded-2xl'} p-8 m-6 ${files.length > 0 ? 'mb-0' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx,.txt,.rtf"
            onChange={handleChange}
          />

          <div className="text-center">
            <div className="mb-4">
              <DocumentArrowUpIcon className={`mx-auto h-16 w-16 transition-colors duration-300 ${
                dragActive ? 'text-blue-500' : 'text-gray-400'
              }`} />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Upload your manuscript
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Drag and drop your files here, or click to browse
            </p>
            
            <button
              onClick={onButtonClick}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
              Choose Files
            </button>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Supported formats: PDF, DOC, DOCX, TXT, RTF (Max 10MB each)
            </p>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Selected Files ({files.length})
            </h4>
            
            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center space-x-3">
                    <DocumentTextIcon className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFile(index)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={uploading || uploadComplete}
                className={`relative inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  uploadComplete
                    ? 'bg-blue-600 text-white focus:ring-blue-500'
                    : uploading
                    ? 'bg-blue-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white hover:shadow-lg focus:ring-blue-500'
                }`}
              >
                {uploadComplete ? (
                  <>
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Starting Review...
                  </>
                ) : uploading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                    Submit for Review
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <DocumentTextIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Privacy Statement</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Your research paper is protected by Elsevier privacy policy. The content will only be used for the purpose of review and will not be shared with third parties. The content will not be used to train AI models, nor shared to any open AI models.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
