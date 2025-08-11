'use client';

import { useState, useEffect } from 'react';
import { DocumentTextIcon, CheckCircleIcon, ClockIcon, CogIcon, SparklesIcon, DocumentMagnifyingGlassIcon, BookOpenIcon, PencilIcon, LinkIcon, ChatBubbleLeftEllipsisIcon, BeakerIcon } from '@heroicons/react/24/outline';
import DetailedReport from './DetailedReport';
import { ExtractedText } from '../utils/fileExtractor';

interface ReviewStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: string;
  estimatedTimeInMs: number;
  substeps?: {
    id: string;
    title: string;
    status: 'pending' | 'in-progress' | 'completed';
    estimatedTimeInMs: number;
  }[];
}

interface ReviewProgressProps {
  onBack: () => void;
}

export default function ReviewProgress({ onBack }: ReviewProgressProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const [steps, setSteps] = useState<ReviewStep[]>([
    {
      id: 1,
      title: "Analyzing Research Paper",
      description: "Extracting key information and understanding the paper structure",
      icon: DocumentMagnifyingGlassIcon,
      status: 'pending',
      estimatedTime: "30 seconds",
      estimatedTimeInMs: 30000
    },
    {
      id: 2,
      title: "Transforming Paper for AI Review",
      description: "Transforming your research paper into a format suitable for AI review",
      icon: DocumentTextIcon,
      status: 'pending',
      estimatedTime: "45 seconds",
      estimatedTimeInMs: 45000
    },
    {
      id: 3,
      title: "Fetching Similar Articles",
      description: "Finding recent publications from Elsevier publications",
      icon: BookOpenIcon,
      status: 'pending',
      estimatedTime: "1 minute",
      estimatedTimeInMs: 60000
    },
    {
      id: 4,
      title: "Comprehensive Quality Check",
      description: "Running parallel quality assessments",
      icon: BeakerIcon,
      status: 'pending',
      estimatedTime: "2 minutes",
      estimatedTimeInMs: 120000,
      substeps: [
        { id: 'soundness', title: 'Checking soundness of the paper', status: 'pending', estimatedTimeInMs: 2000 },
        { id: 'language', title: 'Checking language (grammar, syntax, style)', status: 'pending', estimatedTimeInMs: 3000 },
        { id: 'coherence', title: 'Checking flow and coherence', status: 'pending', estimatedTimeInMs: 4000 },
        { id: 'completeness', title: 'Checking completeness of the paper', status: 'pending', estimatedTimeInMs: 2000 },
        { id: 'references', title: 'Checking integrity of references', status: 'pending', estimatedTimeInMs: 3000 }
      ]
    },
    {
      id: 5,
      title: "Generating Review Comments",
      description: "Creating detailed feedback and suggestions",
      icon: ChatBubbleLeftEllipsisIcon,
      status: 'pending',
      estimatedTime: "1.5 minutes",
      estimatedTimeInMs: 90000
    },
    {
      id: 6,
      title: "Generating Additional References",
      description: "Suggesting relevant citations and references",
      icon: LinkIcon,
      status: 'pending',
      estimatedTime: "45 seconds",
      estimatedTimeInMs: 45000
    },
    {
      id: 7,
      title: "Generating Review Summary",
      description: "Creating a concise summary of the review findings",
      icon: LinkIcon,
      status: 'pending',
      estimatedTime: "45 seconds",
      estimatedTimeInMs: 45000
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        const currentStepData = newSteps.find(step => step.id === currentStep);

        if (currentStepData) {
          // Handle substeps for step 4 (parallel processing)
          if (currentStep === 4 && currentStepData.substeps) {
            if (currentStepData.status === 'pending') {
              currentStepData.status = 'in-progress';
            } else if (currentStepData.status === 'in-progress') {
              for(const substep of currentStepData.substeps) {
                if (substep.status === 'pending') {
                  substep.status = 'in-progress';
                }

                setTimeout(() => {
                  substep.status = 'completed';
                }, 500);
              }
              const allSubstepsCompleted = currentStepData.substeps.every(substep => substep.status === 'completed');
              if (allSubstepsCompleted) {
                currentStepData.status = 'completed';
              }
            }
          } else {
            // Regular step progression (serial)
            if (currentStepData.status === 'pending') {
              currentStepData.status = 'in-progress';
            } else if (currentStepData.status === 'in-progress') {
              // Complete current step after delay and move to next
              setTimeout(() => {
                setSteps(prevSteps => {
                  const updatedSteps = [...prevSteps];
                  const stepData = updatedSteps.find(step => step.id === currentStep);
                  if (stepData) {
                    stepData.status = 'completed';
                  }
                  return updatedSteps;
                });
              }, 2000);
            }
          }

          // Check if all steps are completed to show results
          if (currentStep > newSteps.length) {
            setTimeout(() => {
              setShowResults(true);
            }, 2000);
          }
        }

        return newSteps;
      });

      const currentStepData = steps.find(step => step.id === currentStep);
      if (!currentStepData || currentStepData.status === 'completed') {
        setCurrentStep(prev => prev + 1);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [currentStep]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <CogIcon className="w-6 h-6 text-blue-500 animate-spin" />;
      default:
        return <ClockIcon className="w-6 h-6 text-gray-400" />;
    }
  };

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  // Show results when all steps are complete
  if (showResults) {
    return <DetailedReport onBack={onBack} />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <SparklesIcon className="w-8 h-8 text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Review in Progress
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your manuscript is being analyzed by Elsevier&apos;s advanced AI system
        </p>
        
        {/* Overall Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {completedSteps} of {steps.length} steps completed ({Math.round(progressPercentage)}%)
        </p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          <div className="space-y-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.status === 'in-progress';
              const isCompleted = step.status === 'completed';

              return (
                <div key={step.id} className="relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className={`absolute left-6 top-16 w-0.5 h-12 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}></div>
                  )}

                  <div className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 ${
                    isActive ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' :
                    isCompleted ? 'bg-green-50 dark:bg-green-900/20' :
                    'bg-gray-50 dark:bg-gray-700'
                  }`}>
                    {/* Step Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-100 dark:bg-green-900' :
                      isActive ? 'bg-blue-100 dark:bg-blue-900' :
                      'bg-gray-100 dark:bg-gray-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      ) : (
                        <StepIcon className={`w-6 h-6 ${
                          isActive ? 'text-blue-500' : 'text-gray-400'
                        } ${isActive ? 'animate-pulse' : ''}`} />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg font-semibold ${
                          isActive ? 'text-blue-900 dark:text-blue-100' :
                          isCompleted ? 'text-green-900 dark:text-green-100' :
                          'text-gray-700 dark:text-gray-300'
                        }`}>
                          Step {step.id}: {step.title}
                        </h3>
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          isActive ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                        }`}>
                          {isCompleted ? 'Completed' : isActive ? 'In Progress' : `ETA: ${step.estimatedTime}`}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {step.description}
                      </p>

                      {/* Substeps for Step 4 */}
                      {step.substeps && (
                        <div className="ml-4 space-y-2">
                          {step.substeps.map((substep, subIndex) => (
                            <div key={substep.id} className="flex items-center space-x-3">
                              {getStatusIcon(substep.status)}
                              <span className={`text-sm ${
                                substep.status === 'completed' ? 'text-green-700 dark:text-green-300' :
                                substep.status === 'in-progress' ? 'text-blue-700 dark:text-blue-300' :
                                'text-gray-500 dark:text-gray-400'
                              }`}>
                                {substep.title}
                              </span>
                              {substep.status === 'in-progress' && (
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Progress indicator for active step */}
                      {isActive && !step.substeps && (
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm text-blue-600 dark:text-blue-400">Processing...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300"
        >
          ← Back to Upload
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Estimated total time: ~6 minutes
          </p>
          {progressPercentage === 100 && (
            <button 
              onClick={() => setShowResults(true)}
              className="mt-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              View Review Results
            </button>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <DocumentTextIcon className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
              What&apos;s happening?
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Our AI is performing a comprehensive analysis of your manuscript, checking for quality, completeness, and relevance. 
              This process ensures you receive the most accurate and helpful feedback possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
