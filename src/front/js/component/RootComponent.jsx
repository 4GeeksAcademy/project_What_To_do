import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/home.css";

const RootComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> {/* Add ResetPassword route */}
        {/* Add more routes for other pages/layouts */}
      </Routes>
    </Router>
  );
};

export default RootComponent;