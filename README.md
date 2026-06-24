# Realtime Team Chat Application

A scalable real-time chat backend built with Node.js, Socket.IO, MongoDB, Redis Pub/Sub, and JWT Authentication. The application supports chat rooms, real-time messaging, online presence tracking, typing indicators, message persistence, and cross-server communication using Redis.

> ⚠️ **Note:** The frontend for this project was generated using AI and is currently basic and incomplete. The primary focus of this project is the backend system, which is fully functional and demonstrates real-time communication and scalability concepts.

---

## Features

### Authentication

- User Registration
- User Login
- JWT-based Authentication
- Protected REST APIs
- Socket Authentication using JWT Handshake

### Room Management

- Create Chat Rooms
- Join Existing Rooms
- Leave Rooms
- Room Membership Validation

### Real-Time Messaging

- Join Room Events
- Send and Receive Messages
- Real-Time Message Delivery using Socket.IO
- Message Persistence in MongoDB
- Room-Based Broadcasting

### Chat Experience

- Typing Indicators
- Online/Offline Presence Tracking
- Paginated Message History

### Scalability

- Redis Pub/Sub Integration
- Multi-Instance Message Synchronization
- Cross-Server Real-Time Communication

---

## Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Real-Time Communication

- Socket.IO

### Authentication

- JWT (JSON Web Token)

### Caching & Messaging

- Redis
- ioredis

---

## Project Architecture

Client
↓
Socket.IO
↓
Node.js + Express
↓
MongoDB

For Horizontal Scaling:

Client
↓
Backend Instance 1
↓
Redis Pub/Sub
↓
Backend Instance 2
↓
Client

---

## Database Models

### User

Stores user information and authentication data.

### Room

Stores chat room details and members.

```javascript
{
  name: String,
  members: [ObjectId]
}
```

### Message

Stores chat messages.

```javascript
{
  sender: ObjectId,
  room: ObjectId,
  content: String
}
```

---

## Socket Events

### Client → Server

#### Join Room

```javascript
socket.emit("join-room", roomId);
```

#### Send Message

```javascript
socket.emit("send-message", {
  roomId,
  message,
});
```

#### Typing Indicator

```javascript
socket.emit("typing", roomId);
```

---

### Server → Client

#### Receive Message

```javascript
socket.on("receive-message");
```

#### User Typing

```javascript
socket.on("user-typing");
```

#### User Online

```javascript
socket.on("user-online");
```

#### User Offline

```javascript
socket.on("user-offline");
```

---

## Message Flow

1. User sends a message.
2. Server validates room membership.
3. Message is stored in MongoDB.
4. Message is published to Redis.
5. All backend instances receive the Redis event.
6. Message is broadcast to users in the room.
7. Clients receive the message instantly.

---

## Redis Pub/Sub Flow

Without Redis:

Backend 1 → User A

Backend 2 → User B

Messages cannot be shared across servers.

With Redis:

Backend 1
↓
Redis
↓
Backend 2

All connected users receive messages regardless of which backend instance they are connected to.

---

## REST APIs

### Authentication

```http
POST /api/v1/users/register
POST /api/v1/users/login
```

### Rooms

```http
POST /api/v1/rooms/create
POST /api/v1/rooms/join/:roomId
POST /api/v1/rooms/leave/:roomId
GET  /api/v1/rooms
```

### Messages

```http
GET /api/v1/message/:roomId?page=1&limit=20
```

---

## Running the Project

### Clone Repository

```bash
git clone <repository-url>
cd realtime-chat-application
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=8000

MONGODB_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_access_secret

ACCESS_TOKEN_EXPIRY=7d

REDIS_URL=redis://localhost:6379
```

### Start Redis

```bash
redis-server
```

### Start Application

```bash
npm run dev
```

---

## Multi-Instance Testing

Run two backend instances:

```bash
PORT=8000 npm run dev
```

```bash
PORT=8001 npm run dev
```

Connect clients to different backend instances and verify that messages are synchronized through Redis Pub/Sub.

---

## Future Improvements

- Improve and redesign the frontend (currently AI-generated and minimal)
- Read Receipts
- Message Editing
- Message Deletion
- File Sharing
- Group Administration
- User Last Seen Status
- Direct Messaging
- Docker Deployment
- Kubernetes Deployment

---

## Learning Outcomes

This project helped in understanding:

- JWT Authentication
- WebSockets and Socket.IO
- Real-Time Communication
- Room-Based Messaging
- MongoDB Data Modeling
- Redis Pub/Sub
- Horizontal Scaling
- Distributed System Fundamentals
- Event-Driven Architecture
