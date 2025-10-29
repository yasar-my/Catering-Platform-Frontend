import React from 'react';
import logo from '../img/logo.png';
import "../styles/contact.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <div className="page-root contact-root">
      <header className="topbar">
        <div className="brand">
          <img src={logo} alt="Logo" />
          Feast&Fete
        </div>
        <nav className="nav">
          <a href="/about">About</a>
          <a href="/Registerpage.jsx">Register</a>
          <a href="/home.jsx" className="active">Home</a>
        </nav>
      </header>

      <section className="contact-section">
        <div className="contact-card">
          <h1>Contact Us</h1>
          <p>
            Have a question or want to book a service? Reach out using the details below!
          </p>
          <div className="contact-details">
            <div className="contact-detail">
              <FaEnvelope className="contact-icon" />
              feastandfete@gmail.com
            </div>
            <div className="contact-detail">
              <FaPhone className="contact-icon" />
              +91 98765 43210
            </div>
            <div className="contact-detail">
              <FaMapMarkerAlt className="contact-icon" />
              45 Party Lane, Tenkasi, Tamil Nadu, India
            </div>
          </div>
          <div className="contact-socials">
            <a href="https://facebook.com" className="social facebook" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" className="social instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" className="social twitter" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="contact">Contact us</div>
        <div className="socials">
          <span className="social"><FaFacebookF /></span>
          <span className="social"><FaInstagram /></span>
          <span className="social"><FaTwitter /></span>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
