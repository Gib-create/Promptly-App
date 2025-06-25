import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AssetPage from './components/AssetPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import UserManagement from './components/UserManagement';
import ServiceStatus from './components/ServiceStatus';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asset/:id" element={<AssetPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/status" element={<ServiceStatus />} />
      </Routes>
    </Router>
  );
}
