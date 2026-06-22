/* ============================================
   DATA
   All resume content lives here. Edit this file
   to update the portfolio's content without
   touching logic in commands.js / terminal.js
   ============================================ */

const PORTFOLIO_DATA = {

  meta: {
    name: "Abhijit Rajkumar",
    role: "AI / ML Engineer · Full-Stack Developer",
    location: "India",
    email: "abhijitrajkumar2@gmail.com",
    phone: "+91 7005157909",
    links: {
      linkedin: "www.linkedin.com/in/rkabhijit",
      portfolio: "https://abhijit1102.github.io",
      github: "https://github.com/Abhijit1102"
    }
  },

  about: [
    "Full-stack developer specializing in AI-powered applications —",
    "Retrieval-Augmented Generation pipelines, autonomous coding agents,",
    "and genomic ML platforms. Comfortable across the stack: from Next.js",
    "frontends and FastAPI backends, to vector databases, LLM orchestration",
    "(Gemini, GPT-4.1, Inngest Agent Kit), and cloud sandboxes (E2B, Modal).",
    "",
    "Background in Mathematics (Linear Algebra, Real Analysis, Time Series),",
    "which shows up in how I approach model design — e.g. building weighted",
    "scoring systems for variant pathogenicity prediction."
  ],

  projects: [
    {
      name: "GitHawk",
      slug: "githawk",
      tagline: "AI-powered GitHub PR reviewer — open-source CodeRabbit alternative",
      stack: ["Next.js", "Better Auth", "Pinecone", "Gemini AI", "Inngest", "Polar", "PostgreSQL"],
      links: { github: "#", demo: "#" },
      bullets: [
        "Full-stack PR reviewer using Next.js, Better Auth (GitHub OAuth), and PostgreSQL via Prisma.",
        "RAG pipeline with Pinecone embeddings indexes entire repo codebases for context-aware reviews.",
        "Inngest job fetches PR diffs, runs vector search, and generates structured reviews with Gemini 2.5 Flash — walkthrough, Mermaid diagrams, bug analysis, suggestions — posted as inline PR comments with concurrency control and retries.",
        "Integrated Polar for subscriptions; separate index-repo function embeds repo files into Pinecone on first connect."
      ],
      diagram: String.raw`
  GitHub PR opened
        |
        v
  +--------------+      +----------------+
  |  Next.js app | ---> |  Inngest job    |
  |  (Better     |      |  (PR diff +     |
  |   Auth)      |      |   vector search)|
  +--------------+      +----------------+
        |                       |
        |                       v
        |               +----------------+
        |               |   Pinecone DB   |
        |               | (repo embeddings)|
        |               +----------------+
        |                       |
        |                       v
        |               +----------------+
        |               | Gemini 2.5 Flash |
        |               | review + diagram |
        +-------------->| + suggestions    |
                         +----------------+
                                 |
                                 v
                       Inline PR comment
                       (retries + concurrency
                        control via Inngest)`
    },
    {
      name: "v0-clone",
      slug: "v0-clone",
      tagline: "AI UI generation platform inspired by v0.dev",
      stack: ["Next.js", "Inngest Agent Kit", "GPT-4.1", "E2B Sandboxes", "Clerk", "PostgreSQL"],
      links: { github: "#", demo: "#" },
      bullets: [
        "Users describe a feature in plain English and get a live, interactive Next.js preview in a real cloud sandbox.",
        "Inngest Agent Kit coding agent (GPT-4.1-mini) with terminal, createOrUpdateFiles, and readFiles tools autonomously scaffolds, writes, installs, and debugs code inside E2B sandboxes.",
        "Sandbox reuse logic reconnects to existing E2B sandboxes across turns, preserving node_modules and file state to skip redundant reinstalls.",
        "Every generation persisted as a Fragment (file snapshot + live URL) linked to a project message thread for full multi-turn refinement history via Prisma/PostgreSQL."
      ],
      diagram: String.raw`
  User prompt ("add a login form")
        |
        v
  +----------------+
  |   Next.js app   |  (Clerk auth)
  +----------------+
        |
        v
  +-------------------------+
  | Inngest Agent Kit agent  |
  | (GPT-4.1-mini)           |
  |  tools: terminal,        |
  |  createOrUpdateFiles,    |
  |  readFiles               |
  +-------------------------+
        |
        v
  +-------------------------+
  |   E2B cloud sandbox      |
  |  (reused across turns -> |
  |   node_modules preserved)|
  +-------------------------+
        |
        v
  Live preview URL
        |
        v
  Saved as "Fragment"
  (file snapshot + URL)
  --> Prisma/PostgreSQL
  --> multi-turn history`
    },
    {
      name: "Patho-Predict",
      slug: "patho-predict",
      tagline: "Genomic variant pathogenicity prediction platform",
      stack: ["Next.js", "Modal", "FastAPI", "Biopython", "UCSC API", "ClinVar", "Pinecone"],
      links: { github: "#", demo: "#" },
      bullets: [
        "Input a chromosomal position and alternative nucleotide → get an AI-powered clinical classification with evidence.",
        "Modal serverless FastAPI endpoint fetches the reference base from UCSC Genome Browser, translates the codon change to an amino acid substitution with Biopython, and scores it across three signals.",
        "Weighted scoring model: risk = 0.45 x CADD + 0.35 x ESM-proxy + 0.20 x Conservation, thresholded into Likely Pathogenic / Uncertain Significance / Likely Benign.",
        "ClinVar overlays, gene sequence visualization, and 7 Next.js API routes consuming UCSC/NCBI — supports any UCSC genome assembly (hg38, hg19, mm39, etc.)."
      ],
      diagram: String.raw`
  Input: chr position + alt base
        |
        v
  +-------------------------+
  |   Next.js frontend        |
  | (7 API routes, sequence    |
  |  visualization, ClinVar    |
  |  overlays)                  |
  +-------------------------+
        |
        v
  +-------------------------+
  | Modal serverless FastAPI  |
  +-------------------------+
        |
        +--> UCSC Genome Browser API -> reference base
        |
        +--> Biopython -> codon -> amino acid substitution
        |
        v
  +-------------------------+
  |   Weighted scoring model  |
  |  risk = 0.45*CADD          |
  |       + 0.35*ESM-proxy     |
  |       + 0.20*Conservation  |
  +-------------------------+
        |
        v
  Likely Pathogenic /
  Uncertain Significance /
  Likely Benign
  (+ ClinVar evidence)`
    }
  ],

  experience: [
    {
      role: "AI / ML Intern",
      org: "Euron (Engagesphere Technology Pvt Ltd)",
      location: "Remote",
      period: "Sep 2025 – Apr 2026",
      bullets: [
        "Built MediRAG (RAGnosis), a full-stack AI-powered medical document analysis system using RAG.",
        "Designed end-to-end pipeline: document ingestion -> embeddings (LlamaIndex, HuggingFace) -> vector search (Pinecone/FAISS) -> LLM response generation.",
        "Scalable architecture with FastAPI backend, Next.js frontend, and Docker Compose deployment.",
        "Implemented semantic search and source-grounded responses for accurate medical Q&A."
      ]
    },
    {
      role: "Apprentice",
      org: "Pwskills",
      location: "Bengaluru, Karnataka",
      period: "Jan 2022 – Nov 2023",
      bullets: [
        "Led development of ML solutions for EDA (Exploratory Data Analysis) products.",
        "Collaborated with data scientists and software developers to integrate ML capabilities into EDA tools.",
        "Engaged in troubleshooting and resolving complex engineering challenges."
      ]
    },
    {
      role: "AI / ML Intern",
      org: "Elite Techno Group",
      location: "Jaipur, Rajasthan",
      period: "Jun 2021 – Aug 2021",
      bullets: [
        "Developed a Breast Cancer Prediction model achieving 99.45% classification accuracy.",
        "Engineered a modular ML pipeline: data ingestion, transformation, model training, prediction.",
        "Hands-on experience with end-to-end ML workflow development and optimization."
      ]
    }
  ],

  skills: {
    "Languages": [
      { name: "Python", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript", level: 88 },
      { name: "C / C++", level: 70 },
      { name: "R", level: 65 }
    ],
    "Full-Stack": [
      { name: "Next.js / React", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "Node.js / Express", level: 82 },
      { name: "Tailwind CSS", level: 85 }
    ],
    "AI & LLMs": [
      { name: "RAG / LangChain", level: 90 },
      { name: "OpenAI / Gemini", level: 88 },
      { name: "Pinecone / Qdrant", level: 85 },
      { name: "Inngest Agent Kit", level: 80 }
    ],
    "ML": [
      { name: "Supervised / Unsupervised", level: 85 },
      { name: "Neural Nets / CNNs", level: 78 },
      { name: "XGBoost / Random Forest", level: 85 }
    ],
    "Data & Cloud": [
      { name: "PostgreSQL / Prisma", level: 88 },
      { name: "Hadoop / Spark / Kafka", level: 70 },
      { name: "AWS (EC2, S3, Lambda)", level: 75 },
      { name: "Docker / Kubernetes", level: 78 }
    ]
  },

  education: [
    {
      school: "Gurucharan College, Silchar, Assam",
      degree: "Bachelor of Science in Mathematics",
      period: "Jun 2013 – Jun 2017",
      bullets: [
        "Core: Linear Algebra, Real Analysis, Number Theory, Complex Analysis, Mathematical Modeling.",
        "Applied mathematical concepts to traffic control and rainfall prediction problems."
      ]
    }
  ],

  achievements: [
    "MSc project: \"Traffic Control Optimization using Linear Algebra\" — actively working towards publication.",
    "MSc project: Rainfall prediction using Time Series analysis — pursuing academic publication."
  ],

  certifications: [
    {
      title: "Big Data Engineering Intern",
      org: "Euron (Engagesphere Technology Pvt Ltd)",
      period: "Sep 2025 – Apr 2026",
      bullets: [
        "Hadoop, Spark (RDDs, DataFrames, Catalyst), Kafka, Spark Streaming. Orchestration with Airflow and Azure Data Factory.",
        "Cloud: Azure (Data Lake, Databricks), AWS (S3, EMR, Glue, Athena). Projects: Fraud Detection, Sentiment Analysis."
      ]
    },
    {
      title: "Data Science Masters Certification",
      org: "PW Skills",
      period: "Nov 2023",
      bullets: [
        "End-to-end ML workflows; Deep Learning with TensorFlow, Keras, PyTorch; PCA, t-SNE, LDA.",
        "Domain projects in healthcare, finance, retail using Random Forest, XGBoost, SVM, Logistic Regression."
      ]
    },
    {
      title: "Full Stack Developer Cohort (0 to 100)",
      org: "Instructor: Harkirat Singh",
      period: "Jul 2024",
      bullets: [
        "MERN stack, System Design, DevOps (Docker, Kubernetes, CI/CD, Nginx, Prometheus, Grafana, AWS).",
        "Advanced: Kafka, WebSockets, gRPC, Rate Limiting. Projects: Paytm Clone, Zerodha Clone, Zapier Clone."
      ]
    }
  ],

  asciiName: String.raw`
╔══════════════════════════════════════════════════════════════════════╗
║                     >> ABHIJIT RAJKUMAR <<                         ║
║                                                                    ║
║                   Code • Build • Innovate • Repeat                 ║
╚══════════════════════════════════════════════════════════════════════╝
 █████╗ ██████╗ ██╗  ██╗██╗     ██╗██╗████████╗
██╔══██╗██╔══██╗██║  ██║██║     ██║██║╚══██╔══╝
███████║██████╔╝███████║██║     ██║██║   ██║
██╔══██╗██╔══██╗██╔══██║██║██   ██║██║   ██║
██║  ██║██████╔╝██║  ██║██║╚█████╔╝██║   ██║
╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝ ╚════╝ ╚═╝   ╚═╝
██████╗  █████╗      ██╗██╗  ██╗██╗   ██╗███╗   ███╗ █████╗ ██████╗
██╔══██╗██╔══██╗     ██║██║ ██╔╝██║   ██║████╗ ████║██╔══██╗██╔══██╗
██████╔╝███████║     ██║█████╔╝ ██║   ██║██╔████╔██║███████║██████╔╝
██╔══██╗██╔══██║██   ██║██╔═██╗ ██║   ██║██║╚██╔╝██║██╔══██║██╔══██╗
██║  ██║██║  ██║╚█████╔╝██║  ██╗╚██████╔╝██║ ╚═╝ ██║██║  ██║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝`
};