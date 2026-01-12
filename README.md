# 💬 ChatApp

A modern, full-stack real-time chat application built with Next.js 16, Express, Socket.IO, Redis, and MongoDB. Features instant messaging, room-based conversations, user authentication, message persistence, and a sleek, responsive UI.

## ✨ Features

### Core Functionality
- **Real-time Messaging**: Instant message delivery using Socket.IO with WebSocket protocol
- **Room-Based Chat**: Create and join different chat rooms dynamically
- **User Authentication**: Secure authentication powered by NextAuth v5
- **Message Persistence**: Chat history stored in MongoDB with automatic 7-day cleanup
- **Message History**: Load last 50 messages when joining a room
- **Typing Indicators**: Live feedback when other users are typing
- **User Presence**: Real-time join/leave notifications and online status
- **Toast Notifications**: User-friendly alerts for all chat events

### Technical Highlights
- **Scalable Architecture**: Redis Pub/Sub enables horizontal scaling across multiple server instances
- **TypeScript**: Full type safety across frontend and backend
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS v4
- **State Management**: Lightweight client state with Zustand
- **Session Management**: Secure session handling with NextAuth
- **Auto-reconnect**: Robust WebSocket reconnection logic
- **Indexed Queries**: Optimized MongoDB queries with compound indexes

## 🏗️ Architecture

### Tech Stack

**Frontend**
- **Framework**: Next.js 16.1.1 (App Router)
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Authentication**: NextAuth v5 (beta)
- **Real-time**: Socket.IO Client
- **Icons**: Lucide React, React Icons
- **Notifications**: React Hot Toast

**Backend**
- **Runtime**: Node.js with Express
- **Real-time Engine**: Socket.IO Server
- **Message Broker**: Redis (Pub/Sub)
- **Database**: MongoDB with Mongoose
- **Environment**: dotenv
- **CORS**: Enabled for cross-origin requests

### System Design

```
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │ Socket.IO
         ↓
┌─────────────────┐      ┌──────────┐
│  Express Server │◄────►│  Redis   │
│   + Socket.IO   │      │ Pub/Sub  │
└────────┬────────┘      └──────────┘
         │
         ↓
    ┌─────────┐
    │ MongoDB │
    └─────────┘
```

**Flow**:
1. User connects via Socket.IO from Next.js frontend
2. Express server handles WebSocket connections
3. Messages published to Redis channels for scalable distribution
4. All server instances subscribe to relevant Redis channels
5. Messages saved to MongoDB for persistence
6. Redis broadcasts events to all connected clients in the room

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ (with npm/yarn/pnpm)
- **MongoDB** (local or Atlas cluster)
- **Redis** (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chat-App/chat-app
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

### Environment Configuration

#### Frontend (.env.local)
Create a `.env.local` file in the `chat-app` directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Socket.IO Server URL
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000

# OAuth Providers (optional - configure in auth.config.ts)
# GITHUB_ID=your-github-client-id
# GITHUB_SECRET=your-github-client-secret
```

#### Backend (.env)
Create a `.env` file in the `chat-app/server` directory:

```env
# Server Configuration
PORT=8000
CORS_ORIGIN=http://localhost:3000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/chatapp
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
# For cloud Redis (e.g., Upstash):
# REDIS_URL=redis://username:password@host:port
```

### Running the Application

#### Development Mode

1. **Start the backend server** (in `chat-app/server`):
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:8000`

2. **Start the frontend** (in `chat-app`):
   ```bash
   npm run dev
   ```
   App will run on `http://localhost:3000`

3. **Access the app**
   - Open [http://localhost:3000](http://localhost:3000)
   - Sign in with your configured authentication provider
   - Join a room (e.g., "general", "random", etc.)
   - Start chatting!

#### Production Build

**Frontend**:
```bash
npm run build
npm start
```

**Backend**:
```bash
cd server
npm run build
npm start
```

## 📁 Project Structure

```
chat-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/auth/          # NextAuth API routes
│   │   ├── chat/              # Chat page
│   │   ├── signin/            # Sign-in page
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── chat/              # Chat UI components
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   └── UserList.tsx
│   │   ├── landing/           # Landing page components
│   │   └── providers/         # Context providers
│   ├── hooks/
│   │   └── useSocket.ts       # Socket.IO hook
│   ├── store/
│   │   └── chatStore.ts       # Zustand state management
│   ├── types/                 # TypeScript type definitions
│   ├── auth.config.ts         # NextAuth configuration
│   └── middleware.ts          # Next.js middleware
├── server/
│   └── src/
│       ├── index.ts           # Express + Socket.IO server
│       ├── db.ts              # MongoDB connection
│       ├── redis.ts           # Redis Pub/Sub setup
│       └── models/
│           └── Message.ts     # Mongoose message model
└── public/                    # Static assets
```

## 🔧 Configuration

### NextAuth Setup

Configure authentication providers in `src/auth.config.ts`. Currently supports:
- GitHub OAuth
- Google OAuth (can be added)
- Email/Magic Links (can be added)

### MongoDB Schema

Messages are stored with the following schema:
```typescript
{
  messageId: string;      // Unique message ID
  roomId: string;         // Chat room identifier
  userId: string;         // Sender's socket ID
  username: string;       // Sender's display name
  content: string;        // Message text
  timestamp: number;      // Unix timestamp
  createdAt: Date;        // Auto-generated
}
```

Messages auto-expire after 7 days (configurable in `Message.ts`).

### Redis Channels

Each room has a dedicated Redis channel: `room:{roomId}`

Published events:
- `user-joined`: User enters a room
- `user-left`: User exits a room
- `receive-message`: New message sent
- `user-typing`: Typing indicator
- `user-disconnected`: Socket disconnect

## 🎨 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update `tailwind.config.ts` for theme customization
- Component styles use Tailwind utility classes

### Features
- Adjust message history limit in `server/src/index.ts` (currently 50)
- Change message TTL in `server/src/models/Message.ts` (currently 7 days)
- Customize typing timeout in `src/app/chat/page.tsx` (currently 1 second)

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Backend (Railway/Render/DigitalOcean)
1. Deploy `server` directory
2. Set environment variables
3. Ensure MongoDB and Redis are accessible
4. Update `NEXT_PUBLIC_SOCKET_URL` in frontend

### Database & Cache
- **MongoDB**: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **Redis**: Use [Upstash](https://upstash.com) or [Redis Cloud](https://redis.com/cloud/) (free tier available)

## 🐛 Troubleshooting

### Socket Connection Issues
- Verify `NEXT_PUBLIC_SOCKET_URL` matches your backend URL
- Check CORS settings in `server/src/index.ts`
- Ensure backend server is running

### Authentication Problems
- Confirm `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are set
- Verify OAuth provider credentials
- Check session configuration in `auth.config.ts`

### MongoDB Connection Errors
- Verify `MONGODB_URI` is correct
- Ensure MongoDB is running (local) or accessible (cloud)
- Check network/firewall settings

### Redis Connection Errors
- Confirm Redis is running (`redis-server`)
- Verify `REDIS_HOST` and `REDIS_PORT`
- For cloud Redis, use `REDIS_URL` instead

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Built with ❤️ using Next.js, Socket.IO, Redis, and MongoDB
