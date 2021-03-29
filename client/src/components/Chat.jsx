import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import queryString from "query-string";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Messages from '../components/Messages/Messages';
import SideBar from '../components/SideBar';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(6),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2)
        },
        height: '100vh',
    },
    grid: {
        height: '100%',
    },
    paper: {
        position:'relative',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '85vh',
        [theme.breakpoints.down('sm')]: {
            height: '95vh'
        }
    },
}));

let socket;
const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const [users,setUsers] = useState([]);
    const ENDPOINT = "http://localhost:5000";

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

    useEffect(()=>{
        socket.on("message",(message)=>{
            setMessages((messages)=>{
                return [...messages,message];
            });
        });
        
        socket.on("roomData",({users})=>{
            setUsers(users);
        });
    },[]);

    const sendMessage = ()=>{
        if(message){
            socket.emit("sendMessage",message,()=>setMessage(''));
        }
    };
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <div className={classes.root} >
                <Grid className={classes.grid} container spacing={3}>
                    <SideBar styleclass = {classes.paper} users = {users} />
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={classes.paper} elevation={24} >
                            <h2>{room}</h2>
                            <Messages messages = {messages} name = {name}/>
                            <Grid container style={{ padding: '20px',position: 'absolute', bottom: 0, left: 0}} >
                                <Grid item xs={11}>
                                    <TextField 
                                    id="outlined-basic-email" 
                                    label="Type Something" 
                                    fullWidth variant="outlined" 
                                    autoFocus = "true"
                                    autoComplete="off"
                                    value={message}
                                    onChange = {(event)=>setMessage(event.target.value)}
                                    onKeyPress = {(event)=>(event.key === "Enter")? sendMessage() : null}
                                    />
                                </Grid>
                                <Grid xs={1} align="right">
                                    <Fab onClick={() => sendMessage()} color="primary" aria-label="add"><SendIcon /></Fab>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Chat
