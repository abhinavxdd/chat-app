import express, { Request, Response } from "express";

import { createServer } from "http";
import { Server } from "socket.io";

import cors from "cors";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// io.on() => Server level events
// socket.on() => Client level events

io.on("connection", (socket) => {
  console.log(`${socket.id} Connected`);
  socket.on("disconnect", () => {
    console.log(`${socket.id} Disconnected`);
  });
});

app.use(cors());
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

httpServer.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
