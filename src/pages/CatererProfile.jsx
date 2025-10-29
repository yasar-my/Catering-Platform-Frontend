import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/CatererProfile.css';
import logo from "../img/logo.png";

function CatererProfile() {
  const nav = useNavigate();
  const location = useLocation();
  const serviceId = location.state?.serviceId;
  const customerEmail = location.state?.customerEmail;

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (serviceId) {
      axios
        .get(`http://localhost:8080/api/organizer/profile-by-id?id=${serviceId}`)
        .then(res => setProfile(res.data));
    }
  }, [serviceId]);

  if (!profile) return <div>Loading...</div>;

  const handleBook = () => {
    nav("/BookCatering.jsx", {
      state: {
        email: profile.email,
        plateRate: profile.plateRate,
        minPeople: profile.minPeople,
        maxPeople: profile.maxPeople,
        customerEmail
      }
    });
  };

  return (
    <div className="main">
    <div className="caterer-profile-container">
      <header className="caterer-header">
        <img src={logo} alt="Logo" className="logo-small" />
        <h2 className="profile-title">Caterer Profile</h2>
      </header>
      <div className="profile-main">
        <img
  src={profile.profilePhoto ? `/imgs/${profile.profilePhoto}` : '/imgs/default-profile.png'}
  alt="Caterer Profile"
  className="profile-pic"
/>
        <div className="profile-details">
          <h3 className="service-name">{profile.serviceName}</h3>
          <p>Email: <span>{profile.email}</span></p>
          <p>Mobile: <span>{profile.mobile}</span></p>
          <p>Location: <span>{profile.location}</span></p>
          <p>Food Type: <span className="food-type">{profile.foodType}</span></p>
          <p>Capacity: <span className="capacity-badge">{profile.minPeople} - {profile.maxPeople}</span></p>
          <div className="rate-details">
            <strong>Rate per Plate:</strong> <span className="plate-rate">₹{profile.plateRate}</span>
          </div>
          <div className="menu-details">
            <strong>Menu:</strong>
            <p>{profile.menu}</p>
          </div>
          <button className="book-btn" onClick={handleBook}>Book</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CatererProfile;
