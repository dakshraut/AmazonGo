import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar(){
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">AmazonGo</Link>
      </div>
      <div className="navbar-nav">
        <Link to="/cart">Cart</Link>
        <Link to="/recommendations">AI Recommendations</Link>
        {user ? (
          <>
            <span className="user-name">{user.name}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ):(
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}