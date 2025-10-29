import React, { useState } from 'react';
import '../styles/BillPage.css';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function BillPage() {
  const location = useLocation();
  const nav = useNavigate();

  const {
    email = '',
    plateRate = 200,
    peopleCount = 250,
    customerEmail = ''
  } = location.state || {};

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [locationField, setLocationField] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [mealTimes, setMealTimes] = useState([]);

  const mealOptions = ["Morning", "Afternoon", "Evening", "Dinner"];

  const totalAmount = peopleCount * plateRate;
  const advanceAmount = Math.round(totalAmount * 0.4);

  const handleMealChange = (meal) => {
    setMealTimes((prev) =>
      prev.includes(meal)
        ? prev.filter(m => m !== meal)
        : [...prev, meal]
    );
  };

  const isDateValid = (inputDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const selectedDate = new Date(inputDate);
    return selectedDate >= today;
  };

  const isMobileValid = (mobileNum) => {
    return /^\d{10}$/.test(mobileNum);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!name || !mobile || !locationField || !address || !date || mealTimes.length === 0) {
      alert('Please fill all required fields and select at least one meal time.');
      return;
    }
    if (!isMobileValid(mobile)) {
      alert('Mobile number must be exactly 10 digits.');
      return;
    }
    if (!isDateValid(date)) {
      alert('Please select today or a future date.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/booking/create', {
        catererEmail: email,
        customerEmail,
        customerName: name,
        customerMobile: mobile,
        customerLocation: locationField,
        customerAddress: address,
        numberOfPeople: peopleCount,
        plateRate: plateRate,
        totalAmount: totalAmount,
        advanceAmount: advanceAmount,
        status: 'pending',
        bookingDate: date,
        mealTimes: mealTimes.join(',')
      });
      alert(`Order placed!\nCaterer Email: ${email}\nCustomer Email: ${customerEmail}\nTotal: ₹${totalAmount}\nAdvance: ₹${advanceAmount}`);
      nav("/CateringServiceList.jsx", { state: { customerEmail } });
    } catch (err) {
      alert('Booking failed!');
      console.error(err);
    }
  };

  return (
    <div className="main">
      <div className="bill-container">
        <header className="bill-header">
          <h2>Catering Bill Summary</h2>
        </header>
        <form className="bill-main bill-form" onSubmit={handleBook}>
          <div className="user-details">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              required
              maxLength={10}
              minLength={10}
            />
            <select
  name="location"
  value={locationField}
  onChange={e => setLocationField(e.target.value)}
  required
>
  <option value="">Select Location</option>
  <option value="vallam">vallam</option>
  <option value="idaikal">idaikal</option>
  <option value="shencottai">shencottai</option>
  <option value="kasimejarpuram">kasimejarpuram</option>
  <option value="couraalam">couraalam</option>
  <option value="panpoli">panpoli</option>
  <option value="tenkasi">tenkasi</option>
  <option value="vadakarai">vadakarai</option>
</select>

            <textarea
              name="address"
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              rows={2}
              required
            />
            <input
              type="date"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="input-date"
              required
            />
            <div className="meal-times-group">
              <label className="input-label">Meal Times:</label>
              <div className="meal-options">
                {mealOptions.map(meal => (
                  <label key={meal} className="meal-checkbox-label">
                    <input
                      type="checkbox"
                      checked={mealTimes.includes(meal)}
                      onChange={() => handleMealChange(meal)}
                      className="meal-checkbox"
                    />
                    <span className="meal-checkbox-text">{meal}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="bill-details">
            <div className="people-fixed">
              Number of People: <span className="fixed-value">{peopleCount}</span>
            </div>
            <div className="rate-summary">
              <span>Per Plate Rate:</span> <span className="plate-rate">₹{plateRate}</span>
            </div>
            <div className="total-summary">
              <span>Total Bill:</span> <span className="total-amount">₹{totalAmount}</span>
            </div>
            <div className="advance-summary">
              <span>Advance (40%):</span> <span className="advance-amount">₹{advanceAmount}</span>
            </div>
            <div className="notice">
              Order placed! The catering service will contact for advance payment (40% of total).
            </div>
            <button className="book-btn" type="submit">Book Now</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BillPage;
