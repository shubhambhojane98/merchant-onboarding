# Merchant Onboarding App

A full-stack Merchant Onboarding application built with **Next.js (frontend)** and **FastAPI (backend)**. This project allows merchants to register, submit details, and store data using a backend API.

---

## 📌 Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS / shadcn UI

### Backend

- FastAPI
- Python
- Supabase (Database)
- Pydantic (Validation)

---

## 🚀 Getting Started (Run Locally)

Follow these steps to run the project locally.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/merchant-onboarding.git
cd merchant-onboarding
```

---

## 2️⃣ Setup Backend (FastAPI)

### Navigate to backend folder

```bash
cd backend
```

### Create Virtual Environment

```bash
python3 -m venv venv
```

### Activate Virtual Environment

#### macOS / Linux

```bash
source venv/bin/activate
```

#### Windows

```bash
venv\Scripts\activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

If you face errors, install manually:

```bash
pip install fastapi uvicorn supabase pydantic[email]
```

---

### Setup Environment Variables

Create a `.env` file in the backend folder:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Create a `merchants` table in Supabase SQL editor:

```sql
create table merchants (
  id uuid primary key default uuid_generate_v4(),
  business_name text not null,
  business_type text not null,
  mcc_code text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  created_at timestamp default now()
);
```

---

### Run Backend Server

```bash
uvicorn app.main:app --reload
```

Backend will run on:

```
http://127.0.0.1:8000
```

---

## 3️⃣ Setup Frontend (Next.js)

### Navigate to frontend folder

```bash
cd ../frontend
```

---

### Install Dependencies

```bash
npm install
```

---

### Run Frontend

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:3000
```

---

## 🔗 API Integration

The frontend communicates with FastAPI using:

```
NEXT_PUBLIC_API_URL
```

Make sure the backend is running before submitting forms.

---

## ✅ Features

- Merchant registration form
- Phone number validation with country code
- Backend validation using Pydantic
- Data storage in Supabase
- Error handling and form validation
- Clean modular structure

---

## ⚠️ Common Issues

### 1. Virtual Environment Not Working

Make sure it is activated before installing packages.

### 2. Missing Dependencies

Run:

```bash
pip install fastapi uvicorn pydantic[email]
```

### 3. CORS Issues

Ensure FastAPI CORS middleware is configured.

---

## 📁 Project Structure

```
merchant-onboarding/
│
├── backend/
│ ├── app/
│ └── requirements.txt
│
├── frontend/
│ ├── app/
│ ├── components/
│ ├── hooks/
│ ├── lib/
│ ├── types/
│ │   ├── merchant.ts
│ │   └── onboarding.ts
│ └── package.json
│
└── README.md
```

---

## 👨‍💻 Author

**Shubham Bhojane**
