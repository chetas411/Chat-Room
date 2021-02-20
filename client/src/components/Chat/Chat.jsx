import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import queryString from "query-string";

let socket;
const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = "localhost:5000";

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        socket = io(ENDPOINT);
        socket.emit("joinroom", { name, room }, (error) => {
            return alert(error);
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);
    console.log(name, room);

    return (
        <div>
            This is chat component
        </div>
    )
}

export default Chat
