// Client-side local storage mock database

export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  summary: string;
  content: string;
  createdAt: string;
  author: string;
}

export interface HeroConfig {
  type: '3d' | 'video' | 'image';
  videoUrl: string;
  imageUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  tagline: string;
  features: string[];
  results: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  channel: string;
  duration: string;
  challenge: string;
  solution: string;
  results: { metric: string; before: string; after: string }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedContent: string;
  projectImage: string;
  projectUrl: string;
  category: string;
  tags: string[];
  createdAt: string;
}

const DEFAULT_BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title: 'Meta Ads vs Google Ads: Which Scales Faster in 2026?',
    slug: 'meta-vs-google-ads-2026',
    category: 'Paid Ads',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    summary: 'A detailed breakdown of how ad spends yield ROAS across platforms under the latest attribution models.',
    content: `In 2026, the performance marketing landscape has undergone massive transformation. With privacy regulations limiting third-party cookies, digital advertisers must re-evaluate Google Ads and Meta Ads.

### Meta Ads: The Discovery Engine
Meta (Facebook & Instagram) remains the absolute king of discovery-based commerce. By utilizing deep-learning visual algorithms, Meta creates demand where none existed.
- **Strength**: Creative fatigue cycles are faster, but the AI-driven targeting is incredibly sharp.
- **Ideal For**: D2C brands, impulse buys, products needing visual demonstration, and early-stage brand building.

### Google Ads: The Intent Harvest
Google Ads captures existing intent. When a user searches for a specific service, Google is there.
- **Strength**: Unbeatable conversion rates because the user is already looking to buy.
- **Ideal For**: Local services, SaaS products, high-ticket items, and capture-stage acquisition.

### The Verdict: Scaling Strategy
For optimal scale, a hybrid model is essential. Allocate 60% of your budget to Meta for demand generation, and 40% to Google Search & Shopping to capture the demand you created. Utilize server-side tracking (Conversion API) to bypass browser restrictions and feed clean conversion data back to the ad networks.`,
    createdAt: '2026-05-18T10:00:00.000Z',
    author: 'RecallX Growth Team'
  },
  {
    id: 'blog-2',
    title: 'The Future of AI in Digital Marketing',
    slug: 'future-of-ai-marketing',
    category: 'Technology',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    summary: 'How predictive modeling and automated generative assets are reshaping search visibility and agency margins.',
    content: `Artificial Intelligence is no longer a future prediction — it is the current standard. Agencies that refuse to integrate AI directly into their conversion flows are rapidly losing margins.

### Predictive ROI Analysis
By analyzing historical conversion rates, modern AI tools can predict which ad creatives will perform best before spending a single rupee. We use neural models to evaluate contrast, text positioning, and visual hooks, cutting down budget wastage by 30%.

### SGE (Search Generative Experience) Optimization
SEO has evolved from keyword stuffing to search intent satisfaction. Google's Search Generative Experience means AI answers questions directly on search page interfaces. 
- Optimize for high-authority source references.
- Structure content with clear schema marks.
- Solve specific user queries concisely.

Building trust in an AI-dominated ecosystem requires human authenticity. Dynamic 3D assets, personal brand building, and real case studies are more critical than ever.`,
    createdAt: '2026-05-20T14:30:00.000Z',
    author: 'Rachit Chauhan'
  },
  {
    id: 'blog-3',
    title: '5 CRO Tactics to Instantly Boost Landing Page Conversions',
    slug: '5-cro-tactics-landing-page',
    category: 'Conversion Optimization',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    summary: 'Simple structural changes that improve user trust and scale conversion metrics from 1% to 4%+',
    content: `Most marketing campaigns fail not because the traffic is bad, but because the landing page fails to convert interest into actions. 

Here are five hyper-focused conversion rate optimization (CRO) adjustments to implement today:

1. **Implement 3D Interactive Calculators**: Static forms are boring. Providing interactive elements, like our 3D Marketing Funnel visualizer, engages users, increases dwell time by 180%, and yields 3x more qualified lead submissions.
2. **Move Trust Factors Above the Fold**: Star reviews, client logos, and security certifications should be visible immediately without scrolling.
3. **Sub-2 Second Load Speed**: Compress all media assets. A 1-second delay in page load can drop conversions by 7%.
4. **Single Primary CTA**: Don't confuse visitors with multiple goals. If you want strategy calls, align every button on the page to that single request.
5. **Magnetic Headline & Benefit Copy**: Write headlines focusing on *results*, not features. Instead of "We offer SEO services", write "Rank #1 for high-intent search terms."`,
    createdAt: '2026-05-22T08:15:00.000Z',
    author: 'RecallX CRO Specialist'
  }
];

