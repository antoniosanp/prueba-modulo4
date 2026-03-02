# 🚀 Hybrid Persistence Architecture - REST API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/MongoDB-7-green?logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Express.js-5-black?logo=express" alt="Express">
  <img src="https://img.shields.io/badge/Docker-Compose-blue?logo=docker" alt="Docker">
</p>

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Architecture Justification](#-architecture-justification)
3. [Technology Stack](#-technology-stack)
4. [Project Structure](#-project-structure)
5. [Getting Started](#-getting-started)
6. [Environment Configuration](#-environment-configuration)
7. [API Documentation](#-api-documentation)
8. [Database Schemas](#-database-schemas)
9. [ETL Migration Process](#-etl-migration-process)
10. [Docker Configuration](#-docker-configuration)
11. [Development Guide](#-development-guide)
12. [Testing](#-testing)
13. [Troubleshooting](#-troubleshooting)
14. [Resources & References](#-resources--references)
15. [Contributing](#-contributing)
16. [License](#-license)

---

## 📖 Overview

This project implements a **production-ready REST API** using a **hybrid persistence architecture** that combines the strengths of both relational (SQL) and document-based (NoSQL) databases.

### Key Features

- ✅ **Hybrid Data Storage**: PostgreSQL for relational data, MongoDB for document-based queries
- ✅ **Idempotent Operations**: Safe re-execution without data duplication
- ✅ **RESTful API**: Full CRUD operations with proper HTTP semantics
- ✅ **Docker Ready**: Containerized database setup for consistent environments
- ✅ **Transaction Support**: ACID compliance for critical operations

---

## 🧠 Architecture Justification

### Why Hybrid Persistence?

Modern applications often face conflicting data requirements. This architecture addresses them by using each database for its strengths:

| Requirement | PostgreSQL (SQL) | MongoDB (NoSQL) |
|-------------|------------------|-----------------|
| **Referential Integrity** | ✅ Foreign Keys, Constraints | ❌ No built-in relations |
| **Complex Joins** | ✅ Optimized query planner | ❌ Requires aggregation pipelines |
| **ACID Transactions** | ✅ Full support | ⚠️ Limited (single document) |
| **Read Performance** | ⚠️ Depends on indexes & joins | ✅ O(1) document retrieval |
| **Schema Flexibility** | ❌ Rigid schema required | ✅ Dynamic schema |
| **Historical Records** | ⚠️ Complex queries needed | ✅ Embedded documents |

### Data Distribution Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                              │
│                         (CSV Files)                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     ETL MIGRATION LAYER                          │
│         (Extract → Transform → Load)                             │
│                                                                  │
│         • Deduplication logic                                    │
│         • Parallel writes to both databases                      │
└─────────────────────────────────────────────────────────────────┘
                    │                       │
                    ▼                       ▼
┌───────────────────────────┐   ┌───────────────────────────────┐
│      POSTGRESQL           │   │         MONGODB               │
│   (Operational Data)      │   │    (Read-Optimized Views)     │
├───────────────────────────┤   ├───────────────────────────────┤
│ • Normalized tables       │   │ • Denormalized documents      │
│ • Foreign key relations   │   │ • Embedded arrays             │
│ • Transactional writes    │   │ • Pre-computed aggregates     │
│ • Financial reports       │   │ • Fast historical queries     │
└───────────────────────────┘   └───────────────────────────────┘
```


---

## 🔧 Technology Stack


| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | 5.x | Web framework |
| **pg** | 8.x | PostgreSQL client |
| **Mongoose** | 9.x | MongoDB ODM |
| **dotenv** | 17.x | Environment variables |
| **csv-parser** | 3.x | CSV file processing |

### Databases

| Database | Version | Purpose |
|----------|---------|---------|
| **PostgreSQL** | 16 (Alpine) | Relational data storage |
| **MongoDB** | 7 | Document storage |

### DevOps

| Tool | Purpose |
|------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |

---

## 📁 Project Structure

```

```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))
- **Git** ([Download](https://git-scm.com/))
- **Postman** or similar API client ([Download](https://www.postman.com/))

### Installation Steps

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

```txt
PORT=3000
DATABASE_URL=postgresql://antonio:123456@localhost:5435/orders
MONGO_URL=mongodb://antonio:123456@localhost:27020
```

#### 4. Start Database Containers

```bash
    npm run database

```






#### 6. Start the Application

```bash
npm start
```

Expected output:
```
✅ MongoDB connected successfully
✅ Server running on http://localhost:3000
```

---

## ⚙️ Environment Configuration

### Required Variables

Create a `.env` file in the project root:

```env
# Server Configuration
PORT=3000

# PostgreSQL Connection
# Format: postgresql://user:password@host:port/database
POSTGRES_URI=postgresql://antonio:123456@localhost:5435/orders

# MongoDB Connection
# Format: mongodb://host:port/database
MONGO_URI=mongodb://antonio:123456@localhost:27020

# Data Source
datosPrueba.csv
```

### Environment Variable Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3000` | HTTP server port |
| `POSTGRES_URI` | **Yes** | postgresql://antonio:123456@localhost:5435/orders | PostgreSQL connection string |
| `MONGO_URI` | **Yes** | mongodb://antonio:123456@localhost:27020 | MongoDB connection string |


---

## 📡 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Endpoints Overview

| Method | Endpoint | Description | Database |
|--------|----------|-------------|----------|
| `POST` | `/api/tables/migrate` | Execute ETL migration | PostgresSQL |
| `GET` | `/api/suppliers/get` | List all suppliers | PostgreSQL |
| `GET` | `/api/suppliers/get/email` | Get supplier by email | PostgreSQL |
| `PUT` | `/api/suppliers/update/:id` | Update supplier | PostgreSQL |
| `POST` | `/api/suppliers/add` | Create supplier | PostgreSQL |


---



## 🗃️ Database Schemas

### PostgreSQL Schema

```javascript
//TABLES
(`CREATE TABLE IF NOT EXISTS "customers" (
	"customer_id" SERIAL NOT NULL UNIQUE,
	"customer_email" VARCHAR(255) NOT NULL UNIQUE,
	"customer_name" VARCHAR(255) NOT NULL,
	"customer_address" VARCHAR(255) NOT NULL,
	"customer_phone" VARCHAR(255) NOT NULL,
	PRIMARY KEY("customer_id"));

CREATE TABLE IF NOT EXISTS "suppliers" (
	"supplier_id" SERIAL NOT NULL UNIQUE,
	"supplier_email" VARCHAR(255) NOT NULL UNIQUE,
	"supplier_name" VARCHAR(255) NOT NULL,
	PRIMARY KEY("supplier_id"));

CREATE TABLE IF NOT EXISTS "products" (
	"product_id" SERIAL NOT NULL UNIQUE,
	"product_name" VARCHAR(255) NOT NULL,
	"unit_price" DECIMAL NOT NULL,
	"product_sku" VARCHAR(255) NOT NULL UNIQUE,
	"category_id" INTEGER NOT NULL,
	PRIMARY KEY("product_id"));

CREATE TABLE IF NOT EXISTS "orders" (
	"order_id" VARCHAR(255) NOT NULL UNIQUE,
	"order_date" DATE NOT NULL,
	PRIMARY KEY("order_id"));

CREATE TABLE IF NOT EXISTS "categories" (
	"category_id" SERIAL NOT NULL UNIQUE,
	"category_name" VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY("category_id"));

CREATE TABLE IF NOT EXISTS "transactions" (
	"transaction_id" SERIAL NOT NULL UNIQUE,
	"order_id" VARCHAR(255) NOT NULL,
	"customer_id" INTEGER NOT NULL,
	"supplier_id" INTEGER NOT NULL,
	"product_id" INTEGER NOT NULL,
	"quantity" INTEGER NOT NULL,
	"total_line_value" DECIMAL NOT NULL,
	PRIMARY KEY("transaction_id"));

ALTER TABLE "products"
ADD FOREIGN KEY("category_id") REFERENCES "categories"("category_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "transactions"
ADD FOREIGN KEY("order_id") REFERENCES "orders"("order_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "transactions"
ADD FOREIGN KEY("customer_id") REFERENCES "customers"("customer_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "transactions"
ADD FOREIGN KEY("supplier_id") REFERENCES "suppliers"("supplier_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "transactions"
ADD FOREIGN KEY("product_id") REFERENCES "products"("product_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;`)


```

### MongoDB Schema

```javascript
// Orders Collection
{
  order_title: { 
    type: String, 
    required: true, 
    unique: true 
  },
  order_date :  Date,
  products : [
    {
        product_sku: String,
        product_name: String,
        price: Number,
        quantity: Number,
    },
  ]
};
```

---


## 🐳 Docker Configuration

### docker-compose.yml

```yaml
services:

  postgres:
    image: postgres:16
    container_name: postgres_test
    restart: always
    environment:
      POSTGRES_USER: antonio
      POSTGRES_PASSWORD: 123456
      POSTGRES_DB: orders
    ports:
      - "5435:5432"

  mongo:
    image: mongo:7
    container_name: mongo_test
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: antonio
      MONGO_INITDB_ROOT_PASSWORD: 123456
    ports:
      - "27020:27017"


```





## 🧪 Testing

- check documentation/endpoints.md

---


### Tools

- [Postman](https://www.postman.com/) - API testing
- [DBeaver](https://dbeaver.io/) - Database GUI for PostgreSQL
- [MongoDB Compass](https://www.mongodb.com/products/compass) - MongoDB GUI

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Example: feat(api): add student enrollment endpoint
```

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Made with ❤️ using Node.js, PostgreSQL, and MongoDB
</p>