import React, { useState, useEffect } from 'react';
import '../styles/OrderConfirmPage.css';
import { useLocation } from 'react-router-dom';

function OrdersListWithDetails() {
  const location = useLocation();
  const organizerEmail = location.state?.email || '';
  const [bookings, setBookings] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (organizerEmail) {
      setLoading(true);
      fetch(`http://localhost:8080/api/booking/getbooking/caterer-orders?email=${encodeURIComponent(organizerEmail)}`)
        .then(response => {
          if (!response.ok) throw new Error('Network error');
          return response.json();
        })
        .then(data => {
          setBookings(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load bookings');
          setLoading(false);
        });
    } else {
      setBookings([]);
      setLoading(false);
    }
  }, [organizerEmail]);

  // Accept order handler
  const handleAcceptOrder = () => {
    if (selectedOrder) {
      fetch(`http://localhost:8080/api/booking/update-status?id=${selectedOrder.id}&status=completed`, { method: 'PUT' })
        .then(response => {
          if (!response.ok) throw new Error('Network error');
          return response.json();
        })
        .then(() => {
          alert(`Order ${selectedOrder.id} accepted!`);
          setBookings(prev => prev.filter(b => b.id !== selectedOrder.id));
          setSelectedOrder(null);
        })
        .catch(() => {
          alert('Order update failed!');
        });
    }
  };

  // Cancel order handler
  const handleCancelOrder = () => {
    if (selectedOrder) {
      fetch(`http://localhost:8080/api/booking/update-status?id=${selectedOrder.id}&status=cancelled`, { method: 'PUT' })
        .then(response => {
          if (!response.ok) throw new Error('Network error');
          return response.json();
        })
        .then(() => {
          alert(`Order ${selectedOrder.id} cancelled!`);
          setBookings(prev => prev.filter(b => b.id !== selectedOrder.id));
          setSelectedOrder(null);
        })
        .catch(() => {
          alert('Order cancel failed!');
        });
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="orders-list-container">
      <div className="orders-list">
        <h2>Orders for {organizerEmail}</h2>
        <ul>
          {bookings.length > 0 ? (
            bookings
              .filter(order => order.status === "pending" || order.status === "new")
              .map(order => (
                <li key={order.id} onClick={() => setSelectedOrder(order)} className="order-list-item">
                  {order.id} - {order.customerName}
                </li>
              ))
          ) : (
            <li>No orders found for this organizer.</li>
          )}
        </ul>
      </div>
      <div className="order-details">
        {selectedOrder ? (
          <>
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Name:</strong> {selectedOrder.customerName}</p>
            <p><strong>Mobile:</strong> {selectedOrder.customerMobile}</p>
            <p><strong>Address:</strong> {selectedOrder.customerAddress}</p>
            <p><strong>Location:</strong> {selectedOrder.customerLocation}</p>
            <p><strong>Order Date:</strong> {selectedOrder.bookingDate}</p>
            <p><strong>Meal Times:</strong> {selectedOrder.mealTimes}</p>
            <p><strong>No of People:</strong> {selectedOrder.numberOfPeople}</p>
            <p><strong>Rate/Plate:</strong> ₹{selectedOrder.plateRate}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
            <p><strong>Advance Amount:</strong> ₹{selectedOrder.advanceAmount}</p>
            {selectedOrder.extraDetails && <p><strong>Extra Details:</strong> {selectedOrder.extraDetails}</p>}
            <button className="order-accept-btn" onClick={handleAcceptOrder}>
              Order Accept
            </button>
            <button className="order-cancel-btn" onClick={handleCancelOrder}>
              Order Cancel
            </button>
          </>
        ) : (
          <p>Select an order to see details</p>
        )}
      </div>
    </div>
  );
}

export default OrdersListWithDetails;