const DEFAULT_HERO_CONFIG: HeroConfig = {
  type: '3d',
  videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-graphs-31908-large.mp4',
  imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
};

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'service-1',
    title: "Influencer Marketing",
    tagline: "Reach millions through trusted voices",
    desc: "We connect your brand with the right creators — micro to macro influencers — to drive authentic engagement, brand awareness, and conversions.",
    features: [
      "Influencer Discovery & Vetting",
      "Campaign Strategy & Brief Creation",
      "Instagram, YouTube & Reels Campaigns",
      "Performance Tracking & Analytics",
      "UGC (User-Generated Content) Management",
      "Long-Term Brand Ambassador Programs"
    ],
    results: "Avg. 4.2X reach vs traditional paid ads"
  },
  {
    id: 'service-2',
    title: "Google Business Profile",
    tagline: "Dominate local search results.",
    desc: "Optimize and actively manage your Google Business Profile to attract nearby customers, improve trust, and boost local visibility.",
    features: [
      "GBP Setup & Verification",
      "Category & Service Optimization",
      "Regular Post & Update Management",
      "Q&A Management",
      "Photo & Video Uploads",
      "Local Ranking Monitoring"
    ],
    results: "3X more local discovery clicks on average"
  },
  {
    id: 'service-3',
    title: "Website Development",
    tagline: "Fast. Beautiful. Built to convert.",
    desc: "We design and develop fast, responsive, conversion-focused websites that reflect your brand and drive measurable business results.",
    features: [
      "Custom Website Design & Development",
      "E-Commerce Store Setup",
      "Mobile-First & Responsive Design",
      "Performance Optimization (Core Web Vitals)",
      "CMS Integration (WordPress, Webflow)",
      "Ongoing Maintenance & Support"
    ],
    results: "Sub-2s load times across all builds"
  },
  {
    id: 'service-4',
    title: "App Development",
    tagline: "Your business, in your users' pockets.",
    desc: "We build high-performance mobile and web applications tailored to your business needs — from concept to launch and beyond.",
    features: [
      "iOS & Android App Development",
      "Progressive Web Apps (PWA)",
      "UI/UX Design & Prototyping",
      "API Integration & Backend Setup",
      "App Store Submission & Optimization",
      "Post-Launch Support & Updates"
    ],
    results: "Delivered 20+ apps with 4.5★+ ratings"
  },
  {
    id: 'service-5',
    title: "Paid Ads & Performance Marketing",
    tagline: "Turn every rupee into measurable revenue",
    desc: "Data-driven paid advertising campaigns across Google, Meta, Instagram & YouTube — engineered for maximum conversions and scale.",
    features: [
      "Google Search & Display Ads",
      "Meta (Facebook & Instagram) Ads",
      "YouTube Video Advertising",
      "Retargeting & Lookalike Audiences",
      "A/B Testing & Creative Optimization",
      "Detailed ROI & ROAS Reporting"
    ],
    results: "Average 3.5X ROAS for our clients"
  },
  {
    id: 'service-6',
    title: "Reputation & Review Management",
    tagline: "Your reputation is your biggest asset.",
    desc: "Proactively build, monitor, and protect your online reputation across all major review platforms.",
    features: [
      "Google & Trustpilot Review Campaigns",
      "Negative Review Suppression",
      "Brand Mention Monitoring",
      "Crisis Response Strategy",
      "Sentiment Analysis Reports",
      "Competitor Reputation Benchmarking"
    ],
    results: "Avg. 4.7★ rating achieved for managed brands"
  }
];

