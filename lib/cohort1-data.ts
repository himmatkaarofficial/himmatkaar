export interface SessionPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface Mentor {
  id: string;
  name: string;
  initials: string;
  role: string;
  expertise: string;
  photoUrl: string;
  bio: string;
}

export interface CohortSession {
  id: string;
  sessionNumber: number;
  title: string;
  category: string;
  date: string;
  time: string;
  status: 'Completed';
  mentor: Mentor;
  summary: string;
  keyTakeaways: string[];
  sessionPhotos: SessionPhoto[];
  resources?: { name: string; type: string; url: string }[];
}

export const COHORT_1_SESSIONS: CohortSession[] = [
  {
    id: "session-1",
    sessionNumber: 1,
    title: "Career Purpose & Personal Growth Path",
    category: "Career Development",
    date: "October 12, 2024",
    time: "10:00 AM - 1:00 PM",
    status: "Completed",
    mentor: {
      id: "sipehre-shamsi",
      name: "Sipehre Shamsi",
      initials: "SS",
      role: "Lead Facilitator",
      expertise: "Career Development & Professional Growth",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      bio: "Lead Facilitator with over 10 years of experience guiding young professionals to discover their core purpose, set achievable career milestones, and navigate transition periods with confidence."
    },
    summary: "An inspiring foundational session focused on aligning personal values with career goals, overcoming imposter syndrome, and crafting a strategic 3-year growth roadmap.",
    keyTakeaways: [
      "Identifying personal core values and non-negotiable career principles",
      "Building a structured 3-year career progression blueprint",
      "Strategies to overcome imposter syndrome during early career stages",
      "Setting actionable weekly goals for continuous personal development"
    ],
    sessionPhotos: [
      {
        id: "p1-1",
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
        caption: "Interactive breakout group activity on career goal mapping"
      },
      {
        id: "p1-2",
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        caption: "Mentors guiding cohort participants during personal purpose workshops"
      },
      {
        id: "p1-3",
        url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
        caption: "Participant presentations of individual 3-year growth statements"
      }
    ],
    resources: [
      { name: "Career Purpose Workbook.pdf", type: "PDF", url: "#" },
      { name: "Personal Growth Roadmap Template.xlsx", type: "Excel", url: "#" }
    ]
  },
  {
    id: "session-2",
    sessionNumber: 2,
    title: "Public Speaking & Soft Skills Masterclass",
    category: "Communication",
    date: "October 16, 2024",
    time: "2:00 PM - 5:00 PM",
    status: "Completed",
    mentor: {
      id: "aimen-shahid",
      name: "Aimen Shahid",
      initials: "AS",
      role: "Program Facilitator",
      expertise: "Communication & Soft Skills",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      bio: "Communications expert specializing in interpersonal dynamics, executive presentation skills, and active listening strategies for modern team environments."
    },
    summary: "Hands-on session designed to boost public speaking confidence, master non-verbal cues, and communicate complex ideas clearly in high-stakes settings.",
    keyTakeaways: [
      "Structuring compelling oral presentations using story arcs",
      "Mastering vocal tone, body language, and eye contact",
      "Overcoming speech anxiety through practical breath control exercises",
      "Active listening techniques for collaborative team discussions"
    ],
    sessionPhotos: [
      {
        id: "p2-1",
        url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
        caption: "Live stage practice session with peer feedback"
      },
      {
        id: "p2-2",
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
        caption: "Aimen Shahid demonstrating body language techniques"
      },
      {
        id: "p2-3",
        url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
        caption: "Group communication exercise in progress"
      }
    ],
    resources: [
      { name: "Public Speaking Checklist.pdf", type: "PDF", url: "#" },
      { name: "Presentation Deck Design Guide.pdf", type: "PDF", url: "#" }
    ]
  },
  {
    id: "session-3",
    sessionNumber: 3,
    title: "Corporate Dynamics & Workplace Etiquette",
    category: "Corporate Readiness",
    date: "October 20, 2024",
    time: "11:00 AM - 2:00 PM",
    status: "Completed",
    mentor: {
      id: "frasat-tanveer",
      name: "Frasat Tanveer",
      initials: "FT",
      role: "Industry Mentor",
      expertise: "Corporate Readiness & Workplace Skills",
      photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
      bio: "Corporate strategist and industry veteran helping students bridge the gap between academic theory and practical corporate expectations."
    },
    summary: "Comprehensive guide to corporate culture, office etiquette, cross-functional collaboration, and maintaining high performance under tight deadlines.",
    keyTakeaways: [
      "Understanding corporate hierarchy, reporting channels, and ethics",
      "Professional email writing and async communication standards",
      "Time management and task prioritization in corporate settings",
      "Managing up: How to communicate effectively with managers and stakeholders"
    ],
    sessionPhotos: [
      {
        id: "p3-1",
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
        caption: "Frasat leading a corporate scenario roleplay session"
      },
      {
        id: "p3-2",
        url: "https://images.unsplash.com/photo-1542744847-c1c002951910?auto=format&fit=crop&w=800&q=80",
        caption: "Participants reviewing corporate case studies in teams"
      }
    ],
    resources: [
      { name: "Corporate Etiquette Playbook.pdf", type: "PDF", url: "#" },
      { name: "Email Templates for Professionals.docx", type: "Word", url: "#" }
    ]
  },
  {
    id: "session-4",
    sessionNumber: 4,
    title: "Research & Problem-Solving Strategies",
    category: "Academic & Research",
    date: "October 24, 2024",
    time: "3:00 PM - 6:00 PM",
    status: "Completed",
    mentor: {
      id: "dr-ahmad",
      name: "Dr. Ahmad",
      initials: "DA",
      role: "Academic Advisor",
      expertise: "Research & Academic Excellence",
      photoUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
      bio: "Renowned academic advisor dedicated to training young minds in data-backed decision making, analytical problem solving, and research methodologies."
    },
    summary: "Deep-dive workshop on structured problem solving, data synthesis, evidence-backed arguments, and academic rigor applied to real-world challenges.",
    keyTakeaways: [
      "First-principles thinking for complex problem decomposition",
      "Evaluating data sources and avoiding cognitive biases",
      "Structuring research reports for corporate and academic readers",
      "Formulating hypothesis-driven solutions to business bottlenecks"
    ],
    sessionPhotos: [
      {
        id: "p4-1",
        url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
        caption: "Dr. Ahmad explaining first-principles problem solving"
      },
      {
        id: "p4-2",
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
        caption: "Collaborative research framework mapping on whiteboards"
      }
    ],
    resources: [
      { name: "Research Methodology Guide.pdf", type: "PDF", url: "#" },
      { name: "Problem Solving Matrix.xlsx", type: "Excel", url: "#" }
    ]
  },
  {
    id: "session-5",
    sessionNumber: 5,
    title: "Resume Building & Interview Mastery",
    category: "Career Coaching",
    date: "October 28, 2024",
    time: "10:00 AM - 1:00 PM",
    status: "Completed",
    mentor: {
      id: "ubaid-afzal",
      name: "Ubaid Afzal",
      initials: "UA",
      role: "Career Coach",
      expertise: "Job Search & Interview Preparation",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      bio: "Experienced talent acquisition specialist and career coach who has conducted 500+ interviews across top tech and enterprise organizations."
    },
    summary: "Actionable boot-camp on crafting ATS-optimized resumes, tackling behavioral interview questions with the STAR framework, and salary negotiation skills.",
    keyTakeaways: [
      "Formatting resumes to clear Applicant Tracking Systems (ATS)",
      "Answering behavioral questions using the STAR technique (Situation, Task, Action, Result)",
      "Conducting live mock interviews with constructive mentor feedback",
      "Navigating job offers and salary negotiation basics"
    ],
    sessionPhotos: [
      {
        id: "p5-1",
        url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
        caption: "Live 1-on-1 mock interview demonstration"
      },
      {
        id: "p5-2",
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
        caption: "Ubaid reviewing participant CVs line by line"
      }
    ],
    resources: [
      { name: "ATS Resume Master Template.docx", type: "Word", url: "#" },
      { name: "STAR Method Interview Prep Guide.pdf", type: "PDF", url: "#" }
    ]
  },
  {
    id: "session-6",
    sessionNumber: 6,
    title: "AI & Digital Tools for Workplace Productivity",
    category: "Technology",
    date: "November 02, 2024",
    time: "2:00 PM - 5:00 PM",
    status: "Completed",
    mentor: {
      id: "dr-hammad-armaghan",
      name: "Dr. Hammad Armaghan",
      initials: "DHA",
      role: "Technical Mentor",
      expertise: "Technology & Innovation",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      bio: "Tech innovator and researcher specializing in practical AI applications, digital transformation tools, and workflow automation for modern workplaces."
    },
    summary: "Hands-on session uncovering modern AI assistants, prompt engineering techniques, and workflow automation to supercharge daily productivity.",
    keyTakeaways: [
      "Effective prompt engineering patterns for ChatGPT, Claude, and Copilot",
      "Automating repetitive office tasks using No-Code & AI integrations",
      "Leveraging AI for research, summary generation, and data formatting",
      "Ethical AI usage guidelines and data security awareness"
    ],
    sessionPhotos: [
      {
        id: "p6-1",
        url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
        caption: "Hands-on AI prompt engineering lab with Dr. Hammad"
      },
      {
        id: "p6-2",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        caption: "Participants building automated workflows during the lab"
      }
    ],
    resources: [
      { name: "AI Prompt Engineering Handbook.pdf", type: "PDF", url: "#" },
      { name: "Workplace Automation Toolkit.pdf", type: "PDF", url: "#" }
    ]
  },
  {
    id: "session-7",
    sessionNumber: 7,
    title: "Personal Branding & LinkedIn Studio",
    category: "Personal Branding",
    date: "November 06, 2024",
    time: "11:00 AM - 2:00 PM",
    status: "Completed",
    mentor: {
      id: "rameen-anwar",
      name: "Rameen Anwar",
      initials: "RA",
      role: "Branding Specialist",
      expertise: "Personal Branding & Digital Presence",
      photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      bio: "Digital strategist helping ambitious individuals craft authentic personal brands, optimize online profiles, and position themselves as industry leaders."
    },
    summary: "Interactive workshop focused on defining your unique value proposition, writing engaging content, and optimizing LinkedIn profiles for recruiter reach.",
    keyTakeaways: [
      "Defining your personal brand pillar and core narrative",
      "Step-by-step LinkedIn profile overhaul (Headline, About, Featured)",
      "Content creation strategy: Writing impactful posts and articles",
      "Engaging with industry leaders and building online authority"
    ],
    sessionPhotos: [
      {
        id: "p7-1",
        url: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800&q=80",
        caption: "Rameen analyzing live LinkedIn profile makeovers"
      },
      {
        id: "p7-2",
        url: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80",
        caption: "Cohort members drafting personal headline statements"
      }
    ],
    resources: [
      { name: "LinkedIn Profile Checklist.pdf", type: "PDF", url: "#" },
      { name: "30-Day Content Ideas Calendar.xlsx", type: "Excel", url: "#" }
    ]
  },
  {
    id: "session-8",
    sessionNumber: 8,
    title: "Strategic Professional Networking",
    category: "Networking",
    date: "November 10, 2024",
    time: "3:00 PM - 6:00 PM",
    status: "Completed",
    mentor: {
      id: "awais-khan",
      name: "Awais Khan",
      initials: "AK",
      role: "Networking Coach",
      expertise: "Professional Networking & Connections",
      photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      bio: "Connection strategist specializing in genuine network building, cold outreach mastery, and informational interview techniques for career growth."
    },
    summary: "Practical session on building authentic professional relationships, cold emailing industry leaders, and turning casual contacts into career mentors.",
    keyTakeaways: [
      "Crafting high-response cold emails & LinkedIn messages",
      "Conducting effective informational interviews with senior leaders",
      "Nurturing long-term professional relationships beyond transactional asks",
      "Event networking strategies: How to work a room with confidence"
    ],
    sessionPhotos: [
      {
        id: "p8-1",
        url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
        caption: "Speed networking activity during Awais Khan's session"
      },
      {
        id: "p8-2",
        url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
        caption: "Participants practicing cold outreach templates"
      }
    ],
    resources: [
      { name: "Cold Outreach Message Templates.pdf", type: "PDF", url: "#" },
      { name: "Informational Interview Question List.pdf", type: "PDF", url: "#" }
    ]
  }
];
