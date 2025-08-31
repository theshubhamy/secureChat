# 🔐 secureChat – Privacy‑First Chat & Video App Backend (Node + Express)

A **Node.js + Express backend** for a privacy‑first chat & video calling app, designed for **end‑to‑end encryption (E2EE)**, **ephemeral media**, and **zero server storage of sensitive data**.

---

## ✅ Features

- **End‑to‑End Encryption (E2EE)** using the Signal protocol (via `libsignal` bindings) for text, media, and calls.
- **Self‑destructing messages & media** (view‑once or timed TTLs).
- **No server storage of photos/videos** — media is exchanged **peer‑to‑peer via WebRTC**, or relayed encrypted with **short TTL**.
- **Secure Video & Audio Calls** using **WebRTC (DTLS‑SRTP)**.
- **Device‑level key management** — private keys never leave the device.
- **Forward Secrecy** — frequent session key rotation.
- **Minimal metadata & zero‑knowledge servers**.
- **Push notifications** (wake‑up only, no message content).

> ⚠️ **Notes**
>
> - This repo exposes the **server‑side pieces only** (auth, key distribution, signaling, relay metadata). Actual E2EE happens on clients.
> - Store **only ciphertext** (if at all), with strict TTLs and background reapers.

---

## 🛠 Tech Stack

- **Runtime**: Node.js 20+
- **HTTP**: [Express](https://expressjs.com)
- **WebSockets**: [`ws`](https://github.com/websockets/ws) (or Socket.IO if you prefer)
- **Database**: **PostgreSQL** via [`pg`](https://github.com/brianc/node-postgres)
- **Cache/Queue**: **Redis** via [`ioredis`](https://github.com/redis/ioredis)
- **Auth**: [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken) (JWT), OTP provider of your choice
- **TURN/STUN**: [`coturn`](https://github.com/coturn/coturn)
- **E2E Crypto**: Signal Protocol (e.g., `@signalapp/libsignal-client` or compatible)

---

## 📂 Project Structure

```
secureChat/
├── src/
│   ├── app.js                  # Express app setup, server entry point
│   ├── signal/                 # WebSocket signaling server
│   │   ├── index.js            # WS server entry
│   │   └── hub.js              # Rooms, peers, message routing
│   │
│   ├── routes/                 # All routes definitions
│   │   ├── auth.routes.js
│   │   ├── keys.routes.js
│   │   ├── message.routes.js
│   │   └── health.routes.js
│   │
│   ├── controllers/            # Handle requests, call services
│   │   ├── auth.controller.js
│   │   ├── keys.controller.js
│   │   ├── message.controller.js
│   │   └── health.controller.js
│   │
│   ├── services/               # Core business logic
│   │   ├── auth.service.js
│   │   ├── keys.service.js
│   │   ├── message.service.js
│   │   └── notification.service.js
│   │
│   ├── models/                 # Database layer
│   │   ├── user.model.js
│   │   ├── message.model.js
│   │   └── key.model.js
│   │
│   ├── middlewares/            # Express middlewares
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── config/                 # Config & initialization
│   │   ├── db.js               # PostgreSQL (pg) client
│   │   ├── redis.js            # Redis client
│   │   ├── env.js              # Env loader
│   │   └── index.js
│   │
│   ├── utils/                  # Helpers & utilities
│   │   ├── crypto.js           # Signal/E2E crypto helpers
│   │   ├── jwt.js              # JWT helper functions
│   │   ├── rateLimit.js        # Rate limiting utility
│   │   └── response.js         # Standard API response format
│   │
│   ├── logging/                # Logger setup
│   │   └── logger.js
│   │
│   └── jobs/                   # Background workers (optional)
│       ├── messageCleaner.js   # TTL cleanup for Redis queues
│       └── notification.js     # Push notification jobs
│
├── tests/                      # Jest/Mocha tests
├── docker-compose.yml
├── Dockerfile
├── package.json
├── .env.example
└── README.md
```

---

## ⚡ Quick Start with Docker Compose

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional) Node.js 20+ for local dev without Docker

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/secure-chat-backend.git
cd secure-chat-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

### 4. Run Locally

```bash
npm run dev
```

- API Server → `http://localhost:8080`
- WebSocket Server → `ws://localhost:8090/ws`

### 5. Run with Docker (Optional)

```bash
docker-compose up --build
```

### Services

- API → `http://localhost:8080`
- WebSocket Signaling → `ws://localhost:8090/ws`
- PostgreSQL → `localhost:5432`
- Redis → `localhost:6379`
- TURN (coturn) → `localhost:3478`

---

## 🔐 Security Principles

- Private keys **never** leave the client.
- All media encrypted with **per‑file keys**; server stores only ciphertext with **short TTL** (e.g., minutes/hours), or no storage at all.
- Redis queues auto‑expire messages after **30–120 minutes**.
- TURN relays **never** log or store call/media content.
- Rate‑limit and anomaly‑detect all public endpoints and WS joins.

---

> 🔐 **Production**: put coturn behind a static public IP, enable TLS, and remove `network_mode: host`.

---

## 📦 Roadmap

- [ ] Implement full **Signal Protocol** flows in Node (X3DH + Double Ratchet) for key distribution and rekeying.
- [ ] **Sealed Sender** to minimize metadata.
- [ ] Device verification via QR or safety numbers.
- [ ] Group chats (later).
- [ ] Encrypted backups (optional, client‑side).

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss significant changes.

---

## 📜 License

MIT License © 2025 [Theshubhamy](https://github.com/theshubahmy)
