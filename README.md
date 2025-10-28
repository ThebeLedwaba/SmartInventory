https://img.shields.io/badge/status-active-success.svg
https://img.shields.io/badge/node-%253E%253D16.0.0-blue.svg
https://img.shields.io/badge/react-18.0-blue.svg
https://img.shields.io/badge/typescript-5.0-blue.svg
https://img.shields.io/badge/license-MIT-blue.svg
https://img.shields.io/badge/tests-passing-green.svg

A modern, full-stack inventory management solution for tracking tools and equipment with real-time capabilities, advanced analytics, and mobile-first design.

Enhanced Features
Core Inventory Management
Smart Item Management: Add, edit, delete, and categorize inventory items with bulk operations

Real-Time Dashboard: Live monitoring with WebSocket support for instant updates

Advanced Search & Filter: Full-text search, advanced filtering, and saved search queries

QR Code Integration: Generate and scan QR codes for quick item identification

Barcode Support: Barcode generation and scanning capabilities

Advanced Capabilities
Inventory Analytics: Dashboard with charts, trends, and usage analytics

Predictive Restocking: AI-powered low stock alerts and purchase suggestions

Multi-Location Support: Manage inventory across multiple storerooms/workshops

User Management: Role-based access control (Admin, Manager, Viewer)

Audit Trail: Complete history of all inventory changes

Reporting: Generate PDF/Excel reports for inventory audits

Technical Enhancements
Progressive Web App (PWA): Installable mobile app with offline functionality

Real-time Notifications: Browser notifications for low stock and important events

Data Import/Export: CSV/Excel import and export functionality
System Architecture
1. System Architecture Overview
graph TB
    subgraph Frontend
        A[React PWA]
        B[Redux Store]
        C[Service Worker]
        D[WebSocket Client]
    end

    subgraph Backend
        E[Express.js API]
        F[Socket.io]
        G[Authentication]
        H[Rate Limiting]
    end
2. Activity Diagram - Inventory Management Process
flowchart TD
    Start([Start]) --> Login[User Login]
    Login --> Auth{Authentication<br>Successful?}
    Auth -->|No| Error[Show Error Message]
    Auth -->|Yes| Dashboard[Load Dashboard]
    
    Dashboard --> Menu{User Action}
    
    Menu -->|View Items| Browse[Browse Inventory]
    Menu -->|Add Item| AddItem[Add New Item]
    Menu -->|Search| Search[Search Items]
    Menu -->|Reports| GenerateReports[Generate Reports]
    
    Browse --> BrowseAction{Select Action}
    BrowseAction -->|Edit| EditItem[Edit Item]
    BrowseAction -->|Delete| DeleteItem[Delete Item]
    BrowseAction -->|Checkout| Checkout[Checkout Item]
    
    AddItem --> ValidateAdd{Data Valid?}
    ValidateAdd -->|No| ShowAddError[Show Validation Error]
    ValidateAdd -->|Yes| SaveAdd[Save to Database]
    
    EditItem --> ValidateEdit{Data Valid?}
    ValidateEdit -->|No| ShowEditError[Show Validation Error]
    ValidateEdit -->|Yes| SaveEdit[Update Database]
    
    DeleteItem --> ConfirmDelete{Confirm Deletion?}
    ConfirmDelete -->|No| CancelDelete[Cancel Operation]
    ConfirmDelete -->|Yes| ExecuteDelete[Delete from DB]
    
    Checkout --> UpdateQty[Update Quantity]
    UpdateQty --> LogActivity[Log Activity]
    
    SaveAdd --> LogActivity
    SaveEdit --> LogActivity
    ExecuteDelete --> LogActivity
    
    LogActivity --> UpdateUI[Update User Interface]
    UpdateUI --> Menu
    
    Search --> DisplayResults[Display Results]
    DisplayResults --> Menu
    
    GenerateReports --> Export{Export Format?}
    Export -->|PDF| GeneratePDF[Generate PDF Report]
    Export -->|Excel| GenerateExcel[Generate Excel Report]
    GeneratePDF --> Download[Download Report]
    GenerateExcel --> Download
    Download --> Menu
    
    Error --> Login
    ShowAddError --> AddItem
    ShowEditError --> EditItem
    CancelDelete --> Browse
