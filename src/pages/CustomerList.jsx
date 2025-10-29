import React, { useEffect, useState } from "react";
import "../styles/Customerlist.css";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("http://localhost:8080/api/customer/all")
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this customer?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/customer/delete/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setCustomers(customers.filter(c => c.id !== id));
      } else {
        alert("Failed to delete this customer");
      }
    } catch {
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <div className="customer-list-bg">
      <div className="customer-list-card">
        <h2>All Customers</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="customer-table-wrap">
            <table className="customer-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.mobile}</td>
                    <td>
                      <button
                        className="customer-delete-btn"
                        onClick={() => handleDelete(c.id)}
                      >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerList;
