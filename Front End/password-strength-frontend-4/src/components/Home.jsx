// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const username = localStorage.getItem('username'); // Retrieve username from localStorage
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('username'); // Clear the username from localStorage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="home-container">
            <h2>Hi {username}!</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
