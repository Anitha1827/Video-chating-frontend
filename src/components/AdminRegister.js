import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, TextField, Typography } from "@mui/material";
import axios from 'axios';

const AdminRegister = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();
    
        try {
          // make a request to the backend API to register the user
          const response = await axios.post("http://localhost:3001/auth/register", {
            email,
            password,
            username,
          });
          console.log(response.data.message);
    
          // If registration is successful, navigate to the dashboard
          if (response.status === 200) {
            history.push("/dashboard");
          }
        } catch (error) {
          console.error("Error registering user", error);
        }
      };

  return (
    <>
    <nav className="navbar">
      <div className="navbar__logo">Zoom Clone</div>
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
        <li>
          <Button variant="contained" color="secondary">
            <Link className="navbar__item" to="/login">
              Login
            </Link>
          </Button>
        </li>
      </ul>
    </nav>

    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Register
      </Typography>

      <form>
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

        <Button type="submit" variant="contained" color="primary" onClick={handleRegister}>
           Register
        </Button>
      </form>
    </Container>
  </>
  )
}

export default AdminRegister
