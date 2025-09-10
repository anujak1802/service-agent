# 🛠️ Backend - ServiceAgent Complaint Management API

This is the backend service for the **ServiceAgent** application.  
It provides RESTful APIs to manage complaints using **Node.js, Express, and PostgreSQL**.

---

## 🚀 Features

- Submit a new complaint
- Fetch all complaints
- Toggle complaint status (**Pending ↔ Resolved**)
- Delete a complaint (optional)
- Persists data in PostgreSQL (local DB or Supabase)

---

## 📂 Project Structure
```
backend/
├── config/
│ ├── db.js # PostgreSQL connection pool
│ └── initDb.js # Initialize DB schema & ENUM type
├── controllers/
│ └── complaintControllers.js
├── models/
│ └── complaintModel.js
├── routes/
│ └── complaintRoutes.js
├── server.js # Express app entry point
└── package.json
```

---

## ⚙️ Setup

### 1️⃣ Install dependencies

```
cd backend
npm install
npx nodemon server.js
```
### 2️⃣ Environment variables
Create a .env file in /backend with your DB connection string:


```
PORT=4000
DATABASE_URL=postgres://username:password@localhost:5432/your_db_name
```

⚠️ If your password contains special characters (like @, :, /), you must URL encode them.
Example:

@ → %40

: → %3A



### 3️⃣ Database Schema
This project uses a complaints table with an ENUM for status:

sql

```CREATE TYPE complaint_status AS ENUM ('Pending', 'Resolved');```

```
CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  complaint text NOT NULL,
  status complaint_status NOT NULL DEFAULT 'Pending',
  created_at timestamp with time zone DEFAULT now()
);
```
✅ initDb.js automatically runs this when the server starts.

### 4️⃣ Run the server
For development (with auto-restart via nodemon):


```npm run dev```


Server runs at 👉 http://localhost:4000

📌 API Endpoints
1. POST /complaints
Submit a new complaint.

Request body:


```
{
  "name": "John Doe",
  "email": "john@example.com",
  "complaint": "My internet is not working."
}
```
Response:

```
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "complaint": "My internet is not working.",
  "status": "Pending",
  "created_at": "2025-09-10T12:34:56Z"
}
```
2. GET /complaints
Fetch all complaints.

Response:

```
[
  {
    "id": "uuid",
    "name": "Alice",
    "email": "alice@example.com",
    "complaint": "Billing issue.",
    "status": "Resolved",
    "created_at": "2025-09-10T12:34:56Z"
  }
]
```
3. PATCH /complaints/:id
Toggle a complaint’s status (Pending ↔ Resolved).

Request body:

```
{ "status": "Pending" }
```
Response:

```
{
  "id": "uuid",
  "name": "Alice",
  "email": "alice@example.com",
  "complaint": "Billing issue.",
  "status": "Resolved",
  "created_at": "2025-09-10T12:34:56Z"
}
```
4. DELETE /complaints/:id (optional)
Delete a complaint.


### 🛠️ Tech Stack

Express.js - Web framework

pg - PostgreSQL client

nodemon - Development auto-restart

dotenv - Environment config

PostgreSQL / Supabase - Database