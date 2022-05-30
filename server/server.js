const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const http = require("http");
const cors = require("cors");
const NodeCache = require("node-cache");
const { Server } = require("socket.io");
const { generateToken } = require("./utils/generateToken.utils");
const fileParser = require("./utils/fileParser.utils");

const PORT = process.env.PORT | 5000;
const ROOM_TTL = 3600;

const rooms = new NodeCache();
const words = fileParser.getWords();

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

const allPlayersFoundTheWord = (room) => {
  return room.players.filter(p => !p.foundWord).length === 0;
};

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
      firstPlayerRound: 0,
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
    if (room.players.length === 0) {
      rooms.del(data.token);
    } else {
      rooms.set(data.token, room);
      socket.to(data.token).except(socket.id).emit("update_room", room);
    }
  });

  socket.on("start_game", (data) => {
    const room = rooms.get(data.token);
    const firstPlayer = Math.floor(Math.random() * room.players.length);
    room.firstPlayerRound = firstPlayer;
    room.currentPlayer = firstPlayer;
    room.currentRound++;
    wordChoices = fileParser.getThreeRandomWords(words);
    rooms.set(data.token, room);
    socket.to(data.token).except(room.players[room.currentPlayer]).emit("new_drawer", room);
    socket.to(room.players[room.currentPlayer]).emit("words", {room: room, words: wordChoices});
  });

  socket.on("new_drawer", (data) =>{
    const room = rooms.get(data.token);
    room.currentPlayer = (room.currentPlayer + 1) % room.players.length;
    if (room.currentPlayer === room.firstPlayerRound) {
      if (room.currentRound === room.rounds) {
        socket.to(data.token).emit("end_game", room);
        rooms.del(data.token);
      }
      room.currentRound++;
    }
    wordChoices = fileParser.getThreeRandomWords(words);
    socket.to(data.token).except(room.players[room.currentPlayer]).emit("new_drawer", room);
    socket.to(room.players[room.currentPlayer]).emit("words", {room: room, words: wordChoices});
    rooms.set(data.token, room);
  });

  socket.on("chose_word", (data) => {
    const room = rooms.get(data.token);
    room.wordToFind = data.chosenWord;
    socket.to(data.token).emit("word_chosen", data.wordToFind.length);
  });

  socket.on("send_message", (data) => {
    const room = rooms.get(data.token);
    let chatMessage;
    if (data.message === room.wordToFind) {
      chatMessage = {
        message: data.message,
        sender: data.sender,
        type: "SUCCESS"
      }
      for (i in room.players) {
        if (room.players[i].id === socket.id) {
          room.players[i].foundWord = true;
        }
      }
      if (allPlayersFoundTheWord(room)) {
        socket.to(data.token).emit("end_round", room);
      }
    } else {
      chatMessage = {
        message: data.message,
        sender: data.sender,
        type: "NORMAL"
      }
    }
    room.chatMessages.push(chatMessage);
    socket.to(data.token).emit("send_message", room);
    rooms.set(data.token, room);
  });

  socket.on("timeout", (data) => {
    socket.to(data.token).emit("end_round");
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
