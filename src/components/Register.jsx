import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // make a request to the backend API to register the user
      const response = await axios.post("https://video-chating-application.onrender.com/auth/register", {
        email,
        password,
        username,
      });
      console.log(response.data.message);

      // If registration is successful, navigate to the dashboard
      if (response.status === 200) {
        // navigate("/dashboard");
        navigate("/room/:roomId");
        console.log("success to roompage")
      }
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

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
          {/* <li >
        <Link  className="navbar__item" to="/register">Register</Link>
        </li> */}
          <li style={{marginRight: "20px"}}>
            <Button variant="contained" color="secondary">
              <Link className="navbar__item" to="/login">
                Login
              </Link>
            </Button>
          </li>
        </ul>
      </nav>

      <Container  maxWidth="sm" sx={{ marginTop: '100px', marginBottom: '100px', alignItems:"center", width: '500px', height: '350px', padding:"20px", backgroundColor: '#f0f0f0', borderRadius: '10px',boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)'}}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" color="primary" style={{width:'100%'}}>
            Register
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Register;
