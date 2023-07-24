import { Container, Typography, Button } from "@mui/material";
import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/auth/users", {
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
    navigate('/login');
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
          <li>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </li>
        </ul>
      </nav>
      <Container>
        <Typography variant="h4" gutterBottom>
          DashBoard
        </Typography>

        <div>
          <h2>Welcome to the Dashboard!</h2>
          {userData && (
            <div>
              <p>Username: {userData.username}</p>
              <p>Email: {userData.email}</p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
