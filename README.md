
# 🚀 Smart Inventory System

A modern, full-stack inventory management solution built with React, Node.js, and MongoDB Atlas. Features real-time tracking, advanced filtering, and a beautiful responsive dashboard.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Full%20Support-blue.svg)

## 🌐 Live Demo
**View Demo Here** *(Add your live demo link here)*

## 🖼️ Screenshots
| Dashboard | Inventory Management |
|-----------|---------------------|
| ![Dashboard](https://via.placeholder.com/400x250?text=Dashboard+Preview) | ![Inventory](https://via.placeholder.com/400x250?text=Inventory+Preview) |

## ✨ Features

### 📊 Dashboard Analytics
- **Real-time Statistics**: Total items, in-stock, out-of-stock, low stock
- **Visual Metrics**: Cards with icons and color-coded status
- **System Monitoring**: API and database connection status

### 📦 Inventory Management
- **CRUD Operations**: Create, read, update, delete items
- **Advanced Filtering**: Search by name, filter by status and quantity
- **Status Tracking**: In-stock, out-of-stock, maintenance
- **Quantity Management**: Low stock alerts and inventory tracking

### 🎨 Modern UI/UX
- **Responsive Design**: Desktop, tablet, and mobile friendly
- **Professional Styling**: Tailwind CSS with gradients and animations
- **Interactive Elements**: Hover effects, smooth transitions
- **TypeScript**: Full type safety across frontend and backend

## 🛠 Technology Stack

### Frontend
- **React 18** + TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Vite** for build tooling

### Backend
- **Node.js** + Express
- **TypeScript** for type safety
- **MongoDB Atlas** for cloud database
- **Mongoose ODM** for data modeling
- **Express Validator** for input validation

### DevOps & Tools
- Environment Configuration with **dotenv**
- **CORS** enabled for cross-origin requests
- Security with **Helmet** and rate limiting

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
text
SmartInventory/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # Global styles
│   │   ├── types/         # TypeScript definitions
│   │   ├── utils/         # Utility functions
│   │   └── main.tsx       # Application entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   ├── server.js         # Server entry point
│   ├── package.json
│   └── addSampleData.js  # Sample data script
│
└── README.md
🚀 Quick Start
Prerequisites
Node.js 16 or higher

MongoDB Atlas account (free tier available)

npm or yarn package manager

Installation
Clone the repository

bash
git clone https://github.com/ThebeLedwaba/SmartInventory.git
cd SmartInventory
Backend Setup

bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string
Frontend Setup

bash
cd ../frontend
npm install
Running the Application
Start Backend Server

bash
cd backend
npm run dev
# Server runs on http://localhost:5000
Start Frontend Development Server

bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
Adding Sample Data
bash
cd backend
node addSampleData.js
📊 API Endpoints
Inventory Management
GET /api/inventory - Get all items (supports filtering)

POST /api/inventory - Create a new item

PUT /api/inventory/:id - Update an item

DELETE /api/inventory/:id - Delete an item

System Health
GET /api/health - Check API and database status

GET /api/test - Basic test endpoint

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit your changes: git commit -m 'Add amazing feature'

Push to the branch: git push origin feature/amazing-feature

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

MongoDB for the robust database solution

Vite for the fast build tooling

⭐ If you found this project helpful, please consider giving it a star!
