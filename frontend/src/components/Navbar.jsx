// frontend/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b-2 border-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 
                          rounded-lg flex items-center justify-center text-white 
                          font-bold text-lg shadow-md group-hover:shadow-lg 
                          transform group-hover:scale-110 transition-all duration-300
                          group-hover:from-blue-700 group-hover:to-blue-800">
              A
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r 
                           from-blue-600 to-blue-700 bg-clip-text text-transparent
                           hidden md:block group-hover:from-blue-700 group-hover:to-blue-800
                           transition-all">
              AmazonGo
            </span>
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group
                         ${ isActive('/') 
                           ? 'text-blue-600 bg-blue-50' 
                           : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
              {isActive('/') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r 
                            from-blue-600 to-transparent rounded-full scale-0 
                            group-hover:scale-100 transition-transform duration-300 
                            origin-left"></div>
            </Link>

            <Link
              to="/products"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group
                         ${isActive('/products') 
                           ? 'text-blue-600 bg-blue-50' 
                           : 'text-gray-700 hover:text-blue-600'}`}
            >
              Products
              {isActive('/products') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r 
                            from-blue-600 to-transparent rounded-full scale-0 
                            group-hover:scale-100 transition-transform duration-300 
                            origin-left"></div>
            </Link>

            {user && (
              <>
                <Link
                  to="/recommendations"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group
                             ${isActive('/recommendations') 
                               ? 'text-blue-600 bg-blue-50' 
                               : 'text-gray-700 hover:text-blue-600'}`}
                >
                  Recommendations
                  {isActive('/recommendations') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r 
                                from-blue-600 to-transparent rounded-full scale-0 
                                group-hover:scale-100 transition-transform duration-300 
                                origin-left"></div>
                </Link>

                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group
                             ${isActive('/dashboard') 
                               ? 'text-blue-600 bg-blue-50' 
                               : 'text-gray-700 hover:text-blue-600'}`}
                >
                  Dashboard
                  {isActive('/dashboard') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r 
                                from-blue-600 to-transparent rounded-full scale-0 
                                group-hover:scale-100 transition-transform duration-300 
                                origin-left"></div>
                </Link>
              </>
            )}
          </div>

          {/* Right Section - Cart and Auth */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Cart Icon */}
            <Link to="/cart" className="relative group">
              <div className="p-2 rounded-lg hover:bg-blue-50 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 
                                 text-white text-xs font-bold rounded-full h-6 w-6 
                                 flex items-center justify-center shadow-lg 
                                 transform group-hover:scale-110 transition-transform">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Auth Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              {user ? (
                <>
                  {/* User Info */}
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 
                                  flex items-center justify-center text-white font-bold text-sm">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-700 font-medium hidden md:block">
                      Hi, {user.email?.split('@')[0]}
                    </span>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 
                             text-white font-semibold rounded-lg shadow-md 
                             hover:from-red-600 hover:to-red-700 hover:shadow-lg
                             transform hover:scale-105 transition-all duration-300
                             text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-blue-600 font-semibold rounded-lg 
                             hover:bg-blue-50 transition-all duration-300 text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 
                             text-white font-semibold rounded-lg shadow-md
                             hover:from-blue-700 hover:to-blue-800 hover:shadow-lg
                             transform hover:scale-105 transition-all duration-300 text-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-all"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
            <Link
              to="/"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            {user && (
              <>
                <Link
                  to="/recommendations"
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Recommendations
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;