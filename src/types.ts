export interface Profile {
  id: number;
  name: string;
  headline: string;
  bio: string;
  avatar_url: string | null;
  whatsapp_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  email: string | null;
}

export interface Education {
  id: string;
  course: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  sort_order: number;
}

export interface Skill {
  id: string;
  name: string;
  progress: number;
  sort_order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  sort_order: number;
}

export interface PortfolioData {
  profile: Profile | null;
  education: Education[];
  skills: Skill[];
  projects: Project[];
}
