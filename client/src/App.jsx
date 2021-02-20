import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
const App = () => {
    return (
        <BrowserRouter>
            <Route path = "/" exact component = {Join} />
            <Route path = "/chat" component = {Chat} />
        </BrowserRouter>
    )
}

export default App;
