export const personalInfo = {
  name: "Pratheega M",
  role: "Aspiring Software Developer",
  subRole: "B.Tech Information Technology Scholar",
  college: "K. Ramakrishnan College of Technology, Samayapuram, Trichy",
  batch: "2024 – 2028",
  cgpa: "7.0",
  email: "pratheegamageswari@gmail.com",
  phone: "+91 9952741346",
  location: "Trichy, Tamil Nadu, India",
  github: "https://github.com/Pratheega",
  resumePath: "/resume.pdf",
  profileImg: "/profile.jpg",
  summary:
    "Enthusiastic and motivated Information Technology student pursuing a B.Tech degree, with an interest in software development, programming, algorithms, and web application development. Familiar with Java, Python, and C, and passionate about applying programming logic to practical real-world problems. Seeking an entry-level IT role or internship to strengthen technical skills and build dependable, user-focused software solutions.",
  objective:
    "To begin a career in the IT industry as a software developer, where I can apply my academic knowledge, improve my coding and problem-solving abilities, and gain practical experience with real-world projects. I aim to keep learning new technologies, work collaboratively with a team, and contribute responsibly to organizational and project goals."
};

export const skillsData = [
  {
    category: "languages",
    categoryLabel: "Programming Languages",
    name: "Java",
    level: 80,
    badge: "Core Language",
    description: "Object-oriented programming, data structures implementation, robust logic design."
  },
  {
    category: "languages",
    categoryLabel: "Programming Languages",
    name: "Python",
    level: 85,
    badge: "Preferred",
    description: "Scripting, web application development, data mining logic, algorithmic automation."
  },
  {
    category: "languages",
    categoryLabel: "Programming Languages",
    name: "C",
    level: 75,
    badge: "Foundational",
    description: "Memory management, pointer manipulation, circular linked list structures."
  },
  {
    category: "languages",
    categoryLabel: "Programming Languages",
    name: "JavaScript / ES6+",
    level: 75,
    badge: "Frontend",
    description: "Modern DOM manipulation, reactive state, asynchronous flows, interactive interfaces."
  },
  {
    category: "core",
    categoryLabel: "Core CS & Algorithms",
    name: "Data Structures & Algorithms",
    level: 82,
    badge: "Core CS",
    description: "Arrays, Linked Lists, Circular Lists, Stacks, Queues, Sorting & Searching."
  },
  {
    category: "core",
    categoryLabel: "Core CS & Algorithms",
    name: "CPU Scheduling Algorithms",
    level: 85,
    badge: "Operating Systems",
    description: "Round Robin time-sharing, FCFS, SJF, Priority Scheduling simulation."
  },
  {
    category: "core",
    categoryLabel: "Core CS & Algorithms",
    name: "Circular Linked Lists",
    level: 88,
    badge: "Specialized",
    description: "Process queue representation and continuous cyclical scheduling logic."
  },
  {
    category: "web_data",
    categoryLabel: "Web & Data",
    name: "Data Mining Concepts",
    level: 78,
    badge: "Data",
    description: "Pattern identification, clustering electricity consumption data, trend analysis."
  },
  {
    category: "web_data",
    categoryLabel: "Web & Data",
    name: "Web Application Development",
    level: 80,
    badge: "Web Dev",
    description: "Building responsive web pages, shopping cart logic, component-driven UI."
  },
  {
    category: "tools",
    categoryLabel: "Tools & Workflow",
    name: "Git & Version Control",
    level: 75,
    badge: "DevOps",
    description: "Source code tracking, GitHub repository workflow, collaborative branching."
  },
  {
    category: "tools",
    categoryLabel: "Tools & Workflow",
    name: "VS Code & Developer Tools",
    level: 85,
    badge: "Productivity",
    description: "Modern IDE debugging, extensions, terminal environments, Vite tooling."
  }
];

