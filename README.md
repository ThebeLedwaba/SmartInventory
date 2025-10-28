🧠 Smart Inventory Management System

A modern, full-stack inventory management solution for tracking tools and equipment with real-time capabilities, predictive analytics, and a mobile-first design.

🚀 Key Features
🧩 Core Inventory Management

Smart Item Management: Add, edit, delete, and categorize inventory items (supports bulk operations)

Real-Time Dashboard: Live monitoring with WebSocket support

Advanced Search & Filter: Full-text search with advanced filtering

QR/Barcode Integration: Generate and scan codes for quick identification

📊 Advanced Capabilities

Inventory Analytics: Charts, usage trends, and AI insights

Predictive Restocking: AI-powered stock alerts and restock suggestions

Multi-Location Support: Manage multiple storerooms or workshops

User Roles: Admin, Manager, and Viewer access control

Audit Trail: Full history of all inventory changes

Reports: Exportable PDF/Excel audit reports

🏗️ System Architecture
1️⃣ Overview
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

    A --> E
    B --> F
    C --> G
    D --> H

2️⃣ Activity Diagram – Inventory Management Flow

flowchart TD
    Start([Start]) --> Login[User Login]
    Login --> Auth{Authenticated?}
    Auth -->|No| Error[Show Error Message]
    Auth -->|Yes| Dashboard[Load Dashboard]
    Dashboard --> Menu{User Action}
    Menu -->|View Items| Browse[Browse Inventory]
    Menu -->|Add Item| AddItem[Add New Item]
    Menu -->|Reports| GenerateReports[Generate Reports]

    Browse --> Action{Action?}
    Action -->|Edit| EditItem[Edit Item]
    Action -->|Delete| DeleteItem[Delete Item]
    Action -->|Checkout| Checkout[Checkout Item]

    AddItem --> ValidateAdd{Valid Data?}
    ValidateAdd -->|No| ShowAddError[Show Validation Error]
    ValidateAdd -->|Yes| SaveAdd[Save to DB]

    EditItem --> ValidateEdit{Valid Data?}
    ValidateEdit -->|No| ShowEditError[Show Validation Error]
    ValidateEdit -->|Yes| SaveEdit[Update DB]

    DeleteItem --> ConfirmDel{Confirm Delete?}
    ConfirmDel -->|No| CancelDel[Cancel]
    ConfirmDel -->|Yes| ExecuteDel[Delete from DB]

    Checkout --> UpdateQty[Update Quantity]
    UpdateQty --> Log[Log Activity]
    SaveAdd --> Log
    SaveEdit --> Log
    ExecuteDel --> Log
    Log --> UpdateUI[Update UI]
    UpdateUI --> Menu
    Error --> Login

3️⃣ Database Schema Design
erDiagram
    USERS ||--o{ INVENTORY_ITEMS : manages
    USERS ||--o{ ACTIVITY_LOGS : performs
    CATEGORIES ||--o{ INVENTORY_ITEMS : categorizes
    INVENTORY_ITEMS ||--o{ ITEM_TRANSACTIONS : tracks
    LOCATIONS ||--o{ INVENTORY_ITEMS : stores

    USERS {
        string _id
        string email
        string password
        string role
        string firstName
        string lastName
        date createdAt
        date updatedAt
        boolean isActive
    }

    INVENTORY_ITEMS {
        string _id
        string name
        string description
        string categoryId
        string locationId
        number quantity
        number price
        string status
        string qrCode
        date lastRestocked
    }

4️⃣ Component Architecture (Frontend)
graph TD
    subgraph "React Application"
        A[App Root] --> B[Routing]
        B --> C[Dashboard]
        B --> D[Inventory]
        B --> E[Reports]
        B --> F[Settings]
        subgraph "Shared Components"
            X[DataTable]
            Y[SearchBar]
            Z[Pagination]
            W[Modal]
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
            W2[useWebSocket]
        end
    end
    A --> Q
    Q --> R
    Q --> S
    Q --> T
    D --> U
    C --> V

5️⃣ API Architecture
flowchart TD
    subgraph "Client Layer"
        A[Browser]
        B[Mobile App]
    end

    subgraph "API Gateway"
        D[Load Balancer]
        E[Rate Limiter]
        F[CORS Handler]
        G[Logger]
    end

    subgraph "App Layer"
        H[Auth Controller]
        I[Inventory Controller]
        J[Reports Controller]
    end

    subgraph "Service Layer"
        L[Auth Service]
        M[Inventory Service]
        N[Report Service]
    end

    subgraph "Data Layer"
        P[MongoDB]
        Q[Redis Cache]
    end

    A --> D
    B --> D
    D --> E --> F --> G
    G --> H --> L --> P
    G --> I --> M --> P
    G --> J --> N --> P
    M --> Q

6️⃣ Sequence Diagram – Item Checkout
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as Backend
    participant DB as Database
    participant WS as WebSocket

    U->>FE: Click "Checkout Item"
    FE->>API: POST /api/items/{id}/checkout
    API->>DB: Find item
    alt Invalid item
        API-->>FE: Error
    else Valid item
        API->>DB: Update quantity
        API->>DB: Log transaction
        API->>WS: Broadcast update
        WS->>FE: Refresh UI
        FE-->>U: Success Message
    end

7️⃣ Deployment Architecture
graph TB
    subgraph "Production Environment"
        subgraph LB
            A[NGINX Load Balancer]
        end
        subgraph "App Servers"
            B[App Server 1]
            C[App Server 2]
        end
        subgraph "Database Cluster"
            D[MongoDB Primary]
            E[MongoDB Secondary]
        end
        subgraph "Cache"
            F[Redis Cluster]
        end
        subgraph "Storage"
            G[Cloud Storage S3]
        end
    end
    A --> B
    A --> C
    B --> D
    D --> E
    B --> F
    B --> G

8️⃣ Security Architecture
graph TD
    subgraph "Client Layer"
        A[Input Validation]
        B[XSS/CSRF Prevention]
    end
    subgraph "App Layer"
        C[JWT Validation]
        D[Rate Limiting]
        E[Input Sanitization]
    end
    subgraph "Data Layer"
        F[Encryption at Rest]
        G[Access Control]
        H[Audit Logs]
    end
    A --> C
    B --> C
    C --> F
    D --> G
    E --> H

🧱 Tech Stack
Layer	Technologies

Frontend	React 18, TypeScript, Tailwind CSS, Redux Toolkit, Chart.js

Backend	Node.js, Express.js, MongoDB, Redis, Socket.io

Security	JWT, bcrypt, Helmet, Rate Limiting

DevOps	Docker, GitHub Actions, Jest, ESLint, Prettier

⚡ Quick Start
# Clone and install

git clone https://github.com/ThebeLedwaba/SmartInventory.git

cd SmartInventory && npm install

cd client && npm install && cd ../server && npm install

# Run
npm run dev


Access:
Frontend → http://localhost:3000

Backend → http://localhost:5000

Swagger Docs → http://localhost:5000/api-docs

🧪 Testing
npm test
npm run test:coverage

🐳 Docker Deployment
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d

🔒 Security Highlights

JWT + Refresh Tokens

Role-Based Access Control (RBAC)

HTTPS (TLS)

Input Validation & Sanitization

XSS & CSRF Protection

Audit Logs

🧑‍💻 Contributing
git checkout -b feature/new-feature
npm run lint && npm test
git commit -m "feat: add new feature"
git push origin feature/new-feature

📄 License

Licensed under the MIT License – see the LICENSE
 file.

📬 Support

📧 Email: thebeledwaba@gmail.com

🐛 Issues

💬 Discussions

📚 Documentation in /docs
