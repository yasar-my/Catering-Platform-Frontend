import React, { useEffect, useState } from "react";
import "../styles/BookingList.css";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/booking/getbooking")
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching bookings: ", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="booking-table-wrap">
      <h2>All Bookings</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Caterer Email</th>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Customer Location</th>
            <th>Customer Email</th>
            <th>Customer Mobile</th>
            <th>Number Of People</th>
            <th>Plate Rate</th>
            <th>Status</th>
            <th>Total Amount</th>
            <th>Advance Amount</th>
            <th>Booking Date</th>
            <th>Meal Times</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.catererEmail}</td>
              <td>{booking.customerName}</td>
              <td>{booking.customerAddress}</td>
              <td>{booking.customerLocation}</td>
              <td>{booking.customerEmail}</td>
              <td>{booking.customerMobile}</td>
              <td>{booking.numberOfPeople}</td>
              <td>{booking.plateRate}</td>
              <td>{booking.status}</td>
              <td>{booking.totalAmount}</td>
              <td>{booking.advanceAmount}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.mealTimes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingList;
