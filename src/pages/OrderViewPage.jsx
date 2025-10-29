import React, { useState, useEffect } from 'react';
import "../styles/OrderViewPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../img/logo.png";
function OrderViewPage() {
  const nav = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCancelled, setSelectedCancelled] = useState(null);
  const [selectedCompleted, setSelectedCompleted] = useState(null);

  useEffect(() => {
    if (email) {
      setLoading(true);
      fetch(`http://localhost:8080/api/booking/caterer-orders?email=${encodeURIComponent(email)}`)
        .then(res => {
          if (!res.ok) throw new Error('Network error');
          return res.json();
        })
        .then(data => {
          setOrders(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load orders");
          setLoading(false);
        });
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [email]);

  const orderconfirm = () => {
    nav("/OrderConfirmPage.jsx", { state: { email } });
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="orders-page-dark">
      <header className="orders-header">
        <img src={logo} alt="Logo" className="orders-logo" />
        <h1 className="orders-title">Feast &Fete - Orders</h1>
        <div style={{
  position: "absolute",
  top: "30px",
  right: "20px",
  zIndex: 10
}}>
  <button
    className="complete-order-btn"
    style={{ padding: "8px 18px", borderRadius: "5px", fontWeight: 600, fontSize: "16px", cursor: "pointer" }}
    onClick={() => nav("/CompletedOrdersPage.jsx", { state: { email } })}
  >
    Complete Order
  </button>
</div>

      </header>
      <div className="orders-main-layout">
        <section className="orders-section">
          <h2 className="orders-section-title">New Orders</h2>
          <ul className="orders-list">
            {orders.filter(o => o.status === 'pending' || o.status === 'new').map(order => (
              <li key={order.id} className="order-item">
                <span>{order.customerName}</span>
                <span>{order.bookingDate}</span>
              </li>
            ))}
            {orders.filter(o => o.status === 'pending' || o.status === 'new').length === 0 && <li>No New Orders</li>}
          </ul>
        </section>
        <section className="orders-section">
          <h2 className="orders-section-title">Conform Orders</h2>
          <ul className="orders-list">
            {orders.filter(o => o.status === 'completed').map(order => (
              <li key={order.id} className="order-item" onClick={() => setSelectedCompleted(order)}>
                <span>{order.customerName}</span>
                <span>{order.bookingDate}</span>
              </li>
            ))}
            {orders.filter(o => o.status === 'completed').length === 0 && <li>No Completed Orders</li>}
          </ul>
          {selectedCompleted &&
            <div className="order-details">
              <h3>Conform Order Details</h3>
              <p><strong>Order ID:</strong> {selectedCompleted.id}</p>
              <p><strong>Name:</strong> {selectedCompleted.customerName}</p>
              <p><strong>Mobile:</strong> {selectedCompleted.customerMobile}</p>
              <p><strong>Address:</strong> {selectedCompleted.customerAddress}</p>
              <p><strong>Location:</strong> {selectedCompleted.customerLocation}</p>
              <p><strong>Order Date:</strong> {selectedCompleted.bookingDate}</p>
              {/* ...and so on for other details */}
            </div>
          }
        </section>
        <section className="orders-section">
          <h2 className="orders-section-title">Cancelled Orders</h2>
          <ul className="orders-list">
            {orders.filter(o => o.status === 'cancelled').map(order => (
              <li key={order.id} className="order-item cancelled" onClick={() => setSelectedCancelled(order)}>
                <span>{order.customerName}</span>
                <span>{order.bookingDate}</span>
              </li>
            ))}
            {orders.filter(o => o.status === 'cancelled').length === 0 && <li>No Cancelled Orders</li>}
          </ul>
          {selectedCancelled &&
            <div className="order-details">
              <h3>Cancelled Order Details</h3>
              <p><strong>Order ID:</strong> {selectedCancelled.id}</p>
              <p><strong>Name:</strong> {selectedCancelled.customerName}</p>
              <p><strong>Mobile:</strong> {selectedCancelled.customerMobile}</p>
              <p><strong>Address:</strong> {selectedCancelled.customerAddress}</p>
              <p><strong>Location:</strong> {selectedCancelled.customerLocation}</p>
              <p><strong>Order Date:</strong> {selectedCancelled.bookingDate}</p>
              {/* ...and so on for other details */}
            </div>
          }
        </section>
      </div>
      <div className="orders-footer-btn-container">
        <button className="orders-footer-btn" onClick={orderconfirm}>
          View All Orders
        </button>
      </div>
    </div>
  );
}

export default OrderViewPage;
