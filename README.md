# 🧠 AI Coding Interviewer

A web platform that simulates **real-life coding interviews** with an AI interviewer.  
Users can solve coding challenges in a realistic coding environment, chat with an AI interviewer for hints/feedback, run code against test cases, and track progress over time.

---

## 🚀 Features

- **AI Interview Mode**  
  👨‍💻 Chat with an AI interviewer who adapts to your answers, asks follow-ups, and gives feedback.

- **In-Browser Code Editor**  
  ✍️ Powered by Monaco (same editor as VSCode).  
  Supports Python and JavaScript with syntax highlighting, autocomplete, and more.

- **Language-Aware Starter Templates**  
  📄 Every problem ships with function signatures, docstrings, and IO scaffolding for Python & JavaScript so you can focus on the core algorithm.

- **Custom Test Cases**  
  🧪 Add and manage test cases just like in LeetCode/HackerRank.  
  See pass/fail results in real-time.

- **Interactive Chat Panel**  
  💬 Persistent conversation with AI. The interviewer now sees extended problem briefs, constraints, and your latest validation status—and renders markdown richly inside the chat bubble.

- **Progress Dashboard**  
  📊 The home page summarizes which problems are solved/needs-work based on your last validation run, all stored locally per problem/language.

- **Local Persistence**  
  💾 Everything (code, test cases, chat) autosaves in `localStorage`. Refresh without losing progress.

---

## 📸 Screenshots (WIP)

Here’s how the coding interview environment looks right now:

![AI Coding Interviewer Screenshot](./assets/screenshot.png)

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Editor**: Monaco Editor (`@monaco-editor/react`)
- **Backend**: Node.js + Express  
  - Runs Python/JavaScript code in a sandboxed process
  - Connects to OpenAI API for AI interviewer responses
- **Database**: *(planned, not yet implemented)* PostgreSQL for persistence
- **Auth**: *(planned, not yet implemented)* GitHub login

---

## 📅 Development Roadmap (MVP)

- [x] Core layout with 4 panels (Problem, Code Editor, Output, Chat)
- [x] Code execution backend (Python + JS)
- [x] Custom test cases + run all at once
- [x] AI interviewer chat integration (with context)
- [x] Local persistence with `localStorage`
- [ ] Session history & dashboard
- [ ] AI-generated problems
- [ ] Deployment (Vercel + Railway/Fly.io)

---

## ⚡️ Getting Started

Clone the repo:

```bash
git clone https://github.com/yourusername/ai-coding-interviewer.git
cd ai-coding-interviewer
````

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Start the backend:

```bash
cd backend
npm install
node index.js
```

---

## ✨ Inspiration

This project is a portfolio piece inspired by FAANG-style interviews,
built to practice **full-stack engineering**, **AI integration**, and **developer UX**.
