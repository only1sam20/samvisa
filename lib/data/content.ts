export const audiences = [
  "Researchers", "Academics", "Software Engineers", "Cybersecurity Professionals", "AI Professionals",
  "Data Scientists", "Engineers", "Technology Leaders", "Senior Managers", "Executives",
  "Entrepreneurs", "Founders", "Consultants", "Healthcare Professionals", "STEM Professionals",
];

export const processSteps = [
  { title: "Initial Profile Assessment", description: "Understand your background, career achievements, memberships, publications, awards, leadership, and existing evidence.", icon: "UserRoundSearch" },
  { title: "Evidence Gap Analysis", description: "Identify your strengths, missing documentation, and the areas where more context would help tell your story.", icon: "ScanSearch" },
  { title: "Strategy Development", description: "Create a structured roadmap with clear priorities that reflect your professional goals and real achievements.", icon: "Compass" },
  { title: "Evidence Development", description: "Work on relevant visibility, publications, research dissemination, memberships, reviewing, letters, and career documentation.", icon: "Layers3" },
  { title: "Profile Organization", description: "Bring your achievements and supporting material together in a clear, consistent professional narrative.", icon: "FolderCheck" },
];

// Replace these dates and descriptions with Samuel's verified career history before publishing a detailed CV.
// These entries describe practice areas; they are editable placeholders, not claims about employers or appointments.
export const experience = [
  { title: "Professional Profile Development", period: "Dates to be added", description: "Career entry placeholder. Add verified dates and a factual description of your profile assessment, career positioning, and documentation work." },
  { title: "Extraordinary Ability Evidence Strategy", period: "Dates to be added", description: "Career entry placeholder. Add verified dates and describe your experience supporting professional evidence organization and development." },
  { title: "Professional Fellowship Support", period: "Dates to be added", description: "Career entry placeholder. Add verified dates and details of your professional Fellowship profile and documentation support." },
  { title: "Research & Scholarly Visibility", period: "Dates to be added", description: "Career entry placeholder. Add verified dates and details of your work in publication strategy and ethical research visibility." },
];

export const expertise = [
  "EB-1A Profile Strategy", "O-1A Profile Strategy", "FIET Fellowship", "FBCS Fellowship",
  "Scholarly Publishing", "Citation Strategy", "Research Visibility", "Professional Recognition",
  "Evidence Documentation", "Profile Assessment", "Career Positioning", "Recommendation Letter Strategy",
];

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  objective: string;
  areas: string[];
  outcome: string;
  isPlaceholder: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "senior-technology-professional",
    title: "Senior Technology Professional",
    category: "Extraordinary ability profile",
    objective: "Example objective: strengthen the documentation and presentation of an extraordinary-ability professional profile.",
    areas: ["Publications", "Professional memberships", "Leadership evidence", "Peer review", "Research visibility", "Recommendation strategy"],
    outcome: "Case study details will be added with client permission.",
    isPlaceholder: true,
  },
  {
    slug: "engineering-professional",
    title: "Engineering Professional",
    category: "Professional Fellowship",
    objective: "Example objective: develop a clearer account of engineering leadership and professional contribution for a Fellowship profile.",
    areas: ["Leadership", "Innovation", "Industry contribution", "Professional influence", "Supporter documentation"],
    outcome: "Case study details will be added with client permission.",
    isPlaceholder: true,
  },
  {
    slug: "research-professional",
    title: "Research Professional",
    category: "Scholarly visibility",
    objective: "Example objective: organize a publication portfolio and improve the discoverability of existing research through legitimate channels.",
    areas: ["Author identity", "Publication portfolio", "Repository visibility", "Research dissemination", "Academic networking"],
    outcome: "Case study details will be added with client permission.",
    isPlaceholder: true,
  },
];

export const faqs = [
  {
    question: "What is EB-1A profile development?",
    answer: "It is support with assessing, documenting, and presenting your professional achievements, research, recognition, and contributions. The work focuses on your professional profile and evidence. A qualified U.S. immigration attorney should advise on legal eligibility and immigration matters.",
  },
  {
    question: "Do you guarantee EB-1A approval?",
    answer: "No. Immigration outcomes are determined by U.S. immigration authorities. My services focus on professional profile development, evidence strategy, documentation, and positioning.",
  },
  {
    question: "Are you an immigration attorney?",
    answer: "No. I do not provide immigration legal advice or legal representation. For legal advice about EB-1A, O-1A, or other immigration matters, consult a qualified U.S. immigration attorney.",
  },
  {
    question: "What is O-1A profile development?",
    answer: "It is professional support with strengthening the structure, documentation, and presentation of your achievements and contributions. Areas may include leadership, research, recognition, judging, and industry impact. It does not include legal representation or a guarantee of an immigration outcome.",
  },
  {
    question: "Can you help with FIET applications?",
    answer: "Yes. Support can include reviewing your professional profile, organizing leadership and innovation evidence, developing achievement narratives, and planning supporter documentation. Fellowship decisions remain with the Institution of Engineering and Technology.",
  },
  {
    question: "Can you help with FBCS applications?",
    answer: "Yes. Support focuses on documenting senior responsibility, professional contribution, influence, and industry impact, and presenting your career clearly. Fellowship decisions remain with BCS, The Chartered Institute for IT.",
  },
  {
    question: "Do you help with scholarly publications?",
    answer: "Yes. Services include research theme planning, publication portfolio review, scholarly positioning, and research communication strategy. All work should reflect genuine research and responsible authorship. Publication acceptance is not guaranteed.",
  },
  {
    question: "What is citation-building strategy?",
    answer: "It is an ethical research visibility strategy that helps relevant readers discover your published work through accurate author profiles, research dissemination, repository visibility, and academic networking. Citations depend on other researchers' independent decisions and are never guaranteed.",
  },
  {
    question: "Do you create fake citations?",
    answer: "No. Citation services focus only on legitimate scholarly visibility, research dissemination, discoverability, and ethical academic practices. I do not offer fake or purchased citations, citation rings, manipulated references, or fabricated research.",
  },
  {
    question: "Can you review my current profile?",
    answer: "Yes. A profile assessment can review your background, achievements, publications, leadership, recognition, and existing evidence, then identify practical priorities. Start with a short overview through the consultation form; confidential documents are not needed for an initial inquiry.",
  },
  {
    question: "How do I request a consultation?",
    answer: "Use the Request Profile Assessment button or visit the Contact page. Share your professional background, the service you are interested in, and what you would like help with. When the contact service is configured, your inquiry is sent privately for review.",
  },
];
