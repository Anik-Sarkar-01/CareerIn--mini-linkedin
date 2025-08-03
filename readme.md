# 🚀 CareerIn - (LinkedIn-like Community Platform)

CareerIn is a LinkedIn-inspired community platform built as part of the Full Stack Development Internship Task at **CIAAN Cyber Tech Pvt Ltd**. This project allows users to register/log in via Firebase Authentication, create posts, and interact through a public post feed and profile pages.

---

## 🔗 Live Demo
👉 [Live Demo URL](https://careerin.vercel.app/)

## 🔗 GitHub Repository
👉 [GitHub Repository Link](https://github.com/Anik-Sarkar-01/CareerIn--mini-linkedin)

---

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Styling**: Tailwind CSS & DaisyUI
- **Authentication**: Firebase Authentication (Email & Password)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Notifications**: react-hot-toast
- **Deployment**:
  - Frontend: Vercel
  - Backend API: Vercel

---

## 🧑‍💻 Demo User Credentials
| Role      | Email                | Password |
|-----------|----------------------|----------|
| Demo User | demo@gmail.com       | 123456   |

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
- git clone https://github.com/Anik-Sarkar-01/CareerIn--mini-linkedin.git
- cd CareerIn--mini-linkedin
```

### 2. Install Dependencies

### For Frontend (client)
cd careerIn-client
npm install

### For Backend (server)
cd careerIn-server
npm install

### 3. Setup Environment Variables

### Backend (server)
### Create a .env file inside the /careerIn-server directory and add:
DB_USER=YOUR_MONGODB_DATABASE_USERNAME
DB_PASSWORD=YOUR_MONGODB_PASSWORD

### 4. Running the Application

### Start Backend Server
cd careerIn-server
npm run dev

### Start Frontend Application
cd careerIn-client
npm run dev

---

## ✨ Features

### 1. User Authentication
- Registration and Login with Email & Password via Firebase Authentication.
- User Profile with Name, Email, and Bio information.

### 2. Public Post Feed
- Users can create and publish text-only posts.
- A public home feed displays all posts with the author's name and timestamp.

### 3. Profile Page
- View user profiles with their personal information.
- Displays all posts created by the user.

---