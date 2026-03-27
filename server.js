import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// use env variable
app.use(cors({
  origin: process.env.CLIENT_URL
}));

const server = http.createServer(app);

// socket config
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", data);
  });
});

// use env port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});