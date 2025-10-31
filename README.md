# 🧠 SmartInventory

![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Active--Development-orange)

---

## 🎯 Objective

The **SmartInventory System** was developed to modernize and automate how tools and resources are tracked in environments like workshops, labs, or storerooms.  

As someone with experience in **electronics, embedded systems, and software engineering**, I built this project to:
- 🧩 Integrate IoT concepts (using ESP32 + QR/barcode scanning)
- 🗃️ Maintain real-time inventory visibility
- 📈 Improve accountability and tool management efficiency
- 🌐 Showcase full-stack development and cloud database integration skills

This project demonstrates **practical system design**, **security-focused backend development**, and **responsive frontend dashboards** — all key aspects of a modern, data-driven inventory system.

---

## 🧾 Overview

| Metric | Details |
|--------|----------|
| **Lines of Code** | 381 total (287 LOC) |
| **Size** | 9.88 KB |
| **Status** | 🚧 Active Development |
| **Author** | Thebe Ledwaba |
| **License** | MIT License |

---

## 📑 Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [API Endpoints](#api-endpoints)
- [Security Features](#security-features)
- [Development Setup](#development-setup)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Support & Documentation](#support--documentation)
- [License](#license)
- [Roadmap](#roadmap)

---

## ⚙️ Features

- **CORS** enabled for cross-origin API communication  
- **Security Layer** with Helmet.js and Rate Limiting  
- **Frontend** built using React + TypeScript  
- **Backend** with Node.js and Express  
- **Database**: MongoDB Atlas (Cloud-hosted, auto-scaled)  
- **Real-time Analytics** for usage trends and performance  
- **Developer Tools**: Nodemon, ESLint, Prettier, Concurrently  

---

## 🏗️ System Architecture

### High-Level Flow
```text
┌─────────────────┐   HTTP API   ┌──────────────────┐   MongoDB   ┌─────────────────┐
│   Frontend      │────────────▶│     Backend       │────────────▶│   Database       │
│   React + TS    │◀────────────│ Node.js + Express │◀────────────│ MongoDB Atlas    │
└─────────────────┘              └──────────────────┘              └─────────────────┘
         │                             │                             │
         ▼                             ▼                             ▼
   Dashboard UI               Validation & Logic              Cloud Storage
   Inventory Mgmt             Middleware & APIs                Automated Backups
🧩 Detailed Component Layers
Frontend Layer (React + TypeScript)


┌──────────────────────────────────────────────────────────────────────────┐
│ Dashboard │ Inventory │ Analytics │ Authentication │ Settings │
├───────────┼───────────┼───────────┼────────────────┼──────────┤
│ • Real-time stats     │ • Add/Edit items │ • Sales trends       │ • Login/Register │
│ • Stock tracking      │ • Bulk operations │ • System metrics     │ • Role-based access │
└──────────────────────────────────────────────────────────────────────────┘
Backend Layer (Node.js + Express)


┌──────────────────────────────────────────────────────────────────────────┐
│ Security │ API Routes │ Business Logic │ Health Monitoring │
├──────────┼────────────┼────────────────┼───────────────────┤
│ • Helmet.js │ • CRUD routes │ • Analytics calc │ • DB health │
│ • CORS config │ • Error handling │ • Data process │ • Performance logs │
└──────────────────────────────────────────────────────────────────────────┘
Database Layer (MongoDB Atlas)


┌──────────────────────────────────────────────────────────────────────────┐
│ Collections │ Performance │ Scaling │ Security │
├─────────────┼─────────────┼─────────┼──────────┤
│ • Inventory │ • Indexing  │ • Global │ • Encryption │
│ • Users     │ • Aggregation │ • Backup │ • Access control │
└──────────────────────────────────────────────────────────────────────────┘
🧰 Technology Stack
Frontend
Framework: React 18+ with TypeScript

Build Tool: Vite / CRA

State Management: React Context API + Hooks

UI Components: Custom CSS & Reusable Components

HTTP Client: Axios

Linting & Formatting: ESLint, Prettier

Backend
Runtime: Node.js 16+

Framework: Express.js

Security: Helmet, CORS, Rate Limiting, Input Sanitization

Authentication: JWT Tokens

Database ODM: Mongoose

Database
Platform: MongoDB Atlas

Features: Auto-scaling, Global Access, Real-time Aggregation, Automated Backups

🧾 API Endpoints
Inventory Management
http

GET    /api/inventory           # Get all inventory items
POST   /api/inventory           # Add new item
GET    /api/inventory/:id       # Get specific item
PUT    /api/inventory/:id       # Update item details
DELETE /api/inventory/:id       # Delete item
PATCH  /api/inventory/:id/stock # Update stock levels
Analytics
http

GET /api/analytics/overview   # System overview
GET /api/analytics/trends     # Inventory trends
GET /api/analytics/reports    # Generate reports
User Management
http

POST /api/auth/login     # Login user
POST /api/auth/register  # Register user
GET  /api/auth/profile   # View profile
PUT  /api/auth/profile   # Update profile
🔒 Security Features


┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Input Valid. │▶│ Sanitization │▶│ Encryption   │
└──────────────┘ └──────────────┘ └──────────────┘
       │                │                │
       ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Rate Limiting│ │ CORS Policy  │ │ Helmet.js    │
└──────────────┘ └──────────────┘ └──────────────┘
Input Validation: Express-validator for all routes

Rate Limiting: Request throttling

CORS Protection: Configurable origins

Helmet Headers: Hardened HTTP security

Environment Variables: Secured with .env file

💻 Development Setup
Prerequisites
Node.js ≥ 16

MongoDB Atlas Account

Git + npm/yarn

Installation
bash

git clone https://github.com/ThebeLedwaba/SmartInventory.git
cd SmartInventory
npm install
cp .env.example .env
# Edit .env with your own variables
Environment Variables
bash

PORT=3001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
ENABLE_ANALYTICS=true
Run Development Mode
bash

npm run dev
🚀 Deployment
Build & Deploy
bash

npm run build
npm start
Recommended Platforms
Frontend: Vercel / Netlify

Backend: Railway / Render / AWS

Database: MongoDB Atlas

🧩 Contributing
Fork the repository

Create a new branch (feature/your-feature)

Commit changes using Conventional Commits

Push and submit a Pull Request

Code standards:

TypeScript strict typing

ESLint & Prettier formatting

Jest for unit tests

💬 Support & Documentation
📚 Documentation: See /docs folder
🐛 Report Bugs: GitHub Issues
💬 Discussion: GitHub Discussions
📧 Contact: thebeledwaba@gmail.com

📊 Monitoring & Analytics
Response times

API throughput

Error tracking

Real-time usage dashboard

🗺️ Roadmap
 Real-time notifications

 Advanced analytics dashboard

 Mobile application

 Third-party API integrations

 Multi-role access control

📜 License
This project is licensed under the MIT License.

✨ Author’s Note
SmartInventory represents my interest in combining software engineering, IoT, and data systems to solve real-world challenges.
Built as both a learning project and a portfolio system, it reflects my journey from embedded systems to full-stack and cloud-based development.
