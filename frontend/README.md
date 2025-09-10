# 🖥️ Complaint Management System - Frontend

A modern, responsive **React + TypeScript** application for managing customer complaints with an intuitive user interface and admin dashboard.  
Styled with **Tailwind CSS** and connected to the backend API (Node.js + PostgreSQL).

---

## 📂 Project Structure
```
src/
├── components/
│ ├── WelcomePage.tsx # Landing page with feature overview
│ ├── ComplaintForm.tsx # User complaint submission form
│ ├── AdminDashboard.tsx # Admin complaint management interface
│ └── Navigation.tsx # Main navigation component
├── services/
│ └── api.ts # API service functions
├── App.tsx # Main application component with routing
├── main.tsx # Application entry point
└── index.css # Global styles and Tailwind imports
```


---

## ⚙️ Setup

### 1️⃣ Install dependencies

```
npm install
```
2️⃣ Environment configuration
The frontend connects to your backend API.
By default, the base URL is set in src/services/api.ts:


const API_BASE_URL = 'http://localhost:4000'; 

👉 Update this if your backend runs on a different host/port (or if you deploy).

### 3️⃣ Run the app

For development:

```
npm run dev
```
The app will be available at:
👉 http://localhost:5173

## 📌 Features
### 👤 User
1. Submit a complaint via a simple form.
2. Form validation (required fields, valid email).

### 👨‍💻 Admin
1. View all complaints in a dashboard.
2. Toggle complaint status (Pending ↔ Resolved).
3. Delete complaints (optional).
4. Filter complaints by status (optional).

## 🔗 API Integration
The frontend communicates with the backend REST API:

POST /complaints → Submit a complaint

GET /complaints → Get all complaints

PATCH /complaints/:id → Toggle complaint status

DELETE /complaints/:id → Delete a complaint (optional)

API calls are defined in:
src/services/api.ts

## 🛠️ Tech Stack
React 18 (with TypeScript)

React Router (for navigation)

Tailwind CSS (for styling)

Axios or fetch (for API calls)

Vite (for fast dev build system)