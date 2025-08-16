📊 Expense Tracker (Full Stack)

🚀 A full-stack expense tracker web application built with React (Vite) + Tailwind CSS for the frontend, Express.js + Firebase Firestore for the backend, and Firebase Authentication for secure user login.

Easily manage your income and expenses, categorize transactions, and view insights with beautiful charts.

✨ Features

🔐 Authentication – Secure login & registration with Firebase Auth (Email/Password)

💰 Transaction Management – Add, edit, delete, and categorize expenses/income

📊 Dashboard & Insights – View totals, balances, category breakdowns, and monthly charts

🎨 Responsive UI – Modern Tailwind CSS design with reusable components

🚀 Deployment Ready – Backend (Render/Heroku), Frontend (Netlify/Vercel), Database (Firebase Firestore)

🛠️ Tech Stack

Frontend: React (Vite), Tailwind CSS, Recharts
Backend: Express.js, Firebase Admin SDK, Joi, Morgan, CORS
Database & Auth: Firebase Firestore, Firebase Authentication



⚡ Installation & Setup
1. Clone repository
git clone https://github.com/MohaideenNiyas/expense_tracker.git
cd expense-tracker

2. Backend setup
cd backend
cp .env.example .env   # Fill in Firebase service account details
npm install
npm run dev


➡️ Backend runs at: http://localhost:5000

3. Frontend setup
cd ../frontend
cp .env.example .env   # Fill in Firebase client config + API URL
npm install
npm run dev


➡️ Frontend runs at: http://localhost:5173

🔑 Environment Variables
Backend (backend/.env)
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="service-account@your-project-id.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n....\n-----END PRIVATE KEY-----\n"

Frontend (frontend/.env)
VITE_API_URL="http://localhost:5000/api"
VITE_FIREBASE_API_KEY="your_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_APP_ID="your-app-id"

🖼️ Screenshots
🔐 Login / Register
<img width="1919" height="932" alt="Screenshot 2025-08-16 201724" src="https://github.com/user-attachments/assets/77d69b99-46a4-4055-914a-fd8eb9483b43" />
<img width="1919" height="936" alt="Screenshot 2025-08-16 201714" src="https://github.com/user-attachments/assets/cbfa6ec7-12eb-4bd2-8e2c-29a3c369385e" />


📊 Dashboard
<img width="1919" height="928" alt="Screenshot 2025-08-16 201636" src="https://github.com/user-attachments/assets/c340fcbf-e065-462a-9432-83089e6bf268" />
<img width="1917" height="930" alt="Screenshot 2025-08-16 201644" src="https://github.com/user-attachments/assets/3785e106-c351-4a2a-8cb5-a158ce90140a" />
<img width="1919" height="924" alt="Screenshot 2025-08-16 201651" src="https://github.com/user-attachments/assets/41314455-3eea-4401-9b48-f74f528541bf" />

💰 Transactions
<img width="1919" height="930" alt="Screenshot 2025-08-16 201700" src="https://github.com/user-attachments/assets/50587549-71e1-4e1b-ace9-a394c42f2363" />

🚀 Deployment

Frontend → Netlify / Vercel

Backend → Render / Fly.io

Database & Auth → Firebase Firestore + Firebase Authentication

📌 Future Enhancements

🔑 Google / GitHub OAuth with Firebase Auth

📑 Export transactions as CSV/PDF

🎯 Budget goals and spending alerts

📱 React Native mobile app
