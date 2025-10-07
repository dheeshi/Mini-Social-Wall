# 🧱 Mini Social Wall

A simple **social wall app** built using **React (TypeScript)** and **Firebase**, where users can log in, create posts, and view other users' posts in real time.

🔗 **Live Demo:** [Mini Social Wall](https://react-typescript-project-4ac66.firebaseapp.com/)  
📦 **Repository:** [GitHub Link](https://github.com/dheeshi/Mini-Social-Wall)

---

## 🚀 Features

- 🔐 User Authentication (Firebase Auth)
- 📝 Create, Edit, and Delete Posts
- 💬 Real-time Feed using Firestore
- 📱 Responsive UI
- ⚡ Fast and lightweight frontend

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Language | TypeScript |
| Frontend | React |
| Styling | Tailwind CSS |
| Backend / Database | Firebase (Firestore, Auth) |
| Hosting | Firebase Hosting |

---

## ⚙️ Setup Instructions

```bash
# 1️⃣ Clone the repository
git clone https://github.com/dheeshi/Mini-Social-Wall.git
cd Mini-Social-Wall

# 2️⃣ Install dependencies
npm install
# or
yarn install

# 3️⃣ Create a Firebase project
# - Go to https://console.firebase.google.com/
# - Enable Authentication and Firestore Database
# - Copy your Firebase config values

# 4️⃣ Create a .env file in the root folder and paste the below (replace with your Firebase config)
# ----------------------------------------------------------
# REACT_APP_FIREBASE_API_KEY=your_api_key
# REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
# REACT_APP_FIREBASE_PROJECT_ID=your_project_id
# REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
# REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
# REACT_APP_FIREBASE_APP_ID=your_app_id
# ----------------------------------------------------------

# 5️⃣ Run the app
npm start

# 🧩 Project Structure
# src/
#  ├── components/     -> Reusable UI components
#  ├── pages/          -> App pages (Feed, Login, etc.)
#  ├── firebase/       -> Firebase config & setup
#  ├── styles/         -> Tailwind styles
#  └── App.tsx         -> Main app file

# 📤 Deployment (Firebase Hosting)
firebase login
firebase init
firebase deploy

# ✅ During init:
# - Select "Hosting"
# - Choose your Firebase project
# - Set 'build' as the public directory
