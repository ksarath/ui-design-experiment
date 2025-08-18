'use client';

import Image from 'next/image';

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
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Two-column layout for manuscript and suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Manuscript Preview (Left, spans 2 columns) */}
          <section className="p-6 flex flex-col md:col-span-2">
            <h1 className="text-3xl font-bold text-black mb-4 flex items-center justify-between">
              Your Manuscript
              <button
                type="button"
                className="ml-4 inline-flex items-center px-3 py-1.5 text-white bg-[#006AA3] text-xs font-normal"
                aria-label="Edit Manuscript"
              >
                Edit
              </button>
            </h1>
            <div className="bg-white shadow-sm border border-[#0D9634] p-4">
              <div className="text-sm text-gray-600">
                <div className="flex items-center space-x-3">
                <Image
                  src="/doc-file.svg"
                  alt="document icon"
                  width={60}
                  height={20}
                  className="h-5 w-auto"
                />
                <p className="font-medium text-gray-900 mb-1">{fileName}</p>
                </div>
                <p className="pl-8">Uploaded: {formatUploadTime(uploadTime)}</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-4">Manuscript Preview</h2>
            <div className="flex-1 overflow-auto">
              {/* Placeholder for manuscript content */}
              <div className="text-gray-700 text-sm leading-relaxed">
                {/* Replace with actual manuscript content */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam eros, a facilisis enim leo nec urna.
                </p>
                <p>
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </p>
                {/* ...more content... */}
              </div>
            </div>
          </section>
          {/* Suggestions (Right, spans 1 column) */}
          <aside className="p-6 flex flex-col md:col-span-1">
            <h2 className="text-xl font-bold text-black mb-4">Suggestions</h2>
            {/* Filtering pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { label: 'All', selected: true },
                { label: 'Clarity', selected: false },
                { label: 'References', selected: false },
                { label: 'Formatting', selected: false }
              ].map(({ label, selected }) => (
              <button
                  key={label}
                  className={`px-3 py-1 rounded-full border border-[#A8A8A8] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                    selected ? 'bg-[#006AA3] text-white' : 'bg-white text-black'
                  }`}
                  aria-pressed={selected}
              >
                  {label}
              </button>
              ))}
            </div>
            <ul className="space-y-4 text-left">
              {/* Placeholder for suggestions */}
              <li className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                <span className="font-medium">Improve abstract clarity:</span> Consider simplifying the language for broader accessibility.
              </li>
              <li className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                <span className="font-medium">Check references:</span> Some citations are missing page numbers.
              </li>
              <li className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                <span className="font-medium">Formatting:</span> Ensure all section headings follow the journal guidelines.
              </li>
              {/* ...more suggestions... */}
            </ul>
          </aside>
        </div>
      </main>
    </div>
  );
}
