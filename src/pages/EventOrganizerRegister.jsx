import React, { useState } from 'react';
import '../styles/EventOrganizerRegister.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function EventOrganizerRegister() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePhoto: null,
    menuDetails: '',
    mobile: '',
    cateringServiceName: '',
    foodType: 'both',
    location: '',
    maxPeople: '',
    minPeople: '',
    plateRate: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, profilePhoto: "Only image files allowed!" }));
        setFormData(prev => ({ ...prev, profilePhoto: null }));
        return;
      }
    }
    setErrors(prev => ({ ...prev, profilePhoto: "" }));
    setFormData(prev => ({
      ...prev,
      profilePhoto: file,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email required";
    else if (/[A-Z]/.test(formData.email)) newErrors.email = "Capital letters not allowed in email";
    else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password required";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(formData.password))
      newErrors.password = "Password must be strong (8+ chars, upper+lower+digit+special)";
    if (!formData.mobile) newErrors.mobile = "Mobile required";
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Mobile must be exactly 10 digits";
    if (!formData.minPeople) newErrors.minPeople = "Min people required";
    else if (parseInt(formData.minPeople) < 50) newErrors.minPeople = "Minimum people = 50";
    if (!formData.maxPeople) newErrors.maxPeople = "Max people required";
    else if (parseInt(formData.maxPeople) > 100000) newErrors.maxPeople = "Maximum = 100000";
    if (!formData.name) newErrors.name = "Name required";
    if (!formData.cateringServiceName) newErrors.cateringServiceName = "Catering Service Name required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const postData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      profilePhoto: formData.profilePhoto ? formData.profilePhoto.name : null,
      menu: formData.menuDetails,
      mobile: formData.mobile,
      serviceName: formData.cateringServiceName,
      foodType: formData.foodType,
      location: formData.location,
      maxPeople: formData.maxPeople,
      minPeople: formData.minPeople,
      plateRate: formData.plateRate,
    };

    try {
      await axios.post('http://localhost:8080/api/organizer/register', postData);
      alert('Event Organizer Registered Successfully!');
      nav("/EventOrganizerProfile.jsx", { state: { email: formData.email } });
    } catch (error) {
      alert('Registration failed!');
      console.error(error);
    }
  };

  return (
    <div className="main">
      <div className="event-org-container">
        <h2>Event Organizer Registration</h2>
        <form className="event-org-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ textTransform: "lowercase" }}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <label className="file-label">
            Profile Photo:
            <input
              type="file"
              name="profilePhoto"
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
              onChange={handleFileChange}
            />
            {formData.profilePhoto && <span>{formData.profilePhoto.name}</span>}
            {errors.profilePhoto && <span className="error">{errors.profilePhoto}</span>}
          </label>

          <textarea
            name="menuDetails"
            placeholder="Menu Details"
            value={formData.menuDetails}
            onChange={handleChange}
            rows={3}
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            maxLength={10}
            minLength={10}
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}

          <input
            type="text"
            name="cateringServiceName"
            placeholder="Catering Service Name"
            value={formData.cateringServiceName}
            onChange={handleChange}
          />
          {errors.cateringServiceName && <span className="error">{errors.cateringServiceName}</span>}

          <select
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
          >
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
            <option value="both">Both</option>
          </select>

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            <option value="tenkasi">Tenkasi</option>
            <option value="shencottai">Shencottai</option>
            <option value="vallam">Vallam</option>
            <option value="courrallam">Courrallam</option>
            <option value="panpoli">Panpoli</option>
            <option value="vadakarai">Vadakarai</option>
            <option value="idaikal">Idaikal</option>
            <option value="kadayanallur">Kadayanallur</option>
            <option value="pavoorchathram">Pavoorchathram</option>
          </select>

          <input
            type="number"
            name="maxPeople"
            placeholder="Maximum People Capacity"
            min="1"
            max="100000"
            value={formData.maxPeople}
            onChange={handleChange}
          />
          {errors.maxPeople && <span className="error">{errors.maxPeople}</span>}

          <input
            type="number"
            name="minPeople"
            placeholder="Minimum People Capacity"
            min="50"
            value={formData.minPeople}
            onChange={handleChange}
          />
          {errors.minPeople && <span className="error">{errors.minPeople}</span>}

          <input
            type="number"
            name="plateRate"
            placeholder="Rate Per Plate (₹)"
            min="1"
            value={formData.plateRate}
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default EventOrganizerRegister;
