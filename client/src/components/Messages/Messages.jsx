import React from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message";
import './Messages.css';

const Messages = ({messages,name}) => {
    return (
        <ScrollToBottom className = "messages">
        {
            messages.map((message,index)=>{
                let pos = (name.trim().toLowerCase() === message.user)? "right" : "left";
                return <Message key={index} pos = {pos} message = {message.text} user = {message.user} /> 
            })
        }
        </ScrollToBottom>
    );
}

export default Messages;