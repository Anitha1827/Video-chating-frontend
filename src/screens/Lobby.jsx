import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { Container, Typography, Button, TextField } from "@mui/material";
import axios from "axios";


const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      localStorage.setItem('userEmail', email);
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    // Retrieve the email from local storage on component mount
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  },[]);

  const handleChange = (event) => {
    const { value } = event.target.email.value;
    setEmail(value);
  };
  
  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);



  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://video-chating-application.onrender.com/auth/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);


  const handleLogout = () => {
    // Clear any user-related data from local storage
    localStorage.removeItem('token'); // Remove the JWT token
    // Perform any other cleanup if needed

    // Redirect the user to the login page
    navigate('/');
  };


  const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
  const loggedInUserEmailInput = document.getElementById('loggedInUserEmailInput');
  if (loggedInUserEmail) {
    // Set the stored email as the default value for the input field
    loggedInUserEmailInput.value = loggedInUserEmail;
  }
  return (
    <>
    <nav className="navbar">
        <div className="navbar__logo">Video Chating</div>
        <ul className="navbar__menu">
          <li style={{ marginRight: "20px" }}>
            <Button variant="contained" color="secondary">
              <Link className="navbar__item" to="/">
                Home
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </li>
        </ul>
      </nav>

      <Container maxWidth="sm" sx={{ marginTop: '100px', marginBottom: '100px', alignItems:"center", width: '500px', height: '350px', padding:"20px", backgroundColor: '#f0f0f0', borderRadius: '10px',boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)'}}>
        <Typography variant="h4" gutterBottom>
        Lobby
        </Typography>

        <div>
          <h2 style={{marginLeft:"20%"}}>Welcome to the Lobby!</h2>
          {userData && (
            <div>
              <p>Username: {userData.username}</p>
              <p>Email: {userData.email}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmitForm}>
        <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            // onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            onChange={handleChange}
            id="loggedInUserEmailInput"
          />
           <TextField
            label="room number"
            variant="outlined"
            fullWidth
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" style={{width:"100%"}}>
          Join
          </Button>
        </form>
      </Container>
    </>
  );
};

export default LobbyScreen;
