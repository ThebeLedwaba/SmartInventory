# 🚀 Smart Inventory System

![Inventory Management](https://img.shields.io/badge/status-active-success.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-blue.svg)
![React](https://img.shields.io/badge/react-18.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.0-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-atlas-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A modern, full-stack inventory management solution built with React, Node.js, and MongoDB Atlas. Features real-time tracking, advanced filtering, and a beautiful responsive dashboard.

---

## 🌐 Live Demo

[**View Demo Here**](https://your-demo-link.com) <!-- I will add them in due time  -->

---

## 🖼️ Screenshots <!-- I will add them in due time  -->

| Dashboard                            | Inventory Management                 |
| ------------------------------------ | ------------------------------------ |
| ![Dashboard](./assets/dashboard.png) | ![Inventory](./assets/inventory.png) |

> Replace the placeholders above with your actual screenshots.

---

## ✨ Features

### 📊 Dashboard Analytics

- **Real-time Statistics**: Total items, in-stock, out-of-stock, and low stock counts
- **Visual Metrics**: Beautiful cards with icons and color-coded status
- **System Monitoring**: Live API and database connection status

### 📦 Inventory Management

- **Complete CRUD Operations**: Create, read, update, and delete inventory items
- **Advanced Filtering**: Search by name, filter by status and quantity
- **Status Tracking**: In-stock, out-of-stock, and maintenance statuses
- **Quantity Management**: Low stock alerts and inventory tracking

### 🎨 Modern UI/UX

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Professional Styling**: Tailwind CSS with beautiful gradients and animations
- **Interactive Elements**: Hover effects, smooth transitions, and loading states
- **TypeScript**: Full type safety across frontend and backend

---

## 🛠 Technology Stack

### Frontend

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Vite** for fast development builds

### Backend

- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB Atlas** (Cloud Database)
- **Mongoose** ODM for database operations
- **Express Validator** for input validation

### DevOps & Tools

- **MongoDB Atlas** for cloud database
- **Environment Configuration** with dotenv
- **CORS** enabled for cross-origin requests
- **Security** with Helmet and rate limiting

---

## 🏗 System Architecture

```mermaid
flowchart TD
    A[Frontend React TS] -->|API| B[Backend Node.js Express]
    B -->|CRUD| C[MongoDB Atlas]
    B --> D[Validation & Security]
    B --> E[Business Logic]
    B --> F[API Health Check]
    A --> G[UI Pages]

Description:

Frontend communicates with the backend via RESTful APIs

Backend handles business logic, data validation, and MongoDB operations

MongoDB Atlas stores inventory data

System includes real-time status monitoring and error handling

🖌 System Design
mermaid
Copy code
classDiagram
    class Frontend {
        +React Components
        +Pages
        +State Management
        +API Services
    }

    class Backend {
        +Express Routes
        +Controllers
        +Models (Mongoose)
        +Middleware (Validation, Security)
    }

    class Database {
        +Collections: Items, Users
        +Indexes
        +Schema Validation
    }

    Frontend --> Backend : API Calls
    Backend --> Database : Read/Write
Key Components:

Frontend: React components, pages, and API service calls

Backend: Routes, controllers, models, and middleware for validation/security

Database: MongoDB collections with schemas and indexes

📁 Project Structure
lua
Copy code
SmartInventory/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   └── addSampleData.js
│
└── README.md
🚀 Quick Start
Prerequisites
Node.js 16+

MongoDB Atlas account (free tier)

npm or yarn

Installation
bash
Copy code
# Clone the repository
git clone https://github.com/ThebeLedwaba/SmartInventory.git
cd SmartInventory

# Setup Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string

# Setup Frontend
cd ../frontend
npm install
Running the Application
bash
Copy code
# Start Backend
cd backend
npm run dev
# Server runs on http://localhost:5000

# Start Frontend
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
Adding Sample Data
bash
Copy code
cd backend
node addSampleData.js
📊 API Endpoints
Inventory Management

GET /api/inventory - Get all items (with optional filtering)

POST /api/inventory - Create a new item

PUT /api/inventory/:id - Update an item

DELETE /api/inventory/:id - Delete an item

System Health

GET /api/health - Check API and database status

GET /api/test - Basic API test endpoint

🤝 Contributing
Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit changes: git commit -m 'Add amazing feature'

Push to branch: git push origin feature/amazing-feature

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Thebe Ledwaba
GitHub: @ThebeLedwaba
Project: Smart Inventory System

🙏 Acknowledgments
React team for the amazing framework

Tailwind CSS for the utility-first CSS framework

MongoDB for the robust cloud database service

Vite team for the fast build tool

⭐ Star this repository if you found it helpful!
```
