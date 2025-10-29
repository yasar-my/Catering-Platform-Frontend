import React, { useState, useEffect } from 'react';
import '../styles/EventOrganizerProfile.css';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import logo from "../img/logo.png";

function EventOrganizerProfile() {
  
  const nav = useNavigate();
  const location = useLocation();

  // Consistently get the email passed from login or register
  const email = location.state?.email || location.state?.organizerEmail || 'default@email.com';

  // Orders button will forward email as well for downstream use
  const orders = () => {
    nav("/OrderViewPage.jsx", { state: { email } });
  };

  // Profile state (fetched from backend)
  const [profile, setProfile] = useState(null);

  // Edit mode and editing fields
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/organizer/profile', { params: { email } })
      .then(res => {
        setProfile(res.data);
        setForm(res.data);
        console.log(profile.profilePhoto); // Should show "back1.png"
      });
  }, [email]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSave = async () => {
    try {
      // Always pass email for backend update
      const res = await axios.put(
        'http://localhost:8080/api/organizer/profile-edit',
        form
      );
      setProfile(res.data);
      setEditMode(false);
    } catch (err) {
      alert("Profile save failed!");
      console.error(err);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="main">
    <div className="profile-main-wrap">
      <header className="profile-topbar">
        <div className="profile-logo-wrap">
          <img src={logo} alt="Logo" className="profile-site-logo"/>
          <span className="profile-site-title">Feast & Fete</span>
        </div>
      </header>
      <h1 className="profile-page-title">Caterer Profile</h1>

      <section className="profile-card">
        <div className="profile-row-main">
          <img src={`/imgs/${profile.profilePhoto}`} alt="Profile" style={{ width: '150px' }} />
          <div className="profile-ids">
            <div className="profile-service-name">{profile.serviceName}</div>
            <div className="profile-real-name">{profile.name}</div>
            <div className="profile-loc">{profile.location}</div>
          </div>
          <button className="profile-edit-btn" onClick={() => { setForm(profile); setEditMode(true); }}>Edit Profile</button>
        </div>
        <div className="profile-details-body">
          {editMode ? (
            <div className="profile-edit-fields">
              <label>
                Service Name:
                <input type="text" name="serviceName" value={form.serviceName || ''} onChange={handleEditChange} />
              </label>
              <label>
                Owner Name:
                <input type="text" name="name" value={form.name || ''} onChange={handleEditChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={form.email || ''} onChange={handleEditChange} />
              </label>
              <label>
                Mobile Number:
                <input type="tel" name="mobile" value={form.mobile || ''} onChange={handleEditChange} />
              </label>
              <label>
                Food Type:
                <select name="foodType" value={form.foodType || ''} onChange={handleEditChange}>
                  <option value="Veg">Veg</option>
                  <option value="Nonveg">Non-Veg</option>
                  <option value="Both">Both</option>
                </select>
              </label>
              <label>
                Location:
                <input type="text" name="location" value={form.location || ''} onChange={handleEditChange} />
              </label>
              <label>
                Minimum Capacity:
                <input type="number" name="minPeople" value={form.minPeople || ''} min={1} onChange={handleEditChange} />
              </label>
              <label>
                Maximum Capacity:
                <input type="number" name="maxPeople" value={form.maxPeople || ''} min={1} onChange={handleEditChange} />
              </label>
              <label>
                Menu Details:
                <textarea name="menu" value={form.menu || ''} rows={3} onChange={handleEditChange} />
              </label>
              <div style={{marginTop:12}}>
                <button className="profile-edit-btn" onClick={handleEditSave} type="button">Save</button>
                <button className="profile-cancel-btn" onClick={() => setEditMode(false)} type="button">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="profile-details-list">
              <div><span>Email:</span> {profile.email}</div>
              <div><span>Mobile:</span> {profile.mobile}</div>
              <div><span>Food Type:</span> {profile.foodType}</div>
              <div><span>Location:</span> {profile.location}</div>
              <div><span>Capacity:</span> {profile.minPeople} - {profile.maxPeople} people</div>
              <div>
                <span>Menu:</span> {profile.menu}
              </div>
            </div>
          )}
        </div>
      </section>
      <div style={{ marginTop: '28px', textAlign: 'center' }}>
        <button className="profile-orders-btn" onClick={orders}>
          Orders
        </button>
      </div>
    </div>
    </div>
  );
}

export default EventOrganizerProfile;
