const config = {
  title: "TechSquare | Next-Gen Tech & Creative Agency",
  description: {
    long: "TechSquare is a full-service technology and creative agency specializing in modern web and software development, intelligent AI automation, high-impact photo and video editing, and AI ads creation.",
    short:
      "TechSquare is a premier B2B agency delivering high-performance software, AI automation, and generative creative media.",
  },
  keywords: [
    "TechSquare",
    "software development",
    "web development",
    "AI automation",
    "workflow automation",
    "video editing",
    "AI ads",
    "creative agency",
    "digital transformation",
    "enterprise solutions",
  ],
  author: "TechSquare",
  email: "contact@techsquare.agency",
  site: "https://techsquare.agency",

  // for github stars button
  githubUsername: "",
  githubRepo: "",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/TechSquare",
    linkedin: "https://linkedin.com/company/techsquare",
    instagram: "https://www.instagram.com/techsquare",
    facebook: "https://www.facebook.com/techsquare",
    github: "https://github.com/TechSquare",
  },
};
export { config };
