import { useState } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <nav className="navbar">
      <h2>AmazonGo</h2>

      {user ? (
        <>
          <span>{user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => setShowAuth(true)}>
          Login
        </button>
      )}

      {showAuth && (
        <AuthModal close={() => setShowAuth(false)} />
      )}
    </nav>
  );
}