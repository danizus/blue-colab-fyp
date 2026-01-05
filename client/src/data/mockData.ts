import { Job, JobSeekerProfile, RecruiterProfile, Application, Applicant } from '@/types';

// Mock Job Seeker Profile - Blue-collar worker
export const mockJobSeeker: JobSeekerProfile = {
  id: 'js-1',
  email: 'mike.johnson@email.com',
  name: 'Mike Johnson',
  role: 'jobseeker',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
  createdAt: new Date('2024-01-15'),
  title: 'Licensed Electrician',
  location: 'Houston, TX',
  experience: 8,
  skills: ['Electrical Wiring', 'Troubleshooting', 'Blueprint Reading', 'NEC Code', 'Panel Installation', 'Conduit Bending', 'OSHA Certified'],
  profileCompleteness: 85,
  bio: 'Licensed journeyman electrician with 8+ years of experience in residential and commercial electrical work.',
  education: [
    {
      id: 'edu-1',
      institution: 'Houston Community College',
      degree: 'Certificate',
      field: 'Electrical Technology',
      startYear: 2014,
      endYear: 2016
    }
  ],
  workHistory: [
    {
      id: 'work-1',
      company: 'PowerMax Electric',
      position: 'Lead Electrician',
      location: 'Houston, TX',
      startDate: '2020-03',
      current: true,
      description: 'Leading electrical installations for commercial projects up to $2M.'
    },
    {
      id: 'work-2',
      company: 'City Electric Co.',
      position: 'Journeyman Electrician',
      location: 'Houston, TX',
      startDate: '2016-06',
      endDate: '2020-02',
      current: false,
      description: 'Performed residential and light commercial electrical work.'
    }
  ]
};

// Mock Recruiter Profile
export const mockRecruiter: RecruiterProfile = {
  id: 'rec-1',
  email: 'sarah.chen@builderscorp.com',
  name: 'Sarah Chen',
  role: 'recruiter',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  createdAt: new Date('2023-06-01'),
  company: 'Builders Corp',
  companyLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=BuildersCorp',
  position: 'Hiring Manager',
  jobsPosted: 8
};

