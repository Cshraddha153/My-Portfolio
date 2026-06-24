# My Portfolio

Welcome to my portfolio! I am Shraddha Chauhan, an AI/ML enthusiast and Software Engineer with experience in Generative AI, Agentic AI, Full-Stack Development, and Automation Engineering. This portfolio showcases my projects, research publications, technical skills, and professional experience, including work on LLMs, RAG systems, Vision Transformers, and scalable web applications. Explore my journey, achievements, and the innovative solutions I have built to solve real-world problems.


## Tech stack

| Layer    | Technology                                   |
| -------- | -------------------------------------------- |
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS  |
| Backend  | Node.js + Express                            |
| Storage  | JSON files (no external database)   |

## Project structure

```
.
├── client/                 # React + Vite + TypeScript frontend
│   ├── public/             # Static assets (single profile photo, favicon)
│   └── src/
│       ├── components/     # UI sections (Hero, About, Skills, ...)
│       ├── api.ts          # API client
│       ├── types.ts        # Shared TypeScript types
│       └── App.tsx         # App composition
├── server/                 # Express REST API
│   ├── data/
│   │   └── profile.json    # My content 
│   └── index.js            # API + JSON file storage
└── package.json            # npm workspaces + run scripts
```

## Getting started

### 1. Install dependencies (installs both client and server)

```powershell
npm install
```

### 2. Run in development (starts API + frontend together)

```powershell
npm run dev
```

**Website Link:-** https://my-portfolio-client-five.vercel.app



