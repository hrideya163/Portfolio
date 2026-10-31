// Site content. Facts come from the resume and the owner's content brief; nothing here reports results that don't exist.
window.DATA = {
  email: "hrideyasharma7@gmail.com",
  github: "https://github.com/hrideya163",
  linkedin: "https://linkedin.com/in/hrideya-sharma-97861b330",
  resume: "assets/Hrideya_Sharma_Resume.pdf",

  intro: "Exploring intelligent systems, building machine learning applications, and investigating how models learn, reason and generalize.",

  projects: [
    {
      id: "contrimap",
      featured: true,
      status: "ONGOING",
      title: "ContriMap",
      subtitle: "Intelligent GitHub Contribution Analyzer",
      summary:
        "Opening an unfamiliar repository and finding something you can actually fix is the hard part of contributing to open source. ContriMap is an ongoing attempt to make that first step legible.",
      parts: [
        { name: "Difficulty classifier", text: "Rates how hard an issue is likely to be." },
        { name: "Effort estimator", text: "Estimates how much work resolving it takes." },
        { name: "Issue-to-file localizer", text: "Points an issue at the files and modules it touches." },
      ],
      tech: ["GitHub API", "Machine Learning", "Graph Analysis", "Repository Analysis"],
      link: null,
      study: {
        problem:
          "A new contributor faces a repository they have never read. Which issues are approachable? How large would a fix be? Where in the codebase does the problem live? The answers are scattered across issue threads, pull requests and the directory tree, and they are rarely written down in one place.",
        approach: [
          ["Ingestion", "Repository data is pulled through the GitHub API, including historical issues and the pull requests that resolved them. Those issue-to-resolving-PR relationships are what connect a reported problem to the code that eventually fixed it."],
          ["Three ML components", "Difficulty classification, effort estimation and issue-to-file localization are built as separate parts of the system, each answering one question a newcomer has: how hard, how long, and where."],
          ["Repository structure", "Structure analysis and graph-based visualization map issues onto files, modules and their dependencies, so a newcomer can see the neighbourhood of a change, not just a file name."],
          ["Contribution pathways", "The end goal is a route through an unfamiliar codebase: suitable issues first, with the relevant code laid out around them."],
        ],
        status: "In development. No public repository or demo is listed yet, so none is linked here.",
      },
    },
    {
      id: "meeting",
      status: "COMPLETED",
      title: "AI-Powered Meeting Summarizer",
      subtitle: "Meeting recordings to structured summaries",
      summary: "Upload a recording and get back a transcript, a summary, the decisions made and the action items.",
      tech: ["Python", "PyTorch", "Whisper", "FastAPI", "React", "NLP", "LLMs"],
      link: "https://github.com/hrideya163/Ai-powered-Meeting-Summarizer",
      study: {
        problem: "Meetings produce decisions and follow-ups that are easy to lose. The goal was to turn raw audio into something a team can act on.",
        approach: [
          ["Speech to text", "Whisper handles transcription of the uploaded recording."],
          ["LLM workflows", "Separate LLM prompts produce the summary and extract decisions and action items. Prompt engineering was used to improve output quality and consistency."],
          ["Application", "A FastAPI backend runs the NLP pipeline and serves a React frontend."],
        ],
      },
    },
    {
      id: "movies",
      status: "COMPLETED",
      title: "Movie Recommendation System",
      subtitle: "Content-based recommender using NLP",
      summary: "Recommends similar movies from their content rather than from other users' behaviour.",
      tech: ["Python", "Scikit-learn", "NLP", "TF-IDF"],
      link: "https://github.com/hrideya163/Movie-Recommender-system",
      study: {
        problem: "Given a movie someone likes, which others are closest to it in content?",
        approach: [
          ["Features", "Genres, cast, keywords and numerical features are combined into a single representation per movie."],
          ["Vectorization", "TF-IDF turns the text features into vectors."],
          ["Retrieval", "Cosine similarity ranks every movie against the chosen one and returns a personalized top-N list."],
        ],
      },
    },
    {
      id: "scraper",
      status: "COMPLETED",
      title: "Automated E-Commerce Product Scraper",
      subtitle: "Structured data from dynamic websites",
      summary: "A pipeline that extracts product data from sites that build their pages with JavaScript.",
      tech: ["Python", "Selenium", "BeautifulSoup"],
      link: "https://github.com/hrideya163/Web-scraping",
      study: {
        problem: "Product pages that render client-side can't be read with a plain HTTP request, and scraped data is only useful if it is clean.",
        approach: [
          ["Rendering", "Selenium drives a browser so JavaScript-rendered pages load fully before extraction."],
          ["Parsing", "BeautifulSoup pulls structured product fields out of the page."],
          ["Reliability", "Validation and error handling guard the output, and results go into structured storage."],
        ],
      },
    },
  ],

  publication: {
    title: "Less is More in Kolmogorov-Arnold Networks: The Shared-Atom Architecture",
    venue: "CoLoRAI 2026 Workshop, ICML 2026",
    link: "https://icml.cc/virtual/2026/75832",
    text: [
      "Kolmogorov-Arnold Networks put a learnable function on every edge, which is expressive but parameter-hungry. This paper proposes Shared-Atom KAN (SA-KAN), which learns one shared dictionary of reusable basis functions instead of a separate set per edge.",
      "Sparse atom mixing and low-rank functional factorization let the network assemble its edge functions from that dictionary. The result is about 30% fewer parameters than Vanilla KAN, with better performance on structured learning tasks.",
    ],
    tech: ["PyTorch", "Deep Learning", "Neural Networks", "Scientific ML"],
  },

  research: [
    {
      id: "plbench",
      title: "PLBench",
      subtitle: "Benchmarking Logical Reasoning in Large Language Models",
      question:
        "Can an LLM produce logically valid reasoning, or only answers that look plausible?",
      body: [
        "PLBench is a benchmark of propositional logic problems. Tasks come in five depths, d1 to d5, and are built from twelve inference rules into formally structured proof chains.",
        "Answers are checked automatically with logical entailment and truth-table verification, so a derivation is either valid or it is not. Experiments cover the Qwen, DeepSeek and GLM model families, looking at reasoning failures, hallucinations and how performance generalizes with depth and model scale.",
      ],
      facts: [["Depths", "d1 – d5"], ["Inference rules", "12"], ["Validation", "Entailment + truth tables"], ["Model families", "Qwen, DeepSeek, GLM"]],
      tech: ["Python", "PyTorch", "Hugging Face Transformers", "LLM Evaluation"],
    },
    {
      id: "mawm",
      title: "Mechanism-Aware World Models",
      subtitle: "Robust representation learning under changing dynamics",
      question:
        "Does explicitly representing the mechanisms of an environment make learned world models more robust and better at generalizing?",
      body: [
        "The setting is DreamerV3 on DMControl quadruped tasks, where the environment's dynamics are changed through terrain slope, ground friction, motor strength and joint damping. The work looks at learning a representation of those underlying mechanisms and evaluating the resulting embeddings.",
        "Evaluation directions are in-distribution and out-of-distribution generalization, mechanism extrapolation, transfer, and long-horizon prediction. The experiments are in progress; no results are reported here.",
      ],
      facts: [["Base model", "DreamerV3"], ["Environment", "DMControl quadruped"], ["Factors", "Slope, friction, motor strength, joint damping"], ["Evaluation", "ID/OOD, extrapolation, transfer, long horizon"]],
      tech: ["PyTorch", "RL", "Representation Learning", "DMControl"],
    },
  ],

  experiments: [
    {
      status: "IMPLEMENTED",
      title: "Character-Level Language Modelling",
      text: "An LSTM text generator trained on the Tiny Shakespeare dataset, built to learn how recurrent networks model sequences one character at a time.",
      tech: ["LSTM", "Char tokenization", "Tiny Shakespeare"],
    },
    {
      status: "IMPLEMENTED",
      title: "Transformer & Tokenization",
      text: "Character tokenization compared with SentencePiece BPE at different vocabulary sizes, tested on copy, reverse, addition and prefix tasks to see how tokenization shapes model behaviour.",
      tech: ["Transformers", "SentencePiece BPE", "Algorithmic tasks"],
    },
    {
      status: "IMPLEMENTED",
      title: "Reinforcement Learning Basics",
      text: "Q-learning with epsilon-greedy exploration on FrozenLake and Taxi, followed by DQN experiments with Stable-Baselines3, to get comfortable with agent-environment interaction.",
      tech: ["Q-learning", "DQN", "Stable-Baselines3", "FrozenLake", "Taxi"],
    },
    {
      status: "EXPLORING",
      title: "Further Research Exploration",
      text: "Reading and prototyping directions, not finished work: interpretability and explainability of Mamba and other state-space models, including selectivity and internal representations, and quantum machine learning with hybrid quantum-classical architectures.",
      tech: ["Mamba / SSMs", "Interpretability", "Quantum ML"],
    },
  ],

  about: [
    "I'm a Computer Engineering student at Thapar, and what keeps pulling me in is the gap between a model that works and understanding why it works. I like opening up an architecture, changing one piece, and seeing what moves.",
    "That shows up in two ways. Some of my time goes to building things people can use, like a meeting summarizer or a way into unfamiliar codebases. The rest goes to the fundamentals: how tokenization changes what a transformer learns, whether an LLM's reasoning is actually valid, what a world model has to represent to survive a change in its environment.",
    "I try to keep both habits going. Engineering keeps the research grounded, and research keeps the engineering from settling for something that merely runs.",
  ],

  arsenal: [
    { name: "Languages", items: ["Python", "Java", "C", "C++"] },
    { name: "Machine Learning", items: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face Transformers"] },
    { name: "AI & Research", items: ["Deep Learning", "Reinforcement Learning", "NLP", "LLMs", "Generative AI"] },
    { name: "Backend", items: ["FastAPI", "REST APIs", "PostgreSQL"] },
    { name: "Tools", items: ["Git", "GitHub", "OpenCV", "LangChain", "Selenium", "BeautifulSoup"] },
  ],

  education: {
    degree: "B.Tech, Computer Engineering",
    school: "Thapar Institute of Engineering and Technology",
    years: "2024 – 2028",
  },
  achievements: [
    "Merit Scholarship Recipient",
    "JPMorgan Chase Code for Good 2026 participant",
  ],
};
