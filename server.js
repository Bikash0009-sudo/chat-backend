import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

// ✅ create server
const server = http.createServer(app);

// ✅ socket attach
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// ✅ test route (IMPORTANT for ngrok)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", data);
  });
});

// ✅ IMPORTANT
server.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});