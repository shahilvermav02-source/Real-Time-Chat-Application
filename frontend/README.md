README.md

# ChatHub - Frontend

A modern React-based real-time chat application frontend.

## Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## Build

```bash
npm run build
```

## Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   │   ├── Auth/       # Authentication components
│   │   └── Chat/       # Chat components
│   ├── hooks/          # Custom React hooks
│   ├── styles/         # CSS files
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
├── package.json
└── vite.config.js      # Vite configuration
```

## Features

- User authentication (Login/Register)
- Real-time messaging with Socket.IO
- Create and join chat rooms
- Message history
- User presence indicators
- Modern UI with animations

## API Requirements

Make sure your backend is running on `http://localhost:8000` with these endpoints:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/room/getUserRooms`
- `POST /api/v1/room/createroom`
- `POST /api/v1/room/joinroom/:roomId`
