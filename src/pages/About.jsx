import React from 'react';
import logo from '../img/logo.png';
import "../styles/About.css";
import { FaSearch, FaCalendarAlt, FaTag } from "react-icons/fa";

function About() {
  return (
    <div className="page-root">
      <header className="topbar">
        <div className="brand">
          <img src={logo} alt="Logo" />
          Feast&Fete
        </div>
        <nav className="nav">
          <a href="/home.jsx" className="active">Home</a>
          <a href="/Registerpage.jsx">Register</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <section className="about-section">
        <div className="container">
          <h1 className="section-title">About Feast&Fete</h1>
          <p className="about-intro">
            Feast&Fete is a modern catering booking platform designed to make event planning simple, fast, and reliable. Whether you’re hosting a wedding, party, or corporate event, our platform connects you to top caterers in your region—offering an easy, transparent booking experience.
          </p>
          <div className="about-features">
            <div className="about-feature">
              <FaSearch className="about-icon" />
              <h3>Discover Local Caterers</h3>
              <p>
                Search and filter caterers by cuisine, price, location, and ratings—hand-pick the perfect partner for your event.
              </p>
            </div>
            <div className="about-feature">
              <FaCalendarAlt className="about-icon" />
              <h3>Simplified Booking</h3>
              <p>
                Reserve your spot in just a few clicks—our intelligent system keeps your plans organized and on track.
              </p>
            </div>
            <div className="about-feature">
              <FaTag className="about-icon" />
              <h3>Competitive Packages</h3>
              <p>
                Compare pricing and menu options to find services that fit your vision and your budget.
              </p>
            </div>
          </div>
          <div className="about-values">
            <h2>Our Mission</h2>
            <p>
              To provide a seamless digital experience for booking catering and event services, making celebrations and gatherings beautiful, stress-free, and memorable for everyone.
            </p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="contact">Contact us</div>
        <div className="socials">
          <span className="social"><FaSearch /></span>
          <span className="social"><FaCalendarAlt /></span>
          <span className="social"><FaTag /></span>
        </div>
      </footer>
    </div>
  );
}

export default About;
