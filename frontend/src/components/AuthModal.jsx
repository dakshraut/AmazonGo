import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

const AuthModal = ({ close }) => {
  const { login } = useAuth();
  const [emailMode, setEmailMode] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    await login(form);
    close();
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Backend Google auth call
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const response = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }),
      });

      const data = await response.json();
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Login</h2>

        {!emailMode ? (
          <>
            <button
              className="primary-btn"
              onClick={() => setEmailMode(true)}
            >
              Login with Email
            </button>

            <div className="divider">OR</div>

            <button
              className="google-btn"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </button>
          </>
        ) : (
          <form onSubmit={handleEmailLogin}>
            <input
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <button className="primary-btn">
              Login
            </button>
          </form>
        )}

        <button className="close-btn" onClick={close}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default AuthModal;