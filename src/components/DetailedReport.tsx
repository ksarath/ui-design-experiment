'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeftIcon, ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon, XMarkIcon, DocumentTextIcon, ChartBarIcon, BookOpenIcon } from '@heroicons/react/24/outline';

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
  status?: 'pending' | 'accepted' | 'rejected';
  context: {
    before: string[];
    after: string[];
  };
}

export default function DetailedReport({ onBack }: DetailedReportProps) {

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'comments' | 'summary' | 'references'>('comments');
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [manuscriptContent, setManuscriptContent] = useState<(string | React.ReactElement)[]>([]);
  const [commentStatuses, setCommentStatuses] = useState<Record<string, 'pending' | 'accepted' | 'rejected'>>({});
  const manuscriptRef = useRef<HTMLDivElement>(null);

  // Function to find and highlight text in the manuscript
  const findTextInManuscript = (lineNumber: number) => {
    if (manuscriptRef.current) {
      const lineElement = manuscriptRef.current.querySelector(`[data-line="${lineNumber}"]`);
      if (lineElement) {
        lineElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        return lineNumber.toString();
      }
    }
    return null;
  };

  // Function to handle accepting a comment
  const handleAcceptComment = (commentId: string) => {
    const comment = reviewComments.find(c => c.id === commentId);
    if (comment && comment.suggestedText) {
      // Update manuscript content by replacing the specific line with suggested text
      const updatedContent = manuscriptContent.map((line, index) => {
        const lineNumber = index + 1;
        if (lineNumber === comment.line) {
          // Replace the entire line content with suggested text
          const lineText = typeof line === 'string' ? line : '';
          return lineText.replace(comment.originalText, comment.suggestedText!);
        }
        return line;
      });
      setManuscriptContent(updatedContent);
    }
    setCommentStatuses(prev => ({ ...prev, [commentId]: 'accepted' }));
  };

  // Function to handle rejecting a comment
  const handleRejectComment = (commentId: string) => {
    setCommentStatuses(prev => ({ ...prev, [commentId]: 'rejected' }));
  };

  // Function to accept all comments
  const handleAcceptAll = () => {
    let updatedContent = [...manuscriptContent];
    reviewComments.forEach(comment => {
      if (comment.suggestedText) {
        updatedContent = updatedContent.map((line, index) => {
          const lineNumber = index + 1;
          if (lineNumber === comment.line) {
            // Replace the specific line content with suggested text
            const lineText = typeof line === 'string' ? line : '';
            return lineText.replace(comment.originalText, comment.suggestedText!);
          }
          return line;
        });
      }
    });
    setManuscriptContent(updatedContent);
    
    const allAccepted = reviewComments.reduce((acc, comment) => {
      acc[comment.id] = 'accepted';
      return acc;
    }, {} as Record<string, 'pending' | 'accepted' | 'rejected'>);
    setCommentStatuses(allAccepted);
  };

  // Function to reject all comments
  const handleRejectAll = () => {
    const allRejected = reviewComments.reduce((acc, comment) => {
      acc[comment.id] = 'rejected';
      return acc;
    }, {} as Record<string, 'pending' | 'accepted' | 'rejected'>);
    setCommentStatuses(allRejected);
  };

  // Effect to scroll to selected comment text
  useEffect(() => {
    if (selectedCommentId) {
      const selectedComment = reviewComments.find(c => c.id === selectedCommentId);
      if (selectedComment) {
        findTextInManuscript(selectedComment.line);
      }
    }
  }, [selectedCommentId]);

  // Initialize manuscript content
  useEffect(() => {
    setManuscriptContent(extractedText);
  }, []);

  const fileName = "Accident Analysis and Prevention.pdf";
  const fileType = "PDF"; // Example file type, replace with actual logic
  const extractedText = [
    <h1>Safe System Approach Manuscript</h1>,

    <h2>Introduction</h2>,
    <p>The Safe System Approach to road safety is grounded in the principle of shared responsibility.</p>,
    <p>This approach forms the foundation of the United Nations Global Plan for the Decade of Action for Road Safety (2021–2030) (WHO, 2021) and is strongly supported by thought-leading organisations (e.g., Bliss and Breen, 2009; OECD, 2016).</p>,
    <p>Some recent evidence suggests this approach has been effective for improving road safety outcomes (Elvik, 2023; Elvik and Nævestad, 2023; Khan and Das, 2024).</p>,

    <h2>Rationale</h2>,
    <p>Investigating practices, perceptions, and challenges regarding responsibility attribution within this specific policy area is therefore an important step towards advancing speed management.</p>,
    <p>Sharing responsibility for speed management requires a shift in the mindset of those involved in improving safety within the road system, as responsibility for (speed-related) road crash occurrence has traditionally been attributed to road users.</p>,
    <p>It also entails moving away from traditional governance models, where policies are expected to be dictated solely by governments.</p>,

    <h2>Study Aim</h2>,
    <p>This research study aims to contribute to addressing this gap in the literature by studying how the concept of shared responsibility is perceived across stakeholders involved in speed management utilising systems thinking.</p>,
    <p>This innovative governance arrangement remains insufficiently studied and potentially may be being adopted by jurisdictions as part of a larger package (i.e., the Safe System Approach), at times without clear understanding. This situation is likely to bring about difficulties in putting the concept into practice.</p>,

    <h2>Systems Thinking and Road Safety</h2>,
    <p>This involves identifying the most important elements and interactions that give shape to the system under study, and only then reflecting on how the system might be modified to avoid certain problems.</p>,
    <p>The adoption of a systems (thinking) approach to road safety is not new, but nevertheless is not mainstream within the road safety arena, even despite its increasing popularity in closely related disciplines such as public health (e.g., Carey et al., 2015; Johnson et al., 2019; WHO, 2009).</p>,
    <p>Different authors have explored a systems thinking approach to road safety over the last decade (e.g., Lansdown et al., 2015; Newnam et al., 2017; Salmon et al., 2020).</p>,

    <h2>Data Collection & Methods (excerpt)</h2>,
    <p>The semi-structured format enabled in-depth conversations, allowing participants to articulate their views using their own language and framings.</p>,
    <p>This flexibility was particularly valuable for unpacking perceptions around the concept of responsibility as applied in practice in the field of speed management.</p>,
    <p>Seven interviews were conducted in person, three responses to the questions were submitted in written form by email, and 23 were held virtually.</p>,

    <h3>Analysis</h3>,
    <p>Interviews were conducted and transcribed by the first author and deidentified prior to analysis.</p>,
    <p>A preliminary open coding was conducted by the first author to familiarise herself with the data and to build a preliminary understanding of its content. NVivo 12 software is utilised for this first step.</p>,
    <p>A RTA of the complete data corpus (n = 33) was undertaken following the steps pragmatically outlined by Braun and Clarke (2006)...</p>,

    <h2>Findings (selected excerpts)</h2>,
    <p>Furthermore, its practical implementation may at times be challenging and subject to misinterpretation.</p>,
    <p>Our findings also suggest jurisdictions claiming to follow a Safe System Approach may adopt its principles to varying degrees, closer to a spectrum than to a binary classification.</p>,
    <p>Elvik (2023) reached a similar conclusion after examining Norway’s road safety policy and contrasting it with an operationalised definition of perfect compliance with Safe System principles.</p>,

    <h2>Theme 4 — Governance & Accountability</h2>,
    <p>Properly accounting for these factors could shift the balance in favour of lower speed limits, according to this participant.</p>,
    <p>3.4 Theme 4: This examines the need to reassess the governance of speed management in relation to stakeholders’ accountability, roles, responsibilities, and the transparency of policy processes.</p>,
    <p>This theme encompasses a range of perspectives shared by participants, reflecting the notion of an evolving governance framework for speed management. Discussions focused on claims for expanding the current stakeholder map (Subtheme 4.1), on efforts to ensure stakeholders take responsibility for improving speed management (Subtheme 4.2), and claims for revisiting and improving the allocation of responsibilities, strengthening accountability mechanisms, and increasing transparency in managing this critical policy issue.</p>,
    // <ol>
    //   <li>Claims for expanding the current stakeholder map (Subtheme 4.1);</li>
    //   <li>Efforts to ensure stakeholders take responsibility for improving speed management (Subtheme 4.2);</li>
    //   <li>Calls to revisit and improve responsibility allocation, strengthen accountability mechanisms, and increase transparency in managing this critical policy issue (Subtheme 4.3).</li>
    // </ol>,
    <p><strong>Subtheme 4.1:</strong> Shared desires for a broader stakeholder map.</p>,

    <h2>Stakeholder Engagement (excerpt)</h2>,
    <p>Local schools were emphasised as crucial stakeholders, with parent and citizen associations being potential advocates for safer, slower speeds and alternative transportation modes.</p>,
    <p>Some participants further noted that certain actors were actively attempting to be recognised as legitimate stakeholders but encountered barriers in gaining acknowledgment and influence.</p>,
    <p>For example, companies were described as being active in this area within the Australian context, but some participants did not perceive there were significant engagement efforts currently taking place with this stakeholder:</p>,

    <h2>Related Work</h2>,
    <p>Recognising these underlying interests and exploring ways to foster alignment is thus a critical first step towards creating a self-reinforcing collaborative governance network (Emerson et al., 2012).</p>,
    <p>See Keller et al., 2025, “Actors, roles and responsibilities for speed management: A systems-based analysis of key stakeholders in Sweden and Queensland, Australia”, submitted to Safety Science for publication, for a discussion on this topic.</p>,
    <p>Participants reported a trade-off between transport...</p>,

    <h2>Policy Framing & Conclusion (excerpt)</h2>,
    <p>As a result, problem framing affects not only policy choices but also governance arrangements and the distribution of responsibility among stakeholders.</p>,
    <p>Policy framing often strategically advances stakeholders’ (sometimes concealed) interests (Bacchi, 2009).</p>,
    <p><strong>Theme 3:</strong> Shared responsibility for speed management is enhanced by the alignment of stakeholder goals.</p>
  ];


//     <div class="context">
//     <p class="note"><strong>Notes on changes made:</strong></p>
//     <ul>
//       <li>Long sentences were split to improve readability and flow.</li>
//       <li>Tense inconsistency in methods was corrected to past tense.</li>
//       <li>Repetitive phrasing about operationalisation difficulties was condensed.</li>
//       <li>Theme 4 introductory paragraph reworked into a clear bulleted list for readability.</li>
//       <li>In-press / submitted references are now explicitly marked <code>(submitted)</code>.</li>
//       <li>Some nominalisations were converted to active phrasing to make the prose more direct.</li>
//     </ul>
//   </div>

  const reviewComments: ReviewComment[] = [
  {
    id: '1',
    line: 8,
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
    line: 23,
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
    line: 27,
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
    line: 31,
    type: 'minor',
    category: 'Structure',
    message: 'Add a transition sentence to improve flow between Theme 3 and Theme 4.',
    originalText: '3.4 Theme 4: This examines the need to reassess the governance of speed management in relation to stakeholders’ accountability, roles, responsibilities, and the transparency of policy processes',
    suggestedText: 'Building on the challenges and opportunities identified in Theme 3, Theme 4 examines the need to reassess the governance of speed management in relation to stakeholders’ accountability, roles, responsibilities, and the transparency of policy processes.',
    context: {
      before: ['Properly accounting for these factors could shift the balance in favour of lower speed limits, according to this participant.'],
      after: ['This theme encompasses a range of perspectives shared by participants, reflecting the notion of an evolving governance framework for speed management.']
    }
  },
  {
    id: '5',
    line: 40,
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
    line: 12,
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
    line: 4,
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
    line: 15,
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
    line: 19,
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
    line: 32,
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
    line: 36,
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
    line: 44,
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

  // Suggested References
  const suggestedReferences = [
    {
      id: '1',
      type: 'Journal Article',
      title: 'A comprehensive framework for shared responsibility in road safety: Lessons from European implementations',
      authors: 'Johnson, M., Schmidt, L., & Andersson, K.',
      journal: 'Safety Science',
      year: '2024',
      volume: '158',
      pages: '45-62',
      doi: '10.1016/j.ssci.2024.01.003',
      relevance: 'Directly addresses shared responsibility frameworks in road safety, providing empirical evidence for implementation challenges.',
      category: 'Core Theory'
    },
    {
      id: '2',
      type: 'Book Chapter',
      title: 'Systems thinking approaches to complex policy problems',
      authors: 'Williams, R. & Chen, H.',
      book: 'Advanced Policy Analysis Methods',
      publisher: 'Oxford University Press',
      year: '2023',
      pages: '134-167',
      relevance: 'Offers methodological insights for applying systems thinking to governance and policy implementation.',
      category: 'Methodology'
    },
    {
      id: '3',
      type: 'Journal Article',
      title: 'Stakeholder engagement in speed management: A multi-country comparative analysis',
      authors: 'Thompson, A., Rodriguez, C., & Kim, S.',
      journal: 'Transport Policy',
      year: '2024',
      volume: '142',
      pages: '78-94',
      doi: '10.1016/j.tranpol.2024.02.011',
      relevance: 'Provides comparative data on stakeholder engagement strategies across different jurisdictions.',
      category: 'Stakeholder Analysis'
    },
    {
      id: '4',
      type: 'Conference Paper',
      title: 'Governance networks and accountability mechanisms in transport safety',
      authors: 'Davis, P., O\'Brien, M., & Patel, R.',
      conference: 'International Conference on Transport Safety Governance',
      year: '2024',
      pages: '245-256',
      relevance: 'Explores accountability mechanisms within collaborative governance structures.',
      category: 'Governance'
    },
    {
      id: '5',
      type: 'Journal Article',
      title: 'Implementation challenges of the Safe System Approach: A systematic review',
      authors: 'Liu, X., Müller, S., & Garcia, L.',
      journal: 'Accident Analysis & Prevention',
      year: '2023',
      volume: '189',
      pages: '107-125',
      doi: '10.1016/j.aap.2023.107125',
      relevance: 'Systematic review of implementation challenges, providing context for study findings.',
      category: 'Implementation'
    },
    {
      id: '6',
      type: 'Journal Article',
      title: 'Policy framing and stakeholder perceptions in road safety governance',
      authors: 'Nakamura, T., Brown, J., & Singh, A.',
      journal: 'Public Administration Review',
      year: '2024',
      volume: '84',
      number: '3',
      pages: '412-428',
      relevance: 'Examines how policy framing affects stakeholder engagement and responsibility attribution.',
      category: 'Policy Analysis'
    }
  ];

  // Review Summary
  const reviewSummary = {
    overallScore: 85,
    strengths: [
      'Strong theoretical framework grounded in systems thinking',
      'Comprehensive stakeholder analysis across multiple jurisdictions',
      'Novel application of shared responsibility concepts to speed management',
      'Rich qualitative data from expert interviews',
      'Clear thematic analysis structure'
    ],
    areasForImprovement: [
      'Tense consistency throughout methodology section',
      'Sentence structure and readability in several sections',
      'Reference formatting and citation consistency',
      'Addition of explicit limitations section',
      'Transition sentences between major themes'
    ],
    keyRecommendations: [
      'Break down long sentences for improved readability',
      'Ensure consistent past tense in methodology',
      'Add structured limitations section',
      'Strengthen transitions between themes',
      'Consider additional recent references on stakeholder engagement'
    ],
    categoryBreakdown: {
      'Language': { count: 4, severity: 'Medium' },
      'Structure': { count: 3, severity: 'Low' },
      'References': { count: 2, severity: 'Medium' },
      'Completeness': { count: 1, severity: 'High' },
      'Style': { count: 2, severity: 'Low' }
    }
  };


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
            onClick={() => {
              setSelectedCategory(category);
              setSelectedCommentId(null);
            }}
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
            <div ref={manuscriptRef} className="p-6 h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin">
              <div className="font-mono text-sm space-y-1">
                {/* Manuscript text with line numbers */}
                {(manuscriptContent.length > 0 ? manuscriptContent : extractedText || [
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
                  const lineText = typeof line === 'string' ? line : line.props.children;
                  
                  // Check if this line contains text from any selected comment
                  const selectedComment = selectedCommentId ? 
                    filteredComments.find(comment => comment.id === selectedCommentId) : null;
                  
                  const isHighlighted = selectedComment && selectedComment.line === lineNumber;
                  
                  // Check if this line has any comments
                  const hasComment = filteredComments.some(comment => comment.line === lineNumber);

                  // Check if this line contains accepted changes
                  const hasAcceptedChange = filteredComments.some(comment => 
                    commentStatuses[comment.id] === 'accepted' && comment.line === lineNumber
                  );
                  
                  return (
                    <div 
                      key={index} 
                      data-line={lineNumber}
                      className={`flex ${
                        isHighlighted
                          ? 'bg-blue-100 dark:bg-blue-900/40 border-l-4 border-blue-500' 
                          : hasAcceptedChange
                          ? 'bg-green-50 dark:bg-green-900/20 border-l-2 border-green-400'
                          : hasComment 
                          ? 'bg-yellow-50 dark:bg-yellow-900/20' 
                          : ''
                      } ${isHighlighted ? 'animate-gentle-pulse' : ''}`}
                    >
                      <div className="w-12 text-center text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 py-1 text-xs">
                        {lineNumber}
                      </div>
                      <div className="flex-1 px-4 py-1 text-gray-700 dark:text-gray-300">
                        {line || '\u00A0'}
                        {hasComment && (
                          <span className="ml-2 inline-flex items-center">
                            {filteredComments
                              .filter(comment => comment.line === lineNumber)
                              .map((comment, idx) => (
                                <span key={`${comment.id}-${idx}`}>
                                  {getTypeIcon(comment.type)}
                                </span>
                              ))}
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

        {/* Right Side - Tabbed Interface (1/3 width) */}
        <div className="col-span-1 h-fit">
          {/* Tab Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-t-xl border border-gray-200 dark:border-gray-700 border-b-0">
            <div className="flex">
              <button
                onClick={() => {
                  setActiveTab('comments');
                  if (activeTab !== 'comments') setSelectedCommentId(null);
                }}
                className={`flex-1 px-2 py-3 text-xs font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === 'comments'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-1">
                  <DocumentTextIcon className="w-3 h-3" />
                  <span className="hidden sm:inline">Comments</span>
                  <span className="sm:hidden">C</span>
                  <span className="bg-gray-200 dark:bg-gray-600 text-xs px-1.5 py-0.5 rounded-full">
                    {filteredComments.length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab('summary');
                  setSelectedCommentId(null);
                }}
                className={`flex-1 px-2 py-3 text-xs font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === 'summary'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-1">
                  <ChartBarIcon className="w-3 h-3" />
                  <span className="hidden sm:inline">Summary</span>
                  <span className="sm:hidden">S</span>
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab('references');
                  setSelectedCommentId(null);
                }}
                className={`flex-1 px-2 py-3 text-xs font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === 'references'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-1">
                  <BookOpenIcon className="w-3 h-3" />
                  <span className="hidden sm:inline">References</span>
                  <span className="sm:hidden">R</span>
                  <span className="bg-gray-200 dark:bg-gray-600 text-xs px-1.5 py-0.5 rounded-full">
                    {suggestedReferences.length}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-b-xl border border-gray-200 dark:border-gray-700 border-t-0 h-[calc(100vh-300px)] overflow-hidden">
            {/* Comments Tab */}
            {activeTab === 'comments' && (
              <div className="h-full overflow-y-auto scrollbar-thin">
                {/* Accept All / Reject All buttons */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <div className="flex space-x-2 mb-2">
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors duration-200"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-colors duration-200"
                    >
                      Reject All
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {filteredComments.filter(c => commentStatuses[c.id] === 'accepted').length} accepted, {filteredComments.filter(c => commentStatuses[c.id] === 'rejected').length} rejected
                  </p>
                </div>
                
                <div className="p-4 space-y-4">
                {filteredComments.map((comment) => (
                  <div 
                    key={comment.id} 
                    className={`cursor-pointer transition-all duration-200 rounded-xl border overflow-hidden ${
                      selectedCommentId === comment.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600 shadow-lg'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedCommentId(selectedCommentId === comment.id ? null : comment.id)}
                  >
                    {/* Comment Header */}
                    <div className={`p-3 border-b border-gray-200 dark:border-gray-600 ${
                      selectedCommentId === comment.id
                        ? 'bg-blue-100 dark:bg-blue-800'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(comment.type)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadge(comment.type)}`}>
                          {comment.type.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Text Match
                        </span>
                        {selectedCommentId === comment.id && (
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            ● Selected
                          </span>
                        )}
                        {commentStatuses[comment.id] && (
                          <span className={`text-xs font-medium ${
                            commentStatuses[comment.id] === 'accepted' 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {commentStatuses[comment.id] === 'accepted' ? '✓ Accepted' : '✗ Rejected'}
                          </span>
                        )}
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
                        <div className="mb-3">
                          <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Suggested:</div>
                          <div className="text-xs bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-2 rounded">
                            {comment.suggestedText}
                          </div>
                        </div>
                      )}

                      {/* Accept/Reject Buttons */}
                      {!commentStatuses[comment.id] && comment.suggestedText && (
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAcceptComment(comment.id);
                            }}
                            className="flex-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded transition-colors duration-200"
                          >
                            Accept
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRejectComment(comment.id);
                            }}
                            className="flex-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded transition-colors duration-200"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Status Message */}
                      {commentStatuses[comment.id] && (
                        <div className={`text-center py-2 px-3 rounded text-xs font-medium ${
                          commentStatuses[comment.id] === 'accepted'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                        }`}>
                          {commentStatuses[comment.id] === 'accepted' 
                            ? '✓ Change Applied' 
                            : '✗ Change Rejected'
                          }
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}

            {/* Summary Tab */}
            {activeTab === 'summary' && (
              <div className="h-full overflow-y-auto scrollbar-thin p-4 space-y-6">
                {/* Overall Score */}
                <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {reviewSummary.overallScore}/100
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Overall Quality Score</div>
                </div>

                {/* Category Breakdown */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Issue Breakdown</h4>
                  <div className="space-y-2">
                    {Object.entries(reviewSummary.categoryBreakdown).map(([category, data]) => (
                      <div key={category} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{data.count}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            data.severity === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                            data.severity === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300' :
                            'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                          }`}>
                            {data.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Strengths</h4>
                  <div className="space-y-2">
                    {reviewSummary.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-green-800 dark:text-green-200">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Areas for Improvement */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Areas for Improvement</h4>
                  <div className="space-y-2">
                    {reviewSummary.areasForImprovement.map((area, index) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <ExclamationTriangleIcon className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-orange-800 dark:text-orange-200">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Recommendations */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Recommendations</h4>
                  <div className="space-y-2">
                    {reviewSummary.keyRecommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <InformationCircleIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-blue-800 dark:text-blue-200">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* References Tab */}
            {activeTab === 'references' && (
              <div className="h-full overflow-y-auto scrollbar-thin p-4 space-y-4">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Suggested References</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    These references may strengthen your manuscript and provide additional theoretical support.
                  </p>
                </div>
                {suggestedReferences.map((ref) => (
                  <div key={ref.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
                    <div className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ref.category === 'Core Theory' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' :
                          ref.category === 'Methodology' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' :
                          ref.category === 'Stakeholder Analysis' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                          ref.category === 'Governance' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300' :
                          ref.category === 'Implementation' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300'
                        }`}>
                          {ref.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{ref.type}</span>
                      </div>
                      
                      <h5 className="text-xs font-semibold text-gray-900 dark:text-white mb-1 leading-tight">
                        {ref.title}
                      </h5>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                        {ref.authors} ({ref.year})
                      </p>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {ref.journal && (
                          <span className="italic">{ref.journal}</span>
                        )}
                        {ref.book && (
                          <span>In: <span className="italic">{ref.book}</span>, {ref.publisher}</span>
                        )}
                        {ref.conference && (
                          <span className="italic">{ref.conference}</span>
                        )}
                        {ref.volume && <span>, {ref.volume}</span>}
                        {ref.number && <span>({ref.number})</span>}
                        {ref.pages && <span>, {ref.pages}</span>}
                      </div>
                      
                      {ref.doi && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 mb-2 font-mono">
                          DOI: {ref.doi}
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-600">
                        <span className="font-medium">Relevance: </span>
                        {ref.relevance}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
