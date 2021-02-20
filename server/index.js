const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const router = require("./router");
const {addUser,getUser,getUserInRoom,removeUser} = require("./methods");

const PORT = process.env.PORT || 5000;
const app = express();

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection",(socket)=>{
    socket.on("joinroom",({name,room},callback)=>{
        const {error,user} = addUser({id: socket.id, name, room});
        if(error) callback();
        socket.emit("message",{user: "admin", text: `Welcome ${name} to ${room}!`});
        socket.broadcast.to(user.room).emit("message",{user: "admin", text: `${name} joined`});
        socket.join(user.room);
    });
});

app.use(router);
server.listen(PORT,()=>console.log(`Server is running on localhost:${PORT}`));