3. Database Schema Design
erDiagram
    USERS ||--o{ INVENTORY_ITEMS : manages
    USERS ||--o{ ACTIVITY_LOGS : performs
    CATEGORIES ||--o{ INVENTORY_ITEMS : categorizes
    INVENTORY_ITEMS ||--o{ ITEM_TRANSACTIONS : tracks
    LOCATIONS ||--o{ INVENTORY_ITEMS : stores
    
    USERS {
        string _id ObjectId
        string email String
        string password Hash
        string role String
        string firstName String
        string lastName String
        date createdAt DateTime
        date updatedAt DateTime
        boolean isActive Boolean
    }
    
    CATEGORIES {
        string _id ObjectId
        string name String
        string description String
        string color String
        date createdAt DateTime
    }
    
    LOCATIONS {
        string _id ObjectId
        string name String
        string address String
        string contactPerson String
        string phone String
        boolean isActive Boolean
    }
    
    INVENTORY_ITEMS {
        string _id ObjectId
        string name String
        string description String
        string sku String
        string categoryId ObjectId
        string locationId ObjectId
        number quantity Number
        number minQuantity Number
        number maxQuantity Number
        number price Number
        string supplier String
        string qrCode String
        string barcode String
        string status String
        string imageUrl String
        date lastRestocked DateTime
        date createdAt DateTime
        date updatedAt DateTime
    }
    
    ITEM_TRANSACTIONS {
        string _id ObjectId
        string itemId ObjectId
        string userId ObjectId
        string type String
        number quantityChanged Number
        number previousQuantity Number
        number newQuantity Number
        string reason String
        string notes String
        date createdAt DateTime
    }
    
    ACTIVITY_LOGS {
        string _id ObjectId
        string userId ObjectId
        string action String
        string resource String
        string resourceId ObjectId
        json oldData JSON
        json newData JSON
        string ipAddress String
        date createdAt DateTime
    }
4. Component Architecture (Frontend)
   graph TD
    subgraph "React Application"
        A[App Root]
        B[Routing]
        C[Authentication Provider]
        
        subgraph "Layout Components"
            D[Navbar]
            E[Sidebar]
            F[Footer]
        end
        
        subgraph "Page Components"
            G[Dashboard]
            H[Inventory]
            I[Items Management]
            J[Reports]
            K[Settings]
        end
        
        subgraph "Shared Components"
            L[DataTable]
            M[SearchBar]
            N[Pagination]
            O[Modal]
            P[Notification]
        end
        
        subgraph "State Management"
            Q[Redux Store]
            R[API Slice]
            S[Inventory Slice]
            T[Auth Slice]
        end
        
        subgraph "Custom Hooks"
            U[useInventory]
            V[useAuth]
            W[useWebSocket]
            X[useLocalStorage]
        end
    end
    
    A --> B
    A --> C
    B --> G
    B --> H
    B --> I
    B --> J
    B --> K
    C --> Q
    Q --> R
    Q --> S
    Q --> T
    G --> U
    H --> U
    I --> U
    U --> R
5. API Architecture Design
 flowchart TD
    subgraph "Client Layer"
        A[Web Browser]
        B[Mobile App]
        C[Third-party Apps]
    end
    
    subgraph "API Gateway"
        D[Load Balancer]
        E[Rate Limiter]
        F[CORS Handler]
        G[Request Logger]
    end
    
    subgraph "Application Layer"
        H[Auth Controller]
        I[Inventory Controller]
        J[Reports Controller]
        K[Users Controller]
    end
    
    subgraph "Service Layer"
        L[Auth Service]
        M[Inventory Service]
        N[Report Service]
        O[Notification Service]
    end
    
    subgraph "Data Access Layer"
        P[MongoDB Repository]
        Q[Redis Cache]
        R[File Storage]
    end
    
    subgraph "External Services"
        S[Email Service]
        T[QR Code Service]
        U[Cloud Storage]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    G --> I
    G --> J
    G --> K
    H --> L
    I --> M
    J --> N
    K --> L
    L --> P
    M --> P
    M --> Q
    N --> P
    N --> R
    O --> S
    M --> T
    R --> U
6. Sequence Diagram - Item Checkout Process
 sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as Backend API
    participant DB as Database
    participant WS as WebSocket
    participant N as Notification Service
    
    U->>FE: Click "Checkout Item"
    FE->>API: POST /api/items/{id}/checkout
    API->>API: Validate JWT Token
    API->>DB: Find item by ID
    DB-->>API: Return item data
    
    alt Item not found or insufficient quantity
        API-->>FE: Return error
        FE-->>U: Show error message
    else Valid request
        API->>DB: Update item quantity
        API->>DB: Create transaction record
        API->>DB: Create activity log
        DB-->>API: Confirm operations
        
        par Real-time Updates
            API->>WS: Broadcast inventory update
            WS->>FE: Push update to all clients
        and Notifications
            API->>N: Check for low stock
            alt Low stock detected
                N->>N: Send low stock alert
            end
        end
        
        API-->>FE: Success response
        FE-->>U: Show success message
        FE->>FE: Update local state
    end

RESTful API: Well-documented API with Swagger/OpenAPI specification

Dark Mode: Toggle between light and dark themes
7. Deployment Architecture
graph TB
    subgraph "Production Environment"
        subgraph "Load Balancer"
            A[NGINX LB]
        end
        
        subgraph "Application Servers"
            B[App Server 1]
            C[App Server 2]
            D[App Server N]
        end
        
        subgraph "Database Cluster"
            E[MongoDB Primary]
            F[MongoDB Secondary 1]
            G[MongoDB Secondary 2]
        end
        
        subgraph "Cache Layer"
            H[Redis Cluster]
        end
        
        subgraph "File Storage"
            I[Cloud Storage<br>S3/Cloudinary]
        end
        
        subgraph "Monitoring"
            J[Prometheus]
            K[Grafana]
            L[Log Aggregation]
        end
    end
    
    A --> B
    A --> C
    A --> D
    B --> E
    C --> E
    D --> E
    E --> F
    E --> G
    B --> H
    C --> H
    D --> H
    B --> I
    B --> J
    C --> J
    D --> J
    J --> K
8. Security Architecture
   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CLIENT LAYER  │    │  APPLICATION    │    │   DATA LAYER    │
│                 │    │     LAYER       │    │                 │
│ • Input         │    │ • JWT Validation│    │ • Encryption    │
│   Validation    │◄──►│ • Rate Limiting │◄──►│   at Rest       │
│ • XSS Prevention│    │ • SQL Injection │    │ • Access Control│
│ • CSRF Tokens   │    │   Prevention    │    │ • Audit Logging │
│                 │    │ • Input Sanit.  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
🛠 Technology Stack
Frontend (Modernized)
React 18 with TypeScript

Tailwind CSS for styling

Redux Toolkit for state management

React Query for server state

Chart.js for analytics dashboard

PWA capabilities with service workers

Backend (Enhanced)
Node.js with Express.js and TypeScript

MongoDB with Mongoose ODM

Redis for caching and session storage

Socket.io for real-time features

JWT authentication with refresh tokens

Rate limiting and advanced security

DevOps & Quality
Docker containerization

CI/CD with GitHub Actions

Jest and React Testing Library

ESLint + Prettier for code quality

Husky for git hooks

Quick Start
Prerequisites
Node.js 16+

MongoDB 4.4+

Redis 6+ (optional, for enhanced performance)

Installation
Clone and setup:


git clone https://github.com/ThebeLedwaba/SmartInventory.git
cd SmartInventory
Environment configuration:

cp .env.example .env
# Configure your environment variables
Install dependencies:

# Install root dependencies (if using monorepo)
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies  
cd ../server && npm install
Start development servers:

# Start both client and server (from root)
npm run dev

# Or start separately:
# Terminal 1: cd server && npm run dev
# Terminal 2: cd client && npm start
Access the application:

Frontend: http://localhost:3000

Backend API: http://localhost:5000

API Documentation: http://localhost:5000/api-docs

Project Structure
text
SmartInventory/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── store/        # Redux store
│   │   ├── utils/        # Utility functions
│   │   └── types/        # TypeScript definitions
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   └── utils/        # Utility functions
├── shared/               # Shared code between frontend/backend
├── docs/                # Documentation
└── docker/              # Docker configuration
API Endpoints
Authentication
POST /api/auth/login - User login

POST /api/auth/register - User registration

POST /api/auth/refresh - Refresh token

POST /api/auth/logout - User logout

Inventory Management
GET /api/items - Get all items (with pagination/filtering)

POST /api/items - Create new item

GET /api/items/:id - Get item by ID

PUT /api/items/:id - Update item

DELETE /api/items/:id - Delete item

POST /api/items/:id/checkout - Checkout item

POST /api/items/:id/restock - Restock item

Reports & Analytics
GET /api/reports/inventory - Inventory summary report

GET /api/reports/transactions - Transaction history

GET /api/reports/analytics - Usage analytics

POST /api/reports/export - Export data

Testing

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e

# Run specific test suites
npm run test:client    # Frontend tests
npm run test:server    # Backend tests
npm run test:integration  # Integration tests

Docker Deployment
Development

# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
Production

# Production build
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose up -d --scale app=3
Environment Variables
env
# Database
MONGODB_URI=mongodb://localhost:27017/smartinventory
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# Application
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Email (Optional)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
API Documentation
Once running, access the interactive API documentation at:

Swagger UI: http://localhost:5000/api-docs

OpenAPI Spec: http://localhost:5000/api-docs/json

Example API Request
javascript
// Get inventory items with pagination
const response = await fetch('/api/items?page=1&limit=10&status=active', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

// Create new item
const newItem = await fetch('/api/items', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Power Drill',
    category: 'tools',
    quantity: 15,
    minQuantity: 5,
    price: 89.99
  })
});
Performance & Scaling
Key Requirements:
Response Time: < 200ms for API calls

Concurrent Users: Support 1000+ simultaneous users

Data Load: Handle 100,000+ inventory items

Uptime: 99.9% availability

Optimization Strategies:
Database indexing on frequently queried fields

Redis caching for inventory lists and reports

CDN for static assets and images

Query optimization with MongoDB aggregation pipeline

Horizontal scaling with load balancers

Security Measures
Authentication & Authorization
JWT-based authentication with refresh tokens

Role-based access control (RBAC)

Password hashing with bcrypt

Session management with secure cookies

Data Protection
Encryption at rest (MongoDB)

SSL/TLS for data in transit

Input validation and sanitization

SQL injection prevention

XSS and CSRF protection

Monitoring & Auditing
Comprehensive activity logging

Security event monitoring

Regular security audits

Penetration testing

Contributing
Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit changes: git commit -m 'Add amazing feature'

Push to branch: git push origin feature/amazing-feature

Open a Pull Request

Development Workflow
bash
# Create new feature
git checkout -b feature/new-inventory-feature

# Make changes and test
npm run test
npm run lint

# Commit changes
git add .
git commit -m "feat: add new inventory filtering system"

# Push and create PR
git push origin feature/new-inventory-feature
License
This project is licensed under the MIT License - see the LICENSE file for details.

Support
📧 Email: thebeledwaba@gmail.com

🐛 Issues

💬 Discussions

📚 Documentation
