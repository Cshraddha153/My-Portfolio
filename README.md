# Motorola Solutions — Employee Portfolio

A full-stack, responsive single-employee portfolio website. It introduces one employee with a single profile photo, then presents a curated compilation of academic and professional materials that exemplify their **beliefs, skills, qualifications, education, training, and experiences**.

> **Disclaimer:** This is a personal/demo portfolio template themed after Motorola Solutions branding. It is **not** an official Motorola Solutions, Inc. product and is not affiliated with or endorsed by the company.

## Tech stack

| Layer    | Technology                                   |
| -------- | -------------------------------------------- |
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS  |
| Backend  | Node.js + Express                            |
| Storage  | JSON files (no external database required)   |

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
│   │   └── profile.json    # Editable employee content (single source of truth)
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
| GET    | `/api/profile`   | Returns the full employee profile            |
| GET    | `/api/portfolio` | Returns the portfolio materials list         |
| POST   | `/api/contact`   | Validates and stores a contact submission    |

## Customizing the content

All employee content lives in **`server/data/profile.json`** — edit this single file to update the name, title, beliefs, skills, education, experience, and portfolio items. No code changes required.

### Replacing the profile photo

Only **one** photo is used. Replace `client/public/profile.svg` with your image (e.g. `profile.jpg`) and update `photoUrl` in `server/data/profile.json` to match (for example `"/profile.jpg"`).

## Environment variables

See `client/.env.example` and `server/.env.example`. Copy them to `.env` if you need to override defaults (ports, API base URL).
