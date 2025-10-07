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

1. **Clone the repository**
   ```bash
   git clone https://github.com/dheeshi/Mini-Social-Wall.git
   cd Mini-Social-Wall
Install dependencies

bash
Copy code
npm install
# or
yarn install
Add your Firebase config

Create a Firebase project.

Enable Authentication and Firestore.

Create a .env file in the root folder:

env
Copy code
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
Run the app

bash
Copy code
npm start
🧩 Project Structure
bash
Copy code
src/
 ├── components/     # Reusable UI components
 ├── pages/          # App pages (Feed, Login, etc.)
 ├── firebase/       # Firebase config & setup
 ├── styles/         # Tailwind styles
 └── App.tsx
📤 Deployment
To deploy using Firebase:

bash
Copy code
firebase login
firebase init
firebase deploy
