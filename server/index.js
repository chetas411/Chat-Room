const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const PORT = process.env.PORT || 5000;
const App = express();
const server = http.createServer(App);
const io = socketio(server, {
    cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection",(socket)=>{
    socket.on("joinroom",(user,callback)=>{
        const {name,room} = user;
    })
});

server.listen(PORT,()=>console.log(`Serevr is running on localhost:${PORT}`));