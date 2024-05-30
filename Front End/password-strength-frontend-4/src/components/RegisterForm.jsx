import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './styles.css';

const RegistrationPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [strength, setStrength] = useState({ score: 0, description: "", suggestions: [] });
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        updatePasswordStrengthBars(strength.score);
    }, [strength]);

    const handlePasswordChange = async (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword.length > 0) {
            try {
                const response = await axios.post("http://localhost:8081/api/register/evaluate", { password: newPassword });
                setStrength(response.data);
            } catch (error) {
                console.error("Error evaluating password strength: ", error);
            }
        } else {
            setStrength({ score: 0, description: "", suggestions: [] });
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:8081/api/register", {
                username,
                password,
            });
            console.log("User registered successfully");

            const { passwordStrengthScore: score, passwordStrengthDescription: description, passwordStrengthSuggestions: suggestions } = response.data;
            setStrength({ score, description, suggestions });

            setShowPopup(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data); // Display error message from backend
            } else {
                console.error("Error registering user: ", error);
            }
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setUsername("");
        setPassword("");
        setStrength({ score: 0, description: "", suggestions: [] });
        updatePasswordStrengthBars(0);
    };

    const updatePasswordStrengthBars = (score) => {
        const bars = document.querySelectorAll('.strength-bar');
        bars.forEach((bar, index) => {
            if (index < score) {
                bar.style.backgroundColor = getColor(index + 1);
            } else {
                bar.style.backgroundColor = '#ddd';
            }
        });
    };

    const getColor = (score) => {
        switch (score) {
            case 1:
                return 'red';
            case 2:
                return 'orange';
            case 3:
                return 'yellow';
            case 4:
                return 'lightgreen';
            case 5:
                return 'darkgreen';
            default:
                return 'gray';
        }
    };

    return (
        <div className="form-container">
            <form className="registration-form">
                <h2>Register</h2>
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
                {/* Password strength bars */}
                <div className="password-strength-bars">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="strength-bar"
                        ></div>
                    ))}
                </div>
                <ul className="suggestions">
                    {strength.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
                <button type="button" onClick={handleRegister}>
                    Register
                </button>
                <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
            </form>
            {showPopup && (
                <div className="popup">
                    <h3>Registration Successful!</h3>
                    <p>Password Strength: {strength.description}</p>
                    <button onClick={handleClosePopup}>OK</button>
                </div>
            )}
        </div>
    );
};

export default RegistrationPage;
