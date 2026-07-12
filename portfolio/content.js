/* ==========================================================
   ✏️ EDIT THIS FILE — all site content lives here.
   The pages render themselves from this data, so adding a
   project/job/credential = adding an object below. No HTML edits.
   ========================================================== */

const SITE = {
  name: "Devin Hill",
  // ✏️ EDIT: contact + profile URLs
  email: "devinhill544@gmail.com",
  linkedin: "https://www.linkedin.com/in/your-handle",
  github: "https://github.com/Dhill1of1",
  // roles cycled by the typing effect on the home page
  roles: [
    "UX/UI designer",
    "Product designer",
    "Interaction designer",
    "Frontend prototyper",
    "Design systems thinker"
  ],
};

/* ---------- credentials page: skills ----------
   name:   the language / framework / tool
   image:  its logo or a photo (drop in /images)
   points: concrete things you've done with it */
const SKILLS = [
  {
    name: "JavaScript",
    image: "./images/skill-javascript.png",
    points: [
      "Built interactive prototypes, page transitions, and production-minded UI behavior in vanilla JS.",
      "Uses code to validate motion, states, and handoff details before designs reach engineering.",
    ],
  },
  {
    name: "Python",
    image: "./images/skill-python.png",
    points: [
      "Automates small research, content, and data-cleanup tasks so design decisions stay organized.",
    ],
  },
  {
    name: "React",
    image: "./images/skill-react.png",
    points: [
      "Turns product concepts into component-based prototypes with realistic interaction states.",
      "Comfortable speaking with engineers about props, state, accessibility, and implementation tradeoffs.",
    ],
  },
  {
    name: "Design Systems",
    image: "./images/skill-git.png",
    points: [
      "Thinks in reusable components, tokens, variants, and interaction patterns.",
      "Documents decisions so teams can build consistently without slowing down.",
    ],
  },
];

/* ---------- about page: interests (photos in /images) ----------
   title: short label under the photo
   caption: a sentence or two about the interest, in your own words */
const INTERESTS = [
  {
    image: "./images/interest-1.jpg",
    title: "gaming // interaction feel",
    caption:
      "Game interfaces shaped how I think about feedback, rhythm, wayfinding, and emotional polish.",
  },
  {
    image: "./images/interest-2.jpg",
    title: "visual systems",
    caption: "I notice the details: spacing, hierarchy, contrast, icon logic, and how a product teaches itself.",
  },
  {
    image: "./images/interest-3.jpg",
    title: "prototype craft",
    caption: "I like making ideas tangible quickly, then tightening them until the interaction feels inevitable.",
  },
];

/* ---------- experience page (newest first) ---------- */
const EXPERIENCE = [
  {
    dates: "2024 — present",
    role: "UX/UI Designer & Frontend Builder",
    org: "Portfolio Casework // Remote",
    image: "./images/company-1.png",
    points: [
      "Designed and built cinematic portfolio systems with responsive layouts, interaction states, and accessible navigation.",
      "Translated visual concepts into working prototypes to show product thinking, motion, and implementation awareness.",
      "Focused presentation around UX/UI and product design hiring signals: case studies, systems thinking, and polished craft.",
    ],
  },
  {
    dates: "2022 — 2024",
    role: "Frontend Developer",
    org: "Independent Projects // Remote",
    image: "./images/company-2.png",
    points: [
      "Built small web apps and interface experiments using HTML, CSS, JavaScript, and React patterns.",
      "Practiced turning ambiguous ideas into usable flows with clear hierarchy and responsive behavior.",
    ],
  },
  {
    dates: "2021 — 2022",
    role: "Design-Minded Technologist",
    org: "Early Learning & Coursework",
    image: "./images/company-3.png",
    points: ["Built a foundation in software, problem solving, and visual interface craft."],
  },
];

/* ---------- credentials page (three columns) ---------- */
const CREDENTIALS = [
  {
    heading: "degrees",
    items: [
      {
        name: "Computer Science / Software Foundations",
        issuer: "Technical education",
        year: "Update year",
        image: "./images/school-1.png",
      },
      {
        name: "UX/UI & Product Design Practice",
        issuer: "Portfolio casework",
        year: "Ongoing",
        image: "./images/school-2.png",
      },
    ],
  },
  {
    heading: "certifications",
    items: [
      {
        name: "Accessibility & Responsive UI",
        issuer: "Self-directed practice",
        year: "Ongoing",
        image: "./images/school-3.png",
      },
      {
        name: "Design Systems Fundamentals",
        issuer: "Self-directed practice",
        year: "Ongoing",
        image: "./images/school-4.png",
      },
    ],
  },
  {
    heading: "certificates",
    items: [
      {
        name: "Frontend Prototyping",
        issuer: "Project-based learning",
        year: "Ongoing",
        image: "./images/school-5.png",
      },
      {
        name: "Product Thinking",
        issuer: "Case-study practice",
        year: "Ongoing",
        image: "./images/school-6.png",
      },
    ],
  },
];

/* ---------- projects page ---------- */
const PROJECTS = [
  {
    name: "Deep Work Protocol",
    status: "shipped",
    logo: "./images/project-1.png",
    screenshot: "./images/project-1-shot.png",
    github: "https://github.com/Dhill1of1/your-repo",
    demo: "https://your-demo-url.com",
    shipped: "Static web prototype",
    stack: ["UX flows", "Visual design", "HTML", "CSS", "JavaScript"],
    story: {
      concept: "A focus tool concept for people who need atmosphere, structure, and momentum while working.",
      build: "Designed a cinematic timer experience with strong mood, clear controls, audio feedback, and responsive behavior.",
      completion:
        "Shipped as a browser-based prototype. Next steps would add onboarding, session analytics, and saved user rituals.",
    },
  },
  {
    name: "Portfolio Operating System",
    status: "in dev",
    logo: "./images/project-2.png",
    screenshot: "./images/project-2-shot.png",
    github: "#",
    demo: "#",
    shipped: "Static portfolio",
    stack: ["Information architecture", "Motion", "Design system", "Vanilla JS"],
    story: {
      concept: "A personal portfolio that feels memorable while still helping recruiters scan role fit and work quality.",
      build: "Built a modular content system, boot sequence, page transitions, accessible navigation, and reusable case-study sections.",
      completion: "The site now positions the work for UX/UI and product design roles, with clear next steps for real project screenshots.",
    },
  },
];
