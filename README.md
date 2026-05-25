<div align="center">

<br/>

<img src="frontend/public/veda-avatar.jpg" alt="VedaAI" width="80" height="80" style="border-radius: 50%;" />

<h1>VedaAI</h1>

**AI-powered exam paper generator for schools.**  
Upload a syllabus, configure your requirements, and get a structured, print-ready question paper in seconds.

<br/>

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

<br/>

</div>

---

## What it does

Teachers at **Delhi Public School, Bokaro Steel City** use VedaAI to eliminate the time-consuming work of writing exams from scratch. They describe what they need — subject, grade, topic, question types, difficulty split — and VedaAI generates a complete, formatted question paper with an answer key, ready to print or download as PDF.

The entire pipeline is asynchronous. Question papers are generated in the background via a job queue, with real-time progress updates pushed to the browser over WebSockets.

---

## Features

- **Multi-type question support** — MCQ, Short Answer, Long Answer, True/False, Fill in the Blank
- **Difficulty distribution** — specify the exact % split of Easy / Medium / Hard questions
- **Syllabus upload** — attach a PDF and the AI incorporates it into generation
- **Real-time progress** — Socket.io events stream generation status live to the UI
- **Answer key included** — every generated paper ships with a full answer key
- **PDF export** — download a print-ready PDF via Puppeteer rendering
- **Regenerate** — re-run generation on any existing assignment with one click
- **Responsive UI** — full mobile layout with bottom navigation, desktop sidebar

---

## Tech Stack

### Frontend
| | |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Real-time | Socket.io client |
| Font | Bricolage Grotesque |

### Backend
| | |
|---|---|
| Runtime | Node.js + Express |
| Language | TypeScript (tsx watch in dev) |
| Database | MongoDB via Mongoose |
| Queue | BullMQ + Redis |
| AI | Groq SDK — `llama-3.3-70b-versatile` |
| Real-time | Socket.io server |
| File upload | Multer + pdf-parse |
| PDF export | Puppeteer |
| Validation | Zod |

---

## Project Structure

```
ved-ai/
├── frontend/                  # Next.js app
│   └── src/
│       ├── app/               # Route pages (App Router)
│       │   ├── home/          # Dashboard
│       │   ├── assignments/   # List, create, detail views
│       │   ├── groups/        # My Groups
│       │   ├── library/       # My Library
│       │   ├── toolkit/       # AI Teacher's Toolkit
│       │   └── settings/
│       ├── components/
│       │   ├── layout/        # AppShell, Sidebar, Topbar
│       │   ├── create/        # StepOne, StepTwo, file upload
│       │   ├── output/        # ExamPaper, AIMessageBanner, GeneratingLoader
│       │   ├── assignments/   # AssignmentCard, AssignmentGrid, EmptyState
│       │   └── ui/            # Button, Input, Badge, Stepper
│       ├── store/             # Zustand stores
│       ├── hooks/             # useSocket, useAssignment
│       ├── lib/               # API client
│       └── types/
│
└── backend/                   # Express API
    └── src/
        ├── controllers/       # assignmentController
        ├── models/            # Assignment, QuestionPaper (Mongoose)
        ├── routes/            # /api/assignments
        ├── services/          # aiService (Groq), pdfService, aiSanitizer
        ├── workers/           # generationWorker (BullMQ)
        ├── queues/            # assignmentQueue
        ├── socket/            # socketManager
        ├── middleware/        # errorHandler, uploadHandler
        └── config/            # db, redis
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Redis instance (local or Upstash)
- Groq API key — [get one free at console.groq.com](https://console.groq.com)

### 1. Clone

```bash
git clone https://github.com/your-username/ved-ai.git
cd ved-ai
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# fill in .env values (see below)
npm install
npm run dev        # starts on :5000
```

**`backend/.env`**
```env
MONGODB_URI=mongodb://localhost:27017/vedaai
REDIS_URL=redis://localhost:6379
GROQ_API_KEY=gsk_...
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend

```bash
cd frontend
cp .env.local.example .env.local   # or create manually
npm install
npm run dev        # starts on :3000
```

**`frontend/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Open [http://localhost:3000](http://localhost:3000).

---

## API Reference

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/assignments` | List all assignments |
| `POST` | `/assignments` | Create assignment + enqueue generation job |
| `GET` | `/assignments/:id` | Get single assignment |
| `GET` | `/assignments/:id/paper` | Get generated question paper |
| `POST` | `/assignments/:id/regenerate` | Re-run generation |
| `DELETE` | `/assignments/:id` | Delete assignment |
| `GET` | `/assignments/:id/pdf` | Download as PDF |
| `GET` | `/health` | Health check |

### Create Assignment — Request Body

```json
{
  "title": "Mid-term Science Quiz",
  "subject": "Science",
  "grade": "Grade 8",
  "topic": "Force and Pressure",
  "dueDate": "2026-06-15",
  "questionTypes": [
    { "type": "mcq", "count": 10, "marksPerQuestion": 1 },
    { "type": "short_answer", "count": 5, "marksPerQuestion": 2 }
  ],
  "difficultyDistribution": { "easy": 30, "medium": 50, "hard": 20 },
  "additionalInstructions": "Focus on NCERT Chapter 11"
}
```

Valid question types: `mcq` · `short_answer` · `long_answer` · `true_false` · `fill_in_blank`

### Real-time Events (Socket.io)

After creating an assignment, join the room with `assignmentId` and listen for:

| Event | Payload |
|---|---|
| `generation:started` | `{ assignmentId }` |
| `generation:progress` | `{ assignmentId, percent, message }` |
| `generation:complete` | `{ assignmentId }` |
| `generation:failed` | `{ assignmentId, error }` |

---

## Generation Pipeline

```
POST /api/assignments
        │
        ▼
  Save to MongoDB (status: pending)
        │
        ▼
  Enqueue BullMQ job
        │
        ▼
  generationWorker picks up job
        │
        ├── emit generation:started
        ├── emit generation:progress (10%)
        │
        ▼
  Call Groq API (llama-3.3-70b-versatile)
  → Parse + validate with Zod
        │
        ├── emit generation:progress (80%)
        │
        ▼
  Save QuestionPaper to MongoDB
  Cache in Redis
        │
        ├── Update Assignment status: completed
        └── emit generation:complete
```

---

## Deployment

### Frontend → Vercel

```bash
cd frontend
vercel --prod
```

Set environment variable `NEXT_PUBLIC_API_URL` to your backend URL in the Vercel dashboard.

### Backend → Railway

A `nixpacks.toml` is included. Connect the repo in Railway, set environment variables, and deploy. Railway auto-detects the build (`npm run build`) and start (`npm start`) commands.

---

## Roadmap

- [ ] Teacher authentication & multi-user support
- [ ] AI Teacher's Toolkit (lesson plan generator, rubric builder)
- [ ] My Library — save and reuse question banks
- [ ] My Groups — class management
- [ ] Bloom's Taxonomy tagging per question
- [ ] Direct student submission & AI-assisted grading

---

<div align="center">

Built for teachers, by builders who care about education.

**VedaAI** · Delhi Public School, Bokaro Steel City

</div>
