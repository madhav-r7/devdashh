// DevPath Complete Mock Data & State Definitions

export const ROLES_LIST = [
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Design robust APIs, architect scalable databases, manage server infrastructure, and secure data.',
    icon: 'Server',
    badge: 'Popular',
    color: '#6366f1',
    estTime: '4-6 months',
    requiredSkillsCount: 14,
    skills: ['html', 'css', 'javascript', 'python', 'git', 'http', 'sql', 'rest-api', 'auth', 'testing', 'docker', 'databases', 'cicd', 'monitoring']
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Craft responsive, accessible, high-performance web applications and design systems.',
    icon: 'Layout',
    badge: 'High Demand',
    color: '#38bdf8',
    estTime: '3-5 months',
    requiredSkillsCount: 12,
    skills: ['html', 'css', 'javascript', 'git', 'react', 'typescript', 'tailwind', 'state-management', 'testing', 'performance', 'build-tools', 'accessibility']
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    description: 'Bridge user interfaces and distributed backend microservices end-to-end.',
    icon: 'Layers',
    badge: 'Comprehensive',
    color: '#10b981',
    estTime: '6-9 months',
    requiredSkillsCount: 18,
    skills: ['html', 'css', 'javascript', 'typescript', 'react', 'node', 'git', 'sql', 'rest-api', 'auth', 'docker', 'databases', 'testing', 'cicd', 'graphql']
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Automate deployments, orchestrate cloud infrastructure, ensure high availability and observability.',
    icon: 'Cloud',
    badge: 'High Growth',
    color: '#f59e0b',
    estTime: '5-8 months',
    requiredSkillsCount: 15,
    skills: ['linux', 'git', 'python', 'bash', 'docker', 'kubernetes', 'terraform', 'aws', 'cicd', 'monitoring', 'networking', 'security']
  },
  {
    id: 'data-ai',
    title: 'Data & AI Engineer',
    description: 'Build data pipelines, deploy machine learning models, and harness vector embeddings & LLMs.',
    icon: 'Cpu',
    badge: 'Emerging',
    color: '#8b5cf6',
    estTime: '5-8 months',
    requiredSkillsCount: 16,
    skills: ['python', 'sql', 'git', 'pandas', 'math-stats', 'ml-fundamentals', 'data-pipelines', 'vector-db', 'llm-ops', 'docker', 'api-deployment']
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Engineer',
    description: 'Defend systems, perform vulnerability assessments, secure cloud networks and audit APIs.',
    icon: 'Shield',
    badge: 'Critical',
    color: '#f43f5e',
    estTime: '6-9 months',
    requiredSkillsCount: 14,
    skills: ['networking', 'linux', 'python', 'git', 'web-security', 'cryptography', 'owasp', 'pen-testing', 'cloud-security', 'siem']
  },
  {
    id: 'mobile',
    title: 'Mobile Developer',
    description: 'Develop slick native & cross-platform applications for iOS and Android devices.',
    icon: 'Smartphone',
    badge: 'Specialized',
    color: '#ec4899',
    estTime: '4-7 months',
    requiredSkillsCount: 12,
    skills: ['javascript', 'typescript', 'react-native', 'mobile-ui', 'state-management', 'native-apis', 'sqlite', 'app-store-deploy', 'testing']
  }
];

export const SIDE_HUSTLE_PATHS = [
  {
    id: 'freelancing',
    title: 'Freelancing',
    description: 'Learn finding clients, portfolio building, pricing, proposal writing, client communication, and project delivery.',
    icon: 'Briefcase',
    badge: 'High Income',
    estTime: '2-4 months',
    requiredSkillsCount: 6,
    skills: [
      'Finding clients',
      'Portfolio building',
      'Pricing',
      'Proposal writing',
      'Client communication',
      'Project delivery'
    ]
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Learn writing, video production, editing, personal branding, audience building, and strategic monetization.',
    icon: 'Video',
    badge: 'Audience Growth',
    estTime: '3-5 months',
    requiredSkillsCount: 6,
    skills: [
      'Writing',
      'Video',
      'Editing',
      'Personal branding',
      'Audience building',
      'Monetization'
    ]
  },
  {
    id: 'web-freelancing',
    title: 'Web Freelancing',
    description: 'Learn landing page development, client websites, acquisition strategies, deployment, maintenance, and retainer pricing.',
    icon: 'Globe',
    badge: 'Rapid Launch',
    estTime: '2-3 months',
    requiredSkillsCount: 6,
    skills: [
      'Landing pages',
      'Websites',
      'Client acquisition',
      'Deployment',
      'Maintenance',
      'Pricing'
    ]
  },
  {
    id: 'digital-products',
    title: 'Digital Products',
    description: 'Learn product research, idea validation, building scalable tools, marketing funnels, distribution, and monetization.',
    icon: 'Box',
    badge: 'Scalable Asset',
    estTime: '3-6 months',
    requiredSkillsCount: 6,
    skills: [
      'Product research',
      'Validation',
      'Building',
      'Marketing',
      'Distribution',
      'Monetization'
    ]
  },
  {
    id: 'tutoring',
    title: 'Tutoring',
    description: 'Learn subject expertise, 1-on-1 teaching, communication, establishing an online presence, pricing, and student acquisition.',
    icon: 'GraduationCap',
    badge: 'High Margin',
    estTime: '1-3 months',
    requiredSkillsCount: 6,
    skills: [
      'Subject expertise',
      'Teaching',
      'Communication',
      'Online presence',
      'Pricing',
      'Student acquisition'
    ]
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship',
    description: 'Learn problem discovery, hypothesis validation, rapid MVP building, marketing channels, sales, and customer feedback loops.',
    icon: 'Rocket',
    badge: 'Venture / Indie',
    estTime: '4-8 months',
    requiredSkillsCount: 6,
    skills: [
      'Problem discovery',
      'Validation',
      'MVP',
      'Marketing',
      'Sales',
      'Customer feedback'
    ]
  }
];

