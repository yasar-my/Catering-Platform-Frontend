import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/RegisterForm.css';

function CustomerRegister() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setFormData(prev => ({
        ...prev,
        [name]: value.toLowerCase(),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (/[A-Z]/.test(formData.email)) newErrors.email = "Uppercase not allowed in email";
    else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(formData.email)) newErrors.email = "Email format invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(formData.password))
      newErrors.password = "Password must be strong (8+ chars, upper+lower+digit+special char)";

    if (!formData.mobile) newErrors.mobile = "Mobile is required";
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Mobile must be exactly 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('http://localhost:8080/api/customer/register', formData);
      alert('Registration successful!');
      nav("/CateringServiceList.jsx", { state: { customerEmail: formData.email } });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.includes("already registered")
      ) {
        alert("Email already registered!");
      } else {
        alert('Registration failed.');
      }
      console.error(error);
    }
  };

  return (
    <div className="main">
      <div className="register-container">
        <h2>Customer Registration</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          {errors.password && <span className="error">{errors.password}</span>}

          <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} maxLength={10} minLength={10}/>
          {errors.mobile && <span className="error">{errors.mobile}</span>}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;
