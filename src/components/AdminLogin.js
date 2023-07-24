import React, { useState } from 'react'
import { Button, Container, TextField, Typography } from "@mui/material";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // make a request to the backend API to login the user
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      localStorage.setItem('adminToken', response.data.token);
      console.log(response.data.message);

      // If login is successful, navigate to the dashboard
      if(response.status === 200) {
        history.push('/dashboard');
      }
    } catch (error) {
      console.error("Error logging in user", error);
    }
  };


  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo">Zoom Clone</div>
        <ul className="navbar__menu">
          <li style={{marginRight: "20px"}}>
            <Button variant="contained" color="secondary">
              <Link className="navbar__item" to="/">
                Home
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="contained" color="secondary">
              <Link className="navbar__item" to="/register">
                Register
              </Link>
            </Button>
          </li>
          {/* <li >
        <Button variant="contained" color="secondary">
        <Link  className="navbar__item"  to="/login">Login</Link>
    </Button>
        </li> */}
        </ul>
      </nav>

      <Container>
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>

        <form>
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

          <Button type="submit" variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Container>
    </>
  )
}

export default AdminLogin
