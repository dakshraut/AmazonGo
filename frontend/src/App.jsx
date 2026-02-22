import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Recommendations from "./pages/Recommendations";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  return user?.isAdmin ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Protected><Cart /></Protected>} />
        <Route path="/history" element={<Protected><History /></Protected>} />
        <Route path="/recommendations" element={<Protected><Recommendations /></Protected>} />
        <Route path="/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
      </Routes>
      <Footer />
    </div>
  );
}