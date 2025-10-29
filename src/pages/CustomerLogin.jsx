import  { useState } from 'react';
import '../styles/CustomerLogin.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Please enter your email";
    else if (/[A-Z]/.test(email)) newErrors.email = "Capital letters not allowed in email";
    else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email))
      newErrors.email = "Email format is invalid";

    if (!password) newErrors.password = "Please enter your password";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(password))
      newErrors.password = "Password must be at least 8 chars, include uppercase, lowercase, digit and special char";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:8080/api/customer/login', { email: email.toLowerCase(), password });
      if (res.data && res.data.success) {
        alert('Login successful!');
        nav("/CateringServiceList.jsx", { state: { customerEmail: email.toLowerCase() } });
      } else {
        alert('Invalid email or password');
      }
    } catch (err) {
      alert('Login failed. Check credentials!');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Customer Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          autoComplete="username"
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default CustomerLogin;
