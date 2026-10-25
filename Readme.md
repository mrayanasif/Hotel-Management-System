# 🏨 Luxury Stay - Hotel Management System (MERN Stack)

> **Where Luxury Meets Comfort...**  
> A full-stack web application designed to streamline hotel operations, room reservations, guest management, and administrative workflows.

---
## 🎓 Project Info & Credits
- **Course:** HDSE II (Batch: AI-202408B)
- **Institution:** APTECH Computer Education
- **Faculty:** Sir Rehan Kapaya
- **Made By:** Muhammad Rayan Asif
---

## 📝 GitHub Repository Description
```text
A comprehensive MERN-stack Hotel Management System featuring role-based dashboards (Admin, User, Housekeeping), room booking, service requests, maintenance tracking, and automated invoice generation.
```

---

## 📌 Project Overview
**Luxury Stay** is an enterprise-grade Hotel Management System developed using the **MERN** stack (MongoDB, Express.js, React.js, Node.js). It provides a seamless interface for guests to explore rooms, book stays, and request additional services, alongside an interactive administration panel for staff to manage bookings, users, rooms, housekeeping, maintenance, and invoices.

---

## 🚀 Key Features

### 👤 Customer / Guest Experience
- **User Authentication:** Secure registration and login using JWT and encrypted passwords (bcryptjs).
- **Room Search & Booking:** Real-time room availability lookup, selection of check-in/check-out dates, and instant reservation.
- **Add-on Hotel Services:** Request premium services such as Spa & Wellness, Airport Pickup, and Fine Dining.
- **Feedback System:** Submit ratings, recommendations, and reviews post-stay.

### 🛡️ Admin Management Panel
- **Dashboard & Analytics:** Overview of system stats (Total Users, Rooms, Bookings, Active Maintenance, and Total Revenue).
- **User Management:** Full CRUD operations for guest profiles, staff accounts, and role assignments.
- **Room Management:** Add, update, or remove rooms with specific categories (Single, Double, Deluxe, Suite), pricing, and real-time status (Available, Occupied, Cleaning).
- **Booking & Invoice System:** Oversee reservations, check-in/out workflows, and automated invoice generation.
- **Maintenance & Housekeeping:** Assign cleaning tasks and track maintenance issue resolutions.
- **Staff Payroll & Management:** Track employee roles, salaries, status, and joining dates.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend** | React.js, React Router, Tailwind CSS, Axios, Context API, React Toastify |
| **Backend** | Node.js, Express.js, JWT Authentication, bcryptjs, CORS, dotenv |
| **Database** | MongoDB Atlas / MongoDB, Mongoose ODM |
| **Deployment** | Vercel (Frontend & Serverless API Backend) |

---

## 📁 Folder Structure

```text
hotel-management/
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components (Navbar, Sidebar, Forms, Cards)
│   │   ├── pages/             # Main Pages (Home, Rooms, Dashboard, Admin views)
│   │   ├── layouts/           # Page Layouts (MainLayout, DashboardLayout)
│   │   ├── context/           # Auth & State Management Context
│   │   └── App.jsx
│   └── package.json
│
└── backend/                   # Node.js/Express Backend
    ├── config/                # Database connection
    ├── controllers/           # API Business logic
    ├── models/                # Mongoose Database Schemas
    ├── routes/                # Express API Endpoints
    ├── middleware/            # Auth & Role-based middleware
    ├── vercel.json            # Deployment configuration
    ├── server.js              # Server entry point
    └── package.json
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas Account / Local MongoDB Instance

### 1. Clone Repository
```bash
git clone https://github.com/mrayanasif/hotel-management-system.git
cd luxury-stay-hotel-management
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.sqpjfa8.mongodb.net/hotel_db?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

Run the backend server:
```bash
npm run dev
# or
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔒 Security Practices
- **JWT Authentication:** Stateless user session management.
- **Bcrypt Encryption:** Secure hashing of user passwords before database storage.
- **Role-Based Access Control (RBAC):** Middleware checks for `Admin`, `User`, and `Housekeeping` permissions.
- **Environment Safety:** Sensitive credentials isolated inside environment variables (`.env`).

---



---

## 📄 License
This project is for educational and portfolio presentation purposes.