import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Join from "./components/Join";
import Chat from "./components/Chat";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
const App = () => {
    return (
        <BrowserRouter>
            <Route path = "/" exact component = {SignUp} />
            <Route path = "/login"component = {LogIn} />
            <Route path = "/join" component = {Join} />
            <Route path = "/chat" component = {Chat} />
        </BrowserRouter>
    )
}

export default App;
