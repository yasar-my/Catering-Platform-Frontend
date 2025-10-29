import React, { useState } from 'react';
import '../styles/EventOrganizerLogin.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function EventOrganizerLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Please enter email";
    else if (/[A-Z]/.test(email)) newErrors.email = "Capital letters not allowed in email";
    else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email))
      newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Please enter password";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(password))
      newErrors.password = "Password must be 8+ chars, include upper+lower+number+special";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:8080/api/organizer/login', {
        email: email.toLowerCase(),
        password
      });

      if (res.data && res.data.success) {
        alert('Login successful!');
        nav("/EventOrganizerProfile.jsx", { state: { email: email.toLowerCase() } });
      } else {
        alert('Invalid email or password!');
      }
    } catch (err) {
      alert('Login failed! Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="eo-login-container">
      <h2>Event Organizer Login</h2>
      <form className="eo-login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value.toLowerCase())}
          autoComplete="username"
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default EventOrganizerLogin;
