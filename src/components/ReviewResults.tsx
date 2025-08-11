'use client';

import { useState } from 'react';
import { DocumentTextIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, LinkIcon, StarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import DetailedReport from './DetailedReport';

interface ReviewResultsProps {
  onStartNew: () => void;
}

export default function ReviewResults({ onStartNew }: ReviewResultsProps) {
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const overallScore = 8.2;
  const maxScore = 10;

  const reviewSections = [
    {
      title: "Soundness & Methodology",
      score: 8.5,
      status: "good",
      comments: "Strong experimental design with appropriate controls. Consider adding power analysis for sample size justification.",
      icon: ChartBarIcon
    },
    {
      title: "Language & Style",
      score: 7.8,
      status: "good",
      comments: "Generally well written. Some minor grammatical errors and inconsistent terminology usage detected.",
      icon: DocumentTextIcon
    },
    {
      title: "Coherence & Flow",
      score: 8.0,
      status: "good",
      comments: "Logical structure with smooth transitions. Introduction could better connect to methodology section.",
      icon: CheckCircleIcon
    },
    {
      title: "Completeness",
      score: 8.7,
      status: "excellent",
      comments: "Comprehensive coverage of the research topic. All required sections present with appropriate detail.",
      icon: StarIcon
    },
    {
      title: "Reference Integrity",
      score: 7.9,
      status: "good",
      comments: "Most references are appropriate and recent. 3 citations need formatting corrections.",
      icon: LinkIcon
    }
  ];

  const suggestions = [
    "Consider expanding the discussion of limitations",
    "Add statistical power analysis for sample size",
    "Improve figure quality and resolution",
    "Include ethical approval statement",
    "Consider adding supplementary data section"
  ];

  const additionalReferences = [
    {
      title: "Advanced Methods in Research Design",
      authors: "Smith, J. et al.",
      journal: "Nature Methods",
      year: "2024",
      relevance: "High"
    },
    {
      title: "Statistical Approaches for Sample Size Determination",
      authors: "Johnson, M. & Brown, K.",
      journal: "Journal of Statistics",
      year: "2024",
      relevance: "High"
    },
    {
      title: "Best Practices in Academic Writing",
      authors: "Davis, L.",
      journal: "Academic Writing Quarterly",
      year: "2023",
      relevance: "Medium"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "text-green-600";
    if (score >= 7.0) return "text-blue-600";
    if (score >= 6.0) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      excellent: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      good: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      fair: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      poor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    };
    return badges[status as keyof typeof badges] || badges.fair;
  };

  // Show detailed report if requested
  if (showDetailedReport) {
    return <DetailedReport onBack={() => setShowDetailedReport(false)} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <CheckCircleIcon className="w-8 h-8 text-green-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Review Complete
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your manuscript has been thoroughly analyzed. Here&apos;s your comprehensive review report.
        </p>
      </div>

      {/* Overall Score */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overall Quality Score</h2>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(overallScore / maxScore) * 314} 314`}
                  className="text-blue-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Your manuscript shows <strong className="text-blue-600">strong potential</strong> with some areas for improvement
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Detailed Review Sections */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Detailed Analysis</h3>
            <div className="space-y-6">
              {reviewSections.map((section, index) => {
                const SectionIcon = section.icon;
                return (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <SectionIcon className="w-5 h-5 text-blue-500" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">{section.title}</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-lg font-bold ${getScoreColor(section.score)}`}>
                          {section.score}/10
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(section.status)}`}>
                          {section.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {section.comments}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <InformationCircleIcon className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Improvement Suggestions</h3>
              </div>
              <ul className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional References */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <LinkIcon className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Suggested References</h3>
              </div>
              <div className="space-y-4">
                {additionalReferences.map((ref, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">{ref.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {ref.authors} • {ref.journal} ({ref.year})
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ref.relevance === 'High' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {ref.relevance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={onStartNew}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300"
        >
          Review Another Paper
        </button>
        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
          Download Report
        </button>
        <button 
          onClick={() => setShowDetailedReport(true)}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          View Detailed Report
        </button>
        <button className="px-6 py-3 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300 font-medium rounded-xl transition-all duration-300">
          Share Results
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This review was generated using Elsevier&apos;s AI analysis system. 
          For detailed questions about the review, please contact our support team.
        </p>
      </div>
    </div>
  );
}
