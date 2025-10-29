import React, { useState, useEffect } from 'react';
import '../styles/CustomerOrders.css';
import { useLocation } from "react-router-dom";
import axios from "axios";

function CustomerOrders() {
  const location = useLocation();
  const customerEmail = location.state?.customerEmail || "";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    if (customerEmail) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/api/booking/getbooking/customer-orders?email=${customerEmail}`)
        .then(res => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch(err => {
          setOrders([]);
          setLoading(false);
          setError("Failed to load orders");
          console.error(err);
        });
    }
  }, [customerEmail]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main">
    <div className="orders-container">
      <h2>My Orders</h2>
      <div className="orders-list">
        {orders.length === 0 ? (
          <div>No orders found for this account.</div>
        ) : (
          orders.map(order => (
  <div className="order-card" key={order.id}>
    <div
      className="order-summary"
      onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
      style={{cursor: "pointer"}}
    >
      <span>
        Order #{order.id} - {order.status === 'completed' ? 'Completed' : 'Pending'}
      </span>
    </div>
    {expandedOrderId === order.id && (
  <div className="order-details-single">
    <div className="detail-row">
      <span className="detail-label">Name:</span>
      <span className="detail-value">{order.customerName}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">Mobile:</span>
      <span className="detail-value">{order.customerMobile}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">Location:</span>
      <span className="detail-value">{order.customerLocation}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">Address:</span>
      <span className="detail-value">{order.customerAddress}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">People:</span>
      <span className="detail-value">{order.numberOfPeople}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">Total:</span>
      <span className="detail-value">₹{order.totalAmount}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">Date:</span>
      <span className="detail-value">{order.bookingDate}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">Meal Times:</span>
      <span className="detail-value">{order.mealTimes}</span>
    </div>
  </div>
)}
    <div className="order-actions">
      {order.status === 'completed' ? (
        <span className="completed-btn">Completed</span>
      ) : (
        <span className="pending-btn">Pending</span>
      )}
    </div>
  </div>
))
        )}
      </div>
    </div>
    </div>
  );
}

export default CustomerOrders;