export const SOFT_SKILLS_PATHS = [
  {
    id: 'communication',
    title: 'Communication',
    description: 'Master public speaking, technical writing, active listening, stakeholder presentations, and cross-team communication.',
    icon: 'MessageSquare',
    badge: 'Core Essential',
    estTime: '2-3 months',
    requiredSkillsCount: 5,
    skills: [
      'Public speaking',
      'Writing',
      'Listening',
      'Presentation',
      'Technical communication'
    ]
  },
  {
    id: 'leadership',
    title: 'Leadership',
    description: 'Cultivate strategic decision making, proactive delegation, engineering team management, conflict resolution, and ownership.',
    icon: 'Shield',
    badge: 'Executive Track',
    estTime: '3-5 months',
    requiredSkillsCount: 5,
    skills: [
      'Decision making',
      'Delegation',
      'Team management',
      'Conflict resolution',
      'Responsibility'
    ]
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    description: 'Develop rigorous critical thinking, structured architectural decomposition, decision frameworks, research, and deductive reasoning.',
    icon: 'Cpu',
    badge: 'Analytical',
    estTime: '2-4 months',
    requiredSkillsCount: 5,
    skills: [
      'Critical thinking',
      'Structured thinking',
      'Decision making',
      'Research',
      'Reasoning'
    ]
  },
  {
    id: 'career',
    title: 'Career',
    description: 'Optimize your technical resume, master interview preparation, expand high-value networking, and craft an authentic personal brand.',
    icon: 'Compass',
    badge: 'High ROI',
    estTime: '1-3 months',
    requiredSkillsCount: 5,
    skills: [
      'Resume',
      'Interview preparation',
      'Networking',
      'Personal branding',
      'Professional communication'
    ]
  },
  {
    id: 'teamwork',
    title: 'Teamwork',
    description: 'Excel at asynchronous collaboration, delivering and receiving constructive feedback, facilitating meetings, and managing team dynamics.',
    icon: 'Users',
    badge: 'Collaborative',
    estTime: '2-3 months',
    requiredSkillsCount: 5,
    skills: [
      'Collaboration',
      'Giving feedback',
      'Receiving feedback',
      'Meetings',
      'Conflict management'
    ]
  },
  {
    id: 'productivity',
    title: 'Productivity',
    description: 'Master deep work time management, ruthless milestone prioritization, intense focus routines, long-term planning, and execution consistency.',
    icon: 'Zap',
    badge: 'Force Multiplier',
    estTime: '1-2 months',
    requiredSkillsCount: 5,
    skills: [
      'Time management',
      'Prioritization',
      'Focus',
      'Planning',
      'Consistency'
    ]
  }
];

