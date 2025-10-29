import React, { useState, useEffect } from "react";
import "../styles/CompletedOrdersPage.css";
import { useLocation } from "react-router-dom";

function CompletedOrdersPage() {
    const location = useLocation();
  const email = location.state?.email || "";

  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get only orders for this organizer (caterer email)
    if (!email) return;
    fetch(
      `http://localhost:8080/api/booking/caterer-orders?email=${encodeURIComponent(email)}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Only completed orders for this email/caterer
        setOrders(data.filter((o) => o.status === "completed"));
        setLoading(false);
      });
  }, [email]);

  return (
    <div className="completed-orders-root">
      <header className="completed-orders-header">
        <h1>Completed Orders</h1>
      </header>
      {loading ? (
        <div className="loading-text">Loading...</div>
      ) : orders.length === 0 ? (
        <p className="empty-list">No completed orders found.</p>
      ) : (
        <div className="orders-list-container">
          {orders.map((order) => (
            <div
              className="order-card"
              key={order.id}
              onClick={() => setSelected(order)}
            >
              <div className="order-main">
                <span className="order-id">#{order.id}</span>
                <span className="order-name">{order.customerName}</span>
              </div>
              <div className="order-date">{order.bookingDate}</div>
              <div className="order-status success">Completed</div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for order details */}
      {selected && (
        <div className="order-modal" onClick={() => setSelected(null)}>
          <div className="order-modal-box" onClick={e => e.stopPropagation()}>
            <h2>Order #{selected.id}</h2>
            <dl>
              <dt>Name</dt> <dd>{selected.customerName}</dd>
              <dt>Mobile</dt> <dd>{selected.customerMobile}</dd>
              <dt>Address</dt> <dd>{selected.customerAddress}</dd>
              <dt>Location</dt> <dd>{selected.customerLocation}</dd>
              <dt>Order Date</dt> <dd>{selected.bookingDate}</dd>
              <dt>Meal Times</dt> <dd>{selected.mealTimes}</dd>
              <dt>No of People</dt> <dd>{selected.numberOfPeople}</dd>
              <dt>Rate/Plate</dt> <dd>₹{selected.plateRate}</dd>
              <dt>Status</dt> <dd>{selected.status}</dd>
              <dt>Total</dt> <dd>₹{selected.totalAmount}</dd>
              <dt>Advance</dt> <dd>₹{selected.advanceAmount}</dd>
              {selected.extraDetails && (
                <>
                  <dt>Extra Details</dt> <dd>{selected.extraDetails}</dd>
                </>
              )}
            </dl>
            <button className="close-modal-btn" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompletedOrdersPage;
