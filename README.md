# Project Documentation: Password Strength Detection System

## Overview
This project implements a user registration and login system with password strength evaluation using a microservices architecture. The system is divided into separate services for handling user management and password strength evaluation. Both services are built with Spring Boot and provide REST APIs. The frontend is built with React and includes pages for user registration, login, and a home dashboard.

## Architecture

### Microservices

1. **User Service:**
   - Manages user registration and authentication.
   - Stores user credentials securely using hashed passwords.
   - Provides endpoints for user registration and login.

2. **Password Strength Service:**
   - Evaluates the strength of passwords.
   - Provides feedback and suggestions to enhance password strength.
   - Offers a REST API for password strength evaluation that the User Service consumes.

### Functionalities

1. **User Registration:**
   - Allows new users to register by providing a username and password.
   - Evaluates the strength of the password and provides feedback in real-time.
   - Stores user credentials securely using hashed passwords.

2. **User Login:**
   - Authenticates users based on the provided username and password.
   - Redirects users to a home page upon successful login.

3. **Password Strength Evaluation:**
   - Provides real-time feedback on password strength during registration.
   - Suggests improvements to enhance password strength (e.g., adding uppercase letters, numbers, special characters).

4. **Home Dashboard:**
   - Displays a welcome message with the username.
   - Includes a logout button that redirects users to the registration page.

## Backend Implementation

### Microservices Architecture

- **User Service:**
  - **Endpoints:**
    - `/api/register`: Registers a new user.
    - `/api/login`: Authenticates a user.
    - `/api/register/evaluate`: Evaluates the password strength during registration.
  - **Functionalities:**
    - Registers users by storing their usernames and securely hashed passwords.
    - Authenticates users by validating their credentials.
    - Interacts with the Password Strength Service to evaluate password strength.

- **Password Strength Service:**
  - **Endpoint:**
    - `/api/password/evaluate`: Evaluates the strength of a provided password.
  - **Functionalities:**
    - Analyzes password strength based on various criteria (length, inclusion of numbers, uppercase letters, special characters).
    - Returns a score and description indicating the password strength.

## Frontend Implementation

### Pages

1. **Registration Page:**
   - Allows users to register by entering a username and password.
   - Displays real-time feedback on password strength.
   - Shows a success popup upon successful registration.

2. **Login Page:**
   - Allows users to log in by entering their username and password.
   - Displays error messages for incorrect credentials.
   - Redirects users to the home page upon successful login.

3. **Home Page:**
   - Displays a welcome message with the username.
   - Provides a logout button that redirects users to the registration page.

### Navigation
- The frontend uses React Router for navigation between pages.
- After successful registration or login, users are redirected to the appropriate pages.
- The home page includes functionality to log out and clear user data.

### Styling
- The frontend uses a CSS file to style the registration, login, and home pages.
- Password strength bars are visually represented with different colors based on the strength score.

## Notes and Considerations

1. **Security:**
   - Validate all inputs on the server side to prevent malicious inputs.
   - Use environment variables for sensitive information like database credentials and API keys.

2. **Scalability:**
   - The backend services can be scaled horizontally by deploying multiple instances behind a load balancer.
   - The frontend can be hosted on a content delivery network (CDN) to ensure fast load times and reliability.

3. **Further Enhancements:**
   - Implement user profile management where users can update their information.
   - Add email verification during registration.
   - Implement session management and token-based authentication for improved security.
