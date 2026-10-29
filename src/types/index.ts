export type Lang = "ar" | "en";

export type Loc = { ar: string; en: string };

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface JobRole {
  id: string;
  title: Loc;
  description: Loc;
  responsibilities: Loc[];
  skills: string[];
  tools: string[];
  entry: Loc;
  senior: Loc;
}

export interface Topic {
  id: string;
  title: Loc;
  summary: Loc;
  why: Loc;
  outcomes: Loc[];
  difficulty: Difficulty;
  minutes: number;
  skills: string[];
  prerequisites: Loc[];
  task: Loc;
  promptFocus: Loc;
  videos?: string[];
}

export interface Stage {
  id: string;
  order: number;
  title: Loc;
  goal: Loc;
  topics: Topic[];
}

export interface ProjectItem {
  id: string;
  title: Loc;
  level: Difficulty;
  objective: Loc;
  problem: Loc;
  skills: string[];
  tools: string[];
  steps: Loc[];
  deliverables: Loc[];
  portfolio: Loc;
}

export interface Specialization {
  id: string;
  name: Loc;
  tagline: Loc;
  description: Loc;
  icon: string;
  difficulty: Difficulty;
  hours: number;
  demand: 1 | 2 | 3 | 4 | 5;
  skills: string[];
  tools: string[];
  topicsPool: Loc[];
  roles: JobRole[];
  stages: Stage[];
  projects: ProjectItem[];
  mentorPersona: Loc;
}

export interface ResearchPaper {
  id: string;
  title: Loc;
  journal: string;
  year: number;
  authors: string;
  specializationId: string;
  summary: Loc;
  findings: Loc[];
  application: Loc;
  url: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  favorite: boolean;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  specializationId: string;
  status: "to-learn" | "learning" | "completed";
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  stage: string;
  background: string;
  level: Difficulty;
  interests: string[];
  careerGoal: string;
  weeklyHours: number;
  knownTools: string[];
  primarySpecialization: string | null;
  onboarded: boolean;
}
