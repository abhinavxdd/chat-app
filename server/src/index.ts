import express, { Request, Response } from "express";

import { createServer } from "http";
import { Server } from "socket.io";

import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

interface UserData {
  userId: string;
  username: string;
  rooms: Set<string>;
}

interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
  roomId: string;
}

const PORT = process.env.PORT || 8000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// io.on() => Server level events
// socket.on() => Client level events

io.on("connection", (socket) => {
  console.log(`${socket.id} Connected`);

  let userData: UserData = {
    userId: "",
    username: "",
    rooms: new Set<string>(),
  };

  socket.on("join-room", ({ roomId, userId, username }) => {
    socket.join(roomId);

    userData.userId = userId;
    userData.username = username;
    userData.rooms.add(roomId);

    socket.to(roomId).emit("user-joined", { userId, username, roomId });
    console.log(`${username} joined room ${roomId}`);
  });

  socket.on(
    "send-message",
    ({ roomId, message, userId, username, timestamp }) => {
      io.to(roomId).emit("receive-message", {
        roomId,
        message,
        userId,
        username,
        timestamp,
      });
      console.log(`${username} sent message to ${roomId}: ${message}`);
    }
  );

  socket.on("typing", ({ roomId, username, isTyping }) => {
    socket.to(roomId).emit("user-typing", { roomId, username, isTyping });
  });

  socket.on("leave-room", ({ roomId, userId }) => {
    socket.to(roomId).emit("user-left", { roomId, userId });
    socket.leave(roomId);

    // Remove room from tracked rooms
    userData.rooms.delete(roomId);

    console.log(`${userId} left the room ${roomId}`);
  });

  socket.on("disconnect", () => {
    // Notify all rooms this user was in
    userData.rooms.forEach((roomId) => {
      socket.to(roomId).emit("user-disconnected", {
        userId: userData.userId,
        username: userData.username,
        roomId,
      });
    });

    console.log(`${socket.id} (${userData.username}) Disconnected`);
  });
});

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

httpServer.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
