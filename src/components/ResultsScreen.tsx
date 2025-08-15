'use client';

interface ResultsScreenProps {
  fileName: string;
  uploadTime: Date;
  onBackToUpload: () => void;
}

export default function ResultsScreen({ fileName, uploadTime, onBackToUpload }: ResultsScreenProps) {
  const formatUploadTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="mb-6">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Analysis Complete!</h1>
          <p className="text-lg text-gray-600 mb-2">Your manuscript analysis is ready.</p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-w-md mx-auto mb-8">
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-1">{fileName}</p>
              <p>Uploaded: {formatUploadTime(uploadTime)}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={onBackToUpload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Analyze Another Document
            </button>
            
            <div className="flex justify-center space-x-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                Download Report
              </button>
              <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                View Detailed Results
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
