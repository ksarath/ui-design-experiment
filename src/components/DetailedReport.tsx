'use client';

import { useEffect, useState } from 'react';
import { ArrowLeftIcon, ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface DetailedReportProps {
  onBack: () => void;
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

export default function DetailedReport({ onBack }: DetailedReportProps) {
  const [pdfJs, setPdfJs] = useState<typeof import('react-pdf') | undefined>(undefined);

  useEffect(() => {
    (async () => {
      // Import pdfjs-dist dynamically for client-side rendering.
      if( !pdfJs ) {
        const pdfJS = await import("react-pdf");
        console.log('pdfJS:', pdfJS);
        pdfJS.pdfjs.GlobalWorkerOptions.workerSrc =
            window.location.origin + "/pdf.worker.min.mjs";
        setPdfJs(pdfJS);
      } else {
        console.log('pdfJS already loaded:', pdfJs);
      }
    })();
  }, [pdfJs]);

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const fileName = "Accident Analysis and Prevention.pdf";
  const fileType = "PDF"; // Example file type, replace with actual logic
  const extractedText = [`
    // Placeholder for extracted text, replace with actual data
  `];

  const reviewComments: ReviewComment[] = [
  {
    id: '1',
    line: 112,
    type: 'major',
    category: 'Language',
    message: 'Long sentence reduces readability; consider breaking into two shorter sentences.',
    originalText: 'Sharing responsibility for speed management requires a shift in the mindset of those involved in improving safety within the road system, as responsibility for (speed-related) road crash occurrence has traditionally been attributed to road users.',
    suggestedText: 'Sharing responsibility for speed management requires a shift in the mindset of those involved in improving safety within the road system. Traditionally, responsibility for (speed-related) road crash occurrence has been attributed to road users.',
    context: {
      before: ['Investigating practices, perceptions, and challenges regarding responsibility attribution within this specific policy area is therefore an important step towards advancing speed management.'],
      after: ['It also entails moving away from traditional governance models, where policies are expected to be dictated solely by governments.']
    }
  },
  {
    id: '2',
    line: 328,
    type: 'critical',
    category: 'Tense Consistency',
    message: 'Switches between present and past tense when describing completed methodology steps.',
    originalText: 'A preliminary open coding was conducted by the first author to familiarise herself with the data and to build a preliminary understanding of its content. NVivo 12 software is utilised for this first step.',
    suggestedText: 'A preliminary open coding was conducted by the first author to familiarise herself with the data and to build a preliminary understanding of its content. NVivo 12 software was utilised for this first step.',
    context: {
      before: ['Interviews were conducted and transcribed by the first author and deidentified prior to analysis.'],
      after: ['A RTA of the complete data corpus (n = 33) was undertaken following the steps pragmatically outlined by Braun and Clarke (2006)...']
    }
  },
  {
    id: '3',
    line: 671,
    type: 'major',
    category: 'Completeness',
    message: 'Consider adding a clear limitations section to strengthen transparency.',
    originalText: 'Our findings also suggest jurisdictions claiming to follow a Safe System Approach may adopt its principles to varying degrees, closer to a spectrum than to a binary classification.',
    suggestedText: 'Our findings also suggest jurisdictions claiming to follow a Safe System Approach may adopt its principles to varying degrees, closer to a spectrum than to a binary classification. However, the study has several limitations, including the focus on two primary countries, reliance on self-reported expert perspectives, and potential cultural bias in interpretations.',
    context: {
      before: ['Furthermore, its practical implementation may at times be challenging and subject to misinterpretation.'],
      after: ['Elvik (2023) reached to a similar conclusion after examining Norway’s road safety policy and contrasting it with an operationalised definition of perfect compliance with Safe System principles.']
    }
  },
  {
    id: '4',
    line: 892,
    type: 'minor',
    category: 'Structure',
    message: 'Add a transition sentence to improve flow between Theme 3 and Theme 4.',
    originalText: '3.4. Theme 4: The need to reassess the governance of speed management in relation to stakeholders’ accountability, roles, responsibilities, and the transparency of policy processes',
    suggestedText: 'Building on the challenges and opportunities identified in Theme 3, Theme 4 examines the need to reassess the governance of speed management in relation to stakeholders’ accountability, roles, responsibilities, and the transparency of policy processes.',
    context: {
      before: ['Properly accounting for these factors could shift the balance in favour of lower speed limits, according to this participant.'],
      after: ['This theme encompasses a range of perspectives shared by participants, reflecting the notion of an evolving governance framework for speed management.']
    }
  },
  {
    id: '5',
    line: 1254,
    type: 'critical',
    category: 'References',
    message: 'Ensure in-press or unpublished works are clearly marked to maintain transparency.',
    originalText: 'See Keller et al., 2025, “Actors, roles and responsibilities for speed management: A systems-based analysis of key stakeholders in Sweden and Queensland, Australia”, submitted to Safety Science for publication, for a discussion on this topic.',
    suggestedText: 'See Keller et al., 2025 (submitted), “Actors, roles and responsibilities for speed management: A systems-based analysis of key stakeholders in Sweden and Queensland, Australia”, for a discussion on this topic.',
    context: {
      before: ['Recognising these underlying interests and exploring ways to foster alignment is thus a critical first step towards creating a self-reinforcing collaborative governance network (Emerson et al., 2012).'],
      after: ['Participants reported a trade-off between transport']
    }
  },
  {
    id: '6',
    line: 144,
    type: 'enhancement',
    category: 'Style',
    message: 'Consider reducing repetition of “shared responsibility is difficult to operationalise” to improve conciseness.',
    originalText: 'This innovative governance arrangement remains insufficiently studied and potentially may be being adopted by jurisdictions as part of a larger package (i.e., the Safe System Approach), at times without clear understanding. This situation is likely to bring about difficulties in putting the concept into practice.',
    suggestedText: 'This innovative governance arrangement remains insufficiently studied and may be adopted by jurisdictions as part of a larger package (i.e., the Safe System Approach), sometimes without clear understanding—making practical implementation challenging.',
    context: {
      before: ['It also entails moving away from traditional governance models, where policies are expected to be dictated solely by governments.'],
      after: ['This research study aims to contribute to addressing this gap in the literature by studying how the concept of shared responsibility is perceived across stakeholders involved in speed management utilising systems thinking.']
    }
  },
  {
    id: '7',
    line: 52,
    type: 'minor',
    category: 'Readability',
    message: 'Sentence is overly long; consider splitting for clarity.',
    originalText: 'This approach forms the foundation of the United Nations Global Plan for the Decade of Action for Road Safety (2021–2030) (WHO, 2021) and is strongly supported by thought-leading organisations (e.g., Bliss and Breen, 2009; OECD, 2016).',
    suggestedText: 'This approach forms the foundation of the United Nations Global Plan for the Decade of Action for Road Safety (2021–2030) (WHO, 2021). It is strongly supported by thought-leading organisations (e.g., Bliss and Breen, 2009; OECD, 2016).',
    context: {
      before: ['The Safe System Approach to road safety is grounded in the principle of shared responsibility.'],
      after: ['Some recent evidence suggests this approach has been effective for improving road safety outcomes (Elvik, 2023; Elvik and Nævestad, 2023; Khan and Das, 2024).']
    }
  },
  {
    id: '8',
    line: 210,
    type: 'enhancement',
    category: 'Flow',
    message: 'Consider adding a linking phrase to connect systems thinking discussion to road safety context.',
    originalText: 'The adoption of a systems (thinking) approach to road safety is not new, but nevertheless is not mainstream within the road safety arena, even despite its increasing popularity in closely related disciplines such as public health (e.g., Carey et al., 2015; Johnson et al., 2019; WHO, 2009).',
    suggestedText: 'The adoption of a systems (thinking) approach to road safety is not new. However, it remains far from mainstream in the road safety arena, despite its increasing popularity in closely related disciplines such as public health (e.g., Carey et al., 2015; Johnson et al., 2019; WHO, 2009). This highlights a potential gap in translating theoretical frameworks into practical road safety policies.',
    context: {
      before: ['This involves identifying the most important elements and interactions that give shape to the system under study, and only then reflect on how the system might be modified to avoid certain problems.'],
      after: ['Different authors have explored a systems thinking approach to road safety over the last decade (e.g., Lansdown et al., 2015; Newnam et al., 2017; Salmon et al., 2020).']
    }
  },
  {
    id: '9',
    line: 446,
    type: 'minor',
    category: 'Clarity',
    message: 'Replace nominalisation with active verb for stronger impact.',
    originalText: 'This flexibility was particularly valuable for unpacking perceptions around the concept of responsibility as applied in practice in the field of speed management.',
    suggestedText: 'This flexibility was particularly valuable for unpacking how participants perceived and applied the concept of responsibility in speed management practice.',
    context: {
      before: ['The semi-structured format enabled in-depth conversations, allowing participants to articulate their views using their own language and framings.'],
      after: ['Seven interviews were conducted in person, three responses to the questions were submitted in written form by email, and 23 were held virtually.']
    }
  },
  {
    id: '10',
    line: 888,
    type: 'minor',
    category: 'Punctuation',
    message: 'Long list is hard to follow; consider breaking into two sentences or using semicolons.',
    originalText: 'This theme encompasses a range of perspectives shared by participants, reflecting the notion of an evolving governance framework for speed management. Discussions focused on claims for expanding the current stakeholder map (Subtheme 4.1), on efforts to ensure stakeholders take responsibility for improving speed management (Subtheme 4.2), and claims for revisiting and improving the allocation of responsibilities, strengthening accountability mechanisms, and increasing transparency in managing this critical policy issue.',
    suggestedText: 'This theme encompasses a range of perspectives shared by participants, reflecting the notion of an evolving governance framework for speed management. Discussions focused on: (1) claims for expanding the current stakeholder map (Subtheme 4.1); (2) efforts to ensure stakeholders take responsibility for improving speed management (Subtheme 4.2); and (3) calls to revisit and improve responsibility allocation, strengthen accountability mechanisms, and increase transparency in managing this critical policy issue.',
    context: {
      before: ['Building on the challenges and opportunities identified in Theme 3, Theme 4 examines the need to reassess the governance of speed management in relation to stakeholders’ accountability, roles, responsibilities, and the transparency of policy processes.'],
      after: ['Subtheme 4.1: Shared desires for a broader stakeholder map.']
    }
  },
  {
    id: '11',
    line: 1034,
    type: 'enhancement',
    category: 'Readability',
    message: 'Simplify sentence structure to make point more direct.',
    originalText: 'Some participants further noted that certain actors were actively attempting to be recognised as legitimate stakeholders but encountered barriers in gaining acknowledgment and influence.',
    suggestedText: 'Some participants noted that certain actors actively sought recognition as legitimate stakeholders but faced barriers to acknowledgment and influence.',
    context: {
      before: ['Local schools were emphasised as crucial stakeholders, with parent and citizen associations being potential advocates for safer, slower speeds and alternative transportation modes.'],
      after: ['For example, companies were described as being active in this area within the Australian context, but some participants did not perceive there were significant engagement efforts currently taking place with this stakeholder:']
    }
  },
  {
    id: '12',
    line: 1460,
    type: 'minor',
    category: 'Flow',
    message: 'Add concluding sentence to reinforce study contribution before moving to next section.',
    originalText: 'Policy framing often strategically advances stakeholders’ (sometimes concealed) interests (Bacchi, 2009).',
    suggestedText: 'Policy framing often strategically advances stakeholders’ (sometimes concealed) interests (Bacchi, 2009). Recognising and addressing these framing effects is essential for designing effective and equitable speed management policies.',
    context: {
      before: ['As a result, problem framing affects not only policy choices but also governance arrangements and the distribution of responsibility among stakeholders.'],
      after: ['4.3. Theme 3: Shared responsibility for speed management is enhanced by the alignment of stakeholder goals']
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
                {fileName || 'Manuscript Text'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {fileType 
                  ? `${fileType} • Original document with highlighted issues`
                  : 'Original document with highlighted issues'
                }
              </p>
            </div>
            <div className="p-6 max-h-screen overflow-y-auto">
              <div className="font-mono text-sm space-y-1">
                {pdfJs ? 
                    <div>
                        <pdfJs.Document file="Article.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                            <pdfJs.Page pageNumber={pageNumber} />
                        </pdfJs.Document>
                        <p>
                            Page {pageNumber} of {numPages}
                        </p>
                    </div> : 
                    <div>
                        <p>No PDF viewer available</p>
                    </div>
                }
                {/* Manuscript text with line numbers */}
                {/* {(extractedText || [
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
                })} */}
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
