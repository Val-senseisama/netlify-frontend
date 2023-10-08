import React from "react";
import {  Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Chatpage from "./pages/Chat";
import Homepage from "./pages/Home";
import "../src/login.css"


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element=<Homepage />/>
      <Route path="/chat" element=<Homepage />/>
      <Route path="/chat" element=<Chatpage /> />
    </Routes>
    </div>
  );
}

export default App;
