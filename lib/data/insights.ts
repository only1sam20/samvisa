export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  art: "blueprint" | "fellowship" | "research" | "citation" | "review";
  sections: { heading: string; body: string }[];
  isPlaceholder: boolean;
};

// Editorial drafts: replace or approve these articles before presenting them as Samuel's published writing.
// The draft marker must remain visible in article cards and detail pages until reviewed.
export const articles: Article[] = [
  {
    slug: "building-blocks-strong-eb-1a-profile",
    title: "Understanding the Building Blocks of a Strong EB-1A Profile",
    category: "Profile development",
    excerpt: "A thoughtful profile starts with real achievements, clear context, and evidence that readers can follow.",
    readTime: "3 min read",
    art: "blueprint",
    isPlaceholder: true,
    sections: [
      { heading: "Editorial draft", body: "This sample article is a starting point for future editorial content. It discusses general professional documentation, not immigration eligibility, legal criteria, or legal advice." },
      { heading: "Start with what you have actually done", body: "Begin with an inventory of your work: projects, research, leadership responsibilities, professional contributions, and recognition. For each achievement, record what you did, when it happened, who was involved, and why it mattered. Clear descriptions are more useful than a long list of unexplained titles. Distinguish your own contribution from the wider team's work and use language that your records can support." },
      { heading: "Connect claims to evidence", body: "An achievement becomes easier to understand when it is connected to a source. A publication can link to its journal record; a leadership responsibility may have an appointment record; a professional contribution may have an independent account. Keep original documents, dates, and source links together. When evidence is incomplete, identify what is missing instead of overstating what is available." },
      { heading: "Add context and maintain consistency", body: "A reader may not know your field or the organizations in your career. Explain the context of your work in plain language and keep dates, role descriptions, publication details, and names consistent across your CV, public profiles, and evidence folders. A coherent professional record helps others understand your experience and makes future updates easier to manage." },
      { heading: "Choose a practical next step", body: "Select a manageable documentation priority: update your achievement inventory, organize your research record, or clarify the impact of a major project. Genuine profile development grows from substantive work and accurate records. If your plans involve an immigration matter, discuss the legal strategy and requirements with a qualified U.S. immigration attorney." },
    ],
  },
  {
    slug: "professional-fellowships-global-credibility",
    title: "How Professional Fellowships Strengthen Global Professional Credibility",
    category: "Professional Fellowships",
    excerpt: "Reflect on leadership, contribution, and the professional story behind a Fellowship ambition.",
    readTime: "3 min read",
    art: "fellowship",
    isPlaceholder: true,
    sections: [
      { heading: "Editorial draft", body: "This is placeholder editorial content for review. It offers general career documentation ideas and does not describe the current requirements of any particular professional institution." },
      { heading: "Look beyond a career title", body: "A senior job title gives a reader limited information about your contribution. A more useful professional narrative explains the responsibilities you held, the decisions you influenced, and the work you helped others accomplish. Consider how your career demonstrates sustained engagement with your profession, and keep the focus on examples you can describe accurately." },
      { heading: "Make contribution understandable", body: "Document leadership through concrete episodes: developing a team, shaping a technical direction, improving a process, mentoring colleagues, or contributing to professional activities. Record your role, the setting, and the available evidence. Avoid attributing all of an organization's achievements to one individual. A precise account is easier for supporters and reviewers to assess." },
      { heading: "Prepare a useful career record", body: "Build a chronology of responsibilities, achievements, and professional engagement. Keep relevant records and explain specialized terms for readers outside your immediate workplace. Where supporters are involved, give them accurate background material and sufficient context while allowing them to express their own knowledge and judgment." },
      { heading: "Treat Fellowship as a professional commitment", body: "A Fellowship ambition can prompt valuable reflection on your work and future contribution. Start by reviewing the relevant institution's own current guidance, and connect your preparation to the profession you intend to serve. Profile support can help with organization and clarity; the institution independently determines whether to award Fellowship." },
    ],
  },
  {
    slug: "scholarly-visibility-senior-professionals",
    title: "Why Scholarly Visibility Matters for Senior Professionals",
    category: "Scholarly publishing",
    excerpt: "Help readers see the connection between your expertise, your research, and the questions your work addresses.",
    readTime: "3 min read",
    art: "research",
    isPlaceholder: true,
    sections: [
      { heading: "Editorial draft", body: "This sample article is editorial starter content. Review and personalize it before publishing it as an original professional insight." },
      { heading: "Give your research a clear home", body: "A publication list is more useful when it is current, organized, and connected to your professional identity. Keep titles, author names, dates, and links accurate. If your work spans different roles or research themes, help readers understand those connections with a short, factual introduction rather than expecting them to infer your area of expertise from a list." },
      { heading: "Explain the question your work addresses", body: "A concise plain-language description can help colleagues outside your specialty understand why a study matters. Describe the problem, your contribution, and the limits of the work. Distinguish established findings from possibilities for future research. The purpose of research communication is to make the work understandable without overstating its implications." },
      { heading: "Share with relevant audiences", body: "Think about who could use or build on your work, then choose relevant professional and academic settings for discussion. Share lawful links or permitted versions of publications, respect publisher terms, and contribute to conversations with substance. Networking is more useful when it creates an exchange of ideas rather than a request for recognition." },
      { heading: "Keep integrity at the center", body: "A scholarly portfolio should reflect authentic research, appropriate authorship, and accurate attribution. Publication quality and relevance deserve more attention than raw volume. A visibility plan cannot guarantee publication acceptance, citations, or professional recognition; it can help you present and share your existing work more consistently." },
    ],
  },
  {
    slug: "citation-visibility-beyond-publication-numbers",
    title: "Understanding Citation Visibility Beyond Publication Numbers",
    category: "Research visibility",
    excerpt: "An ethical approach to discoverability begins with author identity, relevant dissemination, and accessible research records.",
    readTime: "3 min read",
    art: "citation",
    isPlaceholder: true,
    sections: [
      { heading: "Editorial draft", body: "This is sample editorial content about ethical research communication. It makes no promises about citation growth and should be reviewed before publication." },
      { heading: "Make your author identity consistent", body: "Start with the basics: your name, affiliations, research interests, and publication list should be accurate wherever your work appears. Check for missing papers, duplicate records, or works incorrectly attributed to you. A maintained author profile makes it easier for readers to identify your research and understand how individual publications fit into your wider work." },
      { heading: "Improve access responsibly", body: "Where permitted, use a relevant repository and provide accurate descriptive information so readers can locate the work. Link to an authorized source and respect publisher policies and any confidentiality obligations. A short explanation of the research question and its relevance can help the intended audience decide whether to read the full publication." },
      { heading: "Focus on scholarly exchange", body: "Share research with people and communities for whom it is relevant. Discuss the work, listen to feedback, and make room for critical engagement. Other researchers decide independently whether a source is useful to cite. Requests for reciprocal citations, purchased citations, citation rings, and fabricated references undermine that independence and do not belong in a responsible visibility strategy." },
      { heading: "Read metrics in context", body: "A number does not explain the substance of a contribution on its own. Keep a balanced account of your publication portfolio, the questions it addresses, and the evidence available about its use. Set practical goals you can control, such as correcting an author record or sharing a permitted manuscript with a relevant community, without promising a citation count." },
    ],
  },
  {
    slug: "peer-review-professional-recognition",
    title: "The Role of Peer Review in Professional Recognition",
    category: "Professional recognition",
    excerpt: "Document genuine reviewing and judging contributions while respecting confidentiality and professional judgment.",
    readTime: "3 min read",
    art: "review",
    isPlaceholder: true,
    sections: [
      { heading: "Editorial draft", body: "This placeholder article provides general professional documentation ideas. It is not guidance on immigration criteria or a promise of professional recognition." },
      { heading: "Contribute where your expertise is relevant", body: "Peer review and judging involve assessing other people's work with care. Consider opportunities that align with your actual knowledge, availability, and ability to offer a considered evaluation. The value of the activity lies in the contribution you make to the process, so describe your role accurately and avoid seeking appointments solely as a line on a CV." },
      { heading: "Keep a clear participation record", body: "Maintain a private record of invitations, completed activities, dates, and the organization involved. Where available and permitted, retain acknowledgments or participation confirmations. Separate an invitation from completed service so your public profile does not imply work you have not performed. Clear records make it easier to describe the scope of your involvement later." },
      { heading: "Respect confidentiality", body: "Reviewing can involve unpublished or sensitive material. Follow the relevant organization's confidentiality and disclosure rules, and do not publish manuscripts, review reports, or identifying details without authorization. Where detailed material cannot be shared, ask what acknowledgment of participation is permitted and keep your public description within those limits." },
      { heading: "Present the contribution with context", body: "Explain what kind of evaluation you carried out and how it connects to your expertise, using only information you may disclose. Do not claim a relationship, appointment, or endorsement that the records do not support. A factual professional narrative gives the reader useful context while preserving the integrity of the reviewing process." },
    ],
  },
];
