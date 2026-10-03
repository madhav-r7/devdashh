// Community Q&A & Doubts System Dataset

export const INITIAL_COMMUNITY_DOUBTS = [
  {
    id: 'doubt-1',
    author: {
      name: 'Alex Rivera',
      handle: '@arivera_dev',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      roleBadge: 'Backend Engineer'
    },
    category: 'technical',
    trackTitle: 'Technical Track',
    title: 'How do I optimize multi-table SQL JOIN queries when dataset exceeds 1M rows in PostgreSQL?',
    description: 'I have an analytics query joining `orders`, `users`, and `line_items`. Even with indexes on foreign keys, the query takes ~850ms. How can I structure composite indexing or analyze the execution plan with `EXPLAIN ANALYZE` to drop this under 50ms?',
    codeSnippet: `EXPLAIN ANALYZE
SELECT u.email, COUNT(o.id) AS order_count, SUM(li.price * li.quantity) AS total_spent
FROM users u
INNER JOIN orders o ON o.user_id = u.id
INNER JOIN line_items li ON li.order_id = o.id
WHERE o.created_at >= '2026-01-01'
GROUP BY u.id, u.email
ORDER BY total_spent DESC
LIMIT 100;`,
    tags: ['postgresql', 'sql', 'indexing', 'performance'],
    createdAt: '2 hours ago',
    likesCount: 24,
    isLiked: false,
    status: 'solved', // 'open' | 'solved'
    acceptedAnswerId: 'ans-1-1',
    answers: [
      {
        id: 'ans-1-1',
        author: {
          name: 'Elena Rostova',
          handle: '@erostova',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          roleBadge: 'Database Architect'
        },
        content: `Your bottleneck is likely a sequential scan on 'orders.created_at' filtering 1M+ rows before the hash join.
1. Add a composite index on \`orders(created_at, user_id, id)\` to enable index-only scans.
2. Ensure you have covering index on \`line_items(order_id) INCLUDE (price, quantity)\` to avoid heap lookups.
3. If this is for an analytics dashboard, consider a Materialized View with hourly concurrent refresh.`,
        codeSnippet: `CREATE INDEX idx_orders_analytics ON orders (created_at DESC, user_id) INCLUDE (id);
CREATE INDEX idx_line_items_pricing ON line_items (order_id) INCLUDE (price, quantity);`,
        createdAt: '1 hour ago',
        likesCount: 19,
        isLiked: false,
        isAccepted: true
      },
      {
        id: 'ans-1-2',
        author: {
          name: 'Marcus Vance',
          handle: '@mvance_tech',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          roleBadge: 'Full Stack Developer'
        },
        content: 'Also check your `work_mem` setting in Postgres! If your hash aggregate exceeds `work_mem`, Postgres spills to disk (temporary files), which crushes read latency.',
        codeSnippet: `SET work_mem = '64MB';`,
        createdAt: '45 mins ago',
        likesCount: 8,
        isLiked: false,
        isAccepted: false
      }
    ]
  },
  {
    id: 'doubt-2',
    author: {
      name: 'Sofia Chen',
      handle: '@sofiachen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      roleBadge: 'Freelance Consultant'
    },
    category: 'side-hustle',
    trackTitle: 'Side Hustle Track',
    title: 'How should I structure retainer pricing vs hourly rates for ongoing client web maintenance?',
    description: 'I just finished a custom Next.js landing page for a client and they asked for ongoing monthly maintenance and feature updates. Should I offer a fixed monthly retainer (e.g. $1,200/mo for 10 hours) or bill per request? How do you prevent scope creep?',
    codeSnippet: `// Proposed Retainer Agreement Structure:
// - Tier A ($950/mo): 6 hours reserved, 24h SLA bug fixes, uptime monitoring
// - Tier B ($1,850/mo): 15 hours reserved, proactive speed optimization + SEO
// - Unused hours do NOT roll over. Overage billed at $150/hr standard rate.`,
    tags: ['freelancing', 'retainers', 'pricing', 'client-management'],
    createdAt: '4 hours ago',
    likesCount: 38,
    isLiked: false,
    status: 'solved',
    acceptedAnswerId: 'ans-2-1',
    answers: [
      {
        id: 'ans-2-1',
        author: {
          name: 'David Kim',
          handle: '@dkim_hustle',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          roleBadge: 'Agency Founder'
        },
        content: `Always go with fixed monthly retainers instead of hourly billing! Retainers give you predictable MRR (Monthly Recurring Revenue).
Key clauses to protect yourself:
1. **Use-it-or-lose-it**: Unused hours do not roll over.
2. **Explicit SLA**: State response time (e.g., within 24 hours during business days, not 15 minutes on Sunday midnight).
3. **Pre-approved Overage**: Any hours beyond the tier limit require written email approval at an agreed overage rate ($150/hr).`,
        codeSnippet: null,
        createdAt: '3 hours ago',
        likesCount: 29,
        isLiked: false,
        isAccepted: true
      }
    ]
  },
  {
    id: 'doubt-3',
    author: {
      name: 'Liam O\'Connor',
      handle: '@liam_lead',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      roleBadge: 'Tech Lead'
    },
    category: 'soft-skills',
    trackTitle: 'Soft Skills Track',
    title: 'How do you effectively handle pushback when proposing a major architecture refactor to stakeholders?',
    description: 'Our team is bogged down by technical debt in legacy monolith services. Every new feature takes 3x longer. When I pitch a modular microservice refactor to product managers, they reject it because "it doesn\'t deliver immediate user-facing features". How do you translate technical debt into business value?',
    codeSnippet: null,
    tags: ['leadership', 'communication', 'stakeholder-management', 'architecture'],
    createdAt: '6 hours ago',
    likesCount: 42,
    isLiked: false,
    status: 'open',
    acceptedAnswerId: null,
    answers: [
      {
        id: 'ans-3-1',
        author: {
          name: 'Rachel Sterling',
          handle: '@rsterling_vp',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
          roleBadge: 'Engineering Director'
        },
        content: `Frame technical debt strictly in terms of **Engineering Velocity**, **Cost of Delay**, and **Reliability Risk**.
Never say "we need clean code". Instead say:
- "Currently, feature shipping velocity has dropped by 45% due to deployment coupling."
- "This targeted refactor will reduce our sprint cycle time from 3 weeks to 4 days, accelerating Q3 product launches by 2 months."
- Package the refactor into small incremental increments alongside product roadmap epics (the "Boy Scout Rule") rather than asking for a 6-month feature freeze.`,
        codeSnippet: null,
        createdAt: '4 hours ago',
        likesCount: 35,
        isLiked: false,
        isAccepted: false
      }
    ]
  },
  {
    id: 'doubt-4',
    author: {
      name: 'Maya Patel',
      handle: '@mayapatel_sec',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      roleBadge: 'Security Engineer'
    },
    category: 'technical',
    trackTitle: 'Technical Track',
    title: 'Is storing JWT tokens in HttpOnly Cookies vs LocalStorage still the definitive best practice for SPA auth?',
    description: 'When building a React single-page application with an Express backend, is HttpOnly + SameSite=Strict + Secure cookie storage immune to XSS token theft? What about CSRF vulnerabilities when using cookies?',
    codeSnippet: `// Server response setting auth cookie:
res.cookie('auth_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24 // 24 hours
});`,
    tags: ['auth', 'jwt', 'security', 'cookies', 'xss'],
    createdAt: '12 hours ago',
    likesCount: 31,
    isLiked: false,
    status: 'solved',
    acceptedAnswerId: 'ans-4-1',
    answers: [
      {
        id: 'ans-4-1',
        author: {
          name: 'Dr. Evelyn Ward',
          handle: '@eward_cyber',
          avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
          roleBadge: 'Chief Security Officer'
        },
        content: `Yes, HttpOnly cookies prevent JavaScript from accessing the token directly (mitigating direct XSS exfiltration).
To protect against CSRF when using cookies:
1. Use \`SameSite: 'lax'\` or \`'strict'\`.
2. Implement standard Anti-CSRF double-submit token headers (or modern custom request headers like \`X-Requested-With\`).
3. Keep access token lifespan short (15 mins) and use rotating refresh tokens with database revocation lists.`,
        codeSnippet: null,
        createdAt: '10 hours ago',
        likesCount: 27,
        isLiked: false,
        isAccepted: true
      }
    ]
  }
];