export const projectsData = [
  {
    id: "round-robin",
    title: "Round Robin Scheduling Algorithm Using Circular Linked List",
    category: "core",
    categoryBadge: "OS & Data Structures",
    badge: "Algorithm Visualizer",
    shortDesc:
      "Implemented the Round Robin CPU scheduling algorithm using a circular linked list to simulate fair time-quantum process execution with interactive metrics.",
    fullDesc:
      "This project focuses on simulating how operating systems ensure fair execution of concurrent processes through time-sharing. By modeling the ready queue as a circular linked list, processes cycle smoothly across CPU bursts without needing expensive queue reallocations.",
    objectives: [
      "Simulate time-slice allocation (Time Quantum) across multiple incoming processes.",
      "Calculate key operating system metrics: Turnaround Time (TAT) and Waiting Time (WT).",
      "Demonstrate circular linked list pointer updates when processes terminate or yield."
    ],
    techStack: ["C / Python", "Data Structures", "Circular Linked List", "Operating Systems"],
    hasLiveDemo: true,
    demoType: "round-robin",
    color: "#06b6d4"
  },
  {
    id: "electricity-billing",
    title: "Electricity Bill Management System Using Data Mining",
    category: "data",
    categoryBadge: "Data Mining & Systems",
    badge: "Analytics System",
    shortDesc:
      "Developed an academic data mining system that categorizes electricity usage, computes tiered tariff bills, and identifies peak energy consumption patterns.",
    fullDesc:
      "Explored how data mining concepts support the organization and analysis of domain-specific billing information. The system calculates tiered energy costs and classifies consumer profiles into usage clusters to forecast future consumption and recommend conservation.",
    objectives: [
      "Implement multi-tier slab calculations for domestic and commercial consumer types.",
      "Cluster consumption records into Low, Normal, High, and Peak usage brackets.",
      "Generate automated cost breakdowns and energy-saving recommendations."
    ],
    techStack: ["Python", "Data Mining", "Algorithms", "Billing Automation"],
    hasLiveDemo: true,
    demoType: "billing",
    color: "#8b5cf6"
  },
  {
    id: "ecommerce-store",
    title: "E-Commerce Website Using Python",
    category: "web",
    categoryBadge: "Web Application",
    badge: "Full-Stack Project",
    shortDesc:
      "Created a responsive online shopping storefront using Python backend logic with product catalogs, dynamic cart calculations, and interactive checkout summary.",
    fullDesc:
      "An online shopping platform where product-related information is structured and presented seamlessly. It handles real-time cart state, discount code application, order totals, and responsive UI layout for digital retail.",
    objectives: [
      "Construct a product catalog with category filtering and real-time inventory counts.",
      "Implement dynamic shopping cart operations: addition, quantity adjustment, subtotaling.",
      "Deliver a clean, user-friendly interface for browsing and order confirmation."
    ],
    techStack: ["Python", "Web Application Architecture", "JavaScript", "HTML5 / CSS3"],
    hasLiveDemo: true,
    demoType: "ecommerce",
    color: "#ec4899"
  }
];

export const educationData = [
  {
    degree: "B.Tech – Information Technology",
    institution: "K. Ramakrishnan College of Technology (KRCT)",
    location: "Samayapuram, Trichy, Tamil Nadu",
    period: "2024 – 2028",
    score: "CGPA: 7.0",
    status: "Currently Pursuing (Second Year)",
    highlights: [
      "Specializing in Software Engineering, Data Structures, and Computer Architecture.",
      "Active participation in coding labs, algorithmic problem-solving sessions, and academic projects.",
      "Consistent academic record with a focus on practical implementations."
    ]
  },
  {
    degree: "Higher Secondary Certificate (12th Grade)",
    institution: "Sree Ambaals Matric Higher Secondary School",
    location: "Padalur, Perambalur, Tamil Nadu",
    period: "Completed 2024",
    score: "Score: 71.5%",
    status: "Completed",
    highlights: [
      "Strong foundation in Mathematics, Physics, Chemistry, and Computer Science.",
      "Developed an early interest in software engineering and logical reasoning."
    ]
  },
  {
    degree: "Secondary School Leaving Certificate (10th SSLC)",
    institution: "Sree Ambaals Matric Higher Secondary School",
    location: "Padalur, Perambalur, Tamil Nadu",
    period: "Completed 2022",
    score: "Score: 75.0%",
    status: "Completed",
    highlights: [
      "Excelled in Science and Mathematics.",
      "Active participant in school competitions and academic exhibitions."
    ]
  }
];

export const strengthsData = [
  {
    title: "Logical Problem Solving",
    description: "Methodical approach to breaking down algorithmic challenges into structured, testable steps."
  },
  {
    title: "Continuous Learner",
    description: "Eager curiosity to grasp modern frameworks, developer tools, and industry best practices."
  },
  {
    title: "Data Structure Proficiency",
    description: "Solid conceptual grasp of memory management, linked lists, and scheduling queues."
  },
  {
    title: "Team Collaboration",
    description: "Adaptable communicator receptive to peer feedback and committed to project deadlines."
  }
];
