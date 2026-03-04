// src/services/authService.js
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const res = await fetch(`${API_BASE}${path}`, {
    headers,
    ...options
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw body;
  return body;
}

const authService = {
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  register: (name, email, password) =>
    request("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),

  getCurrentUser: () =>
    request("/auth/me", { method: "GET" }),

  logout: () => {
    localStorage.removeItem("token");
  }
};

export default authService;