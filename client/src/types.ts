export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  score?: string;
  coursework?: string;
  details?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
}

export interface PortfolioItem {
  title: string;
  category: 'Academic' | 'Professional' | string;
  description: string;
  tag?: string;
  link?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  links?: ProjectLink[];
}

export interface ProjectGroup {
  category: string;
  items: Project[];
}

export interface ProfileLinks {
  linkedin?: string;
  github?: string;
  email?: string;
  scholar?: string;
  leetcode?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  photoUrl: string;
  location: string;
  email: string;
  resumeUrl?: string;
  links: ProfileLinks;
  beliefs: string;
  skills: SkillGroup[];
  education: Education[];
  experience: Experience[];
  portfolio: PortfolioItem[];
  projects: ProjectGroup[];
}
