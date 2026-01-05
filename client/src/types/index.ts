// User types
export type UserRole = 'jobseeker' | 'recruiter';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface JobSeekerProfile extends User {
  role: 'jobseeker';
  title?: string;
  location?: string;
  experience?: number;
  skills: string[];
  resumeUrl?: string;
  profileCompleteness: number;
  bio?: string;
  education?: Education[];
  workHistory?: WorkExperience[];
}

export interface RecruiterProfile extends User {
  role: 'recruiter';
  company: string;
  companyLogo?: string;
  position: string;
  jobsPosted: number;
}

// Education & Experience
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

// Job types
export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  experience: {
    min: number;
    max: number;
  };
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedAt: Date;
  deadline?: Date;
  recruiterId: string;
  applicants: number;
  matchScore?: number;
}

// Application types
export interface Application {
  id: string;
  jobId: string;
  job: Job;
  userId: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: Date;
  coverLetter?: string;
  matchScore: number;
}

// Applicant view for recruiters
export interface Applicant {
  id: string;
  applicationId: string;
  user: JobSeekerProfile;
  job: Job;
  matchScore: number;
  appliedAt: Date;
  status: Application['status'];
  skillAlignment: {
    matched: string[];
    missing: string[];
    additional: string[];
  };
  aiInsights: string[];
}

// Resume analysis
export interface ResumeAnalysis {
  skills: string[];
  experience: {
    years: number;
    highlights: string[];
  };
  education: string[];
  strengths: string[];
  improvements: string[];
  overallScore: number;
}

// AI Chat
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Filter types
export interface JobFilters {
  search: string;
  location: string;
  type: string[];
  experienceMin: number;
  experienceMax: number;
  salaryMin: number;
  salaryMax: number;
  skills: string[];
}
