// Comprehensive Roadmap Journey Dataset for Technical, Side Hustle, and Soft Skills Paths

export const ROADMAP_JOURNEY_PATHS = {
  // ===========================================================================
  // 1. TECHNICAL TRACKS
  // ===========================================================================
  'backend': {
    id: 'backend',
    category: 'technical',
    title: 'Backend Developer',
    subtitle: 'Architect resilient distributed APIs, high-performance database layers, and cloud microservices.',
    badge: 'High Demand',
    estHours: 85,
    goalTitle: 'BACKEND ARCHITECT',
    goalDescription: 'Production mastery of distributed REST/GraphQL APIs, SQL indexing, containerized deployment, and system telemetry.',
    stages: [
      {
        id: 'stage-be-1',
        num: '01',
        phase: 'START / FOUNDATIONS',
        title: 'Core Programming & Runtime',
        whyItMatters: 'Master async execution, memory models, and algorithmic efficiency in Python or Node.js.',
        skillIds: ['javascript', 'python'],
        skills: ['Async/Await & Promises', 'Data Structures', 'OOP Patterns', 'Memory Management'],
        lessonsCount: 6,
        assessmentsCount: 2,
        estTime: '12h',
        project: { id: 'portfolio-web', name: 'Developer Runtime Lab', hours: '4h' },
        learningMaterialId: 'mat-rest-api-2'
      },
      {
        id: 'stage-be-2',
        num: '02',
        phase: 'VERSION CONTROL',
        title: 'Git Workflows & Collaborative CLI',
        whyItMatters: 'Essential version control, team branching strategies, interactive rebasing, and clean PR workflows.',
        skillIds: ['git', 'linux'],
        skills: ['Branching & Merging', 'Interactive Rebase', 'Resolving Conflicts', 'SSH & Permissions'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: null,
        learningMaterialId: 'mat-git-1'
      },
      {
        id: 'stage-be-3',
        num: '03',
        phase: 'NETWORKING',
        title: 'HTTP Protocols & Network Architecture',
        whyItMatters: 'Understand TCP/TLS handshakes, HTTP/2 multiplexing, headers, status codes, and DNS resolution.',
        skillIds: ['http'],
        skills: ['HTTP/1.1 vs HTTP/2/3', 'TLS 1.3 Encryption', 'Headers & Caching', 'DNS & Sockets'],
        lessonsCount: 5,
        assessmentsCount: 1,
        estTime: '10h',
        project: null,
        learningMaterialId: 'mat-http-1'
      },
      {
        id: 'stage-be-4',
        num: '04',
        phase: 'DATA PERSISTENCE',
        title: 'SQL Relational DBs & Query Optimization',
        whyItMatters: 'Architect normalized schemas, multi-table JOINs, indexing strategies, and ACID transaction guarantees.',
        skillIds: ['sql'],
        skills: ['PostgreSQL Schemas', 'B-Tree Indexing', 'EXPLAIN ANALYZE', 'Transactions & ACID'],
        lessonsCount: 8,
        assessmentsCount: 2,
        estTime: '18h',
        project: { id: 'analytics-db', name: 'Database Optimization Task', hours: '6h' },
        learningMaterialId: 'mat-sql-1'
      },
      {
        id: 'stage-be-5',
        num: '05',
        phase: 'API ARCHITECTURE',
        title: 'RESTful API Design & Middleware',
        whyItMatters: 'Build idempotent endpoints, robust validation middleware, rate limiting, and standard RFC error handling.',
        skillIds: ['rest-api'],
        skills: ['REST Architectural Constraints', 'Idempotency Keys', 'Zod/Joi Validation', 'RFC 7807 Error Models'],
        lessonsCount: 6,
        assessmentsCount: 2,
        estTime: '14h',
        project: { id: 'url-shortener', name: 'URL Shortener API', hours: '6h' },
        learningMaterialId: 'mat-rest-api-1'
      },
      {
        id: 'stage-be-6',
        num: '06',
        phase: 'SECURITY & IDENTITY',
        title: 'Authentication, OAuth & Security',
        whyItMatters: 'Implement cryptographic authentication, JWT rotation, session cookies, RBAC, and OWASP defenses.',
        skillIds: ['auth'],
        skills: ['JWT Signature Verification', 'Refresh Tokens', 'OAuth 2.0 PKCE', 'XSS & CSRF Mitigation'],
        lessonsCount: 6,
        assessmentsCount: 1,
        estTime: '12h',
        project: { id: 'auth-service', name: 'Identity & Auth Microservice', hours: '5h' },
        learningMaterialId: 'mat-auth-1'
      },
      {
        id: 'stage-be-7',
        num: '07',
        phase: 'CONTAINERS & CLOUD',
        title: 'Docker & Microservice Orchestration',
        whyItMatters: 'Containerize backend workloads with multi-stage Dockerfiles and Docker Compose networking.',
        skillIds: ['docker', 'databases'],
        skills: ['Multi-Stage Dockerfiles', 'Docker Compose', 'Redis Caching Layer', 'Volume Persistence'],
        lessonsCount: 5,
        assessmentsCount: 1,
        estTime: '10h',
        project: { id: 'dockerized-api', name: 'Dockerized Microservice Cluster', hours: '4h' },
        learningMaterialId: 'mat-docker-1'
      },
      {
        id: 'stage-be-8',
        num: '08',
        phase: 'PRODUCTION PIPELINE',
        title: 'CI/CD, Telemetry & Live Deployment',
        whyItMatters: 'Automate build testing with GitHub Actions, structured logging (Pino), and cloud deployments.',
        skillIds: ['cicd', 'monitoring', 'testing'],
        skills: ['GitHub Actions CI/CD', 'Jest/Pytest Unit QA', 'Structured Pino Logging', 'Sentry APM Tracking'],
        lessonsCount: 6,
        assessmentsCount: 2,
        estTime: '14h',
        project: { id: 'prod-deploy', name: 'Production Backend Deployment', hours: '6h' },
        learningMaterialId: 'mat-cicd-1'
      }
    ]
  },

  'frontend': {
    id: 'frontend',
    category: 'technical',
    title: 'Frontend Developer',
    subtitle: 'Craft responsive, accessible, high-performance web applications and sleek user interfaces.',
    badge: 'Popular',
    estHours: 75,
    goalTitle: 'LEAD FRONTEND ENGINEER',
    goalDescription: 'Expertise in modern React architecture, state orchestration, web vitals optimization, and design systems.',
    stages: [
      {
        id: 'stage-fe-1',
        num: '01',
        phase: 'FOUNDATIONS',
        title: 'Semantic HTML5 & Modern CSS3 Layouts',
        whyItMatters: 'Build responsive Flexbox/Grid layouts with accessible DOM hierarchy and modern CSS variables.',
        skillIds: ['html', 'css'],
        skills: ['Semantic Elements', 'Flexbox & CSS Grid', 'CSS Custom Properties', 'Responsive Breakpoints'],
        lessonsCount: 5,
        assessmentsCount: 1,
        estTime: '10h',
        project: { id: 'portfolio-web', name: 'Responsive Design System', hours: '4h' },
        learningMaterialId: 'mat-rest-api-3'
      },
      {
        id: 'stage-fe-2',
        num: '02',
        phase: 'CORE SCRIPTING',
        title: 'Modern JavaScript (ES6+) & DOM APIs',
        whyItMatters: 'Master closures, event delegation, async fetch pipelines, and modular JavaScript architecture.',
        skillIds: ['javascript'],
        skills: ['Closures & Scope', 'Async/Await & Promises', 'Event Loop & Bubbling', 'Fetch & JSON APIs'],
        lessonsCount: 7,
        assessmentsCount: 2,
        estTime: '16h',
        project: { id: 'js-app', name: 'Interactive Dynamic Dashboard', hours: '5h' },
        learningMaterialId: 'mat-rest-api-2'
      },
      {
        id: 'stage-fe-3',
        num: '03',
        phase: 'TYPE SAFETY',
        title: 'TypeScript for UI Architecture',
        whyItMatters: 'Prevent runtime crashes through static typing, generics, interfaces, and strict union types.',
        skillIds: ['typescript'],
        skills: ['Generics & Interfaces', 'Union & Narrowing', 'Component Prop Types', 'Strict Null Checks'],
        lessonsCount: 6,
        assessmentsCount: 1,
        estTime: '12h',
        project: null,
        learningMaterialId: 'mat-rest-api-1'
      },
      {
        id: 'stage-fe-4',
        num: '04',
        phase: 'COMPONENT ARCHITECTURE',
        title: 'React 18+ & Custom Hooks',
        whyItMatters: 'Build modular, reusable component trees with custom hooks, memoization, and Suspense boundaries.',
        skillIds: ['react', 'tailwind'],
        skills: ['Hooks Lifecycle (useEffect, useMemo)', 'Custom Hook Extraction', 'Tailwind Utility Styling', 'Virtual DOM Diffing'],
        lessonsCount: 8,
        assessmentsCount: 2,
        estTime: '18h',
        project: { id: 'react-kanban', name: 'Kanban Task Workspace', hours: '6h' },
        learningMaterialId: 'mat-hustle-2'
      },
      {
        id: 'stage-fe-5',
        num: '05',
        phase: 'STATE ORCHESTRATION',
        title: 'Global State Management & API Caching',
        whyItMatters: 'Manage complex UI state, optimistic updates, and cache synchronization with Zustand and React Query.',
        skillIds: ['state-management'],
        skills: ['Zustand Store Architecture', 'TanStack React Query', 'Optimistic UI Updates', 'Cache Invalidation'],
        lessonsCount: 6,
        assessmentsCount: 1,
        estTime: '14h',
        project: { id: 'store-app', name: 'E-Commerce Cart State Machine', hours: '5h' },
        learningMaterialId: 'mat-rest-api-1'
      },
      {
        id: 'stage-fe-6',
        num: '06',
        phase: 'PERFORMANCE & TESTING',
        title: 'Web Vitals, Testing & Build Optimization',
        whyItMatters: 'Optimize Core Web Vitals (LCP, FID, CLS), automated component testing with Vitest/Playwright, and Vite bundling.',
        skillIds: ['testing', 'cicd'],
        skills: ['Core Web Vitals Optimization', 'Vitest & React Testing Lib', 'Code Splitting & Lazy Loading', 'Vite Production Bundling'],
        lessonsCount: 6,
        assessmentsCount: 2,
        estTime: '14h',
        project: { id: 'prod-frontend', name: 'Production High-Performance App', hours: '6h' },
        learningMaterialId: 'mat-cicd-1'
      }
    ]
  },

  'fullstack': {
    id: 'fullstack',
    category: 'technical',
    title: 'Full Stack Developer',
    subtitle: 'Bridge client interfaces and distributed cloud backends with end-to-end fullstack engineering.',
    badge: 'Comprehensive',
    estHours: 95,
    goalTitle: 'FULL STACK ARCHITECT',
    goalDescription: 'End-to-end mastery of frontend components, backend APIs, relational databases, Docker containers, and CI/CD pipelines.',
    stages: [
      {
        id: 'stage-fs-1',
        num: '01',
        phase: 'WEB FOUNDATIONS',
        title: 'Full Stack Foundations (HTML/CSS/JS)',
        whyItMatters: 'Core web standards, semantic document trees, modern ECMAScript, and responsive design.',
        skillIds: ['html', 'css', 'javascript'],
        skills: ['Semantic HTML5', 'Responsive CSS3', 'Async JavaScript', 'Git Version Control'],
        lessonsCount: 6,
        assessmentsCount: 2,
        estTime: '14h',
        project: { id: 'portfolio-web', name: 'Developer Portfolio Workspace', hours: '4h' },
        learningMaterialId: 'mat-git-1'
      },
      {
        id: 'stage-fs-2',
        num: '02',
        phase: 'BACKEND SERVICES',
        title: 'Node.js & Express REST APIs',
        whyItMatters: 'Build server-side logic, routing pipelines, request validation, and API authentication.',
        skillIds: ['http', 'rest-api'],
        skills: ['Express Controllers', 'HTTP Status Codes', 'Middleware Chains', 'CORS & Security Headers'],
        lessonsCount: 7,
        assessmentsCount: 2,
        estTime: '16h',
        project: { id: 'url-shortener', name: 'URL Shortener API', hours: '6h' },
        learningMaterialId: 'mat-rest-api-2'
      },
      {
        id: 'stage-fs-3',
        num: '03',
        phase: 'DATABASE PERSISTENCE',
        title: 'PostgreSQL & ORM Modeling',
        whyItMatters: 'Design relational schemas, manage database migrations, write efficient queries, and prevent injection.',
        skillIds: ['sql'],
        skills: ['PostgreSQL Schema Design', 'Prisma/Drizzle ORM', 'Database Migrations', 'Connection Pooling'],
        lessonsCount: 7,
        assessmentsCount: 2,
        estTime: '16h',
        project: { id: 'db-app', name: 'Relational Store Backend', hours: '5h' },
        learningMaterialId: 'mat-sql-1'
      },
      {
        id: 'stage-fs-4',
        num: '04',
        phase: 'CLIENT APPLICATION',
        title: 'React & TypeScript Frontend',
        whyItMatters: 'Build reactive user interfaces, component state machines, custom hooks, and Tailwind CSS styling.',
        skillIds: ['react', 'typescript', 'tailwind'],
        skills: ['React Hooks', 'TypeScript Interfaces', 'Tailwind Utility Design', 'Form Handling & Validation'],
        lessonsCount: 8,
        assessmentsCount: 2,
        estTime: '18h',
        project: { id: 'client-portal', name: 'Client Portal Dashboard', hours: '6h' },
        learningMaterialId: 'mat-hustle-2'
      },
      {
        id: 'stage-fs-5',
        num: '05',
        phase: 'AUTHENTICATION & SEC',
        title: 'JWT, Session Security & OAuth 2.0',
        whyItMatters: 'Implement end-to-end user authentication, cryptographic password hashing, and role-based permissions.',
        skillIds: ['auth'],
        skills: ['JWT Token Rotation', 'HttpOnly Cookie Storage', 'OAuth 2.0 PKCE', 'Role-Based Access Control'],
        lessonsCount: 6,
        assessmentsCount: 1,
        estTime: '12h',
        project: { id: 'auth-app', name: 'Multi-Tenant Auth System', hours: '5h' },
        learningMaterialId: 'mat-auth-1'
      },
      {
        id: 'stage-fs-6',
        num: '06',
        phase: 'CONTAINERS & CI/CD',
        title: 'Full Stack Deployment & Cloud CI/CD',
        whyItMatters: 'Package full stack apps into Docker containers and deploy with automated GitHub Actions.',
        skillIds: ['docker', 'cicd', 'testing'],
        skills: ['Docker Multi-Stage Builds', 'GitHub Actions Automation', 'Cloud Hosting Deployment', 'Healthcheck Observability'],
        lessonsCount: 6,
        assessmentsCount: 2,
        estTime: '15h',
        project: { id: 'fullstack-deploy', name: 'Live Production Full Stack Launch', hours: '6h' },
        learningMaterialId: 'mat-cicd-1'
      }
    ]
  },

  'devops': {
    id: 'devops',
    category: 'technical',
    title: 'DevOps Engineer',
    subtitle: 'Automate infrastructure, orchestrate cloud containers, and build resilient CI/CD pipelines.',
    badge: 'High Growth',
    estHours: 85,
    goalTitle: 'SITE RELIABILITY & DEVOPS ENGINEER',
    goalDescription: 'Mastery of Linux systems, Docker/Kubernetes container orchestration, Terraform IaC, and Prometheus/Grafana telemetry.',
    stages: [
      {
        id: 'stage-do-1',
        num: '01',
        phase: 'LINUX & NETWORKING',
        title: 'Linux Systems & Bash Automation',
        whyItMatters: 'Process management, file permissions, shell scripting, SSH keys, and system diagnostics.',
        skillIds: ['linux', 'git'],
        skills: ['Bash Scripting', 'Process & Memory Signals', 'Systemd Services', 'SSH & Firewall Setup'],
        lessonsCount: 6,
        assessmentsCount: 2,
        estTime: '14h',
        project: null,
        learningMaterialId: 'mat-git-1'
      },
      {
        id: 'stage-do-2',
        num: '02',
        phase: 'CONTAINERS',
        title: 'Docker & Multi-Container Networking',
        whyItMatters: 'Build secure, minimal container images, manage volumes, and write Docker Compose networks.',
        skillIds: ['docker'],
        skills: ['Dockerfile Hardening', 'Multi-Stage Optimization', 'Compose Networks', 'Image Vulnerability Audits'],
        lessonsCount: 6,
        assessmentsCount: 1,
        estTime: '14h',
        project: { id: 'docker-infra', name: 'Microservices Container Mesh', hours: '5h' },
        learningMaterialId: 'mat-docker-1'
      },
      {
        id: 'stage-do-3',
        num: '03',
        phase: 'CI/CD AUTOMATION',
        title: 'Automated CI/CD Pipelines (GitHub Actions)',
        whyItMatters: 'Build automated test runners, lint gates, Docker build-and-push triggers, and automated rollouts.',
        skillIds: ['cicd'],
        skills: ['YAML Workflow Architecture', 'Test Matrix Runner', 'Secret Ingestion', 'Automated SemVer Tagging'],
        lessonsCount: 6,
        assessmentsCount: 2,
        estTime: '14h',
        project: { id: 'cicd-pipeline', name: 'Zero-Downtime Pipeline', hours: '5h' },
        learningMaterialId: 'mat-cicd-1'
      },
      {
        id: 'stage-do-4',
        num: '04',
        phase: 'ORCHESTRATION',
        title: 'Kubernetes Pods, Services & Ingress',
        whyItMatters: 'Deploy self-healing container clusters with automated scaling, rolling updates, and Ingress routing.',
        skillIds: ['kubernetes'],
        skills: ['Pod & Deployment Manifests', 'Cluster Services & Ingress', 'ConfigMaps & Secrets', 'Horizontal Pod Autoscaling'],
        lessonsCount: 8,
        assessmentsCount: 2,
        estTime: '20h',
        project: { id: 'k8s-cluster', name: 'Kubernetes Resilient Cluster', hours: '6h' },
        learningMaterialId: 'mat-docker-1'
      },
      {
        id: 'stage-do-5',
        num: '05',
        phase: 'TELEMETRY & SRE',
        title: 'Observability, Prometheus & APM',
        whyItMatters: 'Monitor cluster metrics, set up automated alerting thresholds, and debug distributed request traces.',
        skillIds: ['monitoring'],
        skills: ['Prometheus Metric Scraping', 'Grafana Dashboards', 'Alertmanager Webhooks', 'Structured Log Aggregation'],
        lessonsCount: 6,
        assessmentsCount: 1,
        estTime: '14h',
        project: { id: 'telemetry-hub', name: 'Production Telemetry Suite', hours: '5h' },
        learningMaterialId: 'mat-http-1'
      }
    ]
  },

  'data-ai': {
    id: 'data-ai',
    category: 'technical',
    title: 'Data & AI Engineer',
    subtitle: 'Build distributed data pipelines, deploy machine learning models, and harness vector embeddings & LLMs.',
    badge: 'Emerging',
    estHours: 85,
    goalTitle: 'DATA & APPLIED AI ENGINEER',
    goalDescription: 'Mastery of Python data manipulation, vector search, ETL pipelines, and production LLM orchestration.',
    stages: [
      {
        id: 'stage-ai-1',
        num: '01',
        phase: 'FOUNDATIONS',
        title: 'Python for Data & Pandas Wrangling',
        whyItMatters: 'Manipulate large dataframes, clean unstructured datasets, and perform vectorized operations.',
        skillIds: ['python'],
        skills: ['Pandas Vectorization', 'NumPy Arrays', 'Data Cleaning Pipelines', 'Statistical Analysis'],
        lessonsCount: 6,
        assessmentsCount: 2,
        estTime: '14h',
        project: null,
        learningMaterialId: 'mat-sql-1'
      },
      {
        id: 'stage-ai-2',
        num: '02',
        phase: 'DATA PIPELINES',
        title: 'SQL Analytics & ETL Pipelines',
        whyItMatters: 'Extract, transform, and load warehouse datasets with complex window functions and aggregations.',
        skillIds: ['sql'],
        skills: ['Window Functions & Partitioning', 'ETL Batch Processing', 'Postgres Vector Extensions', 'Data Schemas'],
        lessonsCount: 7,
        assessmentsCount: 2,
        estTime: '16h',
        project: { id: 'etl-pipeline', name: 'Automated Analytics Pipeline', hours: '5h' },
        learningMaterialId: 'mat-sql-1'
      },
      {
        id: 'stage-ai-3',
        num: '03',
        phase: 'EMBEDDINGS & VECTOR DB',
        title: 'Vector Embeddings & Semantic Search',
        whyItMatters: 'Transform text into high-dimensional vector embeddings and perform cosine similarity search with pgvector/Pinecone.',
        skillIds: ['rest-api'],
        skills: ['Text Embeddings (OpenAI/Cohere)', 'Vector Distance Metrics', 'Pinecone & pgvector Indexing', 'Semantic Retrieval'],
        lessonsCount: 6,
        assessmentsCount: 2,
        estTime: '16h',
        project: { id: 'vector-search', name: 'Semantic Documentation Search', hours: '6h' },
        learningMaterialId: 'mat-rest-api-1'
      },
      {
        id: 'stage-ai-4',
        num: '04',
        phase: 'LLM OPS & PRODUCTION',
        title: 'RAG Architecture & LLM API Deployment',
        whyItMatters: 'Build production Retrieval-Augmented Generation systems with context window optimization and streaming responses.',
        skillIds: ['docker', 'rest-api'],
        skills: ['RAG Pipeline Architecture', 'Context Chunking Strategies', 'FastAPI Model Serving', 'Prompt Injection Defense'],
        lessonsCount: 8,
        assessmentsCount: 2,
        estTime: '20h',
        project: { id: 'rag-engine', name: 'Production RAG AI Knowledge Assistant', hours: '6h' },
        learningMaterialId: 'mat-auth-1'
      }
    ]
  },

  'cybersecurity': {
    id: 'cybersecurity',
    category: 'technical',
    title: 'Cybersecurity Engineer',
    subtitle: 'Defend distributed systems, conduct vulnerability audits, and implement zero-trust architectures.',
    badge: 'Critical',
    estHours: 85,
    goalTitle: 'CYBERSECURITY DEFENDER & AUDITOR',
    goalDescription: 'Mastery of network packet inspection, web application penetration testing, cryptographic protocols, and incident response.',
    stages: [
      {
        id: 'stage-sec-1',
        num: '01',
        phase: 'FOUNDATIONS',
        title: 'Network Security & Packet Protocols',
        whyItMatters: 'Inspect TCP/UDP packets, analyze DNS exploits, firewalls, and encrypted TLS tunnels.',
        skillIds: ['http', 'linux'],
        skills: ['Wireshark Packet Analysis', 'TCP Handshake Vulnerabilities', 'TLS Certificate Auditing', 'Firewall Rules'],
        lessonsCount: 6,
        assessmentsCount: 1,
        estTime: '14h',
        project: null,
        learningMaterialId: 'mat-http-1'
      },
      {
        id: 'stage-sec-2',
        num: '02',
        phase: 'WEB VULNERABILITIES',
        title: 'OWASP Top 10 & API Pen-Testing',
        whyItMatters: 'Identify SQL injections, Broken Object Level Auth (BOLA), cross-site scripting (XSS), and CSRF vulnerabilities.',
        skillIds: ['auth', 'rest-api'],
        skills: ['BOLA / IDOR Exploitation', 'SQL Injection Mitigation', 'XSS Sanitization & CSP', 'API Rate Abuse'],
        lessonsCount: 7,
        assessmentsCount: 2,
        estTime: '18h',
        project: { id: 'pen-test', name: 'API Security Audit Report', hours: '6h' },
        learningMaterialId: 'mat-auth-1'
      },
      {
        id: 'stage-sec-3',
        num: '03',
        phase: 'CRYPTOGRAPHY & DEFENSE',
        title: 'Cryptographic Security & Zero-Trust Defense',
        whyItMatters: 'Deploy asymmetric key signing, KMS key rotation, secret management, and Zero-Trust network perimeters.',
        skillIds: ['auth', 'docker'],
        skills: ['Public-Key Infrastructure (PKI)', 'AES & HMAC Encryption', 'Secret Rotation Policies', 'Zero-Trust Architecture'],
        lessonsCount: 7,
        assessmentsCount: 2,
        estTime: '18h',
        project: { id: 'zero-trust', name: 'Hardened Zero-Trust Microservice Cluster', hours: '6h' },
        learningMaterialId: 'mat-auth-1'
      }
    ]
  },

  // ===========================================================================
  // 2. SIDE HUSTLE TRACKS
  // ===========================================================================
  'freelancing': {
    id: 'freelancing',
    category: 'side-hustle',
    title: 'Freelancing',
    subtitle: 'Turn your software and design skills into high-ticket freelance client contracts and monthly retainers.',
    badge: 'High Income',
    estHours: 45,
    goalTitle: 'SUCCESSFUL INDEPENDENT FREELANCER',
    goalDescription: 'Predictable client acquisition pipeline, value-based pricing proposals, and recurring monthly maintenance retainers.',
    stages: [
      {
        id: 'stage-fl-1',
        num: '01',
        phase: 'NICHE DISCOVERY',
        title: 'Skill Positioning & High-ROI Niches',
        whyItMatters: 'Identify high-budget client industries and articulate clear value propositions rather than being a generic dev.',
        skillIds: ['Portfolio building'],
        skills: ['Industry Niche Selection', 'Positioning Statement', 'Case Study Structuring', 'Proof of Competence'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: { id: 'niche-site', name: 'Specialized Freelance Portfolio', hours: '4h' },
        learningMaterialId: 'mat-hustle-1'
      },
      {
        id: 'stage-fl-2',
        num: '02',
        phase: 'OUTREACH & LEADS',
        title: 'Cold Outreach & Client Pipeline',
        whyItMatters: 'Generate consistent client leads through targeted cold email, LinkedIn positioning, and discovery calls.',
        skillIds: ['Finding clients', 'Client communication'],
        skills: ['Cold Email Frameworks', 'LinkedIn Inbound Funnel', 'Discovery Call Scripts', 'Client Qualification'],
        lessonsCount: 5,
        assessmentsCount: 1,
        estTime: '10h',
        project: { id: 'outreach-campaign', name: '50-Lead Outreach Campaign', hours: '4h' },
        learningMaterialId: 'mat-hustle-1'
      },
      {
        id: 'stage-fl-3',
        num: '03',
        phase: 'PROPOSALS & PRICING',
        title: 'Value-Based Pricing & Winning Proposals',
        whyItMatters: 'Price based on client revenue impact rather than hourly billing, and write clear proposals that close.',
        skillIds: ['Pricing', 'Proposal writing'],
        skills: ['Value-Based Pricing Models', '3-Tier Proposal Architecture', 'Scope of Work (SOW)', 'Contract Milestones'],
        lessonsCount: 5,
        assessmentsCount: 1,
        estTime: '10h',
        project: { id: 'proposal-doc', name: 'High-Ticket Client Proposal Template', hours: '3h' },
        learningMaterialId: 'mat-hustle-1'
      },
      {
        id: 'stage-fl-4',
        num: '04',
        phase: 'DELIVERY & RETAINERS',
        title: 'Client Delivery & Recurring Retainers',
        whyItMatters: 'Deliver flawless handoffs, establish long-term client trust, and upsell monthly maintenance retainers.',
        skillIds: ['Project delivery'],
        skills: ['Client Onboarding Formats', 'Weekly Asynchronous Updates', 'Handoff Documentation', 'Recurring Retainer Upsells'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: { id: 'retainer-contract', name: 'Recurring Retainer Agreement', hours: '3h' },
        learningMaterialId: 'mat-hustle-3'
      }
    ]
  },

  'web-freelancing': {
    id: 'web-freelancing',
    category: 'side-hustle',
    title: 'Web Freelancing',
    subtitle: 'Ship high-converting landing pages and business websites for SMBs with recurring hosting retainers.',
    badge: 'Rapid Launch',
    estHours: 40,
    goalTitle: 'WEB FREELANCE AGENCY FOUNDER',
    goalDescription: 'Fast landing page delivery engine, automated client outreach, and $1.5k+/mo recurring maintenance contracts.',
    stages: [
      {
        id: 'stage-wf-1',
        num: '01',
        phase: 'LANDING PAGE ARCHITECTURE',
        title: 'High-Converting Landing Pages',
        whyItMatters: 'Build blazing-fast, responsive landing pages tailored for business conversion and clear calls-to-action.',
        skillIds: ['Landing pages', 'Websites'],
        skills: ['Hero Section Conversion', 'Mobile Responsive Layouts', 'SEO Meta Tags', 'Form Lead Capturing'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: { id: 'smb-landing', name: 'SMB High-Converting Landing Page', hours: '4h' },
        learningMaterialId: 'mat-hustle-3'
      },
      {
        id: 'stage-wf-2',
        num: '02',
        phase: 'PROSPECTING',
        title: 'Local & Online Client Acquisition',
        whyItMatters: 'Identify businesses with broken websites, audit their speed/SEO, and send irresistible video audits.',
        skillIds: ['Client acquisition'],
        skills: ['Website Audit Scripts', 'Loom Video Pitches', 'Local Business Prospecting', 'Follow-up Cadence'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: { id: 'pitch-audit', name: 'Loom Video Audit Pitch Deck', hours: '3h' },
        learningMaterialId: 'mat-hustle-1'
      },
      {
        id: 'stage-wf-3',
        num: '03',
        phase: 'DEPLOYMENT & HOSTING',
        title: 'Hosting Retainers & Maintenance',
        whyItMatters: 'Turn one-time website builds into $150-$300/month recurring maintenance and hosting packages.',
        skillIds: ['Deployment', 'Maintenance', 'Pricing'],
        skills: ['Vercel/Cloudflare Deployment', 'Domain & DNS Setup', 'Monthly Backup Policies', 'Maintenance SLA Pricing'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: { id: 'maintenance-package', name: 'Client Maintenance SLA Proposal', hours: '3h' },
        learningMaterialId: 'mat-hustle-3'
      }
    ]
  },

  'digital-products': {
    id: 'digital-products',
    category: 'side-hustle',
    title: 'Digital Products & Micro-SaaS',
    subtitle: 'Productize your code into scalable developer boilerplates, UI kits, and profitable micro-SaaS tools.',
    badge: 'Scalable Asset',
    estHours: 50,
    goalTitle: 'PROFITABLE INDIE BUILDER',
    goalDescription: 'Validated software tools, automated Stripe distribution funnels, and scalable recurring software income.',
    stages: [
      {
        id: 'stage-dp-1',
        num: '01',
        phase: 'VALIDATION',
        title: 'Idea Discovery & Demand Validation',
        whyItMatters: 'Validate demand before writing code by testing customer willingness-to-pay on Twitter, Reddit, and ProductHunt.',
        skillIds: ['Product research', 'Validation'],
        skills: ['Keyword & Trend Research', 'Competitor Gap Analysis', 'Waitlist Landing Pages', 'Pre-sale Validation'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: { id: 'waitlist-page', name: 'Pre-launch Validation Page', hours: '4h' },
        learningMaterialId: 'mat-hustle-2'
      },
      {
        id: 'stage-dp-2',
        num: '02',
        phase: 'RAPID MVP',
        title: 'Rapid MVP Architecture & Payments',
        whyItMatters: 'Build a lean, functional MVP in 2-3 weeks with Next.js, Tailwind, and Stripe Checkout billing.',
        skillIds: ['Building'],
        skills: ['Stripe Webhooks & Checkout', 'Authentication & DB Setup', 'Lean MVP Feature Scoping', 'License Key Generation'],
        lessonsCount: 6,
        assessmentsCount: 2,
        estTime: '16h',
        project: { id: 'boilerplate-mvp', name: 'Micro-SaaS / Starter Kit MVP', hours: '6h' },
        learningMaterialId: 'mat-hustle-2'
      },
      {
        id: 'stage-dp-3',
        num: '03',
        phase: 'DISTRIBUTION',
        title: 'Distribution Loops & Product Launches',
        whyItMatters: 'Execute launch playbooks on ProductHunt, Twitter/X, developer newsletters, and build automated SEO funnels.',
        skillIds: ['Marketing', 'Distribution', 'Monetization'],
        skills: ['ProductHunt Launch Playbook', 'Programmatic SEO Pages', 'Affiliate Referral Loops', 'Email Onboarding Sequences'],
        lessonsCount: 5,
        assessmentsCount: 1,
        estTime: '12h',
        project: { id: 'launch-campaign', name: 'ProductHunt & Social Launch Funnel', hours: '4h' },
        learningMaterialId: 'mat-hustle-2'
      }
    ]
  },

  // ===========================================================================
  // 3. SOFT SKILLS & LEADERSHIP TRACKS
  // ===========================================================================
  'leadership': {
    id: 'leadership',
    category: 'soft-skills',
    title: 'Leadership',
    subtitle: 'Cultivate strategic decision making, proactive delegation, technical RFC alignment, and team ownership.',
    badge: 'Executive Track',
    estHours: 40,
    goalTitle: 'STAFF & ENGINEERING LEADER',
    goalDescription: 'High-impact technical RFC drafting, executive consensus building, constructive delegation, and team mentorship.',
    stages: [
      {
        id: 'stage-ld-1',
        num: '01',
        phase: 'STRATEGIC THINKING',
        title: 'Strategic Decision Frameworks',
        whyItMatters: 'Evaluate technical trade-offs using structured decision matrices, cost-of-delay, and second-order thinking.',
        skillIds: ['Decision making'],
        skills: ['Trade-off Matrices', 'Second-Order Effects', 'Two-Way Door Decisions', 'Risk Calibration'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: { id: 'decision-doc', name: 'Architectural Trade-Off Analysis', hours: '3h' },
        learningMaterialId: 'mat-soft-1'
      },
      {
        id: 'stage-ld-2',
        num: '02',
        phase: 'RFC & CONSENSUS',
        title: 'Writing Architectural RFCs & Driving Consensus',
        whyItMatters: 'Frame complex technical designs into crystal-clear RFC documents that align cross-functional engineering teams.',
        skillIds: ['Technical RFCs & Narratives', 'Writing'],
        skills: ['RFC Document Structure', 'Asynchronous Feedback Loops', 'Stakeholder Buy-in', 'Handling Contentious Debates'],
        lessonsCount: 5,
        assessmentsCount: 1,
        estTime: '10h',
        project: { id: 'rfc-doc', name: 'Production Architectural RFC Document', hours: '4h' },
        learningMaterialId: 'mat-soft-1'
      },
      {
        id: 'stage-ld-3',
        num: '03',
        phase: 'DELEGATION & TEAM',
        title: 'Effective Delegation & Mentorship',
        whyItMatters: 'Empower junior and mid-level engineers through structured task scoping, constructive PR reviews, and feedback.',
        skillIds: ['Delegation', 'Team management', 'Responsibility'],
        skills: ['Task Scoping & Guardrails', 'Constructive Code Reviews', '1-on-1 Coaching Frameworks', 'Blameless Ownership'],
        lessonsCount: 5,
        assessmentsCount: 1,
        estTime: '10h',
        project: { id: 'mentorship-plan', name: 'Engineering Team Growth Plan', hours: '3h' },
        learningMaterialId: 'mat-soft-2'
      },
      {
        id: 'stage-ld-4',
        num: '04',
        phase: 'CONFLICT & CRISIS',
        title: 'Conflict Resolution & Production Post-Mortems',
        whyItMatters: 'Navigate team friction, diffuse interpersonal tension, and conduct blameless incident post-mortems.',
        skillIds: ['Conflict resolution'],
        skills: ['Crucial Conversations Framework', 'Blameless 5-Whys Post-Mortems', 'Nonviolent Communication', 'Crisis Communication'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: { id: 'post-mortem', name: 'Blameless Outage Post-Mortem', hours: '3h' },
        learningMaterialId: 'mat-soft-3'
      }
    ]
  },

  'communication': {
    id: 'communication',
    category: 'soft-skills',
    title: 'Communication',
    subtitle: 'Master technical writing, stakeholder presentations, active listening, and cross-team communication.',
    badge: 'Core Essential',
    estHours: 35,
    goalTitle: 'INFLUENTIAL COMMUNICATOR',
    goalDescription: 'Concise executive presentations, persuasive written proposals, and seamless cross-functional collaboration.',
    stages: [
      {
        id: 'stage-cm-1',
        num: '01',
        phase: 'ACTIVE LISTENING',
        title: 'Active Listening & Stakeholder Empathy',
        whyItMatters: 'Understand product and business requirements by asking probing questions and validating stakeholder needs.',
        skillIds: ['Listening'],
        skills: ['Reflective Listening', 'Uncovering Hidden Requirements', 'Meeting Synthesis', 'Empathy in Engineering'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '6h',
        project: null,
        learningMaterialId: 'mat-soft-2'
      },
      {
        id: 'stage-cm-2',
        num: '02',
        phase: 'TECHNICAL WRITING',
        title: 'Clarity in Technical Writing & Documentation',
        whyItMatters: 'Write succinct pull request descriptions, system documentation, and asynchronous team memos.',
        skillIds: ['Writing', 'Technical communication'],
        skills: ['The Pyramid Principle', 'Succinct PR Summaries', 'API & Architecture Docs', 'Asynchronous Status Updates'],
        lessonsCount: 5,
        assessmentsCount: 1,
        estTime: '8h',
        project: { id: 'tech-memo', name: 'Executive Technical Brief', hours: '3h' },
        learningMaterialId: 'mat-soft-2'
      },
      {
        id: 'stage-cm-3',
        num: '03',
        phase: 'PRESENTATION & PITCH',
        title: 'High-Stakes Technical Presentations',
        whyItMatters: 'Present complex architectures to non-technical leaders and pitch major engineering initiatives.',
        skillIds: ['Presentation', 'Public speaking'],
        skills: ['Slide Narrative Architecture', 'Explaining Complex Jargon Simply', 'Handling Q&A Under Pressure', 'Body Language & Voice Tone'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: { id: 'slide-deck', name: '10-Slide Architecture Pitch Deck', hours: '3h' },
        learningMaterialId: 'mat-soft-2'
      }
    ]
  },

  'problem-solving': {
    id: 'problem-solving',
    category: 'soft-skills',
    title: 'Problem Solving',
    subtitle: 'Develop first-principles reasoning, root cause analysis, decision frameworks, and rapid debugging instincts.',
    badge: 'Force Multiplier',
    estHours: 35,
    goalTitle: 'FIRST-PRINCIPLES PROBLEM SOLVER',
    goalDescription: 'Systematic failure diagnosis, cognitive bias elimination, and elegant architectural problem resolution.',
    stages: [
      {
        id: 'stage-ps-1',
        num: '01',
        phase: 'FIRST PRINCIPLES',
        title: 'First-Principles Reasoning & Deconstruction',
        whyItMatters: 'Break complex, ambiguous engineering problems down into fundamental physical and logical truths.',
        skillIds: ['Critical thinking', 'Analytical thinking'],
        skills: ['Deconstruction Frameworks', 'Assumptions Auditing', 'Occam’s Razor in Architecture', 'Mental Models for Devs'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: null,
        learningMaterialId: 'mat-soft-3'
      },
      {
        id: 'stage-ps-2',
        num: '02',
        phase: 'ROOT CAUSE ANALYSIS',
        title: '5-Whys & Root Cause Investigation',
        whyItMatters: 'Isolate deep root causes of intermittent bugs and distributed system latency rather than patching symptoms.',
        skillIds: ['Root cause analysis'],
        skills: ['5-Whys Diagnostic Method', 'Fishbone Cause-Effect Trees', 'Hypothesis-Driven Debugging', 'Reproducibility Scenarios'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: { id: 'rca-report', name: 'Root Cause Investigation Report', hours: '3h' },
        learningMaterialId: 'mat-soft-3'
      },
      {
        id: 'stage-ps-3',
        num: '03',
        phase: 'ADAPTABILITY',
        title: 'Decision Frameworks & Rapid Adaptability',
        whyItMatters: 'Make high-confidence decisions under incomplete information and pivot architectures effectively.',
        skillIds: ['Decision frameworks', 'Adaptability'],
        skills: ['Expected Value Calculations', 'Pivot vs Persevere Criteria', 'Reversible vs Irreversible Paths', 'Cognitive Bias Mitigation'],
        lessonsCount: 4,
        assessmentsCount: 1,
        estTime: '8h',
        project: { id: 'decision-framework', name: 'Engineering Decision Framework', hours: '3h' },
        learningMaterialId: 'mat-soft-3'
      }
    ]
  }
};

// Fallback generator for other paths if not explicitly defined above
export function getOrCreatePathJourney(category, pathId, allRoles, sidePaths, softPaths) {
  if (ROADMAP_JOURNEY_PATHS[pathId]) {
    return ROADMAP_JOURNEY_PATHS[pathId];
  }

  // Look up metadata from collections
  let matchedMeta = null;
  if (category === 'technical') {
    matchedMeta = allRoles.find(r => r.id === pathId);
  } else if (category === 'side-hustle') {
    matchedMeta = sidePaths.find(s => s.id === pathId);
  } else {
    matchedMeta = softPaths.find(k => k.id === pathId);
  }

  const title = matchedMeta?.title || pathId.toUpperCase();
  const rawSkills = matchedMeta?.skills || ['Foundations', 'Core Concepts', 'Execution', 'Production Mastery'];

  const stages = rawSkills.map((sk, idx) => ({
    id: `stage-${pathId}-${idx + 1}`,
    num: String(idx + 1).padStart(2, '0'),
    phase: idx === 0 ? 'START / FOUNDATIONS' : idx === rawSkills.length - 1 ? 'MASTERY / GOAL' : `PHASE 0${idx + 1}`,
    title: typeof sk === 'string' ? (sk.charAt(0).toUpperCase() + sk.slice(1)) : 'Core Milestone',
    whyItMatters: `Crucial competency stage for succeeding in ${title}.`,
    skillIds: [typeof sk === 'string' ? sk.toLowerCase() : 'skill'],
    skills: [sk, 'Applied Methodologies', 'Verified Execution'],
    lessonsCount: 4,
    assessmentsCount: 1,
    estTime: '8h',
    project: idx === Math.floor(rawSkills.length / 2) ? { id: `proj-${pathId}`, name: `${title} Applied Lab`, hours: '4h' } : null,
    learningMaterialId: 'mat-rest-api-1'
  }));

  return {
    id: pathId,
    category,
    title,
    subtitle: matchedMeta?.description || `Mastery journey for ${title}.`,
    badge: matchedMeta?.badge || 'Career Track',
    estHours: stages.length * 8,
    goalTitle: `${title.toUpperCase()} MASTER`,
    goalDescription: `Demonstrated milestone completion across all ${stages.length} core competencies.`,
    stages
  };
}
