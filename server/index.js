const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/chat_db",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);
mongoose.Promise = global.Promise;
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const router = require("./router");
const cors = require("cors");
const { addUser, getUser, getUserInRoom, removeUser } = require("./methods");

const PORT = process.env.PORT || 5000;
const app = express();

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cors());
app.use(router);

io.on("connection", (socket) => {
    socket.on("joinroom", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);
        console.log("user joined");
        socket.emit("message", { user: "admin", text: `Welcome ${name} to ${room}!` });
        socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${name} joined` });
        socket.join(user.room);
        io.to(user.room).emit("roomData",{room: user.room, users: getUserInRoom(user.room)});
    });

    socket.on("sendMessage",(message,callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit("message",{user: user.name, text: message});
        callback();
    })

    socket.on("disconnect",()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit("message",{user: "admin", text: `${user.name} left`})
            io.to(user.room).emit("roomData", { room: user.room, users: getUserInRoom(user.room) });
        }
    });
});

server.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));