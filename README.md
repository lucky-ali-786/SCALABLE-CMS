# 🚀 Scalable CMS: Asynchronous & Real-Time Content Platform

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

An enterprise-grade, asynchronous Content Management System (CMS) engineered to handle high traffic and compute-heavy tasks without compromising performance. Moving beyond standard CRUD architecture, this system leverages distributed task queues, in-memory caching, and real-time bi-directional communication to deliver a non-blocking, highly responsive user experience.

## ✨ System Architecture & Key Features

### 🛡️ Security & Identity Management
* **Stateless Authentication:** Secure OAuth 2.0 flow via Google, utilizing JSON Web Tokens (JWTs) stored in `HttpOnly` cookies to eliminate client-side token theft and mitigate CSRF vulnerabilities.
* **Redis-Backed OTP:** Optimized, auto-expiring verification flows using Redis keys with precise Time-To-Live (TTL), entirely bypassing slower relational database writes.
* **Input Sanitization:** Rigorous sanitization of user-generated content via `DOMPurify` to neutralize Cross-Site Scripting (XSS) attack vectors before database persistence.
* **Algorithmic Traffic Control:** Custom Redis-based rate limiting to safeguard API stability, prevent abuse, and gracefully manage high-velocity traffic spikes.

### ⚡ Concurrency & Asynchronous Processing (BullMQ)
* **Decoupled Producer-Consumer Logic:** Heavy computational tasks (e.g., email dispatch, media processing) are offloaded from the Node.js main thread to background workers using **BullMQ**, guaranteeing non-blocking I/O.
* **Fault Tolerance:** Critical background workers are configured with Exponential Backoff strategies to automatically retry and resolve transient network or third-party API failures.
* **Load Management:** Redis message queues act as a reliable buffer during traffic surges, throttling task execution to prevent systemic backend overload.

### 🔌 Real-Time Systems & Data Engineering
* **Real-Time Engagement:** Low-latency, event-driven commenting system powered by **Socket.io** for bi-directional communication between the server and active clients.
* **Database Optimization:** Complex **MongoDB Aggregation Pipelines** push heavy data processing, analysis, and reporting directly to the database layer for maximum efficiency.
* **AI Integration:** Seamless integration with the **Gemini API** to provide dynamic, automated content generation and writing assistance directly within the editor.

## 🛠️ Technology Stack
* **Backend:** Node.js, Express.js
* **Frontend:** React.js
* **Database:** MongoDB, Mongoose
* **Caching & Message Broker:** Redis
* **Task Queues:** BullMQ
* **Real-Time Communication:** Socket.io
* **API Documentation:** Swagger UI
* **Queue Monitoring:** Bull Board


# 🚀 Backend API Service (Docker Hub Edition)

![Docker](https://img.shields.io/badge/Docker-Image-2496ED?style=flat-square&logo=docker&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

This backend service is available as a pre-built Docker image. You can pull and run it directly without setting up a local development environment.

---

## ⚙️ 1. Setup Environment Variables

The container requires specific environment variables to connect to external services. Create a `.env` file on your machine with the following keys:

```env
PORT=8000
MONGO_URL=your_mongodb_atlas_url
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
ADMIN_EMAIL=admin@example.com
PASSWORD=your_password
// Run this command in the same folder where your .env file is located:
docker run -d \
  --name my-backend-api \
  -p 8000:8000 \
  --env-file .env \
  lucky894/backend-service-cms:v1
// or
// Create a docker-compose.yml file and paste the following:
version: '3.8'
services:
  api:
    image: lucky894/backend-service-cms:v1
    container_name: backend_app
    ports:
      - "8000:8000"
    env_file:
      - .env
    restart: always


Then run:
docker-compose up -d

