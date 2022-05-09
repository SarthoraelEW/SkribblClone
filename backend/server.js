const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const http = require("http");
const cors = require("cors");
const NodeCache = require("node-cache");
const { Server } = require("socket.io");
const { generateToken } = require("./utils/generateToken.utils");

const PORT = process.env.PORT | 5000;
const ROOM_TTL = 3600;

const rooms = new NodeCache();

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("create_room", (data) => {
    const token = generateToken(12);
    socket.join(token);
    console.log(`User with ID: ${socket.id} created room: ${token}`);

    const player = {
      id: socket.id,
      username: data.username,
      atlas: data.atlas,
      language: data.language,
      points: 0,
      foundWord: false,
    };

    const room = {
      owner: socket.id,
      players: [player],
      rounds: 3,
      drawTime: 80,
      language: data.language,
      customWords: [],
      onlyCustomWords: false,
      currentRound: 0,
      currentPlayer: "",
      wordToFind: "",
      chatMessages: [],
    };

    rooms.set(token, room, ROOM_TTL);

    socket.emit("generate_token", { token: token });
  });

  socket.on("join_room", (data) => {
    socket.join(data.token);
    const room = rooms.get(data.token);

    const newPlayer = {
      id: socket.id,
      username: data.username,
      atlas: data.atlas,
      language: data.language,
      points: 0,
      foundWord: false,
    };
    room.players.push(newPlayer);

    socket.to(data.token).emit("player_join", {
      room: room,
    });
    rooms.set(data.token, room, ROOM_TTL);

    console.log(`User with ID: ${socket.id} joined room: ${data.token}`);
  });

  socket.on("get_room", (data) => {
    socket.emit("response_get_room", { room: rooms.get(data.room) });
  });

  socket.on("update_room", (data) => {
    rooms.set(data.token, data.room);
    socket.to(data.token).except(socket.id).emit("update_room", data.room);
  });

  socket.on("leave_room", (data) => {
    const room = rooms.get(data.token);
    room.players = room.players.filter((p) => p.id === socket.id);
    socket.to(data.token).except(socket.id).emit("update_room", room);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