const DEFAULT_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    category: "E-Commerce",
    client: "Fashion Brand (D2C)",
    challenge: "Low ROAS on Meta Ads, high CAC, and poor product page conversions.",
    solution: "Rebuilt the entire ad funnel — from cold audience prospecting to retargeting. Redesigned landing pages and implemented dynamic product ads.",
    results: [
      { metric: "ROAS", before: "1.2X", after: "3.8X" },
      { metric: "CAC", before: "₹850", after: "₹310" },
      { metric: "Revenue", before: "₹4L/mo", after: "₹14L/mo" }
    ],
    duration: "90 Days",
    channel: "Meta Ads + Landing Page CRO"
  },
  {
    id: 'case-2',
    category: "SaaS / B2B",
    client: "HR Tech Startup",
    challenge: "No inbound pipeline. Over-reliance on cold outreach with low conversion rates.",
    solution: "Launched Google Search campaigns targeting high-intent keywords, built a dedicated lead capture funnel, and set up email nurture sequences.",
    results: [
      { metric: "Lead Volume", before: "12/mo", after: "41/mo" },
      { metric: "Lead Quality Score", before: "4.2/10", after: "7.8/10" },
      { metric: "Pipeline Value", before: "₹8L", after: "₹31L" }
    ],
    duration: "120 Days",
    channel: "Google Ads + Email Marketing"
  },
  {
    id: 'case-3',
    category: "Healthcare",
    client: "Multi-Specialty Clinic",
    challenge: "High ad spend with poor targeting and 68% of budget wasted on irrelevant clicks.",
    solution: "Restructured Google Ads with hyper-local targeting, optimized GBP, and built service-specific landing pages.",
    results: [
      { metric: "Cost Per Lead", before: "₹680", after: "₹390" },
      { metric: "Monthly Appointments", before: "140", after: "310" },
      { metric: "Ad Spend Waste", before: "68%", after: "12%" }
    ],
    duration: "60 Days",
    channel: "Google Ads + GBP Optimization"
  },
  {
    id: 'case-4',
    category: "Real Estate",
    client: "Residential Developer",
    challenge: "Extremely high cost per site visit and low quality leads from generic portals.",
    solution: "Built a full-funnel strategy with video ads, lead capture forms, and a WhatsApp follow-up automation.",
    results: [
      { metric: "Cost Per Site Visit", before: "₹4,200", after: "₹1,100" },
      { metric: "Monthly Qualified Leads", before: "8", after: "34" },
      { metric: "Closure Rate", before: "4%", after: "11%" }
    ],
    duration: "75 Days",
    channel: "Meta Ads + WhatsApp Automation"
  }
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'ShopEase — D2C Fashion E-Commerce Platform',
    description: 'A high-converting e-commerce platform built for a D2C fashion brand, featuring dynamic product catalogs, AI-powered recommendations, and seamless checkout.',
    detailedContent: `## Project Overview\n\nShopEase is a full-stack e-commerce platform we designed and developed for a rapidly growing D2C fashion brand based in Mumbai. The client was struggling with a dated Shopify theme that resulted in slow load times, poor mobile UX, and a checkout abandonment rate exceeding 72%.\n\n## The Challenge\n\nThe existing platform had several critical issues:\n- Page load times averaging 6.2 seconds on mobile\n- No personalized product recommendations\n- A clunky 5-step checkout process\n- Zero integration with their Meta Ads pixel for accurate attribution\n- Inventory management was entirely manual\n\n## Our Approach\n\nWe rebuilt the entire storefront from scratch using Next.js 14 with server-side rendering for lightning-fast page loads. The tech stack included:\n\n- **Frontend**: Next.js 14, React, Tailwind CSS\n- **Backend**: Node.js with Express, PostgreSQL\n- **Payments**: Razorpay integration with UPI, cards, and wallets\n- **Analytics**: Custom event tracking with Meta CAPI and Google Analytics 4\n\n## Key Features Delivered\n\n1. **AI Product Recommendations**: Integrated a collaborative filtering engine that analyzes browsing behavior and purchase history to suggest relevant products, increasing average order value by 34%.\n\n2. **One-Page Checkout**: Reduced the checkout flow from 5 steps to a single page with auto-fill, address suggestions, and multiple payment options. Abandonment dropped from 72% to 31%.\n\n3. **Dynamic Lookbook**: Built an interactive lookbook feature where customers can shop entire outfits with a single click, driving 2.3x more cross-sells.\n\n4. **Real-Time Inventory Sync**: Connected with their warehouse management system for live stock updates, eliminating overselling issues entirely.\n\n## Results\n\n- **Page Load**: Reduced from 6.2s to 1.4s (77% improvement)\n- **Conversion Rate**: Increased from 1.2% to 3.8%\n- **Monthly Revenue**: Grew from ₹8L to ₹28L within 90 days\n- **ROAS on Paid Ads**: Improved from 1.8x to 4.2x due to better attribution tracking`,
    projectImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://shopease-demo.vercel.app',
    category: 'E-Commerce',
    tags: ['Next.js', 'React', 'Razorpay', 'PostgreSQL', 'Meta Ads'],
    createdAt: '2026-04-15T10:00:00.000Z'
  },
  {
    id: 'project-2',
    title: 'HealthTrack — Patient Management Mobile App',
    description: 'A cross-platform mobile application for a multi-specialty clinic chain, enabling appointment booking, health records access, and telemedicine consultations.',
    detailedContent: `## Project Overview\n\nHealthTrack is a comprehensive patient management mobile application we built for a chain of 12 multi-specialty clinics across Delhi NCR. The goal was to digitize their entire patient journey — from appointment booking to post-consultation follow-ups.\n\n## The Challenge\n\nThe clinic chain was losing patients to competitors who offered digital convenience. Their pain points included:\n- Phone-only appointment booking with 40% call drop rates\n- Paper-based medical records prone to loss\n- No follow-up system for patient retention\n- Zero online presence for patient engagement\n- Staff spending 3+ hours daily on manual scheduling\n\n## Our Approach\n\nWe developed a cross-platform mobile app using React Native, ensuring a single codebase for both iOS and Android while maintaining native performance.\n\n**Tech Stack:**\n- **Mobile**: React Native with Expo\n- **Backend**: Firebase (Auth, Firestore, Cloud Functions)\n- **Video**: Twilio for telemedicine\n- **Notifications**: Firebase Cloud Messaging\n- **Payments**: Stripe for consultation fees\n\n## Key Features Delivered\n\n1. **Smart Appointment Booking**: Patients can book appointments by doctor, specialty, or time slot. AI suggests optimal slots based on doctor availability and patient history.\n\n2. **Digital Health Records**: Secure, HIPAA-compliant storage of prescriptions, lab reports, and imaging. Patients can share records with any doctor instantly.\n\n3. **Telemedicine Module**: Built-in HD video consultations with screen sharing for report discussions. Includes automatic recording for doctor reference.\n\n4. **Automated Follow-ups**: Smart notification system that reminds patients about medications, upcoming appointments, and preventive health checkups.\n\n5. **Analytics Dashboard**: Custom admin panel for clinic managers showing appointment trends, revenue, patient satisfaction scores, and doctor utilization rates.\n\n## Results\n\n- **App Downloads**: 15,000+ in the first 3 months\n- **Appointment No-Shows**: Reduced from 28% to 8%\n- **Patient Retention**: Improved by 45%\n- **Staff Hours Saved**: 4+ hours daily on scheduling\n- **App Store Rating**: 4.7★ on both platforms`,
    projectImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://healthtrack-app.com',
    category: 'Mobile App',
    tags: ['React Native', 'Firebase', 'Twilio', 'Healthcare', 'Telemedicine'],
    createdAt: '2026-03-20T10:00:00.000Z'
  },
  {
    id: 'project-3',
    title: 'MetricsHub — SaaS Analytics Dashboard',
    description: 'A real-time analytics dashboard for a B2B SaaS company, consolidating data from Google Ads, Meta, and CRM into a single unified reporting interface.',
    detailedContent: `## Project Overview\n\nMetricsHub is a custom analytics dashboard we designed for a B2B SaaS company that was drowning in data but starving for insights. They needed a unified view of their marketing performance across Google Ads, Meta Ads, email campaigns, and their CRM — all in one place.\n\n## The Challenge\n\nThe client's marketing team was spending 8+ hours weekly manually pulling data from 6 different platforms to create performance reports. Key issues:\n- Data lived in silos — Google Ads, Meta Business Suite, HubSpot CRM, Mailchimp, and Google Analytics\n- Reports were always 3-5 days behind real-time\n- No way to correlate ad spend with actual closed deals\n- Executive team wanted daily dashboards but the team couldn't deliver\n- Attribution was broken — couldn't tell which channel drove revenue\n\n## Our Approach\n\nWe built a custom web application that pulls data via APIs from all their marketing platforms and presents it in a beautiful, real-time dashboard.\n\n**Tech Stack:**\n- **Frontend**: Next.js 14, Recharts, Framer Motion\n- **Backend**: Node.js, Express, Redis (caching)\n- **Database**: PostgreSQL with TimescaleDB for time-series data\n- **Integrations**: Google Ads API, Meta Marketing API, HubSpot API\n- **Hosting**: AWS (ECS + RDS + ElastiCache)\n\n## Key Features Delivered\n\n1. **Unified Dashboard**: Single-pane view showing spend, impressions, clicks, leads, and revenue across all channels. Real-time data refresh every 15 minutes.\n\n2. **Multi-Touch Attribution**: Custom attribution model that tracks the entire customer journey from first ad click to closed deal, assigning weighted credit to each touchpoint.\n\n3. **Automated Reports**: Daily/weekly/monthly PDF reports auto-generated and emailed to stakeholders. No more manual data pulling.\n\n4. **Budget Optimizer**: AI-powered recommendations that suggest budget reallocation based on channel performance, projected to improve ROAS by 25%.\n\n5. **Custom Alerts**: Configurable alerts for anomalies — sudden spend spikes, conversion drops, or budget exhaustion — sent via Slack and email.\n\n## Results\n\n- **Reporting Time**: Reduced from 8 hours/week to zero (fully automated)\n- **Data Freshness**: From 3-5 day lag to 15-minute real-time\n- **ROAS Improvement**: 31% increase through better budget allocation\n- **Executive Satisfaction**: NPS score went from 4 to 9 for marketing reporting`,
    projectImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://metricshub-demo.vercel.app',
    category: 'SaaS Dashboard',
    tags: ['Next.js', 'PostgreSQL', 'AWS', 'API Integrations', 'Analytics'],
    createdAt: '2026-02-10T10:00:00.000Z'
  }
];