// Mock Jobs - Blue-collar focused
export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Licensed Electrician',
    company: 'PowerMax Electric',
    companyLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=PowerMax',
    location: 'Houston, TX',
    type: 'full-time',
    salary: { min: 55000, max: 75000, currency: 'USD' },
    experience: { min: 3, max: 7 },
    skills: ['Electrical Wiring', 'Troubleshooting', 'Blueprint Reading', 'NEC Code', 'OSHA Certified'],
    description: 'We are looking for a Licensed Electrician to join our team. You will install, maintain, and repair electrical systems in residential and commercial buildings.',
    responsibilities: [
      'Install and maintain electrical wiring and systems',
      'Read and interpret blueprints and electrical diagrams',
      'Troubleshoot and repair electrical issues',
      'Ensure compliance with NEC and local codes',
      'Train and supervise apprentice electricians'
    ],
    requirements: [
      'Valid Journeyman or Master Electrician license',
      '3+ years of commercial electrical experience',
      'Strong knowledge of NEC codes',
      'Ability to read blueprints',
      'Valid driver\'s license and reliable transportation'
    ],
    benefits: [
      'Competitive hourly rate + overtime',
      'Health insurance',
      'Company vehicle provided',
      '401(k) with company match',
      'Paid training and certifications'
    ],
    postedAt: new Date('2024-01-10'),
    deadline: new Date('2024-02-28'),
    recruiterId: 'rec-1',
    applicants: 23,
    matchScore: 94
  },
  {
    id: 'job-2',
    title: 'Plumber',
    company: 'FlowRight Plumbing',
    companyLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=FlowRight',
    location: 'Dallas, TX',
    type: 'full-time',
    salary: { min: 48000, max: 68000, currency: 'USD' },
    experience: { min: 2, max: 5 },
    skills: ['Pipe Fitting', 'Drain Cleaning', 'Water Heater Installation', 'Leak Detection', 'Customer Service'],
    description: 'Join our team as a skilled Plumber to provide quality plumbing services to residential and commercial customers.',
    responsibilities: [
      'Install, repair, and maintain plumbing systems',
      'Diagnose plumbing issues and provide solutions',
      'Install water heaters and fixtures',
      'Clear drain blockages',
      'Provide excellent customer service'
    ],
    requirements: [
      'Valid Plumbing License',
      '2+ years of plumbing experience',
      'Knowledge of local plumbing codes',
      'Strong problem-solving skills',
      'Valid driver\'s license'
    ],
    benefits: [
      'Competitive pay',
      'Health and dental insurance',
      'Company truck',
      'Tool allowance',
      'Paid holidays'
    ],
    postedAt: new Date('2024-01-12'),
    recruiterId: 'rec-2',
    applicants: 31,
    matchScore: 72
  },
  {
    id: 'job-3',
    title: 'Welder/Fabricator',
    company: 'SteelWorks Industries',
    companyLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=SteelWorks',
    location: 'Phoenix, AZ',
    type: 'full-time',
    salary: { min: 50000, max: 72000, currency: 'USD' },
    experience: { min: 3, max: 8 },
    skills: ['MIG Welding', 'TIG Welding', 'Blueprint Reading', 'Metal Fabrication', 'AWS Certified'],
    description: 'Looking for an experienced Welder/Fabricator to join our metal fabrication shop.',
    responsibilities: [
      'Perform MIG and TIG welding operations',
      'Read and interpret blueprints and work orders',
      'Fabricate metal components to specifications',
      'Inspect welds for quality and defects',
      'Maintain welding equipment'
    ],
    requirements: [
      'AWS certification preferred',
      '3+ years welding experience',
      'Proficiency in MIG and TIG welding',
      'Ability to read blueprints',
      'Strong attention to detail'
    ],
    benefits: [
      'Competitive wages',
      'Full benefits package',
      'Overtime available',
      'Climate-controlled shop',
      'Safety gear provided'
    ],
    postedAt: new Date('2024-01-14'),
    recruiterId: 'rec-3',
    applicants: 18,
    matchScore: 68
  },
  {
    id: 'job-4',
    title: 'HVAC Technician',
    company: 'CoolAir Services',
    companyLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=CoolAir',
    location: 'Austin, TX',
    type: 'full-time',
    salary: { min: 52000, max: 78000, currency: 'USD' },
    experience: { min: 2, max: 6 },
    skills: ['HVAC Installation', 'Refrigerant Handling', 'EPA Certified', 'Electrical Troubleshooting', 'Customer Service'],
    description: 'Join our HVAC team to install and service heating and cooling systems.',
    responsibilities: [
      'Install and repair HVAC systems',
      'Perform preventative maintenance',
      'Troubleshoot system issues',
      'Handle refrigerants safely',
      'Provide excellent customer service'
    ],
    requirements: [
      'EPA 608 certification',
      '2+ years HVAC experience',
      'Valid driver\'s license',
      'Ability to work in various weather conditions',
      'Strong customer service skills'
    ],
    benefits: [
      'Competitive salary + bonuses',
      'Health insurance',
      'Company van',
      'Paid training',
      'Tool allowance'
    ],
    postedAt: new Date('2024-01-08'),
    recruiterId: 'rec-4',
    applicants: 27,
    matchScore: 65
  },
  {
    id: 'job-5',
    title: 'Construction Carpenter',
    company: 'BuildRight Construction',
    companyLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=BuildRight',
    location: 'San Antonio, TX',
    type: 'full-time',
    salary: { min: 45000, max: 62000, currency: 'USD' },
    experience: { min: 2, max: 5 },
    skills: ['Framing', 'Finish Carpentry', 'Blueprint Reading', 'Power Tools', 'Safety Procedures'],
    description: 'Seeking skilled Carpenter for residential and commercial construction projects.',
    responsibilities: [
      'Build and install frameworks and structures',
      'Read and follow blueprints',
      'Measure, cut, and shape wood and materials',
      'Install doors, windows, and trim',
      'Follow safety protocols'
    ],
    requirements: [
      '2+ years carpentry experience',
      'Own basic hand tools',
      'Ability to read blueprints',
      'Physical ability to lift 50+ lbs',
      'Valid driver\'s license'
    ],
    benefits: [
      'Competitive pay',
      'Health benefits',
      'Steady work year-round',
      'Advancement opportunities',
      'Safety bonuses'
    ],
    postedAt: new Date('2024-01-11'),
    recruiterId: 'rec-5',
    applicants: 42,
    matchScore: 58
  },
  {
    id: 'job-6',
    title: 'Heavy Equipment Operator',
    company: 'EarthMovers LLC',
    companyLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=EarthMovers',
    location: 'Denver, CO',
    type: 'full-time',
    salary: { min: 55000, max: 80000, currency: 'USD' },
    experience: { min: 3, max: 8 },
    skills: ['Excavator Operation', 'Bulldozer', 'Loader', 'GPS Grade Control', 'Safety Compliance'],
    description: 'Experienced Heavy Equipment Operator needed for large construction projects.',
    responsibilities: [
      'Operate excavators, bulldozers, and loaders',
      'Perform equipment inspections',
      'Follow grade stakes and GPS systems',
      'Maintain safe work environment',
      'Complete daily equipment logs'
    ],
    requirements: [
      '3+ years equipment operation experience',
      'CDL preferred',
      'OSHA 10 or 30 certification',
      'Experience with GPS grade control',
      'Strong safety record'
    ],
    benefits: [
      'Top pay in the industry',
      'Full benefits',
      'Per diem for travel',
      'Modern equipment',
      'Year-round work'
    ],
    postedAt: new Date('2024-01-09'),
    recruiterId: 'rec-6',
    applicants: 15,
    matchScore: 45
  }
];

