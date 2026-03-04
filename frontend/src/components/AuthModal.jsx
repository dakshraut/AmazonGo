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
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Optional backend call
    await fetch("http://localhost:5000/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }),
    });

    close();
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