// Helper to check if window is defined (browser environment)
const isBrowser = () => typeof window !== 'undefined';

export const db = {
  init: () => {
    if (!isBrowser()) return;
    if (!localStorage.getItem('rx_blogs')) {
      localStorage.setItem('rx_blogs', JSON.stringify(DEFAULT_BLOGS));
    }
    if (!localStorage.getItem('rx_hero_config')) {
      localStorage.setItem('rx_hero_config', JSON.stringify(DEFAULT_HERO_CONFIG));
    }
    if (!localStorage.getItem('rx_services')) {
      localStorage.setItem('rx_services', JSON.stringify(DEFAULT_SERVICES));
    }
    if (!localStorage.getItem('rx_case_studies')) {
      localStorage.setItem('rx_case_studies', JSON.stringify(DEFAULT_CASE_STUDIES));
    }
    if (!localStorage.getItem('rx_projects')) {
      localStorage.setItem('rx_projects', JSON.stringify(DEFAULT_PROJECTS));
    }
  },

  // Blogs
  getBlogs: (): Blog[] => {
    if (!isBrowser()) return DEFAULT_BLOGS;
    db.init();
    return JSON.parse(localStorage.getItem('rx_blogs') || '[]');
  },

  getBlogBySlug: (slug: string): Blog | undefined => {
    const blogs = db.getBlogs();
    return blogs.find(b => b.slug === slug);
  },

  saveBlog: (blog: Omit<Blog, 'id' | 'createdAt' | 'slug'> & { id?: string }): Blog => {
    if (!isBrowser()) return blog as Blog;
    db.init();
    const blogs = db.getBlogs();
    let savedBlog: Blog;

    if (blog.id) {
      // Edit existing
      const index = blogs.findIndex(b => b.id === blog.id);
      const original = blogs[index];
      savedBlog = {
        ...original,
        ...blog,
        slug: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      } as Blog;
      if (index > -1) blogs[index] = savedBlog;
    } else {
      // Create new
      savedBlog = {
        ...blog,
        id: 'blog-' + Date.now(),
        slug: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        createdAt: new Date().toISOString()
      } as Blog;
      blogs.unshift(savedBlog);
    }

    localStorage.setItem('rx_blogs', JSON.stringify(blogs));
    return savedBlog;
  },

  deleteBlog: (id: string) => {
    if (!isBrowser()) return;
    db.init();
    const blogs = db.getBlogs();
    const filtered = blogs.filter(b => b.id !== id);
    localStorage.setItem('rx_blogs', JSON.stringify(filtered));
  },

  // Hero config
  getHeroConfig: (): HeroConfig => {
    if (!isBrowser()) return DEFAULT_HERO_CONFIG;
    db.init();
    return JSON.parse(localStorage.getItem('rx_hero_config') || JSON.stringify(DEFAULT_HERO_CONFIG));
  },

  saveHeroConfig: (config: HeroConfig) => {
    if (!isBrowser()) return;
    localStorage.setItem('rx_hero_config', JSON.stringify(config));
  },

  // Services
  getServices: (): ServiceItem[] => {
    if (!isBrowser()) return DEFAULT_SERVICES;
    db.init();
    return JSON.parse(localStorage.getItem('rx_services') || '[]');
  },

  saveServices: (services: ServiceItem[]) => {
    if (!isBrowser()) return;
    localStorage.setItem('rx_services', JSON.stringify(services));
  },

  saveService: (service: ServiceItem) => {
    if (!isBrowser()) return;
    const services = db.getServices();
    const idx = services.findIndex(s => s.id === service.id);
    if (idx > -1) {
      services[idx] = service;
      db.saveServices(services);
    }
  },

  // Case Studies
  getCaseStudies: (): CaseStudy[] => {
    if (!isBrowser()) return DEFAULT_CASE_STUDIES;
    db.init();
    return JSON.parse(localStorage.getItem('rx_case_studies') || '[]');
  },

  saveCaseStudies: (cases: CaseStudy[]) => {
    if (!isBrowser()) return;
    localStorage.setItem('rx_case_studies', JSON.stringify(cases));
  },

  saveCaseStudy: (caseStudy: CaseStudy) => {
    if (!isBrowser()) return;
    const cases = db.getCaseStudies();
    const idx = cases.findIndex(c => c.id === caseStudy.id);
    if (idx > -1) {
      cases[idx] = caseStudy;
      db.saveCaseStudies(cases);
    }
  },

  // Projects
  getProjects: (): Project[] => {
    if (!isBrowser()) return DEFAULT_PROJECTS;
    db.init();
    return JSON.parse(localStorage.getItem('rx_projects') || '[]');
  },

  getProjectById: (id: string): Project | undefined => {
    const projects = db.getProjects();
    return projects.find(p => p.id === id);
  },

  saveProject: (project: Omit<Project, 'id' | 'createdAt'> & { id?: string }): Project => {
    if (!isBrowser()) return project as Project;
    db.init();
    const projects = db.getProjects();
    let savedProject: Project;

    if (project.id) {
      const index = projects.findIndex(p => p.id === project.id);
      const original = projects[index];
      savedProject = { ...original, ...project } as Project;
      if (index > -1) projects[index] = savedProject;
    } else {
      savedProject = {
        ...project,
        id: 'project-' + Date.now(),
        createdAt: new Date().toISOString()
      } as Project;
      projects.unshift(savedProject);
    }

    localStorage.setItem('rx_projects', JSON.stringify(projects));
    return savedProject;
  },

  deleteProject: (id: string) => {
    if (!isBrowser()) return;
    db.init();
    const projects = db.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    localStorage.setItem('rx_projects', JSON.stringify(filtered));
  },

  resetAll: () => {
    if (!isBrowser()) return;
    localStorage.removeItem('rx_blogs');
    localStorage.removeItem('rx_hero_config');
    localStorage.removeItem('rx_services');
    localStorage.removeItem('rx_case_studies');
    localStorage.removeItem('rx_projects');
    db.init();
  }
};
