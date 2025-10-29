import React, { useEffect, useState } from "react";
import "../styles/CateringServiceList.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function CateringServiceList() {
  const nav = useNavigate();
  const location = useLocation();
  // Get email if navigated from register page
  const customerEmail = location.state?.customerEmail;

  const [services, setServices] = useState([]);

  // Fetch catering services from backend on mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/organizer/list")
      .then((res) => setServices(res.data))
      .catch((err) => {
        setServices([]);
        console.error(err);
      });
  }, []);

  // Navigate to profile detail, passing customerEmail forward
  const catresh = (service) => {
    nav("/CatererProfile.jsx", { state: { serviceId: service.id, customerEmail } });
  };

  // Navigate to Orders, pass email
  const goToOrders = () => {
    nav("/CustomerOrders.jsx", { state: { customerEmail } });
  };

  return (
    <div className="catering-list-bg">
      <div className="catering-list-header">
        <div className="catering-list-title">Catering Services</div>
        <button className="orders-btn" onClick={goToOrders}>
          Orders
        </button>
      </div>
      <div className="catering-grid">
        {services.map((service) => (
          <div
            className="catering-card"
            key={service.id}
            onClick={() => catresh(service)}
          >
            <div className="catering-img-wrap">
              <img
                src={
                  service.profilePhoto 
                    ? `/imgs/${service.profilePhoto}`
                    : "/imgs/default-profile.png"
                }
                alt={service.serviceName}
              />
            </div>
            <div className="catering-card-details">
              <div className="catering-card-name">{service.serviceName}</div>
              <div className="catering-card-location">{service.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CateringServiceList;
