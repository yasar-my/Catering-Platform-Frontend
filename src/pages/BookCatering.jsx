import React, { useState } from 'react';
import '../styles/BookCatering.css';
import { useNavigate, useLocation } from "react-router-dom";

function BookCatering() {
  const location = useLocation();
  const nav = useNavigate();

  // All details received from previous page, dynamically
  const {
    minPeople = 50,
    maxPeople = 500,
    plateRate = 200,
    email = '',
    customerEmail = ''
  } = location.state || {};

  const [peopleCount, setPeopleCount] = useState(minPeople);

  // ONLY dropdown for selection - disables manual typing
  const handleChange = (e) => {
    setPeopleCount(Number(e.target.value));
  };

  const handleBook = () => {
    nav("/BillPage.jsx", {
      state: {
        email,
        plateRate,
        peopleCount: Number(peopleCount),
        customerEmail
      }
    });
  };

  return (
    <div className="main">
      <div className="book-catering-container">
        <header className="book-catering-header">
          <h2>Book Your Caterer</h2>
        </header>
        <div className="book-main">
          <div className="booking-details">
             <label htmlFor="peopleCount">
  Number of People&nbsp;:
  <input
    type="number"
    id="peopleCount"
    value={peopleCount}
    min={minPeople}
    max={maxPeople}
    onChange={handleChange}
    className="people-count-input"
    required
  />
</label>
            <div className="rate-summary">
              <span>Per Plate Rate:</span> <span className="plate-rate">₹{plateRate}</span>
            </div>
            <button className="book-btn" onClick={handleBook}>Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCatering;
