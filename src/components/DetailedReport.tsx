'use client';

import { useState } from 'react';
import { ArrowLeftIcon, DocumentTextIcon, ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ExtractedText } from '../utils/fileExtractor';

interface DetailedReportProps {
  onBack: () => void;
  extractedText: ExtractedText | null;
}

interface ReviewComment {
  id: string;
  line: number;
  type: 'critical' | 'major' | 'minor' | 'enhancement';
  category: string;
  message: string;
  originalText: string;
  suggestedText?: string;
  context: {
    before: string[];
    after: string[];
  };
}

export default function DetailedReport({ onBack, extractedText }: DetailedReportProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const reviewComments: ReviewComment[] = [
    {
      id: '1',
      line: 16,
      type: 'major',
      category: 'Methodology',
      message: 'Sample size inconsistency. Introduction mentions 150 participants, but methodology mentions 50.',
      originalText: 'A total of 50 participants were recruited for this study.',
      suggestedText: 'A total of 150 participants were recruited for this study.',
      context: {
        before: ['Participants were recruited from local universities using convenience sampling methods.'],
        after: ['All participants provided informed consent before participating in the study.']
      }
    },
    {
      id: '2',
      line: 21,
      type: 'critical',
      category: 'Language',
      message: 'Subject-verb disagreement. The plural subject requires a plural verb.',
      originalText: 'where the treatment group The results shows significant improvement compared to the',
      suggestedText: 'where the treatment group The results show significant improvement compared to the',
      context: {
        before: ['In our comprehensive analysis of the experimental data, we observed multiple instances'],
        after: ['control group. This improvement was consistent across all measured parameters.']
      }
    },
    {
      id: '3',
      line: 25,
      type: 'minor',
      category: 'Structure',
      message: 'Consider adding a transition sentence to improve flow between paragraphs.',
      originalText: 'Table 2 shows the demographic characteristics.',
      suggestedText: 'To better understand the study population, Table 2 shows the demographic characteristics.',
      context: {
        before: ['These findings align with previous research in the field. The implications of these', 'results are discussed below.'],
        after: ['Age ranged from 18 to 65 years (M = 34.2, SD = 12.1). Gender distribution was']
      }
    },
    {
      id: '4',
      line: 30,
      type: 'critical',
      category: 'References',
      message: 'Citation format is incorrect. Use APA 7th edition format.',
      originalText: 'Smith et al (2023) found similar results.',
      suggestedText: 'Smith et al. (2023) found similar results.',
      context: {
        before: ['Previous studies have shown varying results. However, recent meta-analyses suggest'],
        after: ['This consistency across studies strengthens', 'the evidence for this phenomenon.']
      }
    },
    {
      id: '5',
      line: 34,
      type: 'major',
      category: 'Completeness',
      message: 'Consider discussing study limitations in more detail.',
      originalText: 'This study has some limitations.',
      suggestedText: 'This study has several limitations that should be acknowledged. First, the sample size was relatively small, which may limit generalizability. Second, the cross-sectional design prevents causal inferences.',
      context: {
        before: ['The findings of this study contribute to the literature by providing new insights', 'into the phenomenon.'],
        after: ['Despite these limitations,', 'the results provide valuable insights for future research.']
      }
    },
    {
      id: '6',
      line: 38,
      type: 'enhancement',
      category: 'Style',
      message: 'Consider using active voice for stronger impact.',
      originalText: 'Significant differences were found between groups.',
      suggestedText: 'We found significant differences between groups.',
      context: {
        before: ['Statistical analyses were performed using SPSS 28. Alpha level was set at 0.05 for', 'all tests.'],
        after: ['Post-hoc analyses', 'revealed specific group differences. Effect sizes were calculated using Cohen\'s d.']
      }
    }
  ];

  const categories = ['all', 'Language', 'Methodology', 'Structure', 'References', 'Completeness', 'Style'];
  
  const filteredComments = selectedCategory === 'all' 
    ? reviewComments 
    : reviewComments.filter(comment => comment.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <XMarkIcon className="w-4 h-4 text-red-500" />;
      case 'major':
        return <ExclamationTriangleIcon className="w-4 h-4 text-orange-500" />;
      case 'minor':
        return <InformationCircleIcon className="w-4 h-4 text-blue-500" />;
      case 'enhancement':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      default:
        return <InformationCircleIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      major: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      minor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      enhancement: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    };
    return badges[type as keyof typeof badges] || badges.minor;
  };

  const getCategoryStats = () => {
    const stats = categories.slice(1).map(category => ({
      name: category,
      count: reviewComments.filter(comment => comment.category === category).length
    }));
    return stats;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Detailed Review Report
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Line-by-line analysis with suggestions and corrections
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredComments.length} comments found
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        {getCategoryStats().map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stat.count}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {stat.name}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {category === 'all' ? 'All Comments' : category}
            {category !== 'all' && (
              <span className="ml-2 text-xs opacity-75">
                ({reviewComments.filter(c => c.category === category).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Comments List */}
      <div className="grid grid-cols-3 gap-8">
        {/* Manuscript Text - Left Side (2/3 width) */}
        <div className="col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {extractedText?.metadata?.fileName || 'Manuscript Text'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {extractedText?.metadata 
                  ? `${extractedText.metadata.fileType} • Original document with highlighted issues`
                  : 'Original document with highlighted issues'
                }
              </p>
            </div>
            <div className="p-6 max-h-screen overflow-y-auto">
              <div className="font-mono text-sm space-y-1">
                {/* Manuscript text with line numbers */}
                {(extractedText?.lines || [
                  "Title: Impact of Digital Learning Platforms on Student Engagement",
                  "",
                  "Abstract",
                  "This study examines the effectiveness of digital learning platforms in enhancing student",
                  "engagement in higher education. Through a comprehensive analysis of student performance",
                  "data, we aimed to understand the correlation between digital tool usage and academic",
                  "outcomes. The study involved 150 undergraduate students across three universities.",
                  "",
                  "Introduction",
                  "Digital learning has transformed the educational landscape significantly over the past",
                  "decade. Educational institutions are increasingly adopting technology-enhanced learning",
                  "environments to improve student outcomes and engagement levels.",
                  "",
                  "Methodology",
                  "Participants were recruited from local universities using convenience sampling methods.",
                  "A total of 50 participants were recruited for this study.",
                  "All participants provided informed consent before participating in the study.",
                  "",
                  "Results",
                  "In our comprehensive analysis of the experimental data, we observed multiple instances",
                  "where the treatment group The results shows significant improvement compared to the",
                  "control group. This improvement was consistent across all measured parameters.",
                  "",
                  "Discussion",
                  "These findings align with previous research in the field. The implications of these",
                  "results are discussed below. Table 2 shows the demographic characteristics.",
                  "Age ranged from 18 to 65 years (M = 34.2, SD = 12.1). Gender distribution was",
                  "balanced across groups.",
                  "",
                  "Previous studies have shown varying results. However, recent meta-analyses suggest",
                  "Smith et al (2023) found similar results. This consistency across studies strengthens",
                  "the evidence for this phenomenon.",
                  "",
                  "Limitations",
                  "The findings of this study contribute to the literature by providing new insights",
                  "into the phenomenon. This study has some limitations. Despite these limitations,",
                  "the results provide valuable insights for future research.",
                  "",
                  "Statistical Analysis",
                  "Statistical analyses were performed using SPSS 28. Alpha level was set at 0.05 for",
                  "all tests. Significant differences were found between groups. Post-hoc analyses",
                  "revealed specific group differences. Effect sizes were calculated using Cohen's d."
                ]).map((line, index) => {
                  const lineNumber = index + 1;
                  const hasComment = filteredComments.some(comment => comment.line === lineNumber);
                  const comment = filteredComments.find(comment => comment.line === lineNumber);
                  
                  return (
                    <div key={index} className={`flex ${hasComment ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                      <div className="w-12 text-center text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 py-1 text-xs">
                        {lineNumber}
                      </div>
                      <div className="flex-1 px-4 py-1 text-gray-700 dark:text-gray-300">
                        {line || '\u00A0'}
                        {hasComment && comment && (
                          <span className="ml-2 inline-flex items-center">
                            {getTypeIcon(comment.type)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Comments List - Right Side (1/3 width) */}
        <div className="col-span-1">
          <div className="space-y-4 max-h-screen overflow-y-auto">
            {filteredComments.map((comment) => (
              <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Comment Header */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center space-x-2 mb-2">
                    {getTypeIcon(comment.type)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadge(comment.type)}`}>
                      {comment.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Line {comment.line}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                    {comment.category}
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    {comment.message}
                  </p>
                </div>

                {/* Comment Content */}
                <div className="p-3">
                  {/* Original Text */}
                  <div className="mb-2">
                    <div className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Original:</div>
                    <div className="text-xs bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-2 rounded">
                      {comment.originalText}
                    </div>
                  </div>
                  
                  {/* Suggested Text */}
                  {comment.suggestedText && (
                    <div>
                      <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Suggested:</div>
                      <div className="text-xs bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-2 rounded">
                        {comment.suggestedText}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300"
        >
          ← Back to Upload
        </button>
        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
          Export as PDF
        </button>
        <button className="px-6 py-3 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300 font-medium rounded-xl transition-all duration-300">
          Copy Comments
        </button>
      </div>
    </div>
  );
}
