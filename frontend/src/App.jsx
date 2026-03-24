// frontend/src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Recommendations from "./pages/Recommendations";
import { useAuth } from "./hooks/useAuth";
import { useProducts } from "./context/ProductContext";
import "./App.css";

// Protected route for authenticated users
const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

// Admin route for admin users only
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return user?.isAdmin ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes (require login) */}
          <Route 
            path="/cart" 
            element={
              <Protected>
                <Cart />
              </Protected>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <Protected>
                <Dashboard />
              </Protected>
            } 
          />
          <Route 
            path="/history" 
            element={
              <Protected>
                <History />
              </Protected>
            } 
          />
          <Route 
            path="/recommendations" 
            element={
              <Protected>
                <Recommendations />
              </Protected>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/analytics" 
            element={
              <AdminRoute>
                <Analytics />
              </AdminRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}