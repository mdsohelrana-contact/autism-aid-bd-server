# 📘 Autism-AID BD Backend

Advanced-level **E-commerce Backend** for Bangladesh-based Rehab Equipment Platform.  
Built with **Express.js + TypeScript + Prisma ORM + PostgreSQL**.  
Supports **Multi-language (Bangla/English)**, **Payment Integrations (SSLCommerz, bKash, Nagad)**, **SEO-friendly Models**, and **Assistive Features**.

---

## 🚀 Tech Stack

- **Node.js** + **Express.js** – Backend Framework  
- **TypeScript** – Strong typing  
- **Prisma ORM** – Database modeling & migrations  
- **PostgreSQL** – Primary relational database  
- **JWT Authentication** – Secure user login  
- **Payment Gateways** – SSLCommerz, bKash, Nagad  
- **Winston / Pino** – Logging  
- **Jest + Supertest** – Unit & Integration Testing  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-org/autism-aid-bd-backend.git
cd autism-aid-bd-backend
npm install
```

### 3️⃣ Setup Environment Variables
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/autism_aid_bd"
PORT=5000
JWT_SECRET="supersecret"

# Payment Gateway Keys
SSLCOMMERZ_STORE_ID=xxxx
SSLCOMMERZ_STORE_PASS=xxxx
BKASH_APP_KEY=xxxx
BKASH_APP_SECRET=xxxx
BKASH_USERNAME=xxxx
BKASH_PASSWORD=xxxx
NAGAD_MERCHANT_ID=xxxx
NAGAD_MERCHANT_NUMBER=xxxx
```

### 4️⃣ Prisma Setup
```bash
npx prisma migrate dev --name init
npx prisma generate
npx ts-node prisma/seed.ts
npm run dev
```

### 🔑 Available API Endpoints

#### Auth / User
- `POST /api/v1/auth/register` → Register user
- `POST /api/v1/auth/login` → Login with JWT
- `GET /api/v1/users/me` → Get profile

#### Products
- `GET /api/v1/products` → List products (filter by condition/category/price)
- `GET /api/v1/products/:id` → Product detail
- `POST /api/v1/products` → (Admin) Create product

#### Orders
- `POST /api/v1/orders` → Place order
- `GET /api/v1/orders/:id` → Order details & tracking

#### Payments
- `POST /api/v1/payments/init` → Init payment
- `POST /api/v1/payments/webhook/sslcommerz` → SSLCommerz callback
- `POST /api/v1/payments/webhook/bkash` → bKash callback
- `POST /api/v1/payments/webhook/nagad` → Nagad callback

#### Blog
- `GET /api/v1/blogs` → List blogs
- `GET /api/v1/blogs/:id` → Blog detail
- `POST /api/v1/blogs` → (Admin) Create blog

#### Offers
- `GET /api/v1/offers` → Active offers
- Dynamic Location-based Offer Banner


### 🛠️ Scripts
```bash
npm run dev       # Run in development mode
npm run build     # Build TypeScript → JavaScript
npm run start     # Run production build
npm run lint      # ESLint check
npm run test      # Run unit & integration tests
```

### 🔒 Security & Best Practices
- ✅ **Helmet.js** – Secure HTTP headers
- ✅ **CORS** – Enable frontend integration
- ✅ **JWT Authentication** – Secure user sessions
- ✅ **Centralized Error Handling**
- ✅ **Prisma Query Optimization + Indexing**
- ✅ **Logging** – Error tracking via Winston/Pino


### 📌 Roadmap
- Inventory Management (Low Stock Alerts)
- Therapist Q&A System
- Dynamic Location-based Offers
- Multi-language Full Content




