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
[**View Demo Here**](https://your-demo-link.com) <!-- Will added later-->

---

## 🖼️ Screenshots
| Dashboard | Inventory Management |
|-----------|--------------------|
| ![Dashboard](./assets/dashboard.png) | ![Inventory](./assets/inventory.png) |



---

## ✨ Features

### 📊 Dashboard Analytics
- Real-time Statistics: Total items, in-stock, out-of-stock, low stock
- Visual Metrics: Cards with icons and color-coded status
- System Monitoring: API and database connection status

### 📦 Inventory Management
- CRUD Operations: Create, read, update, delete items
- Advanced Filtering: Search by name, filter by status and quantity
- Status Tracking: In-stock, out-of-stock, maintenance
- Quantity Management: Low stock alerts and inventory tracking

### 🎨 Modern UI/UX
- Responsive Design: Desktop, tablet, and mobile friendly
- Professional Styling: Tailwind CSS with gradients and animations
- Interactive Elements: Hover effects, smooth transitions
- TypeScript: Full type safety across frontend and backend

---

## 🛠 Technology Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- React Router
- Vite

### Backend
- Node.js + Express
- TypeScript
- MongoDB Atlas
- Mongoose ODM
- Express Validator

### DevOps & Tools
- Environment Configuration with dotenv
- CORS enabled
- Security with Helmet and rate limiting

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
        +Middleware
    }

    class Database {
        +Collections
        +Indexes
        +Schema Validation
    }

    Frontend --> Backend : API Calls
    Backend --> Database : Read/Write
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

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string

# Frontend setup
cd ../frontend
npm install
Running the Application
bash
Copy code
# Start Backend
cd backend
npm run dev
# http://localhost:5000

# Start Frontend
cd frontend
npm run dev
# http://localhost:3000
Adding Sample Data
bash
Copy code
cd backend
node addSampleData.js
📊 API Endpoints
Inventory Management

GET /api/inventory - Get all items (optional filtering)

POST /api/inventory - Create a new item

PUT /api/inventory/:id - Update an item

DELETE /api/inventory/:id - Delete an item

System Health

GET /api/health - Check API and database status

GET /api/test - Basic test endpoint

🤝 Contributing
Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit changes: git commit -m 'Add amazing feature'

Push branch: git push origin feature/amazing-feature

Open a Pull Request

📝 License
MIT License - see LICENSE file.

👨‍💻 Author
Thebe Ledwaba
GitHub: @ThebeLedwaba
Project: Smart Inventory System

🙏 Acknowledgments
React team

Tailwind CSS

MongoDB

Vite

⭐ Star this repository if you found it helpful!
