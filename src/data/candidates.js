export const candidates = [
  {
    id: "cand-1",
    name: "Alex Rivera",
    title: "Senior Machine Learning Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    email: "alex.rivera@neuralinbox.com",
    location: "Oakland, CA",
    experienceYears: 7,
    currentSalary: 185000,
    expectedSalary: 210000,
    visaRequired: false,
    education: {
      degree: "MS in Computer Science (AI Track)",
      institution: "Stanford University",
      tier: 1
    },
    skills: ["Python", "PyTorch", "TensorFlow", "Transformer Architecture", "LLMs", "Fine-tuning", "CUDA", "Reinforcement Learning"],
    bio: "Passionate ML engineer with 7 years of experience. Designed and deployed custom generative models. Specialized in prompt optimization and model evaluation.",
    careerHistory: [
      {
        role: "Senior AI Engineer",
        company: "Stripe",
        companyTier: 1,
        duration: "2023 - Present",
        description: "Implemented DPO and alignment algorithms for internal assistant models. Reduced model hallucination rates by 15% using human feedback loops."
      },
      {
        role: "Machine Learning Researcher",
        company: "Weights & Biases",
        companyTier: 1,
        duration: "2020 - 2023",
        description: "Developed tools for tracking RLHF experiments. Co-authored blog posts on alignment safety protocols and benchmarking."
      }
    ],
    behavioralSignals: {
      searchStatus: "active", // active, open_to_offers, passive, not_looking
      responseRate: 98, // percentage
      lastActive: "15 minutes ago",
      profileCompleteness: 95,
      interviewPassRate: 88
    }
  },
  {
    id: "cand-2",
    name: "Benjamin Chen",
    title: "Distributed Systems Lead",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    email: "bchen@syscraft.io",
    location: "Seattle, WA",
    experienceYears: 9,
    currentSalary: 215000,
    expectedSalary: 240000,
    visaRequired: false,
    education: {
      degree: "BS in Computer Engineering",
      institution: "University of Washington",
      tier: 1
    },
    skills: ["Go", "Rust", "Kubernetes", "gRPC", "Kafka", "Docker", "Raft", "PostgreSQL", "C++", "Linux Systems"],
    bio: "Systems architect focused on high-throughput, low-latency applications. Contributor to open-source RPC engines and consensus libraries.",
    careerHistory: [
      {
        role: "Principal Systems Engineer",
        company: "Amazon Web Services (AWS)",
        companyTier: 1,
        duration: "2021 - Present",
        description: "Designed core control-plane components using Rust. Handled 500k+ RPS with sub-millisecond latencies. Guided a team of 6 engineers."
      },
      {
        role: "Senior Distributed Engineer",
        company: "HashiCorp",
        companyTier: 1,
        duration: "2018 - 2021",
        description: "Maintained Raft consensus modules. Improved cluster startup speeds and network replication efficiency."
      }
    ],
    behavioralSignals: {
      searchStatus: "open_to_offers",
      responseRate: 85,
      lastActive: "2 hours ago",
      profileCompleteness: 100,
      interviewPassRate: 92
    }
  },
  {
    id: "cand-3",
    name: "Elena Rostova",
    title: "Senior Mobile Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    email: "elena.ros@codevoyage.dev",
    location: "Miami, FL",
    experienceYears: 6,
    currentSalary: 160000,
    expectedSalary: 175000,
    visaRequired: true, // Requires visa
    education: {
      degree: "BS in Software Engineering",
      institution: "Saint Petersburg State University",
      tier: 2
    },
    skills: ["React Native", "TypeScript", "JavaScript", "Swift", "Kotlin", "Zustand", "Redux", "Xcode", "Android Studio"],
    bio: "Dedicated mobile engineer specialized in crafting responsive, offline-first mobile apps. Strong focus on design fidelity and smooth transition animations.",
    careerHistory: [
      {
        role: "Senior React Native Developer",
        company: "Coinbase",
        companyTier: 1,
        duration: "2022 - Present",
        description: "Optimized mobile charts rendering, cutting frames drop by 30%. Created Native Bridges for biometric verification APIs."
      },
      {
        role: "Mobile Engineer",
        company: "Toptal Freelancer",
        companyTier: 2,
        duration: "2020 - 2022",
        description: "Built 5 client apps from scratch. Achieved 99.9% crash-free sessions on iOS and Android devices."
      }
    ],
    behavioralSignals: {
      searchStatus: "active",
      responseRate: 92,
      lastActive: "1 day ago",
      profileCompleteness: 90,
      interviewPassRate: 80
    }
  },
  {
    id: "cand-4",
    name: "Devon Brooks",
    title: "Lead Developer Relations Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    email: "devon.b@devspeak.net",
    location: "Austin, TX",
    experienceYears: 5,
    currentSalary: 145000,
    expectedSalary: 160000,
    visaRequired: false,
    education: {
      degree: "BA in Communications & CS Minor",
      institution: "University of Texas at Austin",
      tier: 2
    },
    skills: ["JavaScript", "React", "Next.js", "Node.js", "Technical Writing", "Public Speaking", "API Design", "GitHub", "Community Building"],
    bio: "Developer Advocate who bridges engineering and content creation. Creator of a popular programming blog and open-source tooling templates.",
    careerHistory: [
      {
        role: "Developer Advocate",
        company: "Vercel",
        companyTier: 1,
        duration: "2022 - Present",
        description: "Created Next.js starter templates that accumulated 15k+ GitHub stars. Hosted international workshops and wrote documentation."
      },
      {
        role: "Developer Advocate",
        company: "Twilio",
        companyTier: 1,
        duration: "2021 - 2022",
        description: "Published weekly tutorials on API integrations. Scaled developer Discord community from 5k to 20k members."
      }
    ],
    behavioralSignals: {
      searchStatus: "passive", // Passive candidate
      responseRate: 45, // Low response rate
      lastActive: "3 weeks ago",
      profileCompleteness: 85,
      interviewPassRate: 75
    }
  },
  {
    id: "cand-5",
    name: "Sofia Martinez",
    title: "AI Safety Researcher",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    email: "sofia.martinez@alignment.org",
    location: "Boston, MA",
    experienceYears: 8,
    currentSalary: 195000,
    expectedSalary: 230000,
    visaRequired: false,
    education: {
      degree: "PhD in Artificial Intelligence",
      institution: "MIT",
      tier: 1
    },
    skills: ["Python", "PyTorch", "Alignment", "RLHF", "Model Evaluation", "Transformer Architecture", "Ethics in AI", "Mathematical Logic"],
    bio: "PhD researcher from MIT specializing in scalable oversight and mathematical formulations of model alignment. Author of 5 papers at NeurIPS.",
    careerHistory: [
      {
        role: "Staff Alignment Researcher",
        company: "Anthropic",
        companyTier: 1,
        duration: "2022 - Present",
        description: "Researched Constitutional AI paradigms. Developed automated red-teaming pipelines that identified 40+ potential exploit vectors."
      },
      {
        role: "Research Scientist",
        company: "OpenAI",
        companyTier: 1,
        duration: "2019 - 2022",
        description: "Worked on initial RLHF experiments for instruction-tuned models. Built safety evaluation datasets."
      }
    ],
    behavioralSignals: {
      searchStatus: "not_looking", // Passive, not looking
      responseRate: 20, // Very hard to reach
      lastActive: "1 month ago",
      profileCompleteness: 70,
      interviewPassRate: 95
    }
  },
  {
    id: "cand-6",
    name: "Marcus Vance",
    title: "Full Stack Engineer",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150",
    email: "marcusv@hightechcorp.com",
    location: "Denver, CO",
    experienceYears: 4,
    currentSalary: 120000,
    expectedSalary: 135000,
    visaRequired: false,
    education: {
      degree: "Self-taught / Bootcamp Graduate",
      institution: "Hack Reactor",
      tier: 3
    },
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "PostgreSQL", "Next.js", "HTML", "CSS", "Docker"],
    bio: "Energetic full-stack developer with 4 years of experience building scalable web applications. Strong database optimization skills.",
    careerHistory: [
      {
        role: "Software Engineer II",
        company: "SendGrid",
        companyTier: 2,
        duration: "2022 - Present",
        description: "Implemented dynamic dashboard filters in React. Maintained NodeJS microservices handling transactional email stats."
      },
      {
        role: "Junior Developer",
        company: "TechAgency LLC",
        companyTier: 3,
        duration: "2020 - 2022",
        description: "Built custom client marketing websites. Managed database integrations using Knex and PostgreSQL."
      }
    ],
    behavioralSignals: {
      searchStatus: "active",
      responseRate: 100, // Highly responsive!
      lastActive: "5 minutes ago",
      profileCompleteness: 98,
      interviewPassRate: 70
    }
  },
  {
    id: "cand-7",
    name: "Yuki Tanaka",
    title: "Systems Engineer & Rust Expert",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=150",
    email: "yuki.t@rustfoundry.net",
    location: "San Jose, CA",
    experienceYears: 6,
    currentSalary: 175000,
    expectedSalary: 195000,
    visaRequired: false,
    education: {
      degree: "BS in Computer Science",
      institution: "Kyoto University",
      tier: 2
    },
    skills: ["Rust", "C++", "Linux Systems", "gRPC", "Docker", "WebAssembly", "Multithreading", "PostgreSQL", "Go"],
    bio: "Systems programmer specializing in memory-safety and latency reduction. Active contributor to the Rust ecosystem, including async crates.",
    careerHistory: [
      {
        role: "Systems Engineer",
        company: "Cloudflare",
        companyTier: 1,
        duration: "2021 - Present",
        description: "Rewrote proxy modules in Rust, reducing memory footprint by 40% and decreasing tail latencies."
      },
      {
        role: "Software Developer",
        company: "Sony",
        companyTier: 2,
        duration: "2018 - 2021",
        description: "Developed embedded firmware in C++. Optimized networking protocols for game console communications."
      }
    ],
    behavioralSignals: {
      searchStatus: "open_to_offers",
      responseRate: 90,
      lastActive: "1 hour ago",
      profileCompleteness: 95,
      interviewPassRate: 85
    }
  },
  {
    id: "cand-8",
    name: "Priya Sharma",
    title: "Mobile Architect",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    email: "priya.sharma@appengine.org",
    location: "San Francisco, CA",
    experienceYears: 10,
    currentSalary: 210000,
    expectedSalary: 230000,
    visaRequired: false,
    education: {
      degree: "MS in Software Engineering",
      institution: "San Jose State University",
      tier: 2
    },
    skills: ["React Native", "iOS", "Android", "Swift", "Kotlin", "TypeScript", "Performance Optimization", "CI/CD", "Redux", "GraphQL"],
    bio: "Mobile leader with 10 years of experience (4 years React Native). Guided architecture for consumer apps used by 10M+ users.",
    careerHistory: [
      {
        role: "Mobile Tech Lead",
        company: "Uber",
        companyTier: 1,
        duration: "2020 - Present",
        description: "Led a team of 8 mobile developers. Transitioned key driver features from native codebases to React Native."
      },
      {
        role: "Senior iOS Engineer",
        company: "Pinterest",
        companyTier: 1,
        duration: "2016 - 2020",
        description: "Created high-performance pin feed views. Implemented automated end-to-end mobile testing."
      }
    ],
    behavioralSignals: {
      searchStatus: "passive",
      responseRate: 60,
      lastActive: "5 days ago",
      profileCompleteness: 92,
      interviewPassRate: 90
    }
  },
  {
    id: "cand-9",
    name: "Nico de Jong",
    title: "Senior Developer Relations",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=150",
    email: "nico.dj@devreach.io",
    location: "Amsterdam, NL (Remote)",
    experienceYears: 5,
    currentSalary: 110000,
    expectedSalary: 130000,
    visaRequired: false,
    education: {
      degree: "BS in Information Studies",
      institution: "University of Amsterdam",
      tier: 2
    },
    skills: ["JavaScript", "Next.js", "Node.js", "Technical Writing", "Public Speaking", "Community Building", "GitHub", "API Integration"],
    bio: "Engaging DevRel advocate with a passion for web technologies and developer onboarding. Enjoys creating interactive code playgrounds.",
    careerHistory: [
      {
        role: "Senior Developer Advocate",
        company: "Sentry",
        companyTier: 2,
        duration: "2022 - Present",
        description: "Authored 30+ tutorials on error monitoring integrations. Spoke at JSConf, React Advanced, and remote conferences."
      },
      {
        role: "Developer Relations Engineer",
        company: "Netlify",
        companyTier: 1,
        duration: "2020 - 2022",
        description: "Created serverless starter kits. Managed developer community programs and feedback channels."
      }
    ],
    behavioralSignals: {
      searchStatus: "active",
      responseRate: 95,
      lastActive: "45 minutes ago",
      profileCompleteness: 97,
      interviewPassRate: 78
    }
  },
  {
    id: "cand-10",
    name: "James Wilson",
    title: "Senior Backend Developer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    email: "jwilson@codeflow.io",
    location: "Chicago, IL",
    experienceYears: 8,
    currentSalary: 155000,
    expectedSalary: 170000,
    visaRequired: false,
    education: {
      degree: "BS in Computer Science",
      institution: "University of Illinois Urbana-Champaign",
      tier: 1
    },
    skills: ["Go", "Kubernetes", "Docker", "PostgreSQL", "AWS", "Java", "REST APIs", "Redis", "gRPC"],
    bio: "Reliable backend engineer specializing in Go microservices and SQL optimization. Experienced with legacy codebase modernization.",
    careerHistory: [
      {
        role: "Senior backend developer",
        company: "Grainger",
        companyTier: 2,
        duration: "2021 - Present",
        description: "Migrated legacy monolith to Go microservices in Kubernetes. Reduced API response latency by 200ms."
      },
      {
        role: "Software Engineer",
        company: "Caterpillar",
        companyTier: 3,
        duration: "2018 - 2021",
        description: "Maintained data pipelines. Configured AWS EC2 deployments and PostgreSQL backups."
      }
    ],
    behavioralSignals: {
      searchStatus: "open_to_offers",
      responseRate: 70,
      lastActive: "4 days ago",
      profileCompleteness: 88,
      interviewPassRate: 72
    }
  },
  {
    id: "cand-11",
    name: "Clara Vance",
    title: "AI Engineer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    email: "clara.vance@cognitivesystems.com",
    location: "Toronto, ON (Remote)",
    experienceYears: 4,
    currentSalary: 130000,
    expectedSalary: 150000,
    visaRequired: false,
    education: {
      degree: "BS in Computer Science (Data Science)",
      institution: "University of Toronto",
      tier: 1
    },
    skills: ["Python", "PyTorch", "LLMs", "NLP", "Scikit-Learn", "Prompt Engineering", "SQL", "Git"],
    bio: "Agile ML developer focused on putting Large Language Models to work. Fast learner, expert in prompt engineering and RAG frameworks.",
    careerHistory: [
      {
        role: "AI Developer",
        company: "Cohere",
        companyTier: 1,
        duration: "2023 - Present",
        description: "Built custom text-classification templates. Assisted in fine-tuning internal embeddings models."
      },
      {
        role: "Data Scientist",
        company: "Royal Bank of Canada (RBC)",
        companyTier: 2,
        duration: "2021 - 2023",
        description: "Created predictive customer churn models. Formed data-cleansing pipelines using Pandas and SQL."
      }
    ],
    behavioralSignals: {
      searchStatus: "active",
      responseRate: 97,
      lastActive: "10 minutes ago",
      profileCompleteness: 95,
      interviewPassRate: 82
    }
  },
  {
    id: "cand-12",
    name: "Elijah Kaelen",
    title: "Rust Core Developer",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150",
    email: "kaelen@lowlevel.xyz",
    location: "Portland, OR (Remote)",
    experienceYears: 10,
    currentSalary: 230000,
    expectedSalary: 260000,
    visaRequired: false,
    education: {
      degree: "BS in CS (Dropped out)",
      institution: "Reed College",
      tier: 3
    },
    skills: ["Rust", "WebAssembly", "C++", "Linux", "gRPC", "Docker", "WASM", "Tokio", "Compiler Design"],
    bio: "Low-level system designer. Created and maintained multi-threaded async frameworks in Rust. Advocate of zero-cost abstractions.",
    careerHistory: [
      {
        role: "Principal Infrastructure Engineer",
        company: "Figma",
        companyTier: 1,
        duration: "2021 - Present",
        description: "Designed WebAssembly rendering subsystems. Handled real-time syncing architectures for high-concurrency documents."
      },
      {
        role: "Lead Systems Engineer",
        company: "Fastly",
        companyTier: 1,
        duration: "2018 - 2021",
        description: "Wrote core modules for edge compute runtime in Rust. Optimized async event loops."
      }
    ],
    behavioralSignals: {
      searchStatus: "not_looking",
      responseRate: 15,
      lastActive: "2 weeks ago",
      profileCompleteness: 80,
      interviewPassRate: 96
    }
  }
];
