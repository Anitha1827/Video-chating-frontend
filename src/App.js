import React from 'react'
import "./App.css";
import LobbyScreen from "./screens/Lobby";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomPage from "./screens/Room";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserCharts from "./components/UserCharts";
import Dashboard from "./components/Dashboard";


function App() {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<UserCharts />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/lobby" element={<LobbyScreen />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Routes>
     
  );
}

export default App;
