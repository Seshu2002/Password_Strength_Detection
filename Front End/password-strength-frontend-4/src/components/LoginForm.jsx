import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import './styles.css';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8081/api/login", {
                username,
                password,
            });
            console.log("Login successful");
            localStorage.setItem('username', username); // Store username in localStorage
            navigate('/home'); // Redirect to home page
            setShowPopup(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Bad request - Validation error
                setError(error.response.data); // Display error message from backend
            } else if (error.response && error.response.status === 401) {
                // Unauthorized - Incorrect username/password
                setError("Incorrect username or password");
            } else {
                console.error("Error logging in: ", error);
            }
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setUsername("");
        setPassword("");
    };

    return (
        <div className="form-container">
            <form className="registration-form">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
                <p>Don't have an account? <Link to="/" className="login-link">Register</Link></p>
            </form>
            {error && (
                <div className="popup">
                    <h3>Error</h3>
                    <p>{error}</p>
                    <button onClick={() => setError("")}>OK</button>
                </div>
            )}
            {showPopup && (
                <div className="popup">
                    <h3>Login Successful!</h3>
                    <button onClick={handleClosePopup}>OK</button>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
