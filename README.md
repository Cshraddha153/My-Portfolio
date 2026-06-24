# My Portfolio

A full-stack, responsive single-employee portfolio website. It introduces one employee with a single profile photo, then presents a curated compilation of academic and professional materials that exemplify their **beliefs, skills, qualifications, education, training, and experiences**.


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

- Frontend: http://localhost:5173
- API: http://localhost:5000

The Vite dev server proxies `/api/*` requests to the Express server, so no extra configuration is needed.

### 3. Production build

```powershell
npm run build       # builds the frontend into client/dist
npm start           # serves the API (set PORT to change the port)
```

## API endpoints

| Method | Endpoint         | Description                                  |
| ------ | ---------------- | -------------------------------------------- |
| GET    | `/api/profile`   | Returns the my profile            |
| GET    | `/api/portfolio` | Returns the portfolio materials list         |
| POST   | `/api/contact`   | Validates and stores a contact submission    |

