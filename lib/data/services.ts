export type ServiceCategory = "extraordinary" | "fellowship" | "research" | "profile";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  category: ServiceCategory;
};

export const services: Service[] = [
  {
    slug: "eb-1a-profile-development",
    title: "EB-1A Profile Development",
    shortDescription: "Build a clear, credible picture of your achievements and professional contribution.",
    description: "A structured approach to documenting your professional background, identifying evidence gaps, and developing a coherent account of your work and influence. This is professional profile and evidence support; legal eligibility and immigration advice should be discussed with a qualified U.S. immigration attorney.",
    icon: "Globe2",
    category: "extraordinary",
    features: ["Professional profile assessment", "Evidence gap analysis and development roadmap", "Publications, citations, and research visibility", "Leadership and original contribution documentation", "Peer review, judging, memberships, and recognition", "Recommendation letter planning and evidence organization"],
  },
  {
    slug: "o-1a-profile-development",
    title: "O-1A Profile Development",
    shortDescription: "Organize the evidence behind your expertise, recognition, and industry impact.",
    description: "Support for professionals who want to strengthen the documentation and presentation of their achievements. The work brings together existing evidence, identifies practical development priorities, and makes your professional narrative easier to understand. No immigration outcome is guaranteed.",
    icon: "Compass",
    category: "extraordinary",
    features: ["Career and achievement review", "Leadership and industry impact documentation", "Publications, awards, and professional recognition", "Peer review, judging, and membership evidence", "Original contribution presentation", "Evidence structure and professional narrative"],
  },
  {
    slug: "fiet-fellowship-support",
    title: "FIET Fellowship Support",
    shortDescription: "Present your engineering leadership, influence, and professional contribution with clarity.",
    description: "Professional profile support for candidates pursuing Fellowship of the Institution of Engineering and Technology. Develop a considered account of your career progression, innovation, leadership, and contribution, with supporting documentation grounded in your actual work. Fellowship decisions remain with the institution.",
    icon: "Award",
    category: "fellowship",
    features: ["Leadership and career progression review", "Innovation and professional influence documentation", "Contribution and achievement presentation", "Supporter planning and documentation", "Application narrative development", "Evidence organization"],
  },
  {
    slug: "fbcs-fellowship-support",
    title: "FBCS Fellowship Support",
    shortDescription: "Communicate your senior responsibility and contribution to the technology profession.",
    description: "Profile development and documentation support for professionals pursuing Fellowship of BCS, The Chartered Institute for IT. The focus is a clear, evidence-led account of senior responsibility, leadership, influence, and industry contribution. Support does not imply affiliation with BCS or guarantee a Fellowship award.",
    icon: "BadgeCheck",
    category: "fellowship",
    features: ["Professional achievement assessment", "Senior responsibility and leadership evidence", "Influence and industry impact documentation", "Professional contribution presentation", "Career narrative development", "Supporting evidence organization"],
  },
  {
    slug: "scholarly-publication-strategy",
    title: "Scholarly Articles & Publication Strategy",
    shortDescription: "Develop a thoughtful publication direction that reflects your real expertise.",
    description: "Identify relevant research themes, plan your scholarly visibility, and strengthen how your research portfolio communicates your expertise. Support centers on credible original work, appropriate publication opportunities, and responsible authorship. Editorial decisions and publication acceptance are never guaranteed.",
    icon: "BookOpen",
    category: "research",
    features: ["Research theme and subject alignment", "Publication portfolio review", "Scholarly positioning and planning", "Research communication structure", "Publication opportunity assessment", "Responsible authorship and attribution practices"],
  },
  {
    slug: "citation-research-visibility",
    title: "Citation Development & Research Visibility",
    shortDescription: "Help the right readers discover, understand, and engage with your published research.",
    description: "An ethical citation and research visibility strategy focused on discoverability, consistent author identity, research dissemination, and academic networking. The aim is to improve access to your work and its relevance to appropriate audiences. Fake citations, purchased citations, citation exchanges, and fabricated research are never part of this service.",
    icon: "ChartNoAxesCombined",
    category: "research",
    features: ["Author profile optimization", "Consistent researcher identity", "Research dissemination planning", "Repository and publication discoverability", "Relevant academic networking", "Responsible visibility and engagement review"],
  },
  {
    slug: "professional-profile-assessment",
    title: "Professional Profile Assessment",
    shortDescription: "Understand your current position and the next steps that deserve your attention.",
    description: "A considered review of your professional history, documented achievements, research, recognition, and leadership. The assessment identifies themes, documentation priorities, and areas for development so you can make informed decisions about your profile. It is not a legal eligibility assessment.",
    icon: "UserRoundSearch",
    category: "profile",
    features: ["Professional background review", "Career and achievement inventory", "Documentation and visibility review", "Strengths and development priorities", "Goals and focus areas", "Practical next-step roadmap"],
  },
  {
    slug: "evidence-gap-analysis",
    title: "Evidence Gap Analysis",
    shortDescription: "Connect your professional achievements with clear, verifiable supporting material.",
    description: "Map the evidence you already have against the professional narrative you want to communicate. Identify missing context, incomplete records, and opportunities to document genuine work more clearly, then prioritize achievable next steps without manufacturing achievements.",
    icon: "ScanSearch",
    category: "profile",
    features: ["Existing evidence inventory", "Achievement-to-document mapping", "Missing context and documentation review", "Source and consistency checks", "Priority action planning", "Evidence collection and filing structure"],
  },
  {
    slug: "recommendation-expert-letter-strategy",
    title: "Recommendation & Expert Letter Strategy",
    shortDescription: "Plan specific, authentic letters that explain the significance of your professional work.",
    description: "Support with identifying appropriate recommenders, organizing factual background material, and developing clear letter outlines. Every letter should reflect the signer's own knowledge and honest assessment; no invented endorsements or relationships are used.",
    icon: "FilePenLine",
    category: "profile",
    features: ["Recommender and expert planning", "Relationship and knowledge mapping", "Achievement and evidence briefing", "Letter structure and clarity review", "Consistency with supporting documentation", "Authenticity and signer review"],
  },
  {
    slug: "peer-review-judging-evidence",
    title: "Peer Review & Judging Evidence",
    shortDescription: "Document meaningful contributions to evaluating work in your area of expertise.",
    description: "Organize evidence of genuine peer review, judging, and professional evaluation activities. Support includes identifying relevant opportunities aligned with your expertise and recording your contribution accurately, without promising invitations, appointments, or recognition.",
    icon: "ClipboardCheck",
    category: "profile",
    features: ["Review and judging activity inventory", "Expertise-aligned opportunity research", "Participation and invitation documentation", "Contribution and scope descriptions", "Confidentiality-aware evidence planning", "Professional record organization"],
  },
  {
    slug: "awards-recognition-positioning",
    title: "Awards & Recognition Positioning",
    shortDescription: "Explain your real recognition with the context that makes it meaningful.",
    description: "Present verified awards and professional recognition with a clear account of the awarding body, selection process, scope, and connection to your work. Where appropriate, explore relevant opportunities based on genuine achievements. Awards and recognition are never guaranteed.",
    icon: "Trophy",
    category: "profile",
    features: ["Awards and recognition inventory", "Award context and significance documentation", "Selection information organization", "Achievement narrative review", "Relevant opportunity planning", "Supporting record collection"],
  },
  {
    slug: "professional-membership-positioning",
    title: "Professional Membership Positioning",
    shortDescription: "Build a purposeful membership record connected to your field and contribution.",
    description: "Review your professional memberships and how they relate to your expertise, responsibilities, and engagement with your field. Identify relevant organizations and document genuine participation clearly, with no promise of membership acceptance or professional status.",
    icon: "Network",
    category: "profile",
    features: ["Membership portfolio review", "Professional organization alignment", "Membership history documentation", "Participation and contribution evidence", "Application narrative support", "Career positioning and next steps"],
  },
];
