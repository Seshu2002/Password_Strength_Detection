import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css';

const PasswordStrengthChecker = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [strength, setStrength] = useState({ score: 0, description: "" });
    const [showPopup, setShowPopup] = useState(false);
    const [isRegistering, setIsRegistering] = useState(true);
    const [loginError, setLoginError] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:8081/users/register", {
                username,
                password,
            });
            console.log(response.data); // Debugging line to check the response
            const { passwordScore, passwordDescription } = response.data;
            setStrength({ score: passwordScore, description: passwordDescription });
            setShowPopup(true);
        } catch (error) {
            console.error("Error registering user: ", error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8081/users/login", {
                username,
                password,
            });
            setShowPopup(true);
            setLoginError("");
            console.log("User logged in successfully", response.data);
        } catch (error) {
            console.error("Error logging in user: ", error);
            setLoginError("Invalid username or password");
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setUsername("");
        setPassword("");
        setStrength({ score: 0, description: "" });
    };

    useEffect(() => {
        const fetchPasswordStrength = async () => {
            if (password) {
                try {
                    const response = await axios.post("http://localhost:8081/users/register", {
                        username: 'tempUser',
                        password,
                    });
                    const { passwordScore, passwordDescription } = response.data;
                    setStrength({ score: passwordScore, description: passwordDescription });
                } catch (error) {
                    console.error("Error evaluating password strength: ", error);
                }
            } else {
                setStrength({ score: 0, description: "" });
            }
        };
        fetchPasswordStrength();
    }, [password]);

    return (
        <div className="form-container">
            <form className="registration-form">
                <h2>{isRegistering ? "Register" : "Login"}</h2>
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
                    onChange={handlePasswordChange}
                />
                <button type="button" onClick={isRegistering ? handleRegister : handleLogin}>
                    {isRegistering ? "Register" : "Login"}
                </button>
                <p onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
                </p>
            </form>
            {showPopup && (
                <div className="popup">
                    <h3>{isRegistering ? "Registration Successful!" : "Login Successful!"}</h3>
                    {isRegistering && <p>Password Strength: {strength.description}</p>}
                    <button onClick={handleClosePopup}>OK</button>
                </div>
            )}
            {isRegistering && (
                <div className="password-strength-bars">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className={`strength-bar ${index < strength.score ? "filled" : ""}`}
                        ></div>
                    ))}
                </div>
            )}
            {!isRegistering && loginError && <p className="error">{loginError}</p>}
        </div>
    );
};

export default PasswordStrengthChecker;
