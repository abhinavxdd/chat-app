import express, { Request, Response } from "express";
import { publisher, subscriber } from "./redis";
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

const subscribedChannels = new Set<string>();

subscriber.on("message", (channel, message) => {
  try {
    const data = JSON.parse(message);
    io.to(data.roomId).emit(data.event, data.payload);
  } catch (error) {
    console.log("Redis message parse error", error);
  }
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

    //Subscribing to redis channel
    const channel = `room:${roomId}`;
    if (!subscribedChannels.has(channel)) {
      subscriber.subscribe(channel);
      subscribedChannels.add(channel);
      console.log(`📡 Subscribed to Redis channel: ${channel}`);
    }

    // Publish join event to Redis
    publisher.publish(
      channel,
      JSON.stringify({
        event: "user-joined",
        roomId,
        payload: { userId, username, roomId },
      })
    );
    console.log(`${username} joined room ${roomId}`);
  });

  socket.on("send-message", (message: Message) => {
    const channel = `room:${message.roomId}`;
    publisher.publish(
      channel,
      JSON.stringify({
        event: "receive-message",
        roomId: message.roomId,
        payload: message,
      })
    );
    console.log(
      `${message.username} sent message to ${message.roomId}: ${message.content}`
    );
  });

  socket.on("typing", ({ roomId, username, isTyping }) => {
    const channel = `room:${roomId}`;
    publisher.publish(
      channel,
      JSON.stringify({
        event: "user-typing",
        roomId,
        payload: { username, isTyping, roomId },
      })
    );
  });

  socket.on("leave-room", ({ roomId, userId }) => {
    socket.leave(roomId);

    // Remove room from tracked rooms
    userData.rooms.delete(roomId);

    const channel = `room:${roomId}`;
    publisher.publish(
      channel,
      JSON.stringify({
        event: "user-left",
        roomId,
        payload: { userId, username: userData.username, roomId },
      })
    );

    console.log(`${userId} left the room ${roomId}`);
  });

  socket.on("disconnect", () => {
    // Notify all rooms this user was in
    userData.rooms.forEach((roomId) => {
      const channel = `room:${roomId}`;
      publisher.publish(
        channel,
        JSON.stringify({
          event: "user-disconnected",
          roomId,
          payload: {
            userId: userData.userId,
            username: userData.username,
            roomId,
          },
        })
      );
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
