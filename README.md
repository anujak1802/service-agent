# 🛠️ ServiceAgent - Complaint Management System

A full-stack application for submitting and managing complaints.  
Built with **React (frontend)**, **Node.js + Express (backend)**, and **PostgreSQL (via Supabase or local DB)**.

---

## 📂 Project Structure
```
ServiceAgent/
├── frontend/ # React (Tailwind CSS) app
│ └── README.md
├── backend/ # Node.js + Express + PostgreSQL API
│ └── README.md
└── README.md # This file
```


---
## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/anujak1802/service-agent.git
```
```
cd service-agent
```
### 1️⃣ Backend Setup
See Backend README for API setup, database schema, and environment configuration.

```
cd backend
npm install
npx nodemon server.js
```
By default, backend runs at:
👉 http://localhost:4000

### 2️⃣ Frontend Setup
See Frontend README for setup instructions and available scripts.

```
cd frontend
npm install
npm run dev
```
By default, frontend runs at:
👉 http://localhost:5173

## 📌 Features
### 👤 User

Submit complaint with Name, Email, Complaint message.

Client-side form validation.

### 👨‍💻 Admin
1. View all complaints.

2. Toggle complaint status (Pending ↔ Resolved).

3. Delete complaint (optional).

4. Filter by status (optional).

## 🛠️ Tech Stack
Frontend: React, TailwindCSS, TypeScript

Backend: Node.js, Express

Database: PostgreSQL (local or Supabase)

Tools: Nodemon, pg (PostgreSQL client)

## 🗂️ Documentation
[Frontend README](./frontend/README.md)

[Backend README](./backend/README.md)
