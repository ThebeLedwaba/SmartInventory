# 🚀 Smart Inventory System

A modern, full-stack inventory management solution built with React, Node.js, and MongoDB Atlas. Features real-time tracking, advanced filtering, and a beautiful responsive dashboard.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Full%20Support-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)

## 🌐 Live Demo

*Live demo coming soon! In the meantime, check out the [screenshots](#-screenshots) below or [run it locally](#-quick-start) to explore all features.*

## 🖼️ Screenshots

### Dashboard Overview
![Smart Inventory Dashboard](IMG_20251029_132615.jpg)

*Dashboard showing real-time inventory statistics, quick actions, and system status*

**Dashboard Features Shown:**
- 📊 **Total Items Overview** (5 items total)
- ✅ **In Stock Items** (4 items available)
- ⚠️ **Low Stock Alerts** (2 items need attention)
- 🚀 **Quick Actions** for common tasks
- 🔧 **System Status** monitoring (Backend API & Database)
- ⏰ **Real-time Updates** (Last updated timestamp)

## ✨ Features

### 📊 Dashboard Analytics
- **Real-time Statistics**: Total items, in-stock, out-of-stock, low stock
- **Visual Metrics**: Cards with icons and color-coded status
- **System Monitoring**: API and database connection status
- **Quick Actions**: One-click access to common operations

### 📦 Inventory Management
- **CRUD Operations**: Create, read, update, delete items
- **Advanced Filtering**: Search by name, filter by status and quantity
- **Status Tracking**: In-stock, out-of-stock, maintenance
- **Quantity Management**: Low stock alerts and inventory tracking
- **Bulk Operations**: Import/export capabilities

### 🎨 Modern UI/UX
- **Responsive Design**: Desktop, tablet, and mobile friendly
- **Professional Styling**: Tailwind CSS with gradients and animations
- **Interactive Elements**: Hover effects, smooth transitions
- **TypeScript**: Full type safety across frontend and backend
- **Accessibility**: WCAG compliant with keyboard navigation

### 🔒 Security & Performance
- **Input Validation**: Comprehensive data sanitization
- **Rate Limiting**: API abuse protection
- **CORS Configuration**: Secure cross-origin requests
- **Error Handling**: User-friendly error messages
- **Optimized Performance**: Fast loading and smooth interactions

## 🛠 Technology Stack

### Frontend
- **React 18** + TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Vite** for build tooling
- **Axios** for API calls

### Backend
- **Node.js** + Express
- **TypeScript** for type safety
- **MongoDB Atlas** for cloud database
- **Mongoose ODM** for data modeling
- **Express Validator** for input validation
- **Helmet.js** for security headers

### DevOps & Tools
- Environment Configuration with **dotenv**
- **CORS** enabled for cross-origin requests
- **Security** with Helmet and rate limiting
- **Development Tools**: Nodemon, Concurrently

## 🏗 System Architecture

```mermaid
flowchart TD
    A[Frontend React TS] -->|HTTP API| B[Backend Node.js Express]
    B -->|MongoDB Driver| C[MongoDB Atlas Cloud]
    B --> D[Validation Middleware]
    B --> E[Business Logic Layer]
    B --> F[Health Check Endpoints]
    A --> G[Dashboard UI]
    A --> H[Inventory Management]
    A --> I[Analytics Views]
🖌 System Design
classDiagram
    class Frontend {
        +React Components
        +Dashboard Page
        +Inventory Page
        +API Services
        +State Management
    }

    class Backend {
        +Express Server
        +Inventory Routes
        +Health Check Routes
        +Middleware Stack
    }

    class Database {
        +Items Collection
        +Indexes
        +Schema Validation
        +Aggregation Pipeline
    }

    Frontend --> Backend : REST API Calls
    Backend --> Database : MongoDB Operations
📁 Project Structure
text
SmartInventory/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Dashboard/
│   │   │   ├── Inventory/
│   │   │   └── Common/
│   │   ├── pages/              # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   └── Inventory.tsx
│   │   ├── types/              # TypeScript definitions
│   │   ├── utils/              # Utility functions
│   │   ├── services/           # API services
│   │   └── main.tsx            # Application entry point
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── index.html
│
├── backend/
│   ├── models/                 # MongoDB schemas
│   │   └── Inventory.ts
│   ├── routes/                 # API routes
│   │   ├── inventory.ts
│   │   └── health.ts
│   ├── controllers/            # Route handlers
│   │   ├── inventoryController.ts
│   │   └── healthController.ts
│   ├── middleware/             # Custom middleware
│   │   ├── validation.ts
│   │   └── errorHandler.ts
│   ├── utils/                  # Utility functions
│   ├── server.ts               # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── addSampleData.js        # Sample data script
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
Start Frontend Development Server (in a new terminal)

bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
Adding Sample Data
bash
cd backend
node addSampleData.js
⚙️ Configuration
Environment Variables
Backend (.env)

env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
Frontend (.env)

env
VITE_API_BASE_URL=http://localhost:5000/api
📜 Available Scripts
Backend Scripts
bash
npm run dev          # Start development server with hot reload
npm start           # Start production server
npm run build       # Build TypeScript to JavaScript
Frontend Scripts
bash
npm run dev         # Start Vite development server
npm run build       # Build for production
npm run preview     # Preview production build
📊 API Endpoints
Inventory Management
GET /api/inventory - Get all items (supports filtering by status, search)

POST /api/inventory - Create a new item

PUT /api/inventory/:id - Update an item

DELETE /api/inventory/:id - Delete an item

System Health
GET /api/health - Check API and database connection status

GET /api/test - Basic API test endpoint

Example API Usage
javascript
// Get all in-stock items
fetch('/api/inventory?status=in-stock')
  .then(response => response.json())
  .then(data => console.log(data));

// Create new item
fetch('/api/inventory', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Product',
    quantity: 100,
    status: 'in-stock'
  })
});
🔒 Security Features
Input Validation: All user inputs are validated and sanitized

CORS Protection: Configured for specific origins

Rate Limiting: Prevents API abuse

Security Headers: Implemented with Helmet.js

MongoDB Injection Prevention: Using Mongoose validation

🚀 Deployment
Backend Deployment (Heroku/Railway/Render)
Set environment variables in your hosting platform

Configure MongoDB Atlas IP whitelist

Deploy from main branch

Frontend Deployment (Vercel/Netlify)
Connect your repository

Set build command: npm run build

Set output directory: dist

Add environment variable: VITE_API_BASE_URL=your-backend-url

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit your changes: git commit -m 'Add amazing feature'

Push to the branch: git push origin feature/amazing-feature

Open a Pull Request

Development Guidelines
Follow TypeScript best practices

Use meaningful commit messages

Update documentation for new features

Test your changes thoroughly

🗺️ Roadmap
Planned Features
User authentication & authorization

Advanced reporting & analytics

Bulk import/export operations

Barcode scanning integration

Mobile app version

Multi-tenant support

API documentation with Swagger/OpenAPI

Real-time notifications

❗ Troubleshooting
Common Issues
Connection to MongoDB fails

Check your MongoDB Atlas connection string

Verify IP whitelist in MongoDB Atlas

Ensure network connectivity

CORS errors

Verify CORS_ORIGIN environment variable matches your frontend URL

Check frontend API base URL configuration

Build failures

Clear node_modules and reinstall dependencies

Check Node.js version compatibility (requires 16+)

Verify TypeScript configuration

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

Express.js for the reliable backend framework

💬 Support
If you have any questions or need help with setup:

📖 Check this documentation

🐛 Create an issue on GitHub

🔧 Check the troubleshooting section above

⭐ If you found this project helpful, please consider giving it a star on GitHub!
