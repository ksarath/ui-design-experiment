export type ReviewComment = {
    id: string;
    line: number;
    type: string;
    category: string;
    message: string;
    originalText: string;
    context: {
        before: string[];
        after: string[];
    };
};

export type ManuscriptBlock =
  | { type: 'h1' | 'h2' | 'h3'; content: string; blockId?: string }
  | { type: 'p'; content: string; blockId?: string };

export const fileName = "Accident Analysis and Prevention.pdf";
export const fileType = "PDF";
export const extractedText: ManuscriptBlock[] = [
  { type: 'h1', content: 'Abstract'},
  { type: 'p' , content: 'This study examines the effectiveness of digital learning platforms in enhancing student, engagement in higher education. Through a comprehensive analysis of student performance, data, we aimed to understand the correlation between digital tool usage and academic, outcomes. The study involved 150 undergraduate students across three universities.'},

  { type: 'h1', content: 'Safe System Approach Manuscript' },

  { type: 'h2', content: 'Introduction' },
  { type: 'p', content: 'The Safe System Approach to road safety is grounded in the principle of shared responsibility.' },
  { type: 'p', content: 'This approach forms the foundation of the United Nations Global Plan for the Decade of Action for Road Safety (2021–2030) (WHO, 2021) and is strongly supported by thought-leading organisations (e.g., Bliss and Breen, 2009; OECD, 2016).', blockId: 'p7' },
  { type: 'p', content: 'Some recent evidence suggests this approach has been effective for improving road safety outcomes (Elvik, 2023; Elvik and Nævestad, 2023; Khan and Das, 2024).' },

  { type: 'h2', content: 'Rationale' },
  { type: 'p', content: 'Investigating practices, perceptions, and challenges regarding responsibility attribution within this specific policy area is therefore an important step towards advancing speed management.' },
  { type: 'p', content: 'Sharing responsibility for speed management requires a shift in the mindset of those involved in improving safety within the road system, as responsibility for (speed-related) road crash occurrence has traditionally been attributed to road users.', blockId: 'p1' },
  { type: 'p', content: 'It also entails moving away from traditional governance models, where policies are expected to be dictated solely by governments.' },

  { type: 'h2', content: 'Study Aim' },
  { type: 'p', content: 'This research study aims to contribute to addressing this gap in the literature by studying how the concept of shared responsibility is perceived across stakeholders involved in speed management utilising systems thinking.' },
  { type: 'p', content: 'This innovative governance arrangement remains insufficiently studied and potentially may be being adopted by jurisdictions as part of a larger package (i.e., the Safe System Approach), at times without clear understanding. This situation is likely to bring about difficulties in putting the concept into practice.', blockId: 'p6' },

  { type: 'h2', content: 'Systems Thinking and Road Safety' },
  { type: 'p', content: 'This involves identifying the most important elements and interactions that give shape to the system under study, and only then reflecting on how the system might be modified to avoid certain problems.' },
  { type: 'p', content: 'The adoption of a systems (thinking) approach to road safety is not new, but nevertheless is not mainstream within the road safety arena, even despite its increasing popularity in closely related disciplines such as public health (e.g., Carey et al., 2015; Johnson et al., 2019; WHO, 2009).', blockId: 'p8' },
  { type: 'p', content: 'Different authors have explored a systems thinking approach to road safety over the last decade (e.g., Lansdown et al., 2015; Newnam et al., 2017; Salmon et al., 2020).' },

  { type: 'h2', content: 'Data Collection & Methods (excerpt)' },
  { type: 'p', content: 'The semi-structured format enabled in-depth conversations, allowing participants to articulate their views using their own language and framings.' },
  { type: 'p', content: 'This flexibility was particularly valuable for unpacking perceptions around the concept of responsibility as applied in practice in the field of speed management.', blockId: 'p9' },
  { type: 'p', content: 'Seven interviews were conducted in person, three responses to the questions were submitted in written form by email, and 23 were held virtually.' },

  { type: 'h3', content: 'Analysis' },
  { type: 'p', content: 'Interviews were conducted and transcribed by the first author and deidentified prior to analysis.' },
  { type: 'p', content: 'A preliminary open coding was conducted by the first author to familiarise herself with the data and to build a preliminary understanding of its content. NVivo 12 software is utilised for this first step.', blockId: 'p2' },
  { type: 'p', content: 'A RTA of the complete data corpus (n = 33) was undertaken following the steps pragmatically outlined by Braun and Clarke (2006)...' },

  { type: 'h2', content: 'Findings (selected excerpts)' },
  { type: 'p', content: 'Furthermore, its practical implementation may at times be challenging and subject to misinterpretation.' },
  { type: 'p', content: 'Our findings also suggest jurisdictions claiming to follow a Safe System Approach may adopt its principles to varying degrees, closer to a spectrum than to a binary classification.', blockId: 'p3' },
  { type: 'p', content: 'Elvik (2023) reached a similar conclusion after examining Norway’s road safety policy and contrasting it with an operationalised definition of perfect compliance with Safe System principles.' },

  { type: 'h2', content: 'Theme 4 — Governance & Accountability' },
  { type: 'p', content: 'Properly accounting for these factors could shift the balance in favour of lower speed limits, according to this participant.' },
  { type: 'p', content: '3.4 Theme 4: This examines the need to reassess the governance of speed management in relation to stakeholders’ accountability, roles, responsibilities, and the transparency of policy processes', blockId: 'p4' },
  { type: 'p', content: 'This theme encompasses a range of perspectives shared by participants, reflecting the notion of an evolving governance framework for speed management. Discussions focused on claims for expanding the current stakeholder map (Subtheme 4.1), on efforts to ensure stakeholders take responsibility for improving speed management (Subtheme 4.2), and claims for revisiting and improving the allocation of responsibilities, strengthening accountability mechanisms, and increasing transparency in managing this critical policy issue.', blockId: 'p10' },
  { type: 'p', content: 'Subtheme 4.1: Shared desires for a broader stakeholder map.' },

  { type: 'h2', content: 'Stakeholder Engagement (excerpt)' },
  { type: 'p', content: 'Local schools were emphasised as crucial stakeholders, with parent and citizen associations being potential advocates for safer, slower speeds and alternative transportation modes.' },
  { type: 'p', content: 'Some participants further noted that certain actors were actively attempting to be recognised as legitimate stakeholders but encountered barriers in gaining acknowledgment and influence.', blockId: 'p11' },
  { type: 'p', content: 'For example, companies were described as being active in this area within the Australian context, but some participants did not perceive there were significant engagement efforts currently taking place with this stakeholder:' },

  { type: 'h2', content: 'Related Work' },
  { type: 'p', content: 'Recognising these underlying interests and exploring ways to foster alignment is thus a critical first step towards creating a self-reinforcing collaborative governance network (Emerson et al., 2012).' },
  { type: 'p', content: 'See Keller et al., 2025, “Actors, roles and responsibilities for speed management: A systems-based analysis of key stakeholders in Sweden and Queensland, Australia”, submitted to Safety Science for publication, for a discussion on this topic.', blockId: 'p5' },
  { type: 'p', content: 'Participants reported a trade-off between transport...' },

  { type: 'h2', content: 'Policy Framing & Conclusion (excerpt)' },
  { type: 'p', content: 'As a result, problem framing affects not only policy choices but also governance arrangements and the distribution of responsibility among stakeholders.' },
  { type: 'p', content: 'Policy framing often strategically advances stakeholders’ (sometimes concealed) interests (Bacchi, 2009).', blockId: 'p12' },
  { type: 'p', content: 'Theme 3: Shared responsibility for speed management is enhanced by the alignment of stakeholder goals.' },
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
      id: "1",
      line: 8,
      type: "major",
      category: "Language",
      message:
        "Long sentence reduces readability; consider breaking into two shorter sentences.",
      originalText:
        "Sharing responsibility for speed management requires a shift in the mindset of those involved in improving safety within the road system, as responsibility for (speed-related) road crash occurrence has traditionally been attributed to road users.",
      blockId: "p1",
      context: {
        before: [
          "Investigating practices, perceptions, and challenges regarding responsibility attribution within this specific policy area is therefore an important step towards advancing speed management.",
        ],
        after: [
          "It also entails moving away from traditional governance models, where policies are expected to be dictated solely by governments.",
        ],
      },
    },
    {
      id: "2",
      line: 23,
      type: "major",
      category: "Tense Consistency",
      message:
        "Switches between present and past tense when describing completed methodology steps.",
      originalText:
        "A preliminary open coding was conducted by the first author to familiarise herself with the data and to build a preliminary understanding of its content. NVivo 12 software is utilised for this first step.",
      blockId: "p2",
      context: {
        before: [
          "Interviews were conducted and transcribed by the first author and deidentified prior to analysis.",
        ],
        after: [
          "A RTA of the complete data corpus (n = 33) was undertaken following the steps pragmatically outlined by Braun and Clarke (2006)...",
        ],
      },
    },
    {
      id: "3",
      line: 27,
      type: "major",
      category: "Completeness",
      message:
        "Consider adding a clear limitations section to strengthen transparency.",
      originalText:
        "Our findings also suggest jurisdictions claiming to follow a Safe System Approach may adopt its principles to varying degrees, closer to a spectrum than to a binary classification.",
      blockId: "p3",
      context: {
        before: [
          "Furthermore, its practical implementation may at times be challenging and subject to misinterpretation.",
        ],
        after: [
          "Elvik (2023) reached to a similar conclusion after examining Norway’s road safety policy and contrasting it with an operationalised definition of perfect compliance with Safe System principles.",
        ],
      },
    },
    {
      id: "4",
      line: 31,
      type: "minor",
      category: "Structure",
      message:
        "Add a transition sentence to improve flow between Theme 3 and Theme 4.",
      originalText:
        "3.4 Theme 4: This examines the need to reassess the governance of speed management in relation to stakeholders’ accountability, roles, responsibilities, and the transparency of policy processes",
      blockId: "p4",
      context: {
        before: [
          "Properly accounting for these factors could shift the balance in favour of lower speed limits, according to this participant.",
        ],
        after: [
          "This theme encompasses a range of perspectives shared by participants, reflecting the notion of an evolving governance framework for speed management.",
        ],
      },
    },
    {
      id: "5",
      line: 40,
      type: "major",
      category: "References",
      message:
        "Ensure in-press or unpublished works are clearly marked to maintain transparency.",
      originalText:
        "See Keller et al., 2025, “Actors, roles and responsibilities for speed management: A systems-based analysis of key stakeholders in Sweden and Queensland, Australia”, submitted to Safety Science for publication, for a discussion on this topic.",
      blockId: "p5",
      context: {
        before: [
          "Recognising these underlying interests and exploring ways to foster alignment is thus a critical first step towards creating a self-reinforcing collaborative governance network (Emerson et al., 2012).",
        ],
        after: ["Participants reported a trade-off between transport"],
      },
    },
    {
      id: "6",
      line: 12,
      type: "enhancement",
      category: "Style",
      message:
        "Consider reducing repetition of “shared responsibility is difficult to operationalise” to improve conciseness.",
      originalText:
        "This innovative governance arrangement remains insufficiently studied and potentially may be being adopted by jurisdictions as part of a larger package (i.e., the Safe System Approach), at times without clear understanding. This situation is likely to bring about difficulties in putting the concept into practice.",
      blockId: "p6",
      context: {
        before: [
          "It also entails moving away from traditional governance models, where policies are expected to be dictated solely by governments.",
        ],
        after: [
          "This research study aims to contribute to addressing this gap in the literature by studying how the concept of shared responsibility is perceived across stakeholders involved in speed management utilising systems thinking.",
        ],
      },
    },
    {
      id: "7",
      line: 4,
      type: "minor",
      category: "Readability",
      message: "Sentence is overly long; consider splitting for clarity.",
      originalText:
        "This approach forms the foundation of the United Nations Global Plan for the Decade of Action for Road Safety (2021–2030) (WHO, 2021) and is strongly supported by thought-leading organisations (e.g., Bliss and Breen, 2009; OECD, 2016).",
      blockId: "p7",
      context: {
        before: [
          "The Safe System Approach to road safety is grounded in the principle of shared responsibility.",
        ],
        after: [
          "Some recent evidence suggests this approach has been effective for improving road safety outcomes (Elvik, 2023; Elvik and Nævestad, 2023; Khan and Das, 2024).",
        ],
      },
    },
    {
      id: "8",
      line: 15,
      type: "enhancement",
      category: "Flow",
      message:
        "Consider adding a linking phrase to connect systems thinking discussion to road safety context.",
      originalText:
        "The adoption of a systems (thinking) approach to road safety is not new, but nevertheless is not mainstream within the road safety arena, even despite its increasing popularity in closely related disciplines such as public health (e.g., Carey et al., 2015; Johnson et al., 2019; WHO, 2009).",
      blockId: "p8",
      context: {
        before: [
          "This involves identifying the most important elements and interactions that give shape to the system under study, and only then reflect on how the system might be modified to avoid certain problems.",
        ],
        after: [
          "Different authors have explored a systems thinking approach to road safety over the last decade (e.g., Lansdown et al., 2015; Newnam et al., 2017; Salmon et al., 2020).",
        ],
      },
    },
    {
      id: "9",
      line: 19,
      type: "minor",
      category: "Clarity",
      message: "Replace nominalisation with active verb for stronger impact.",
      originalText:
        "This flexibility was particularly valuable for unpacking perceptions around the concept of responsibility as applied in practice in the field of speed management.",
      blockId: "p9",
      context: {
        before: [
          "The semi-structured format enabled in-depth conversations, allowing participants to articulate their views using their own language and framings.",
        ],
        after: [
          "Seven interviews were conducted in person, three responses to the questions were submitted in written form by email, and 23 were held virtually.",
        ],
      },
    },
    {
      id: "10",
      line: 32,
      type: "minor",
      category: "Punctuation",
      message:
        "Long list is hard to follow; consider breaking into two sentences or using semicolons.",
      originalText:
        "This theme encompasses a range of perspectives shared by participants, reflecting the notion of an evolving governance framework for speed management. Discussions focused on claims for expanding the current stakeholder map (Subtheme 4.1), on efforts to ensure stakeholders take responsibility for improving speed management (Subtheme 4.2), and claims for revisiting and improving the allocation of responsibilities, strengthening accountability mechanisms, and increasing transparency in managing this critical policy issue.",
      blockId: "p10",
      context: {
        before: [
          "Building on the challenges and opportunities identified in Theme 3, Theme 4 examines the need to reassess the governance of speed management in relation to stakeholders’ accountability, roles, responsibilities, and the transparency of policy processes.",
        ],
        after: ["Subtheme 4.1: Shared desires for a broader stakeholder map."],
      },
    },
    {
      id: "11",
      line: 36,
      type: "enhancement",
      category: "Readability",
      message: "Simplify sentence structure to make point more direct.",
      originalText:
        "Some participants further noted that certain actors were actively attempting to be recognised as legitimate stakeholders but encountered barriers in gaining acknowledgment and influence.",
      blockId: "p11",
      context: {
        before: [
          "Local schools were emphasised as crucial stakeholders, with parent and citizen associations being potential advocates for safer, slower speeds and alternative transportation modes.",
        ],
        after: [
          "For example, companies were described as being active in this area within the Australian context, but some participants did not perceive there were significant engagement efforts currently taking place with this stakeholder:",
        ],
      },
    },
    {
      id: "12",
      line: 44,
      type: "minor",
      category: "Flow",
      message:
        "Add concluding sentence to reinforce study contribution before moving to next section.",
      originalText:
        "Policy framing often strategically advances stakeholders’ (sometimes concealed) interests (Bacchi, 2009).",
      blockId: "p12",
      context: {
        before: [
          "As a result, problem framing affects not only policy choices but also governance arrangements and the distribution of responsibility among stakeholders.",
        ],
        after: [
          "4.3. Theme 3: Shared responsibility for speed management is enhanced by the alignment of stakeholder goals",
        ],
      },
    },
  ];