export const ALL_SKILLS = [
  // Foundations
  { id: 'html', name: 'HTML5', category: 'Foundations', icon: 'FileCode', diff: 'Beginner', hours: 8, desc: 'Semantic markup, accessibility (a11y), DOM structure.' },
  { id: 'css', name: 'CSS3 & Modern Layouts', category: 'Foundations', icon: 'Palette', diff: 'Beginner', hours: 14, desc: 'Flexbox, Grid, Responsive Design, CSS variables.' },
  { id: 'javascript', name: 'JavaScript (ES6+)', category: 'Foundations', icon: 'Code', diff: 'Beginner+', hours: 28, desc: 'Async/await, Closures, DOM APIs, Event loop, Modules.' },
  { id: 'python', name: 'Python Core', category: 'Foundations', icon: 'Terminal', diff: 'Beginner', hours: 22, desc: 'Data structures, OOP, Generators, Virtual environments.' },
  { id: 'git', name: 'Git & Version Control', category: 'Foundations', icon: 'GitBranch', diff: 'Beginner', hours: 10, desc: 'Branching, Merge conflicts, Rebase, PR workflows.' },
  { id: 'linux', name: 'Linux & Terminal Basics', category: 'Foundations', icon: 'TerminalSquare', diff: 'Beginner', hours: 12, desc: 'Bash scripting, File permissions, Process management, SSH.' },

  // Core Backend
  { id: 'http', name: 'HTTP & Networking', category: 'Core', icon: 'Globe', diff: 'Intermediate', hours: 12, desc: 'Request/Response lifecycle, Headers, Status codes, HTTPS/TLS, DNS.' },
  { id: 'sql', name: 'SQL & Relational DBs', category: 'Core', icon: 'Database', diff: 'Intermediate', hours: 24, desc: 'PostgreSQL, Joins, Aggregations, Transactions, Indexing & Explain.' },
  { id: 'rest-api', name: 'RESTful API Architecture', category: 'Backend', icon: 'Server', diff: 'Intermediate', hours: 20, desc: 'Resource URI design, HTTP methods, Idempotency, Versioning, Error handling.' },
  { id: 'auth', name: 'Authentication & Security', category: 'Backend', icon: 'Lock', diff: 'Intermediate+', hours: 18, desc: 'JWT, Session cookies, OAuth 2.0, Password hashing (bcrypt), RBAC.' },
  { id: 'testing', name: 'Automated Testing & QA', category: 'Backend', icon: 'CheckCircle2', diff: 'Intermediate', hours: 16, desc: 'Unit testing (Jest/Pytest), Integration tests, Supertest, Mocking, TDD.' },
  { id: 'databases', name: 'Databases & Redis Caching', category: 'Backend', icon: 'HardDrive', diff: 'Advanced', hours: 22, desc: 'PostgreSQL schema optimization, Redis cache-aside, Pub/Sub, Data migrations.' },
  
  // Production & Infrastructure
  { id: 'docker', name: 'Docker & Containerization', category: 'Production', icon: 'Box', diff: 'Intermediate', hours: 18, desc: 'Dockerfiles, Multi-stage builds, Docker Compose, Volumes, Networking.' },
  { id: 'cicd', name: 'CI/CD & Cloud Deployment', category: 'Production', icon: 'Workflow', diff: 'Intermediate+', hours: 16, desc: 'GitHub Actions, Automated pipelines, Render/AWS deployment, Healthchecks.' },
  { id: 'monitoring', name: 'Observability & Metrics', category: 'Production', icon: 'Activity', diff: 'Advanced', hours: 14, desc: 'Structured logging (Pino), Prometheus metrics, Sentry error tracking, APM.' },

  // Frontend Specific
  { id: 'react', name: 'React 18+', category: 'Frontend', icon: 'Component', diff: 'Intermediate', hours: 26, desc: 'Hooks, Component lifecycle, Virtual DOM, Custom hooks, Suspense.' },
  { id: 'typescript', name: 'TypeScript', category: 'Languages', icon: 'FileText', diff: 'Intermediate', hours: 20, desc: 'Generics, Union types, Interfaces, Utility types, Type narrowing.' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', icon: 'Sparkles', diff: 'Beginner+', hours: 10, desc: 'Utility-first styling, Responsive layouts, Dark mode, Design tokens.' },
  { id: 'state-management', name: 'Global State Management', category: 'Frontend', icon: 'Share2', diff: 'Intermediate', hours: 14, desc: 'Zustand, Redux Toolkit, Context API, Optimistic updates.' },
  { id: 'graphql', name: 'GraphQL APIs', category: 'Backend', icon: 'Network', diff: 'Advanced', hours: 16, desc: 'Schemas, Queries, Mutations, Resolvers, Apollo Server, DataLoader.' },
  { id: 'kubernetes', name: 'Kubernetes Orchestration', category: 'DevOps', icon: 'Boxes', diff: 'Advanced', hours: 32, desc: 'Pods, Deployments, Services, Ingress, Helm charts, ConfigMaps.' },
  { id: 'aws', name: 'AWS Cloud Services', category: 'DevOps', icon: 'CloudRain', diff: 'Intermediate+', hours: 28, desc: 'EC2, S3, Lambda, RDS, IAM roles, CloudWatch, VPC basics.' }
];

export const INITIAL_USER_STATE = {
  name: 'Madhav R.',
  handle: 'madhav_dev',
  targetRoleId: 'backend',
  targetRoleTitle: 'Backend Developer',
  experienceLevel: 'Intermediate',
  weeklyHours: 15,
  hoursSpentThisWeek: 12.5,
  overallProgress: 72,
  currentFocusSkillId: 'rest-api',
  currentFocusSkillName: 'REST APIs',
  nextMilestone: 'Build your first production-style API',
  knownSkills: ['html', 'css', 'javascript', 'python', 'git'],
  completedProjects: ['portfolio-web', 'task-api'],
  activeProjectId: 'url-shortener',
  verifiedEvidenceCount: {
    projects: 3,
    assessments: 5,
    exercises: 32
  },
  // Field-isolated state for Side Hustle
  sideHustle: {
    activeTrackId: 'web-freelancing',
    activeTrackTitle: 'Web Freelancing',
    progress: 35, // Field-specific progress (not technical 72%)
    focusMilestone: 'Client Proposals & Pricing',
    completedModules: 3,
    totalModules: 6,
    activeLeads: 2,
    monthlyTarget: '$1,500/mo',
    knownSkills: ['Landing pages', 'Websites', 'Pricing']
  },
  // Field-isolated state for Soft Skills
  softSkills: {
    activeTrackId: 'leadership',
    activeTrackTitle: 'Engineering Leadership',
    progress: 45, // Field-specific progress (not technical 72%)
    focusMilestone: 'Technical RFCs & Narratives',
    completedDrills: 4,
    totalDrills: 5,
    scenariosMastered: 2,
    influenceScore: '85/100',
    knownSkills: ['Decision making', 'Responsibility']
  },
  adaptedScenarioActive: true, // Shows the SQL JOIN adaptive alert
  adaptiveNotice: {
    id: 'adapt-sql-joins',
    title: 'Path updated',
    subtitle: 'Your recent assessment shows that you\'re struggling with SQL JOINs.',
    skillId: 'sql',
    skillName: 'SQL & Relational DBs',
    currentScore: 60,
    weakAreas: ['Complex multi-table JOINs', 'Aggregations (GROUP BY / HAVING)'],
    recommendations: [
      { type: 'lesson', title: 'SQL JOIN Visual Deep Dive', est: '15 min' },
      { type: 'quiz', title: '8-Question Diagnostic Drill', est: '10 min' },
      { type: 'project', title: 'Analytics Schema Optimization Task', est: '45 min' }
    ]
  }
};

export const BACKEND_ROADMAP_NODES = [
  // TIER 1: FOUNDATIONS
  {
    id: 'html',
    name: 'HTML5',
    tier: 'FOUNDATIONS',
    tierIndex: 1,
    status: 'mastered',
    progress: 100,
    difficulty: 'Beginner',
    timeEst: '8h',
    isKnown: true,
    prerequisites: [],
    whyLearn: 'Foundational markup for web protocols and web-based API responses.',
    connectedProjectId: 'portfolio-web',
    connectedProjectName: 'Developer Portfolio',
    lessonsCount: 4,
    assessmentCount: 1,
    evidenceItems: ['Semantic HTML', 'Document Object Model', 'Accessibility standards']
  },
  {
    id: 'css',
    name: 'CSS3',
    tier: 'FOUNDATIONS',
    tierIndex: 1,
    status: 'mastered',
    progress: 100,
    difficulty: 'Beginner',
    timeEst: '12h',
    isKnown: true,
    prerequisites: ['html'],
    whyLearn: 'Styling and layout comprehension for full-stack empathy and template rendering.',
    connectedProjectId: 'portfolio-web',
    connectedProjectName: 'Developer Portfolio',
    lessonsCount: 5,
    assessmentCount: 1,
    evidenceItems: ['Box Model', 'Flexbox / Grid', 'Responsive Media Queries']
  },
  {
    id: 'javascript',
    name: 'JavaScript Core',
    tier: 'FOUNDATIONS',
    tierIndex: 1,
    status: 'mastered',
    progress: 100,
    difficulty: 'Beginner+',
    timeEst: '28h',
    isKnown: true,
    prerequisites: ['html'],
    whyLearn: 'Core programming runtime for modern Node.js and full-stack architecture.',
    connectedProjectId: 'portfolio-web',
    connectedProjectName: 'Developer Portfolio',
    lessonsCount: 8,
    assessmentCount: 2,
    evidenceItems: ['Async/Await & Promises', 'Closures & Scope', 'ES6 Modules', 'Event Loop']
  },
  {
    id: 'python',
    name: 'Python',
    tier: 'FOUNDATIONS',
    tierIndex: 1,
    status: 'mastered',
    progress: 100,
    difficulty: 'Beginner',
    timeEst: '22h',
    isKnown: true,
    prerequisites: [],
    whyLearn: 'High-level server scripting, automation, and backend framework versatility.',
    connectedProjectId: 'task-api',
    connectedProjectName: 'Task Management API',
    lessonsCount: 6,
    assessmentCount: 2,
    evidenceItems: ['Data Structures', 'OOP Patterns', 'Virtualenv Management']
  },
  {
    id: 'git',
    name: 'Git & CLI',
    tier: 'FOUNDATIONS',
    tierIndex: 1,
    status: 'mastered',
    progress: 100,
    difficulty: 'Beginner',
    timeEst: '10h',
    isKnown: true,
    prerequisites: [],
    whyLearn: 'Essential version control and collaboration for every production developer.',
    connectedProjectId: 'task-api',
    connectedProjectName: 'Task Management API',
    lessonsCount: 4,
    assessmentCount: 1,
    evidenceItems: ['Branching & Merging', 'Resolving Conflicts', 'Interactive Rebase']
  },

  // TIER 2: CORE
  {
    id: 'http',
    name: 'HTTP Fundamentals',
    tier: 'CORE',
    tierIndex: 2,
    status: 'in-progress',
    progress: 85,
    difficulty: 'Intermediate',
    timeEst: '12h',
    isKnown: false,
    prerequisites: ['javascript', 'git'],
    whyLearn: 'The protocol powering every backend API, web client, and distributed system.',
    connectedProjectId: 'url-shortener',
    connectedProjectName: 'URL Shortener API',
    lessonsCount: 4,
    assessmentCount: 1,
    evidenceItems: ['HTTP Verbs & Status Codes', 'Headers & Content Negotiation', 'HTTPS & TLS Handshake']
  },
  {
    id: 'sql',
    name: 'SQL & Relational DBs',
    tier: 'CORE',
    tierIndex: 2,
    status: 'adaptive-remedy', // Shows adaptive status!
    progress: 60,
    difficulty: 'Intermediate',
    timeEst: '24h',
    isKnown: false,
    prerequisites: ['http'],
    whyLearn: 'Core data persistence, transactions (ACID), schema design, and query optimization.',
    connectedProjectId: 'url-shortener',
    connectedProjectName: 'URL Shortener API',
    lessonsCount: 6,
    assessmentCount: 2,
    weakAreas: ['JOINs', 'Aggregations'],
    evidenceItems: ['CRUD Queries', 'Foreign Keys', 'Indexes (B-Tree)']
  },

  // TIER 3: BACKEND
  {
    id: 'rest-api',
    name: 'REST APIs',
    tier: 'BACKEND',
    tierIndex: 3,
    status: 'in-focus',
    progress: 60,
    difficulty: 'Intermediate',
    timeEst: '20h',
    isKnown: false,
    prerequisites: ['http', 'javascript'],
    whyLearn: 'Required for your Backend Developer goal to build clean, maintainable web services.',
    connectedProjectId: 'url-shortener',
    connectedProjectName: 'URL Shortener API',
    lessonsCount: 5,
    assessmentCount: 1,
    evidenceItems: ['RESTful Resource Naming', 'Pagination & Filtering', 'Stateless Architecture', 'Error Payloads (RFC 7807)']
  },
  {
    id: 'auth',
    name: 'Authentication & JWT',
    tier: 'BACKEND',
    tierIndex: 3,
    status: 'up-next',
    progress: 0,
    difficulty: 'Intermediate+',
    timeEst: '18h',
    isKnown: false,
    prerequisites: ['rest-api'],
    whyLearn: 'Secure API access control, token signing, session lifecycle, and password hashing.',
    connectedProjectId: 'api-gateway',
    connectedProjectName: 'Production API Gateway',
    lessonsCount: 4,
    assessmentCount: 1,
    evidenceItems: ['JWT Claims & Verification', 'Bcrypt Hashing', 'Role-Based Access Control (RBAC)']
  },
  {
    id: 'testing',
    name: 'Automated Testing & QA',
    tier: 'BACKEND',
    tierIndex: 3,
    status: 'locked',
    progress: 0,
    difficulty: 'Intermediate',
    timeEst: '16h',
    isKnown: false,
    prerequisites: ['rest-api', 'auth'],
    whyLearn: 'Guarantee reliability with automated test suites before deploying to production.',
    connectedProjectId: 'api-gateway',
    connectedProjectName: 'Production API Gateway',
    lessonsCount: 5,
    assessmentCount: 1,
    evidenceItems: ['Unit Testing', 'API Integration Testing', 'Mocking & Stubs']
  },
  {
    id: 'databases',
    name: 'Databases & Redis Caching',
    tier: 'BACKEND',
    tierIndex: 3,
    status: 'locked',
    progress: 0,
    difficulty: 'Advanced',
    timeEst: '22h',
    isKnown: false,
    prerequisites: ['sql'],
    whyLearn: 'Sub-millisecond data retrieval and caching strategies for high throughput.',
    connectedProjectId: 'rate-limiter',
    connectedProjectName: 'Redis Distributed Rate Limiter',
    lessonsCount: 5,
    assessmentCount: 2,
    evidenceItems: ['Cache-aside Pattern', 'Redis TTL & Eviction', 'Connection Pooling']
  },

  // TIER 4: PRODUCTION
  {
    id: 'docker',
    name: 'Docker & Containers',
    tier: 'PRODUCTION',
    tierIndex: 4,
    status: 'locked',
    progress: 0,
    difficulty: 'Intermediate',
    timeEst: '18h',
    isKnown: false,
    prerequisites: ['rest-api'],
    whyLearn: 'Standardize runtime environments from local development through staging and cloud production.',
    connectedProjectId: 'api-gateway',
    connectedProjectName: 'Production API Gateway',
    lessonsCount: 4,
    assessmentCount: 1,
    evidenceItems: ['Multi-stage Dockerfiles', 'Container Networking', 'Compose Workflows']
  },
  {
    id: 'cicd',
    name: 'Deployment & CI/CD',
    tier: 'PRODUCTION',
    tierIndex: 4,
    status: 'locked',
    progress: 0,
    difficulty: 'Intermediate+',
    timeEst: '16h',
    isKnown: false,
    prerequisites: ['docker', 'testing'],
    whyLearn: 'Zero-downtime continuous deployment pipelines and infrastructure automation.',
    connectedProjectId: 'api-gateway',
    connectedProjectName: 'Production API Gateway',
    lessonsCount: 4,
    assessmentCount: 1,
    evidenceItems: ['GitHub Actions Workflows', 'Automated Test Validation', 'Cloud Provisioning']
  },
  {
    id: 'monitoring',
    name: 'Monitoring & Observability',
    tier: 'PRODUCTION',
    tierIndex: 4,
    status: 'locked',
    progress: 0,
    difficulty: 'Advanced',
    timeEst: '14h',
    isKnown: false,
    prerequisites: ['cicd'],
    whyLearn: 'Track latency, error budgets, structured logs, and uptime metrics in live systems.',
    connectedProjectId: 'order-system',
    connectedProjectName: 'Event-Driven Order System',
    lessonsCount: 3,
    assessmentCount: 1,
    evidenceItems: ['Structured JSON Logs', 'Prometheus Counters & Gauges', 'Error Alerting (Sentry)']
  }
];

export const FEATURED_PROJECT_WORKSPACE = {
  id: 'url-shortener',
  title: 'URL Shortener API',
  tagline: 'Build a production-style URL shortening service with rate limiting and database persistence.',
  difficulty: 'Intermediate',
  estimatedTime: '4–6 hours',
  currentProgress: 35,
  status: 'In Progress',
  connectedSkill: 'REST APIs',
  description: 'Create a robust URL redirection and shortening service. The API handles high read-throughput, unique base62 hash generation, custom alias creation, expiration cleanup, and client rate limiting.',
  skillsTested: [
    { name: 'HTTP', score: 100, desc: '301/302 Redirects, Headers, Status codes' },
    { name: 'REST', score: 80, desc: 'Resource URI structure, POST /links, GET /links/:code' },
    { name: 'Database', score: 60, desc: 'PostgreSQL unique indexing, click count atomic increments' },
    { name: 'Authentication', score: 70, desc: 'API key authorization for custom domain creation' },
    { name: 'Testing', score: 40, desc: 'Integration test suite with Supertest and Jest' }
  ],
  suggestedStack: [
    { name: 'Node.js & Express', role: 'Runtime & HTTP Framework' },
    { name: 'PostgreSQL', role: 'Relational storage with unique constraints' },
    { name: 'Redis', role: 'Fast key-value cache & rate limiting' },
    { name: 'Jest + Supertest', role: 'Automated test suite' }
  ],
  checklist: [
    { id: 'c1', title: 'Create short URLs', desc: 'Accept long URL via POST /api/v1/shorten, generate base62 hash, return shortened payload.', completed: true },
    { id: 'c2', title: 'Redirect users', desc: 'Implement GET /:code endpoint with HTTP 302 redirect and increment click counter.', completed: true },
    { id: 'c3', title: 'Store URLs in PostgreSQL', desc: 'Define schema with unique hash index, original URL, created_at, and user_id foreign key.', completed: false },
    { id: 'c4', title: 'Add expiration & TTL cleanup', desc: 'Support optional expires_at timestamp; return 410 Gone for expired links.', completed: false },
    { id: 'c5', title: 'Add JWT authentication', desc: 'Require Bearer token for user dashboard management and analytics.', completed: false },
    { id: 'c6', title: 'Add sliding-window rate limiting', desc: 'Limit unauthenticated requests to 20 req/min using Redis.', completed: false }
  ],
  submissionState: {
    githubRepo: 'https://github.com/madhav-dev/url-shortener-api-service',
    liveDemo: 'https://api-short.devpath.sh/v1/health',
    notes: 'Implemented base62 hashing algorithm with collision handling and PostgreSQL connection pooling. Added initial unit tests for hash generator.',
    isSubmitted: true
  },
  evidenceReport: {
    generatedAt: '2 hours ago',
    assessmentType: 'Prototype Assessment',
    assessmentSubtitle: 'Analyzed from GitHub AST parser, test coverage report, and endpoint contract checks.',
    skillsDemonstrated: [
      { name: 'HTTP', score: 100, confidence: 'High', details: '5 endpoints verified with correct status codes (201 Created, 302 Found, 404 Not Found)' },
      { name: 'REST', score: 80, confidence: 'High', details: 'Stateless resource architecture, JSON payloads, consistent REST URI conventions' },
      { name: 'Database', score: 60, confidence: 'Medium', details: 'CRUD queries functioning; missing compound index for (user_id, created_at)' },
      { name: 'Authentication', score: 70, confidence: 'Medium', details: 'JWT bearer auth middleware implemented; token expiration refresh missing' },
      { name: 'Testing', score: 40, confidence: 'Medium', details: '4 unit tests present; missing end-to-end integration test for redirection latency' }
    ],
    missingEvidence: [
      'Automated integration testing suite (e2e supertest runner)',
      'Token refresh rotation flow (RFC 6749)',
      'IP-based rate limiting fallback'
    ],
    recommendedNextProject: {
      id: 'api-gateway',
      title: 'Production API Gateway',
      reason: 'This project directly addresses your testing, rate-limiting, and OAuth security gaps.',
      difficulty: 'Intermediate+',
      hours: '6-8 hours'
    }
  }
};

export const ALL_PROJECTS = [
  {
    id: 'portfolio-web',
    title: 'Developer Portfolio',
    difficulty: 'Beginner',
    timeEst: '6 hours',
    status: 'Verified',
    progress: 100,
    skills: ['HTML5', 'CSS3', 'JavaScript Core', 'Git'],
    desc: 'Accessible, responsive personal showcase with dark mode, contact form handling, and automated GitHub Pages deployment.',
    evidenceScore: 94
  },
  {
    id: 'task-api',
    title: 'Task Management API',
    difficulty: 'Intermediate',
    timeEst: '5 hours',
    status: 'Verified',
    progress: 100,
    skills: ['Python', 'SQL & Relational DBs', 'REST APIs', 'Git'],
    desc: 'RESTful CRUD service with task filtering, pagination, PostgreSQL relations, and Pytest coverage.',
    evidenceScore: 89
  },
  FEATURED_PROJECT_WORKSPACE,
  {
    id: 'api-gateway',
    title: 'Production API Gateway',
    difficulty: 'Intermediate+',
    timeEst: '6–8 hours',
    status: 'Up Next',
    progress: 0,
    skills: ['REST APIs', 'Authentication & JWT', 'Automated Testing', 'Docker'],
    desc: 'Reverse proxy service with JWT validation, request signing, rate limiting, and centralized error logging.',
    evidenceScore: null
  },
  {
    id: 'rate-limiter',
    title: 'Redis Distributed Rate Limiter',
    difficulty: 'Advanced',
    timeEst: '4–6 hours',
    status: 'Locked',
    progress: 0,
    skills: ['Databases & Redis Caching', 'REST APIs', 'Docker'],
    desc: 'Token bucket and sliding window rate limiter backed by Redis atomic Lua scripts for 50,000+ RPS.',
    evidenceScore: null
  }
];

export const DEVELOPER_PASSPORT_DATA = {
  name: 'Madhav R.',
  handle: 'madhav_dev',
  badgeId: 'DP-VERIFIED-8921',
  role: 'Backend Developer',
  overallProgress: 72,
  level: 'Level 3 · Mid-Level Ready',
  verificationDate: 'October 2026',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  skills: [
    {
      name: 'JavaScript Core',
      score: 88,
      evidence: {
        projects: 3,
        assessments: 2,
        exercises: 18
      },
      tags: ['Async/Await', 'DOM APIs', 'Closures', 'ES6+']
    },
    {
      name: 'Python',
      score: 92,
      evidence: {
        projects: 4,
        assessments: 3,
        exercises: 24
      },
      tags: ['Data Structures', 'OOP', 'FastAPI/Flask', 'Virtualenvs']
    },
    {
      name: 'SQL & Relational DBs',
      score: 60,
      evidence: {
        projects: 1,
        assessments: 2,
        exercises: 12
      },
      tags: ['PostgreSQL', 'Basic Queries', 'Transactions', 'Needs JOIN drill']
    },
    {
      name: 'REST APIs',
      score: 78,
      evidence: {
        projects: 2,
        assessments: 1,
        exercises: 15
      },
      tags: ['HTTP Verbs', 'Resource Routing', 'Error Handlers', 'CRUD']
    },
    {
      name: 'Git & Version Control',
      score: 95,
      evidence: {
        projects: 5,
        assessments: 1,
        exercises: 10
      },
      tags: ['Branching', 'Interactive Rebase', 'PR Workflows', 'Merge Conflicts']
    },
    {
      name: 'Testing & QA',
      score: 42,
      evidence: {
        projects: 1,
        assessments: 1,
        exercises: 6
      },
      tags: ['Unit Tests', 'Assertions', 'In Progress']
    }
  ],
  verifiedProjects: [
    {
      title: 'Portfolio API & Website',
      role: 'Full Stack',
      completedDate: 'Sep 2026',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Git'],
      verifiedMetrics: '100% Lighthouse A11y · 0 Lint Errors · CI Verified'
    },
    {
      title: 'Task Management API',
      role: 'Backend Author',
      completedDate: 'Oct 2026',
      skills: ['Python', 'SQL', 'REST APIs', 'Git'],
      verifiedMetrics: '18 Automated Tests Passing · Postgres Foreign Keys'
    },
    {
      title: 'URL Shortener API',
      role: 'Backend Author',
      completedDate: 'In Progress (35%)',
      skills: ['HTTP', 'REST', 'PostgreSQL', 'Auth'],
      verifiedMetrics: 'Base62 Hash Generator · 302 Redirection Validated'
    }
  ],
  auditSummary: 'Candidate has demonstrated practical competency across core languages, version control, and web services. SQL JOIN mastery and integration testing are active target areas.'
};

export const EVIDENCE_GRAPH_DATA = [
  {
    skillId: 'javascript',
    skillName: 'JavaScript Core',
    icon: 'Code',
    color: '#eab308',
    score: 88,
    connections: [
      {
        type: 'project',
        name: 'Portfolio Website',
        role: 'Verified Project',
        proofPoints: ['DOM Manipulation', 'Event Listeners', 'Async Fetch API']
      },
      {
        type: 'project',
        name: 'URL Shortener API',
        role: 'Active Project',
        proofPoints: ['Base62 Algorithm', 'Async/Await error handling', 'Promise.all Concurrency']
      },
      {
        type: 'assessment',
        name: 'Diagnostic Assessment #204',
        role: 'Timed Code Evaluation',
        score: '87% (High Proficiency)'
      }
    ]
  },
  {
    skillId: 'rest-api',
    skillName: 'RESTful APIs',
    icon: 'Server',
    color: '#6366f1',
    score: 78,
    connections: [
      {
        type: 'project',
        name: 'URL Shortener API',
        role: 'Practical Implementation',
        proofPoints: ['Resource naming (/api/v1/shorten)', 'HTTP 201 / 302 status codes', 'JSON payload validation']
      },
      {
        type: 'project',
        name: 'Task Management API',
        role: 'Completed API',
        proofPoints: ['Cursor Pagination', 'Filtering & Query params', 'Idempotent PUT vs PATCH']
      },
      {
        type: 'assessment',
        name: 'API Architecture Assessment #118',
        role: 'Diagnostic Evaluation',
        score: '92% Architectural Score'
      }
    ]
  },
  {
    skillId: 'sql',
    skillName: 'SQL & Relational DBs',
    icon: 'Database',
    color: '#06b6d4',
    score: 60,
    connections: [
      {
        type: 'project',
        name: 'Task Management API',
        role: 'Completed Schema',
        proofPoints: ['Schema Migration', 'Foreign Key constraints', 'Basic CRUD Queries']
      },
      {
        type: 'assessment',
        name: 'Diagnostic Assessment #302',
        role: 'Target Gap Identified',
        score: '60% (Struggling with Multi-table JOINs & Aggregations)'
      },
      {
        type: 'adaptive',
        name: 'Remediation Path Triggered',
        role: 'Adaptive Action',
        proofPoints: ['SQL JOIN Visualizer added', '8-Question Drill queued']
      }
    ]
  },
  {
    skillId: 'git',
    skillName: 'Git & Version Control',
    icon: 'GitBranch',
    color: '#10b981',
    score: 95,
    connections: [
      {
        type: 'project',
        name: '5 Public Repositories',
        role: 'GitHub History',
        proofPoints: ['Atomic commits', 'Conventional commit messages', 'Feature branch rebasing']
      },
      {
        type: 'assessment',
        name: 'Git Workflow Assessment #101',
        role: 'Diagnostic Evaluation',
        score: '96% Score'
      }
    ]
  }
];

export const DIAGNOSTIC_QUIZZES = {
  'sql': {
    skillName: 'SQL & Relational DBs',
    title: 'SQL JOINs & Query Diagnostic',
    description: 'Test your understanding of multi-table relations, left/inner joins, and grouping.',
    questions: [
      {
        id: 'q1',
        question: 'Which SQL JOIN returns all rows from the left table, and matching rows from the right table (with NULLs for non-matching)?',
        options: ['INNER JOIN', 'LEFT OUTER JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'],
        correctIndex: 1,
        explanation: 'LEFT JOIN (or LEFT OUTER JOIN) preserves every record from the left table, padding missing right-table columns with NULL.'
      },
      {
        id: 'q2',
        question: 'In a query with GROUP BY and WHERE, which clause filters rows BEFORE grouping occurs?',
        options: ['HAVING', 'WHERE', 'ORDER BY', 'LIMIT'],
        correctIndex: 1,
        explanation: 'WHERE filters individual records prior to aggregation; HAVING filters aggregated groups.'
      },
      {
        id: 'q3',
        question: 'When creating an index on a foreign key column (e.g. user_id in orders table), what is the primary performance benefit?',
        options: ['Enforces uniqueness across users', 'Speeds up JOIN lookups and queries filtering by user_id', 'Reduces disk storage', 'Prevents deadlocks'],
        correctIndex: 1,
        explanation: 'Indexing foreign keys turns full table scans during JOIN operations into O(log n) B-Tree lookups.'
      }
    ]
  },
  'rest-api': {
    skillName: 'RESTful API Architecture',
    title: 'REST Architecture & Status Codes',
    description: 'Verify your knowledge of HTTP methods, idempotency, and status codes.',
    questions: [
      {
        id: 'q1',
        question: 'Which HTTP method is defined as idempotent and intended for partial updates to a resource?',
        options: ['POST', 'PATCH', 'PUT', 'DELETE'],
        correctIndex: 1,
        explanation: 'PATCH applies partial modifications. (Note: PUT is full replacement, POST is non-idempotent creation).'
      },
      {
        id: 'q2',
        question: 'What HTTP status code should be returned after successfully creating a resource via POST?',
        options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
        correctIndex: 1,
        explanation: '201 Created signifies that the request succeeded and a new resource has been allocated.'
      },
      {
        id: 'q3',
        question: 'According to REST conventions, which URI represents a clean endpoint to fetch comments for a specific post?',
        options: ['/getPostComments?postId=12', '/posts/12/comments', '/comments/filterByPost/12', '/fetch_all_post_comments/12'],
        correctIndex: 1,
        explanation: 'Hierarchical sub-resource naming: /posts/:id/comments clearly models the relational ownership in a clean RESTful way.'
      }
    ]
  }
};

// =============================================================================
// CURATED LEARNING MATERIALS & REFERENCE VIDEOS
// =============================================================================
export const LEARNING_MATERIALS = [
  // 1. TECHNICAL TRACK: REST APIs
  {
    id: 'mat-rest-api-1',
    skillId: 'rest-api',
    category: 'technical',
    title: 'REST API Design - Best Practices & Real World Architecture',
    type: 'youtube',
    creator: 'ByteByteGo',
    duration: '14 min',
    difficulty: 'Intermediate',
    url: 'https://www.youtube.com/watch?v=-MTSQjw5DrM',
    embedId: '-MTSQjw5DrM',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    description: 'Deep dive into REST architectural constraints, idempotency keys, HTTP status codes, error models, and API versioning strategies.',
    topics: ['Idempotency & HTTP Verbs', 'Pagination & Filtering', 'Error Handling (RFC 7807)', 'RESTful Resource Modeling'],
    rating: 4.9,
    views: '1.2M views',
    isBookmarked: false,
    isCompleted: false
  },
  {
    id: 'mat-rest-api-2',
    skillId: 'rest-api',
    category: 'technical',
    title: 'Build a Complete Production REST API in Node.js & Express',
    type: 'youtube',
    creator: 'Traversy Media',
    duration: '1h 45m',
    difficulty: 'Intermediate',
    url: 'https://www.youtube.com/watch?v=-0exw-9YJCE',
    embedId: '-0exw-9YJCE',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    description: 'Step-by-step masterclass covering controller routing, validation middleware, database integration, and security headers.',
    topics: ['Express.js Routing', 'JWT Middleware', 'Zod/Joi Validation', 'Postman Testing'],
    rating: 4.9,
    views: '890K views',
    isBookmarked: true,
    isCompleted: false
  },
  {
    id: 'mat-rest-api-3',
    skillId: 'rest-api',
    category: 'technical',
    title: 'MDN Web Docs: HTTP & REST API Architecture Guidelines',
    type: 'doc',
    creator: 'Mozilla Developer Network',
    duration: '20 min read',
    difficulty: 'Foundational',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    description: 'The definitive standard on HTTP status codes, caching headers, CORS policy, and request idempotency.',
    topics: ['HTTP Headers Spec', 'Safe vs Idempotent Methods', 'CORS & Security', 'Content Negotiation'],
    rating: 5.0,
    views: 'Official Docs',
    isBookmarked: false,
    isCompleted: true
  },

  // 2. TECHNICAL TRACK: SQL & RELATIONAL DBS
  {
    id: 'mat-sql-1',
    skillId: 'sql',
    category: 'technical',
    title: 'SQL Indexing & Query Optimization Masterclass',
    type: 'youtube',
    creator: 'Hussein Nasser',
    duration: '26 min',
    difficulty: 'Intermediate',
    url: 'https://www.youtube.com/watch?v=HubezKbFL7E',
    embedId: 'HubezKbFL7E',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80',
    description: 'Understand how B-Tree indexes work under the hood, how PostgreSQL processes EXPLAIN ANALYZE, and how to eliminate sequential table scans.',
    topics: ['B-Trees & Clustered Indexes', 'EXPLAIN ANALYZE Breakdown', 'Multi-table JOIN Algorithms', 'Query Plan Cost Models'],
    rating: 5.0,
    views: '450K views',
    isBookmarked: false,
    isCompleted: true
  },
  {
    id: 'mat-sql-2',
    skillId: 'sql',
    category: 'technical',
    title: 'SQL Joins Explained Visually (Inner, Left, Right, Full Outer, Cross)',
    type: 'youtube',
    creator: 'Web Dev Simplified',
    duration: '12 min',
    difficulty: 'Beginner',
    url: 'https://www.youtube.com/watch?v=0OQJDd3Pt38',
    embedId: '0OQJDd3Pt38',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    description: 'Visual diagrams and real database queries demonstrating how table joins merge relational rows.',
    topics: ['JOIN Mechanics', 'Handling NULLs', 'Composite Keys', 'Aggregations on Joins'],
    rating: 4.8,
    views: '1.8M views',
    isBookmarked: true,
    isCompleted: true
  },

  // 3. TECHNICAL TRACK: AUTHENTICATION & SECURITY
  {
    id: 'mat-auth-1',
    skillId: 'auth',
    category: 'technical',
    title: 'JWT vs Sessions vs OAuth: The Definitive Security Guide',
    type: 'youtube',
    creator: 'Fireship',
    duration: '11 min',
    difficulty: 'Intermediate+',
    url: 'https://www.youtube.com/watch?v=UBUNrFtufWo',
    embedId: 'UBUNrFtufWo',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80',
    description: 'Understand cryptographic signing, refresh tokens, cookie security attributes (HttpOnly, SameSite, Secure), and OAuth 2.0 PKCE flow.',
    topics: ['JWT Signature Verification', 'XSS vs CSRF Prevention', 'OAuth2 PKCE Flow', 'Revocation Strategies'],
    rating: 4.9,
    views: '1.4M views',
    isBookmarked: false,
    isCompleted: false
  },

  // 4. TECHNICAL TRACK: DOCKER & CONTAINERIZATION
  {
    id: 'mat-docker-1',
    skillId: 'docker',
    category: 'technical',
    title: 'Docker & Containerization - From Zero to Production Deployment',
    type: 'youtube',
    creator: 'TechWorld with Nana',
    duration: '48 min',
    difficulty: 'Beginner to Intermediate',
    url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
    embedId: '3c-iBn73dDE',
    thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&auto=format&fit=crop&q=80',
    description: 'Hands-on guide to containerizing microservices, writing lean multi-stage Dockerfiles, and managing networks with Docker Compose.',
    topics: ['Dockerfile Optimization', 'Multi-stage Builds', 'Docker Compose Volumes', 'Production Security'],
    rating: 4.9,
    views: '2.1M views',
    isBookmarked: false,
    isCompleted: false
  },

  // 5. TECHNICAL TRACK: HTTP & NETWORKING
  {
    id: 'mat-http-1',
    skillId: 'http',
    category: 'technical',
    title: 'HTTP/1.1 vs HTTP/2 vs HTTP/3: Network Protocols Explained',
    type: 'youtube',
    creator: 'ByteByteGo',
    duration: '9 min',
    difficulty: 'Intermediate',
    url: 'https://www.youtube.com/watch?v=a-sBfyiXysI',
    embedId: 'a-sBfyiXysI',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80',
    description: 'Detailed analysis of TCP handshakes, TLS 1.3 encryption, multiplexing, header compression (HPACK/QPACK), and QUIC protocol.',
    topics: ['TCP / TLS Handshakes', 'Multiplexing & HOL Blocking', 'Header Compression', 'QUIC & UDP'],
    rating: 4.9,
    views: '920K views',
    isBookmarked: false,
    isCompleted: false
  },

  // 6. TECHNICAL TRACK: GIT & CI/CD
  {
    id: 'mat-git-1',
    skillId: 'git',
    category: 'technical',
    title: 'Git Branching Strategies & Merge Conflict Resolution',
    type: 'youtube',
    creator: 'freeCodeCamp.org',
    duration: '35 min',
    difficulty: 'Beginner',
    url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
    embedId: 'RGOj5yH7evk',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    description: 'Master Git rebase vs merge, cherry-pick, stash workflows, interactive rebasing, and clean team PR conventions.',
    topics: ['Rebase vs Merge', 'Interactive Git Rebase', 'Resolving Conflicts', 'Trunk-based Development'],
    rating: 4.8,
    views: '3.1M views',
    isBookmarked: false,
    isCompleted: true
  },
  {
    id: 'mat-cicd-1',
    skillId: 'cicd',
    category: 'technical',
    title: 'Automated CI/CD Pipelines with GitHub Actions from Scratch',
    type: 'youtube',
    creator: 'Fireship',
    duration: '15 min',
    difficulty: 'Intermediate',
    url: 'https://www.youtube.com/watch?v=eB0nUzAI7M8',
    embedId: 'eB0nUzAI7M8',
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80',
    description: 'How to write workflow YAML configs, run automated unit test matrices, build Docker artifacts, and deploy automatically on git push.',
    topics: ['GitHub Actions Syntax', 'Matrix Testing', 'Secret Management', 'Automated Deployment'],
    rating: 4.9,
    views: '780K views',
    isBookmarked: false,
    isCompleted: false
  },

  // 7. SIDE HUSTLE TRACK: CLIENT ACQUISITION & FREELANCING
  {
    id: 'mat-hustle-1',
    skillId: 'freelancing',
    category: 'side-hustle',
    title: 'How to Win High-Paying Web Dev Clients (Cold Outreach & Proposals)',
    type: 'youtube',
    creator: 'Self-Made Millennial / Tech Lead',
    duration: '18 min',
    difficulty: 'Practical',
    url: 'https://www.youtube.com/watch?v=0hK2P3vK0F4',
    embedId: '0hK2P3vK0F4',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    description: 'Frameworks for writing winning proposals, identifying high-budget client pain points, value-based pricing, and closing retainers.',
    topics: ['Value-Based Pricing vs Hourly', 'Cold Email Positioning', 'Client Onboarding Contracts', 'Discovery Call Scripts'],
    rating: 4.9,
    views: '380K views',
    isBookmarked: true,
    isCompleted: false
  },
  {
    id: 'mat-hustle-2',
    skillId: 'digital-products',
    category: 'side-hustle',
    title: 'Building & Launching Micro-SaaS and Developer Boilerplates',
    type: 'youtube',
    creator: 'Indie Hackers & Greg Isenberg',
    duration: '28 min',
    difficulty: 'Intermediate',
    url: 'https://www.youtube.com/watch?v=9g01tKqQGfg',
    embedId: '9g01tKqQGfg',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    description: 'How to validate developer tools before writing code, package Next.js/Tailwind starter kits, and market on ProductHunt and Twitter/X.',
    topics: ['MVP Scoping', 'Stripe Integration & Licensing', 'Distribution Loops', 'SEO for Dev Tools'],
    rating: 4.8,
    views: '240K views',
    isBookmarked: false,
    isCompleted: false
  },
  {
    id: 'mat-hustle-3',
    skillId: 'web-freelancing',
    category: 'side-hustle',
    title: 'Freelance Web Design & Development Business: Complete Guide',
    type: 'youtube',
    creator: 'Flux Academy',
    duration: '32 min',
    difficulty: 'Practical',
    url: 'https://www.youtube.com/watch?v=zT2kZq3N0vQ',
    embedId: 'zT2kZq3N0vQ',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    description: 'Complete process from client briefing to wireframing, building fast responsive landing pages, and setting up ongoing maintenance retainers.',
    topics: ['Pitch Decks & Scope of Work', 'Landing Page Conversion', 'Maintenance Retainers', 'Client Handoffs'],
    rating: 4.9,
    views: '610K views',
    isBookmarked: false,
    isCompleted: false
  },

  // 8. SOFT SKILLS TRACK: LEADERSHIP & COMMUNICATION
  {
    id: 'mat-soft-1',
    skillId: 'leadership',
    category: 'soft-skills',
    title: 'How Senior & Staff Engineers Write Architectural RFCs That Get Approved',
    type: 'youtube',
    creator: 'Gergely Orosz (The Pragmatic Engineer)',
    duration: '22 min',
    difficulty: 'Advanced',
    url: 'https://www.youtube.com/watch?v=4x8z3d2aK_M',
    embedId: '4x8z3d2aK_M',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    description: 'How to frame technical trade-offs, align diverse stakeholders, structure clear RFC design docs, and navigate contentious architecture debates.',
    topics: ['RFC Document Structure', 'Trade-off Matrices', 'Asynchronous Consensus', 'Executive Stakeholder Alignment'],
    rating: 5.0,
    views: '410K views',
    isBookmarked: true,
    isCompleted: false
  },
  {
    id: 'mat-soft-2',
    skillId: 'communication',
    category: 'soft-skills',
    title: 'The Art of Communicating Complex Technical Ideas Simply',
    type: 'youtube',
    creator: 'Harvard Business Review',
    duration: '16 min',
    difficulty: 'Core Essential',
    url: 'https://www.youtube.com/watch?v=5aK3iP5kE9Q',
    embedId: '5aK3iP5kE9Q',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    description: 'Frameworks to explain distributed architectures, latency bottlenecks, and technical debt to non-technical executives and product managers.',
    topics: ['First-Principles Analogies', 'The Pyramid Principle', 'Active Listening in Meetings', 'Constructive Code Reviews'],
    rating: 4.9,
    views: '750K views',
    isBookmarked: false,
    isCompleted: false
  },
  {
    id: 'mat-soft-3',
    skillId: 'problem-solving',
    category: 'soft-skills',
    title: 'First Principles Thinking & Root Cause Analysis for Engineers',
    type: 'youtube',
    creator: 'Farnam Street / Engineering Culture',
    duration: '19 min',
    difficulty: 'Intermediate',
    url: 'https://www.youtube.com/watch?v=1xNqJ3B5h8Y',
    embedId: '1xNqJ3B5h8Y',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    description: '5-Whys methodology, blameless post-mortems, systems thinking, and breaking complex failure modes into solvable sub-problems.',
    topics: ['5-Whys Root Cause Analysis', 'Blameless Post-Mortems', 'Cognitive Bias Mitigation', 'Second-Order Effects'],
    rating: 4.8,
    views: '320K views',
    isBookmarked: false,
    isCompleted: false
  }
];