// Mock Applications for Job Seeker
export const mockApplications: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    job: mockJobs[0],
    userId: 'js-1',
    status: 'shortlisted',
    appliedAt: new Date('2024-01-15'),
    matchScore: 94
  },
  {
    id: 'app-2',
    jobId: 'job-4',
    job: mockJobs[3],
    userId: 'js-1',
    status: 'reviewed',
    appliedAt: new Date('2024-01-14'),
    matchScore: 65
  },
  {
    id: 'app-3',
    jobId: 'job-2',
    job: mockJobs[1],
    userId: 'js-1',
    status: 'pending',
    appliedAt: new Date('2024-01-16'),
    matchScore: 72
  }
];

// Mock Applicants for Recruiter
export const mockApplicants: Applicant[] = [
  {
    id: 'applicant-1',
    applicationId: 'app-1',
    user: mockJobSeeker,
    job: mockJobs[0],
    matchScore: 94,
    appliedAt: new Date('2024-01-15'),
    status: 'shortlisted',
    skillAlignment: {
      matched: ['Electrical Wiring', 'Troubleshooting', 'Blueprint Reading', 'NEC Code', 'OSHA Certified'],
      missing: [],
      additional: ['Panel Installation', 'Conduit Bending']
    },
    aiInsights: [
      'Strong electrical expertise with 8+ years of experience',
      'Currently working as Lead Electrician',
      'All required certifications in place',
      'Skill match: 94%'
    ]
  },
  {
    id: 'applicant-2',
    applicationId: 'app-4',
    user: {
      ...mockJobSeeker,
      id: 'js-2',
      name: 'Carlos Martinez',
      email: 'carlos.m@email.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      title: 'Apprentice Electrician',
      experience: 2,
      skills: ['Electrical Wiring', 'Basic Troubleshooting', 'Hand Tools', 'Safety Procedures'],
      profileCompleteness: 68
    },
    job: mockJobs[0],
    matchScore: 62,
    appliedAt: new Date('2024-01-16'),
    status: 'reviewed',
    skillAlignment: {
      matched: ['Electrical Wiring'],
      missing: ['NEC Code', 'OSHA Certified', 'Blueprint Reading'],
      additional: ['Hand Tools', 'Safety Procedures']
    },
    aiInsights: [
      'Entry-level candidate with potential',
      'Needs additional certifications',
      'Good foundational skills',
      'Skill match: 62%'
    ]
  },
  {
    id: 'applicant-3',
    applicationId: 'app-5',
    user: {
      ...mockJobSeeker,
      id: 'js-3',
      name: 'David Williams',
      email: 'david.w@email.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      title: 'Master Electrician',
      experience: 15,
      skills: ['Electrical Wiring', 'Troubleshooting', 'Blueprint Reading', 'NEC Code', 'OSHA Certified', 'Project Management', 'Team Leadership'],
      profileCompleteness: 95
    },
    job: mockJobs[0],
    matchScore: 98,
    appliedAt: new Date('2024-01-14'),
    status: 'pending',
    skillAlignment: {
      matched: ['Electrical Wiring', 'Troubleshooting', 'Blueprint Reading', 'NEC Code', 'OSHA Certified'],
      missing: [],
      additional: ['Project Management', 'Team Leadership']
    },
    aiInsights: [
      'Highly experienced Master Electrician',
      '15 years in the trade',
      'Strong leadership capabilities',
      'Skill match: 98%'
    ]
  }
];

// Skills for filtering - Blue-collar focus
export const allSkills = [
  'Electrical Wiring', 'Plumbing', 'Welding', 'HVAC', 'Carpentry',
  'Blueprint Reading', 'OSHA Certified', 'CDL', 'Forklift', 'Heavy Equipment',
  'Pipe Fitting', 'MIG Welding', 'TIG Welding', 'Framing', 'Concrete',
  'Roofing', 'Drywall', 'Painting', 'Masonry', 'Safety Procedures'
];

// Locations for filtering
export const locations = [
  'Houston, TX',
  'Dallas, TX',
  'Austin, TX',
  'San Antonio, TX',
  'Phoenix, AZ',
  'Denver, CO',
  'Los Angeles, CA',
  'Chicago, IL',
  'Atlanta, GA',
  'Miami, FL'
];

// Job types
export const jobTypes = ['full-time', 'part-time', 'contract', 'temporary'];

// AI Chat suggestions - Blue-collar focused
export const chatSuggestions = [
  'What certifications should I get to increase my pay?',
  'How can I stand out in my trade?',
  'What are the highest paying trades right now?',
  'Tips for negotiating hourly rate',
  'How to transition from apprentice to journeyman?'
];
