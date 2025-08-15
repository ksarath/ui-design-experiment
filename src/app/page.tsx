'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadBox from "@/components/FileUploadBox";
import ElsevierReviewProgress from "@/components/ElsevierReviewProgress";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'upload' | 'progress' | 'results'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileAnalyze = (file: File) => {
    setUploadedFile(file);
    setCurrentScreen('progress');
  };

  const handleAnalysisComplete = () => {
    setCurrentScreen('results');
  };

  const handleBackToUpload = () => {
    setCurrentScreen('upload');
    setUploadedFile(null);
  };

  if (currentScreen === 'progress' && uploadedFile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <ElsevierReviewProgress 
          fileName={uploadedFile.name}
          onComplete={handleAnalysisComplete}
        />
        <Footer />
      </div>
    );
  }

  if (currentScreen === 'results') {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Analysis Complete!</h1>
            <p className="text-lg text-gray-600 mb-8">Your manuscript analysis is ready.</p>
            <button
              onClick={handleBackToUpload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
            >
              Analyze Another Document
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          
          {/* Left side - Large text content (2/3) */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-3xl font-bold text-gray-900 leading-tight">
                Improve your manuscript quality using Elsevier AI
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                It reviews your manuscript paragraph by paragraph and provides research-backed suggestions to improve its scientific quality.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006AA3' }}>
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Additional actionable feedback before submission - final decision subject to editor decision.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006AA3' }}>
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Kept your manuscript confidential and private.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006AA3' }}>
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Based on credible research to support your work.</span>
                </div>
              </div>
            </div>
            
            {/* Privacy Statement Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">Privacy Protection</h4>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Your research paper is protected by Elsevier privacy policy. The content will only be used for the purpose of review and will not be shared with third parties. The content will not be used to train AI models, nor shared to any open AI models.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - File upload box (1/3) */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 h-80">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Upload Your Manuscript
              </h3>
              <div className="h-full">
                <FileUploadBox onFileAnalyze={handleFileAnalyze} />
              </div>
            </div>
          </div>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
