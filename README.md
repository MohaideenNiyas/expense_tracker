# 📊 Expense Tracker (Full Stack)

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://reactjs.org/)  
[![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)  
[![Express](https://img.shields.io/badge/Backend-Express.js-000000?logo=express)](https://expressjs.com/)  
[![Firebase](https://img.shields.io/badge/Database-Firebase-orange?logo=firebase)](https://firebase.google.com/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  

🚀 A **full-stack expense tracker web application** built with **React (Vite) + Tailwind CSS** for the frontend, **Express.js + Firebase Firestore** for the backend, and **Firebase Authentication** for secure login.  

---

## 🌍 Live Demo

- **Frontend (Vercel):** [https://expense-tracker-45.vercel.app](https://expense-tracker-45.vercel.app)  
- **Backend (Render):** [https://expense-tracker-y5n0.onrender.com](https://expense-tracker-y5n0.onrender.com)  

---

## ✨ Features

- 🔐 **Authentication** – Secure login & registration with Firebase Auth  
- 💰 **Transactions** – Add, edit, delete, and categorize income/expenses  
- 📊 **Dashboard Insights** – Monthly trends & category breakdowns with charts  
- 🎨 **Modern UI** – Responsive design with Tailwind CSS  
- ☁️ **Cloud Storage** – Transactions stored securely in Firebase Firestore  
- 🚀 **Deployment Ready** – Frontend on Vercel & Backend on Render  

---

## 🛠️ Tech Stack

**Frontend:** React (Vite), Tailwind CSS, Recharts, Firebase Client SDK  
**Backend:** Express.js, Firebase Admin SDK, Joi, CORS, Morgan  
**Database & Auth:** Firebase Firestore, Firebase Authentication  

---

## 📂 Project Structure

```
expense-tracker/
├─ backend/                          # Express.js + Firebase Admin
│  ├─ src/
│  │  ├─ routes/                     # API routes
│  │  ├─ controllers/                # Controller logic
│  │  ├─ services/                   # Firebase setup
│  │  ├─ middleware/                 # Auth & error handling
│  │  └─ validators/                 # Joi schemas
│  ├─ package.json
│  └─ .env                           # Backend secrets
│
└─ frontend/                         # React + Vite + Tailwind
   ├─ src/
   │  ├─ api/                        # Axios client
   │  ├─ auth/                       # Firebase client setup
   │  ├─ components/                 # Reusable UI components
   │  ├─ pages/                      # Dashboard, Transactions, Login, Register
   │  └─ utils/                      # Helper functions (formatting, etc.)
   ├─ package.json
   └─ .env                           # Frontend env (API + Firebase config)
```

---

## ⚡ Installation & Setup (Local Development)

### 1. Clone repository
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

### 2. Backend setup
```bash
cd backend
cp .env.example .env   # fill in Firebase service account details
npm install
npm run dev
```
➡️ Runs at: `http://localhost:5000`

### 3. Frontend setup
```bash
cd ../frontend
cp .env.example .env   # fill in Firebase client config + API URL
npm install
npm run dev
```
➡️ Runs at: `http://localhost:5173`

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```ini
PORT=5000
CLIENT_ORIGIN=https://expense-tracker-45.vercel.app

FIREBASE_PROJECT_ID=expense-tracker-634e4
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@expense-tracker-634e4.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n....\n-----END PRIVATE KEY-----\n
```

### Frontend (`frontend/.env`)
```ini
VITE_API_URL=https://expense-tracker-y5n0.onrender.com
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=expense-tracker-634e4.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=expense-tracker-634e4
VITE_FIREBASE_APP_ID=1:292368059259:web:da98b4c0caa0e5202d4bde
VITE_FIREBASE_MESSAGING_SENDER_ID=292368059259
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_FIREBASE_STORAGE_BUCKET=your-bucket-name
```

---

## 🚀 Deployment

- **Frontend** → [Vercel](https://vercel.com/)  
- **Backend** → [Render](https://render.com/)  
- **Database & Auth** → [Firebase Firestore](https://firebase.google.com/products/firestore) + [Firebase Authentication](https://firebase.google.com/products/auth)  

---

## 📌 Future Enhancements
- 🔑 Google / GitHub OAuth login  
- 📑 Export transactions as CSV/PDF  
- 🎯 Budget goals and alerts  
- 📱 Mobile app version (React Native)  

---

## 🤝 Contributing
Pull requests are welcome! Open an issue for suggestions and improvements.  

---

## 📄 License
This project is licensed under the **MIT License**.
