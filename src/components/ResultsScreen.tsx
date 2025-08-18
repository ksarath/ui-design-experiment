'use client';

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { fileName as manuscriptName, extractedText, reviewComments } from '../utils/manuscriptData';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';

interface ResultsScreenProps {
  fileName: string;
  uploadTime: Date;
  onBackToUpload: () => void;
}

export default function ResultsScreen({ fileName, uploadTime, onBackToUpload }: ResultsScreenProps) {
  const formatUploadTime = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const thumbsDownReasons = [
    'Incorrect Suggestion',
    'Offensive Comment',
    'Not Relevant',
    'Other'
  ];

  const filters = ['All', 'Clarity', 'References', 'Language', 'Tense Consistency', 'Structure', 'Style', 'Readability', 'Flow', 'Punctuation'];

  // Count suggestions per filter
  const filterCounts: Record<string, number> = {
    All: reviewComments.length,
    ...filters.reduce((acc, filter) => {
      if (filter !== 'All') {
        acc[filter] = reviewComments.filter(c => c.category === filter).length;
      }
      return acc;
    }, {} as Record<string, number>)
  };

  // Map blockId to refs
  const blockRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Scroll to block by blockId
  const scrollToBlock = (blockId?: string) => {
    if (blockId && blockRefs.current[blockId]) {
      blockRefs.current[blockId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center', // Ensure the block appears in the center of the scrollbox
        inline: 'nearest',
      });
    }
  };

  // Generate a unique color palette for suggestions
  const suggestionColors = [
    'bg-yellow-100 text-yellow-900 border-yellow-400',
    'bg-gray-100 text-gray-900 border-gray-400',
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
                  <p className="font-medium text-gray-900 mb-1">{manuscriptName}</p>
                  </div>
                  <p className="pl-8">Uploaded: {formatUploadTime(uploadTime)}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {/* Manuscript content from extractedText */}
                <div className="text-gray-700 text-sm leading-relaxed">
                  {extractedText.map((block, idx) => {
                    // Find if this block is referenced by a suggestion
                    const matchingCommentIndex = reviewComments
                      .filter(comment =>
                        selectedFilter === 'All' ? true : comment.category === selectedFilter
                      )
                      .findIndex(c => c.blockId && block.blockId && c.blockId === block.blockId);

                    const highlightColor =
                      matchingCommentIndex !== -1
                        ? getSuggestionColor(matchingCommentIndex)
                        : 'text-gray-700';
                    const Tag = block.type as keyof JSX.IntrinsicElements;
                    return (
                      <Tag
                        key={idx}
                        ref={el => {
                          if (block.blockId) blockRefs.current[block.blockId] = el as HTMLDivElement;
                        }}
                        className={
                          block.type === 'h1' ? 'text-xl font-semibold text-gray-900 mb-4 mt-4'
                          : block.type === 'h2' ? 'text-l font-semibold text-gray-900 mb-4 mt-4'
                          : block.type === 'h3' ? 'text-xl font-semibold text-gray-900 mb-4 mt-4'
                          : `mb-2 rounded px-1 ${highlightColor}`
                        }
                      >
                        {block.content}
                      </Tag>
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
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <ul className="space-y-4 text-left">
                  {reviewComments
                    .filter(comment =>
                      selectedFilter === 'All' ? true : comment.category === selectedFilter
                    )
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
                              {comment.category}
                            </span>
                            {/* Type box with custom info icon */}
                            <span
                              className={`px-2 py-1 text-xs flex items-center gap-1
                                ${
                                  comment.type === 'major'
                                    ? 'bg-[#FFCCCE] border border-[#5C0004] text-[#5C0004]'
                                    : comment.type === 'minor'
                                    ? 'bg-[#D6F1FF] border border-[#004F7A] text-[#004F7A]'
                                    : comment.type === 'enhancement'
                                    ? 'bg-green-200 border border-green-900 text-green-900'
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
                              {comment.type.charAt(0).toUpperCase() + comment.type.slice(1)}
                            </span>
                          </div>
                          <div className="text-xs text-gray-700 mb-8">
                            {comment.originalText}
                          </div>
                          {/* Accept/Dismiss buttons bottom left */}
                          <div className="absolute left-3 bottom-3 flex gap-2 accept-dismiss-btn">
                            <button
                              className="px-3 py-1 border border-[#006AA3] bg-[#006AA3] text-white text-xs hover:bg-[#00507A] transition"
                              type="button"
                              tabIndex={0}
                              onClick={e => e.stopPropagation()}
                            >
                              Accept
                            </button>
                            <button
                              className="px-3 py-1 bg-white text-[#006AA3] text-xs hover:bg-blue-50 transition"
                              type="button"
                              tabIndex={0}
                              onClick={e => e.stopPropagation()}
                            >
                              Dismiss
                            </button>
                          </div>
                          {/* Thumbs up/down icons bottom right */}
                          <div className="absolute right-3 bottom-3 flex gap-2">
                            <button
                              className="p-1 rounded hover:bg-gray-100 transition"
                              aria-label="Thumbs Up"
                              type="button"
                              tabIndex={0}
                              onClick={e => e.stopPropagation()}
                            >
                              <HandThumbUpIcon className="w-4 h-4 text-[#006AA3]" />
                            </button>
                            <div className="relative thumbs-dropdown">
                              <button
                                className="p-1 rounded hover:bg-gray-100 transition"
                                aria-label="Thumbs Down"
                                type="button"
                                tabIndex={0}
                                onClick={e => {
                                  e.stopPropagation();
                                  setActiveDropdown(activeDropdown === comment.id ? null : comment.id);
                                }}
                              >
                                <HandThumbDownIcon className="w-4 h-4 text-[#006AA3]" />
                              </button>
                              {activeDropdown === comment.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                                  <ul className="py-2">
                                    {thumbsDownReasons.map(reason => (
                                      <li
                                        key={reason}
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                                        onClick={e => {
                                          e.stopPropagation();
                                          setActiveDropdown(null);
                                        }}
                                      >
                                        {/* Outline flag icon */}
                                        <svg
                                          className="w-4 h-4 text-gray-400"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          viewBox="0 0 20 20"
                                          aria-hidden="true"
                                        >
                                          <path d="M5 3v14M5 3h10l-2 4 2 4H5" />
                                        </svg>
                                        {reason}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
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
