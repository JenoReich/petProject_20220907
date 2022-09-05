const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { io } = require("socket.io-client");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const socket = io("ws://localhost:3000");

socket.on("position", (arg) => {
  console.log(arg);
  socket.emit("position", arg);
});

server.listen(3001, () => {
  console.log("listening on port 3001");
});
