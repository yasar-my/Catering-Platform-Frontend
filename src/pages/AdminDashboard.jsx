import React from "react";
import logo from '../img/logo.png';
import "../styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const nav = useNavigate();

  const goTocustomer = () => nav("/CustomerList");
  const goToOrganizer = () => nav("/EventOrganizerList");

  return (
    <div className="admin-dashboard-bg">
      <div className="admin-dashboard-card">
        <img src={logo} alt="Logo" className="admin-dashboard-logo"/>
        <h2>Admin Dashboard</h2>
        <div className="admin-dashboard-btns">
          <button className="admin-dashboard-btn" onClick={goTocustomer}>
            Custromer
          </button>
          <button className="admin-dashboard-btn" onClick={goToOrganizer}>
            Event Organizer
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
