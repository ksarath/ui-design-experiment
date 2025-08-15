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
}

interface ElsevierReviewProgressProps {
  fileName: string;
  onComplete?: () => void;
}

export default function ElsevierReviewProgress({ fileName, onComplete }: ElsevierReviewProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const reviewSteps: ReviewStep[] = [
    {
      id: 'upload',
      title: 'Document Processing',
      description: 'Analyzing document structure and content',
      status: 'completed',
      icon: DocumentTextIcon
    },
    {
      id: 'format',
      title: 'Format Analysis',
      description: 'Checking formatting standards and guidelines',
      status: currentStep >= 1 ? 'completed' : currentStep === 0 ? 'current' : 'pending',
      icon: CogIcon
    },
    {
      id: 'content',
      title: 'Content Review',
      description: 'Evaluating academic content quality and structure',
      status: currentStep >= 2 ? 'completed' : currentStep === 1 ? 'current' : 'pending',
      icon: AcademicCapIcon
    },
    {
      id: 'compatibility',
      title: 'Journal Compatibility',
      description: 'Matching with suitable journal requirements',
      status: currentStep >= 3 ? 'completed' : currentStep === 2 ? 'current' : 'pending',
      icon: ChartBarIcon
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) {
            setTimeout(() => onComplete(), 1000);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress >= 25 && currentStep < 1) setCurrentStep(1);
    if (progress >= 50 && currentStep < 2) setCurrentStep(2);
    if (progress >= 75 && currentStep < 3) setCurrentStep(3);
  }, [progress, currentStep]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 rounded-full p-4">
              <DocumentTextIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Elsevier AI Review in Progress
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Analyzing your manuscript: <span className="font-semibold text-gray-900">{fileName}</span>
          </p>
          <p className="text-sm text-gray-500">
            Our AI is performing a comprehensive review of your manuscript
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Review Steps */}
        <div className="space-y-6">
          {reviewSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  
                  {/* Step Icon */}
                  <div className={`
                    flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                    ${step.status === 'completed' 
                      ? 'bg-green-100 text-green-600' 
                      : step.status === 'current' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-400'
                    }
                  `}>
                    {step.status === 'completed' ? (
                      <CheckCircleIcon className="h-6 w-6" />
                    ) : step.status === 'current' ? (
                      <div className="relative">
                        <Icon className="h-6 w-6" />
                        <div className="absolute inset-0 animate-pulse">
                          <div className="w-10 h-10 rounded-full border-2 border-blue-300 border-t-blue-600 animate-spin"></div>
                        </div>
                      </div>
                    ) : (
                      <ClockIcon className="h-6 w-6" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`
                        text-lg font-semibold
                        ${step.status === 'completed' 
                          ? 'text-green-900' 
                          : step.status === 'current' 
                            ? 'text-blue-900' 
                            : 'text-gray-500'
                        }
                      `}>
                        {step.title}
                      </h3>
                      
                      {/* Status Badge */}
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${step.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : step.status === 'current' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-600'
                        }
                      `}>
                        {step.status === 'completed' ? 'Completed' : 
                         step.status === 'current' ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                    
                    <p className={`
                      mt-1 text-sm
                      ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Elsevier Branding */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <span>Powered by</span>
            <span className="font-semibold text-blue-600">Elsevier AI</span>
          </div>
        </div>

      </div>
    </div>
  );
}
