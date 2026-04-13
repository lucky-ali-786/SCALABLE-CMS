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


# 🚀 Full-Stack CMS Application (Docker Hub Edition)

This application is fully containerized. Both the backend API and the Vite + React frontend are available as pre-built Docker images. You can pull and run the entire stack locally with a single command, without needing a local Node.js environment.

## ⚙️ 1. Setup Environment Variables

The backend container requires specific environment variables to connect to your database and external services. Create a `.env` file in your root folder with the following keys:

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
```
🐳 2. Run the Full Stack with Docker Compose
The easiest way to run both the frontend and backend simultaneously is using Docker Compose. It ensures both containers start together and share the required configurations.

Create a docker-compose.yml file in the same folder as your .env file and paste the following:
version: '3.8'
```
services:
  backend:
    image: lucky894/backend-service-cms:v1
    container_name: cms_backend
    ports:
      - "8000:8000"
    env_file:
      - .env
    restart: always

  frontend:
    image: lucky894/frontend-service-cms:v1 
    container_name: cms_frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    restart: always
```
▶️ 3. Start the Application
Once your .env and docker-compose.yml files are ready, open your terminal in that folder and run:
```docker-compose up -d```
Docker will automatically pull the latest images from Docker Hub and start both services in the background.

Access the Application:

Frontend: Open http://localhost:5173 in your browser.

Backend API: Running locally on http://localhost:8000.

To stop the application, run docker-compose down.


