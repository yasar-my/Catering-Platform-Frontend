import React, { useState } from "react";
import logo from '../img/logo.png';
import "../styles/AdminLogin.css";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const isAuthenticated = await res.json();
      if (isAuthenticated) {
        nav("/AdminDashboard.jsx");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="admin-login-bg">
      <div className="admin-login-card">
        <img src={logo} alt="Logo" className="admin-login-logo"/>
        <h2>Admin Login</h2>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="admin-login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
