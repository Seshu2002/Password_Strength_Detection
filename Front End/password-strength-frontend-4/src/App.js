import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home'; // Import Home component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/" element={<RegisterForm />}/>
        <Route path="/home" element={<Home />}/> {/* Add route for Home component */}
      </Routes>
    </Router>
  );
};

export default App;
