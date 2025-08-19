'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  CogIcon,
  DocumentTextIcon,
  ChartBarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

interface ReviewStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  icon: React.ComponentType<{ className?: string }>;
  substeps?: ReviewStep[];
}

interface ElsevierReviewProgressProps {
  fileName: string;
  onComplete?: () => void;
}

export default function ElsevierReviewProgress({ fileName, onComplete }: ElsevierReviewProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQualitySubStep, setCurrentQualitySubStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const reviewSteps: ReviewStep[] = [
    {
      id: 'analyse',
      title: 'Analysing your manuscript',
      description: 'Analyzing document structure and content',
      status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'current' : 'pending',
      icon: DocumentTextIcon
    },
    {
      id: 'quality_check',
      title: 'Checking quality of your manuscript',
      description: 'Checking quality of your manuscript',
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending',
      icon: CogIcon,
      substeps:[
        {
            id: 'soundness_check',
            title: 'Checking soundness of your manuscript',
            description: 'Checking quality of your manuscript',
            status: currentQualitySubStep > 0 ? 'completed' : currentQualitySubStep === 0 ? 'current' : 'pending',
            icon: CogIcon
        },
        {
            id: 'flow_check',
            title: 'Checking flow and coherence',
            description: 'Evaluating the logical flow and coherence of your manuscript',
            status: currentQualitySubStep > 1 ? 'completed' : currentQualitySubStep === 1 ? 'current' : 'pending',
            icon: AcademicCapIcon
        },
        {
            id: 'completeness_check',
            title: 'Checking completeness',
            description: 'Ensuring all required sections are present',
            status: currentQualitySubStep > 2 ? 'completed' : currentQualitySubStep === 2 ? 'current' : 'pending',
            icon: ChartBarIcon
        },
        {
            id: 'reference_integrity_check',
            title: 'Checking reference integrity',
            description: 'Ensuring all citations are accurate and complete',
            status: currentQualitySubStep > 3 ? 'completed' : currentQualitySubStep === 3 ? 'current' : 'pending',
            icon: ChartBarIcon
        }
      ]
    },
    {
        id: 'generate_suggestions',
        title: 'Generating suggestions',
        description: 'Compiling review findings into a report',
        status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending',
        icon: ChartBarIcon
    },
    {
        id: 'generate_review_report',
        title: 'Generating review report',
        description: 'Compiling all review comments into a final report',
        status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'pending',
        icon: ChartBarIcon
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) {
            setTimeout(() => onComplete(), 4000);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress >= 10 && currentStep < 1) setCurrentStep(1);
    if (progress >= 60 && currentStep < 2) setCurrentStep(2);
    if (progress >= 90 && currentStep < 3) setCurrentStep(3);
    if (progress >= 100 && currentStep < 4) setCurrentStep(4);
  }, [progress, currentStep]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            We are processing your manuscript
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Manuscript: <span className="font-semibold text-gray-900">{fileName}</span>
          </p>
        </div>

        {/* Shared container for progress bar and next steps */}
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-2">
              <span className="text-base text-gray-700">
                {reviewSteps.find(step => step.status === 'current')?.title || 'Analysis Complete'}
              </span>
              <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="py-2">
            <span className="text-base" style={{ color: '#6B6B6B' }}>Estimated remaining time: </span>
              <span style={{ color: '#6B6B6B' }}>
                {progress >= 100 ? 'Complete' :
                 progress >= 90 ? '30 seconds' :
                 progress >= 60 ? '1 minute' :
                 progress >= 10 ? '1 minute 30 seconds' : '2 minutes'}
             </span>
            </div>
          </div>

          {/* What will happen next */}
          <div className="mt-12">
            <h3 className="text-black text-base font-semibold mb-3">What will happen next?</h3>
            <p className="text-black text-base leading-relaxed">
              Our AI is performing a comprehensive analysis of your manuscript, checking for quality, completeness, and relevance. This process ensures you receive the most accurate and helpful feedback possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
