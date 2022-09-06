const express = require("express");
const app = express();
const http = require("http").Server(app);
const server = app.listen(3001);
const { io } = require("socket.io-client");
//const {Server}=require('socket.io');
const ioServer = require('socket.io')(http,{
  cors:{
    origins:['http://localhost:3002'],
    methods: ["GET", "POST"],
  }
}).listen(3002);
//var cors = require('cors')

//app.use(cors())
let position;

const socket = io("ws://localhost:3000");
socket.on("position", (arg) => {
  position=arg
});

ioServer.on('connection',(socket)=>{
  setInterval(()=>{
    socket.emit("position", {
      position: position,
    })
  },500)
  
})
