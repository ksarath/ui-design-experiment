export type ReviewComment = {
    id: string;
    line: number;
    type: string;
    blockId: string;
    category: string;
    review: string;
    originalText: string;
    context: {
        name: string;
        citation?: string;
        title?: string;
        link?: string;
    }[];
};

export type ManuscriptBlock =
  | { type: 'h1' | 'h2' | 'h3'; content: string; blockId: string }
  | { type: 'p'; content: string; blockId: string };

export const fileName = "Accident Analysis and Prevention.pdf";
export const fileType = "PDF";
export const extractedText: ManuscriptBlock[] = [
  { type: 'h1', content: 'Abstract', blockId: '1' },
  { type: 'p' , content: 'This study examines the effectiveness of digital learning platforms in enhancing student, engagement in higher education. Through a comprehensive analysis of student performance, data, we aimed to understand the correlation between digital tool usage and academic, outcomes. The study involved 150 undergraduate students across three universities.', blockId: '2' },

  { type: 'h1', content: 'Safe System Approach Manuscript', blockId: '3' },

  { type: 'h2', content: 'Introduction', blockId: '4' },
  { type: 'p', content: 'The Safe System Approach to road safety is grounded in the principle of shared responsibility.', blockId: '5' },
  { type: 'p', content: 'This approach forms the foundation of the United Nations Global Plan for the Decade of Action for Road Safety (2021–2030) (WHO, 2021) and is strongly supported by thought-leading organisations (e.g., Bliss and Breen, 2009; OECD, 2016).', blockId: '6' },
  { type: 'p', content: 'Some recent evidence suggests this approach has been effective for improving road safety outcomes (Elvik, 2023; Elvik and Nævestad, 2023; Khan and Das, 2024).', blockId: '7' },

  { type: 'h2', content: 'Rationale', blockId: '8' },
  { type: 'p', content: 'Investigating practices, perceptions, and challenges regarding responsibility attribution within this specific policy area is therefore an important step towards advancing speed management.', blockId: '9' },
  { type: 'p', content: 'Sharing responsibility for speed management requires a shift in the mindset of those involved in improving safety within the road system, as responsibility for (speed-related) road crash occurrence has traditionally been attributed to road users.', blockId: '10' },
  { type: 'p', content: 'It also entails moving away from traditional governance models, where policies are expected to be dictated solely by governments.', blockId: '11' },

  { type: 'h2', content: 'Study Aim', blockId: '12' },
  { type: 'p', content: 'This research study aims to contribute to addressing this gap in the literature by studying how the concept of shared responsibility is perceived across stakeholders involved in speed management utilising systems thinking.', blockId: '13' },
  { type: 'p', content: 'This innovative governance arrangement remains insufficiently studied and potentially may be being adopted by jurisdictions as part of a larger package (i.e., the Safe System Approach), at times without clear understanding. This situation is likely to bring about difficulties in putting the concept into practice.', blockId: '14' },

  { type: 'h2', content: 'Systems Thinking and Road Safety', blockId: '15' },
  { type: 'p', content: 'This involves identifying the most important elements and interactions that give shape to the system under study, and only then reflecting on how the system might be modified to avoid certain problems.', blockId: '16' },
  { type: 'p', content: 'The adoption of a systems (thinking) approach to road safety is not new, but nevertheless is not mainstream within the road safety arena, even despite its increasing popularity in closely related disciplines such as public health (e.g., Carey et al., 2015; Johnson et al., 2019; WHO, 2009).', blockId: '17' },
  { type: 'p', content: 'Different authors have explored a systems thinking approach to road safety over the last decade (e.g., Lansdown et al., 2015; Newnam et al., 2017; Salmon et al., 2020).', blockId: '18' },

  { type: 'h2', content: 'Data Collection & Methods (excerpt)', blockId: '19' },
  { type: 'p', content: 'The semi-structured format enabled in-depth conversations, allowing participants to articulate their views using their own language and framings.', blockId: '20' },
  { type: 'p', content: 'This flexibility was particularly valuable for unpacking perceptions around the concept of responsibility as applied in practice in the field of speed management.', blockId: '21' },
  { type: 'p', content: 'Seven interviews were conducted in person, three responses to the questions were submitted in written form by email, and 23 were held virtually.', blockId: '22' },

  { type: 'h3', content: 'Analysis', blockId: '23' },
  { type: 'p', content: 'Interviews were conducted and transcribed by the first author and deidentified prior to analysis.', blockId: '24' },
  { type: 'p', content: 'A preliminary open coding was conducted by the first author to familiarise herself with the data and to build a preliminary understanding of its content. NVivo 12 software is utilised for this first step.', blockId: '25' },
  { type: 'p', content: 'A RTA of the complete data corpus (n = 33) was undertaken following the steps pragmatically outlined by Braun and Clarke (2006)...', blockId: '26' },

  { type: 'h2', content: 'Findings (selected excerpts)', blockId: '27' },
  { type: 'p', content: 'Furthermore, its practical implementation may at times be challenging and subject to misinterpretation.', blockId: '28' },
  { type: 'p', content: 'Our findings also suggest jurisdictions claiming to follow a Safe System Approach may adopt its principles to varying degrees, closer to a spectrum than to a binary classification.', blockId: '29' },
  { type: 'p', content: 'Elvik (2023) reached a similar conclusion after examining Norway’s road safety policy and contrasting it with an operationalised definition of perfect compliance with Safe System principles.', blockId: '30' },

  { type: 'h2', content: 'Theme 4 — Governance & Accountability', blockId: '31' },
  { type: 'p', content: 'Properly accounting for these factors could shift the balance in favour of lower speed limits, according to this participant.', blockId: '32' },
  { type: 'p', content: '3.4 Theme 4: This examines the need to reassess the governance of speed management in relation to stakeholders’ accountability, roles, responsibilities, and the transparency of policy processes', blockId: '33' },
  { type: 'p', content: 'This theme encompasses a range of perspectives shared by participants, reflecting the notion of an evolving governance framework for speed management. Discussions focused on claims for expanding the current stakeholder map (Subtheme 4.1), on efforts to ensure stakeholders take responsibility for improving speed management (Subtheme 4.2), and claims for revisiting and improving the allocation of responsibilities, strengthening accountability mechanisms, and increasing transparency in managing this critical policy issue.', blockId: '34' },
  { type: 'p', content: 'Subtheme 4.1: Shared desires for a broader stakeholder map.', blockId: '35' },

  { type: 'h2', content: 'Stakeholder Engagement (excerpt)', blockId: '36' },
  { type: 'p', content: 'Local schools were emphasised as crucial stakeholders, with parent and citizen associations being potential advocates for safer, slower speeds and alternative transportation modes.', blockId: '37' },
  { type: 'p', content: 'Some participants further noted that certain actors were actively attempting to be recognised as legitimate stakeholders but encountered barriers in gaining acknowledgment and influence.', blockId: '38' },
  { type: 'p', content: 'For example, companies were described as being active in this area within the Australian context, but some participants did not perceive there were significant engagement efforts currently taking place with this stakeholder:', blockId: '39' },

  { type: 'h2', content: 'Related Work', blockId: '40' },
  { type: 'p', content: 'Recognising these underlying interests and exploring ways to foster alignment is thus a critical first step towards creating a self-reinforcing collaborative governance network (Emerson et al., 2012).', blockId: '41' },
  { type: 'p', content: 'See Keller et al., 2025, “Actors, roles and responsibilities for speed management: A systems-based analysis of key stakeholders in Sweden and Queensland, Australia”, submitted to Safety Science for publication, for a discussion on this topic.', blockId: '42' },
  { type: 'p', content: 'Participants reported a trade-off between transport...', blockId: '43' },

  { type: 'h2', content: 'Policy Framing & Conclusion (excerpt)', blockId: '44' },
  { type: 'p', content: 'As a result, problem framing affects not only policy choices but also governance arrangements and the distribution of responsibility among stakeholders.', blockId: '45' },
  { type: 'p', content: 'Policy framing often strategically advances stakeholders’ (sometimes concealed) interests (Bacchi, 2009).', blockId: '46' },
  { type: 'p', content: 'Theme 3: Shared responsibility for speed management is enhanced by the alignment of stakeholder goals.', blockId: '47' },
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

export const reviewComments: ReviewComment[] = [
  {
    "id": "RC001",
    "line": 2,
    "category": "Major",
    "type": "Originality",
    "blockId": '2',
    "review": "The manuscript addresses the under-explored topic of shared responsibility in speed management, but the abstract and introduction do not clearly articulate the novel contributions of the study. Please clarify how this work advances current knowledge.",
    "originalText": "This study examines the effectiveness of digital learning platforms in enhancing student, engagement in higher education. Through a comprehensive analysis of student performance, data, we aimed to understand the correlation between digital tool usage and academic, outcomes.",
    "context": [
      {
        "name": "Introduction",
      }
    ]
  },
  {
    "id": "RC002",
    "line": 24,
    "blockId": '20',
    "category": "Major",
    "type": "Replicability",
    "review": "The methods section lacks sufficient detail for replication. Please provide more information about the development of the interview guide, recruitment criteria, and analytical procedures beyond preliminary coding.",
    "originalText": "The semi-structured format enabled in-depth conversations, allowing participants to articulate their views using their own language and framings.",
    "context": [
      {
        "name": "Data Collection & Methods",
      }
    ]
  },
  {
    "id": "RC003",
    "line": 44,
    "blockId": '28',
    "category": "Major",
    "type": "Completeness",
    "review": "The findings section references selected excerpts but does not present a systematic summary of all major themes or subthemes. Please ensure that all identified themes are described with supporting evidence and analysis.",
    "originalText": "Furthermore, its practical implementation may at times be challenging and subject to misinterpretation.",
    "context": [
      {
        "name": "Findings",
      }
    ]
  },
  {
    "id": "RC004",
    "line": 17,
    "blockId": '9',
    "category": "Major",
    "type": "Soundness",
    "review": "The rationale for focusing on speed management as a case study for shared responsibility is stated, but the theoretical framework (systems thinking) is not sufficiently integrated throughout the analysis. Strengthen the connection between theory and empirical findings.",
    "originalText": "Investigating practices, perceptions, and challenges regarding responsibility attribution within this specific policy area is therefore an important step towards advancing speed management.",
    "context": [
      {
        "name": "Rationale",
      }
    ]
  },
  {
    "id": "RC005",
    "line": 60,
    "blockId": '45',
    "category": "Major",
    "type": "Substance",
    "review": "The discussion and conclusion sections are brief and do not fully address the implications of the findings for policy, practice, or future research. Please expand these sections to provide more substantive insights.",
    "originalText": "As a result, problem framing affects not only policy choices but also governance arrangements and the distribution of responsibility among stakeholders.",
    "context": [
      {
        "name": "Policy Framing & Conclusion",
      }
    ]
  },
  {
    "id": "RC006",
    "line": 50,
    "blockId": '30',
    "category": "Major",
    "type": "Meaningful Comparison",
    "review": "The manuscript references prior studies but does not systematically compare its findings with those of previous research. A more explicit comparison with related work would strengthen the manuscript.",
    "originalText": "Elvik (2023) reached a similar conclusion after examining Norway’s road safety policy and contrasting it with an operationalised definition of perfect compliance with Safe System principles.",
    "context": [
      {
        "name": "Findings",
        "citation": "Elvik, 2023"
      }
    ]
  },
  {
    "id": "RC007",
    "line": 56,
    "blockId": '42',
    "category": "Major",
    "type": "References",
    "review": "The citation of Keller et al., 2025 as 'submitted' is problematic for peer review and for readers. Please ensure all cited works are either published or available as preprints.",
    "originalText": "See Keller et al., 2025, “Actors, roles and responsibilities for speed management: A systems-based analysis of key stakeholders in Sweden and Queensland, Australia”, submitted to Safety Science for publication, for a discussion on this topic.",
    "context": [
      {
        "name": "Related Work",
        "citation": "Keller et al., 2025"
      }
    ]
  },
  {
    "id": "RC008",
    "line": 10,
    "blockId": '32',
    "category": "Minor",
    "type": "Structure and Flow",
    "review": "The manuscript would benefit from clearer section headings and transitions between sections. For example, the jump from 'Theme 4 — Governance & Accountability' to 'Stakeholder Engagement (excerpt)' is abrupt.",
    "originalText": "Properly accounting for these factors could shift the balance in favour of lower speed limits, according to this participant.",
    "context": [
      {
        "name": "Theme 4 — Governance & Accountability",
      }
    ]
  },
  {
    "id": "RC009",
    "line": 53,
    "blockId": '33',
    "category": "Minor",
    "type": "Structure and Flow",
    "review": "Numbering of themes and subthemes is inconsistent (e.g., '3.4 Theme 4' and 'Subtheme 4.1'). Please revise for clarity and consistency.",
    "originalText": "3.4 Theme 4: This examines the need to reassess the governance of speed management in relation to stakeholders’ accountability, roles, responsibilities, and the transparency of policy processes",
    "context": [
      {
        "name": "Theme 4",
      }
    ]
  },
  {
    "id": "RC010",
    "line": 24,
    "blockId": '34',
    "category": "Minor",
    "type": "Readability",
    "review": "Some sentences are overly long and complex, reducing readability. Consider breaking these into shorter sentences.",
    "originalText": "This theme encompasses a range of perspectives shared by participants, reflecting the notion of an evolving governance framework for speed management. Discussions focused on claims for expanding the current stakeholder map (Subtheme 4.1), on efforts to ensure stakeholders take responsibility for improving speed management (Subtheme 4.2), and claims for revisiting and improving the allocation of responsibilities, strengthening accountability mechanisms, and increasing transparency in managing this critical policy issue.",
    "context": [
      {
        "name": "Theme 4 — Governance & Accountability",
      }
    ]
  },
  {
    "id": "RC011",
    "line": 29,
    "blockId": '25',
    "category": "Minor",
    "type": "Tense Consistency",
    "review": "Tense usage is inconsistent in the methods section ('NVivo 12 software is utilised...' vs. past tense elsewhere). Please revise for tense consistency.",
    "originalText": "A preliminary open coding was conducted by the first author to familiarise herself with the data and to build a preliminary understanding of its content. NVivo 12 software is utilised for this first step.",
    "context": [
      {
        "name": "Analysis",
      }
    ]
  },
  {
    "id": "RC012",
    "line": 26,
    "blockId": '21',
    "category": "Minor",
    "type": "Clarity",
    "review": "The manuscript sometimes uses vague phrases (e.g., 'This flexibility was particularly valuable for unpacking perceptions...'). Specify what was unpacked and how.",
    "originalText": "This flexibility was particularly valuable for unpacking perceptions around the concept of responsibility as applied in practice in the field of speed management.",
    "context": [
      {
        "name": "Data Collection & Methods",
      }
    ]
  },
  {
    "id": "RC013",
    "line": 2,
    "blockId": '2',
    "category": "Minor",
    "type": "Punctuation",
    "review": "There are several comma splices and unnecessary commas (e.g., 'student, engagement,' 'performance, data,' 'academic, outcomes' in the abstract). Please review for correct punctuation.",
    "originalText": "This study examines the effectiveness of digital learning platforms in enhancing student, engagement in higher education. Through a comprehensive analysis of student performance, data, we aimed to understand the correlation between digital tool usage and academic, outcomes.",
    "context": [
      {
        "name": "Abstract",
      }
    ]
  },
  {
    "id": "RC014",
    "line": 62,
    "blockId": '38',
    "category": "Minor",
    "type": "Readability",
    "review": "Some sentences could be streamlined for clarity and conciseness (e.g., 'Some participants further noted that certain actors were actively attempting to be recognised as legitimate stakeholders but encountered barriers in gaining acknowledgment and influence').",
    "originalText": "Some participants further noted that certain actors were actively attempting to be recognised as legitimate stakeholders but encountered barriers in gaining acknowledgment and influence.",
    "context": [
      {
        "name": "Stakeholder Engagement",
      }
    ]
  },
  {
    "id": "RC015",
    "line": 38,
    "blockId": '17',
    "category": "Minor",
    "type": "Flow",
    "review": "The manuscript occasionally introduces concepts (e.g., systems thinking, policy framing) without adequate transition or explanation. Ensure each concept is clearly introduced and connected to the preceding discussion.",
    "originalText": "The adoption of a systems (thinking) approach to road safety is not new, but nevertheless is not mainstream within the road safety arena, even despite its increasing popularity in closely related disciplines such as public health (e.g., Carey et al., 2015; Johnson et al., 2019; WHO, 2009).",
    "context": [
      {
        "name": "Systems Thinking and Road Safety",
        "citation": "Carey et al., 2015;",
        "title": "Systems science and systems thinking for public health: A systematic review of the field ",
        "link": "https://www.sciencedirect.com/science/article/pii/S0277953615003098",
      },
      {
        "name": "Systems Thinking and Road Safety",
        "citation": "Johnson et al., 2019;",
        "title": "Applying systems thinking to public health: A systematic literature review",
        "link": "https://onlinelibrary.wiley.com/doi/full/10.1002/sres.2580",
      },
      {
        "name": "Systems Thinking and Road Safety",
        "citation": "WHO, 2009",
        "title": "Systems thinking for health systems strengthening",
        "link": "https://apps.who.int/iris/handle/10665/44204",
      }
    ]
  }
];