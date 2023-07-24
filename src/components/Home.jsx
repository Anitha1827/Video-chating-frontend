import React from 'react'
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Home = () => {
  return (
    <>
    <nav className="navbar">
      <div className="navbar__logo">Video Chating</div>
      <ul className="navbar__menu">
        {/* <li>
        <Link  className="navbar__item" to="/">Home</Link>
        </li> */}
        {/* <li >
        <Link  className="navbar__item" to="/register">Register</Link>
        </li> */}
        <li  style={{marginRight: "20px"}}>
        <Button variant="contained" color="secondary">
        <Link  className="navbar__item"  to="/login">Login</Link>
    </Button>
        </li>
      </ul>
    </nav>

    <Container maxWidth="sm md lg" sx={{ marginTop: '100px', marginBottom: '100px', alignItems:"center",marginLeft:"10%"}}>
    <img src="https://uploads-ssl.webflow.com/607dd1658eb71ebcf9c05549/62ffb889ad862c797cff15a2_careers-image-3.png" alt="Zoom"  />
    <Typography variant="h4" gutterBottom>
      Vedio Confirance chat app
    </Typography>
    <Typography variant="body1" paragraph>
    Zoom clone is a cloud-based online meeting, video and web conferencing software package.
    here i used webrtc and socketio
    </Typography>
    <Button variant="contained" color="primary" style={{alignContent:"center"}}>
    <Link  className="navbar__item" to="/register">Register</Link>
    </Button>
  </Container>
    </>
  )
}

export default Home
