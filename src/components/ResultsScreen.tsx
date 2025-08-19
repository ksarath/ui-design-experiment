'use client';

import Image from 'next/image';
import React, { useState, JSX } from 'react';
import { extractedText, reviewComments } from '../utils/manuscriptData';

interface ResultsScreenProps {
  fileName: string;
  uploadTime: Date;
  onBackToUpload: () => void;
}

export default function ResultsScreen({ fileName, uploadTime }: ResultsScreenProps) {
  const formatUploadTime = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const [agreed, setAgreed] = useState<Map<string, boolean>>(new Map());
  const [selectedFilter, setSelectedFilter] = useState('Unresolved');
  const [severityFilter, setSeverityFilter] = useState<string>('Major');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const thumbsDownReasons = [
    'Incorrect Suggestion',
    'Offensive Comment',
    'Not Relevant',
    'Other'
  ];

  const filters = ['All', 'Unresolved', 'Resolved', ...new Set(reviewComments.map(comment => comment.type))];

  // Count suggestions per filter
  const filterCounts: Record<string, number> = {
    All: reviewComments.length,
    ...filters.reduce((acc, filter) => {
      if (filter === 'Unresolved') {
        acc[filter] = reviewComments.filter(c => c.resolved !== true).length;
      } else if (filter === 'Resolved') {
        acc[filter] = reviewComments.filter(c => c.resolved).length;
      } else if (filter !== 'All') {
        acc[filter] = reviewComments.filter(c => c.type === filter && c.resolved !== true).length;
      }
      return acc;
    }, {} as Record<string, number>)
  };

  // Map blockId to refs
  const blockRefs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {};
  extractedText.map(e => {
    blockRefs[e.blockId] = React.createRef<HTMLDivElement>();
  });

  const markResolved = (commentId: string) => {
    const comment = reviewComments.find(c => c.id === commentId);
    if (comment) {
      comment.resolved = true;
    }
  };

  const filteredComments = reviewComments
    .filter(comment =>
      selectedFilter === 'All' ? true : 
      selectedFilter === 'Unresolved' ? comment.resolved !== true :
      selectedFilter === 'Resolved' ? comment.resolved === true :
      comment.type === selectedFilter && comment.resolved !== true
    )
    .filter(comment => comment.category === severityFilter);

  // Scroll to block by blockId
  const scrollToBlock = (blockId?: string) => {
    if (blockId && blockRefs[blockId] && blockRefs[blockId] != null) {
      blockRefs[blockId].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center', // Ensure the block appears in the center of the scrollbox
        inline: 'nearest',
      });
    }
  };

  // Generate a unique color palette for suggestions
  const suggestionColors = [
    'bg-yellow-100 text-yellow-900 border-yellow-400',
    // 'bg-gray-100 text-gray-900 border-gray-400',
    'bg-blue-100 text-blue-900 border-blue-400',
    'bg-green-100 text-green-900 border-green-400',
    'bg-purple-100 text-purple-900 border-purple-400',
    'bg-pink-100 text-pink-900 border-pink-400',
    'bg-red-100 text-red-900 border-red-400',
    'bg-teal-100 text-teal-900 border-teal-400',
    'bg-indigo-100 text-indigo-900 border-indigo-400',
    'bg-orange-100 text-orange-900 border-orange-400',
  ];

  // Map each suggestion to a unique color
  const getSuggestionColor = (index: number) => suggestionColors[index % suggestionColors.length];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Two-column layout for manuscript and suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Shared height flex container */}
          <div className="col-span-3 flex gap-8" style={{ height: '45rem' }}>
            {/* Manuscript Preview (Left, spans 2 columns) */}
            <section className="flex-1 p-6 flex flex-col md:col-span-2">
              <h1 className="text-3xl font-bold text-black mb-4 flex items-center justify-between">
                Your Manuscript
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
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {/* Manuscript content from extractedText */}
                <div className="text-gray-700 text-sm leading-relaxed">
                  {extractedText.map((block, idx) => {
                    // Find if this block is referenced by a suggestion
                    const matchingCommentIndex = filteredComments
                      .findIndex(c => c.blockId && block.blockId && c.blockId === block.blockId);

                    const highlightColor =
                      matchingCommentIndex !== -1
                        ? getSuggestionColor(matchingCommentIndex)
                        : 'text-gray-700';
                    const Tag = block.type as keyof JSX.IntrinsicElements;

                    return (
                        <div key={idx} ref={blockRefs[block.blockId]}>
                          <Tag
                          className={
                            block.type === 'h1' ? 'text-xl font-semibold text-gray-900 mb-4 mt-4'
                            : block.type === 'h2' ? 'text-l font-semibold text-gray-900 mb-4 mt-4'
                            : block.type === 'h3' ? 'text-xl font-semibold text-gray-900 mb-4 mt-4'
                            : `mb-2 rounded px-1 ${highlightColor}`
                          }
                          >
                          {block.content}
                          </Tag>
                        </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Suggestions (Right, spans 1 column) */}
            <aside className="w-[33%] p-6 flex flex-col md:col-span-1">
              <h2 className="text-xl font-bold text-black mb-4">Suggestions</h2>
              {/* Filtering pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.map((label) => (
                  <button
                    key={label}
                    onClick={() => setSelectedFilter(label)}
                    className={`px-3 py-1 rounded-full border border-[#A8A8A8] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                      selectedFilter === label
                        ? 'bg-[#006AA3] text-white'
                        : 'bg-white text-black hover:bg-blue-50'
                    }`}
                    aria-pressed={selectedFilter === label}
                  >
                    {label} <span className="ml-1">({filterCounts[label]})</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-x-2 mb-2 border-b border-dotted">
                <button
                  className={`px-3 py-1 rounded-sm text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                    severityFilter === 'Major' ? 'bg-[#006AA3] text-white' : 'bg-white text-black hover:bg-blue-50 border border-gray-100'
                  }`}
                  onClick={() => setSeverityFilter('Major')}
                >
                  Major
                </button>
                <button
                  className={`px-3 py-1 rounded-sm text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                    severityFilter === 'Minor' ? 'bg-[#006AA3] text-white' : 'bg-white text-black hover:bg-blue-50 border border-gray-100'
                  }`}
                  onClick={() => setSeverityFilter('Minor')}
                >
                  Minor
                </button>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <ul className="space-y-4 text-left">
                  {filteredComments.length === 0 && (
                    <li className="text-gray-500">No {severityFilter.toLowerCase()} comments found.</li>
                  )}
                  {filteredComments
                    .map((comment, filteredIndex) => {
                      const pillColor = getSuggestionColor(filteredIndex);
                      return (
                        <li
                          key={comment.id}
                          className="border border-blue-400 p-3 flex flex-col relative cursor-pointer"
                          onClick={e => {
                            // Only scroll if the user clicks the suggestion itself (not buttons/icons/dropdown)
                            if (
                              e.target instanceof HTMLElement &&
                              !(
                                e.target.closest('button') ||
                                e.target.closest('.thumbs-dropdown') ||
                                e.target.closest('.accept-dismiss-btn')
                              )
                            ) {
                              scrollToBlock(comment.blockId);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            {/* Category pill */}
                            <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${pillColor}`}>
                              {comment.type}
                            </span>
                            {/* Type box with custom info icon */}
                            <span
                              className={`px-2 py-1 text-xs flex items-center gap-1
                                ${
                                  comment.category === 'Major'
                                    ? 'bg-[#FFCCCE] border border-[#5C0004] text-[#5C0004]'
                                    : comment.category === 'Minor'
                                    ? 'bg-green-200 border border-green-400 text-green-800'
                                    : 'bg-gray-100 border border-gray-700 text-gray-700'
                                }
                              `}
                              style={{ minWidth: '70px', textAlign: 'center' }}
                            >
                              {/* Custom info icon */}
                              <svg
                                className={`w-4 h-4 ml-1`}
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                aria-label="Info"
                              >
                                <circle cx="10" cy="10" r="8" stroke="currentColor" fill="none" />
                                {/* Stick and dot for "i" */}
                                <circle cx="10" cy="7" r="1" fill="currentColor" />
                                <rect x="9.4" y="10" width="1" height="5" rx="0.6" fill="currentColor" />
                              </svg>
                              {comment.category.charAt(0).toUpperCase() + comment.category.slice(1)}
                            </span>
                          </div>
                          
                          <div className="text-xs text-gray-700 mb-4">
                            {comment.review}
                          </div>
                          
                          {/* Citations section */}
                          {comment.context && comment.context.filter(ref => ref.citation !== undefined).length > 0 && (
                            <div className="mb-2 bg-gray-50 border border-gray-200 rounded-md p-3">
                              <div className="space-y-2">
                                {comment.context.map((ref, index) => (
                                  <div key={index} className="text-xs">
                                    {ref.title && (
                                      <div className="font-medium text-gray-900 mb-1">
                                        {ref.link ? (
                                          <a 
                                            href={ref.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-[#006AA3] hover:text-[#00507A] hover:underline transition-colors"
                                            onClick={e => e.stopPropagation()}
                                          >
                                            {ref.title}
                                          </a>
                                        ) : (
                                          ref.title
                                        )}
                                      </div>
                                    )}
                                    {ref.citation && (
                                      <div className="text-gray-600 italic">
                                        {ref.citation}
                                      </div>
                                    )}
                                    {/* {ref.name && !ref.title && (
                                      <div className="text-gray-700">
                                        {ref.name}
                                      </div>
                                    )} */}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Accept/Dismiss buttons bottom left */}
                          {comment.resolved !== true && (
                            <div className="relative mt-2 flex gap-2 accept-dismiss-btn">
                              <button
                                className="px-3 py-1 border border-[#006AA3] bg-[#006AA3] text-white text-xs hover:bg-[#00507A] transition"
                                type="button"
                                tabIndex={0}
                                onClick={() => {markResolved(comment.id); setAgreed(m => new Map(m).set(comment.id, true));}}
                              >
                                Agree
                              </button>
                              <button
                                className="px-3 py-1 bg-white text-[#006AA3] text-xs hover:bg-blue-50 transition"
                                type="button"
                                tabIndex={0}
                                onClick={e => {
                                  e.stopPropagation(); 
                                  setActiveDropdown(activeDropdown === comment.id ? null : comment.id);
                                }}
                              >
                                Disagree
                              </button>
                              
                              <div className="absolute thumbs-dropdown">
                                {activeDropdown === comment.id && (
                                  <div className="absolute mt-10 w-64 bg-white border border-gray-200 rounded shadow-lg z-10">
                                    {/* Header */}
                                    <div className="px-4 py-3 border-b border-gray-200">
                                      <h3 className="text-sm font-medium text-gray-900">What is the issue with this feedback?</h3>
                                    </div>
                                    
                                    <ul className="py-2">
                                      {thumbsDownReasons.map(reason => (
                                        <li
                                          key={reason}
                                          className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                                          onClick={e => {
                                            e.stopPropagation();
                                            const radioInput = e.currentTarget.querySelector('input[type="radio"]') as HTMLInputElement;
                                            if (radioInput) {
                                              radioInput.checked = true;
                                            }
                                          }}
                                        >
                                          <input 
                                            type="radio" 
                                            name={`thumbs-down-reason-${comment.id}`}
                                            className="h-4 w-4 text-[#006AA3] border-gray-300 focus:ring-[#006AA3] focus:ring-2" 
                                            onChange={e => e.stopPropagation()}
                                          />
                                          <span className="flex-1">{reason}</span>
                                        </li>
                                      ))}
                                    </ul>
                                    
                                    {/* Textarea section */}
                                    <div className="px-4 py-3 border-t border-gray-200">
                                      <label htmlFor={`feedback-textarea-${comment.id}`} className="block text-sm font-medium text-gray-900 mb-2">
                                        How could this feedback be improved? (Optional)
                                      </label>
                                      <textarea
                                        id={`feedback-textarea-${comment.id}`}
                                        rows={3}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                        placeholder="Share your thoughts on how we can improve this suggestion..."
                                        onClick={e => e.stopPropagation()}
                                        onChange={e => e.stopPropagation()}
                                      />
                                      <div className="flex justify-end gap-2 mt-2">
                                        <button
                                          type="button"
                                          className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition"
                                          onClick={() => setActiveDropdown(null)}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="button"
                                          className="px-3 py-1 bg-[#006AA3] text-white text-xs rounded hover:bg-[#00507A] transition"
                                          onClick={() => {
                                            setActiveDropdown(null);
                                            markResolved(comment.id);
                                          }}
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
