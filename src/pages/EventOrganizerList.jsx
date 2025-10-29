import React, { useEffect, useState } from "react";
import "../styles/eventorganizerlist.css";

function EventOrganizerList() {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const fetchOrganizers = () => {
    fetch("http://localhost:8080/api/organizer/list")
      .then(res => res.json())
      .then(data => {
        setOrganizers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this event organizer?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/organizer/delete/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setOrganizers(organizers.filter(o => o.id !== id));
      } else {
        alert("Failed to delete organizer");
      }
    } catch {
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <div className="organizer-list-bg">
      <div className="organizer-list-card">
        <h2>All Event Organizers</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="organizer-table-wrap">
            <table className="organizer-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Service Name</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Food Type</th>
                  <th>Min</th>
                  <th>Max</th>
                  <th>Rate</th>
                  <th>Menu</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {organizers.map(org => (
                  <tr key={org.id}>
                    <td>{org.id}</td>
                    <td>{org.serviceName}</td>
                    <td>{org.name}</td>
                    <td>{org.location}</td>
                    <td>{org.email}</td>
                    <td>{org.mobile}</td>
                    <td>{org.foodType}</td>
                    <td>{org.minPeople}</td>
                    <td>{org.maxPeople}</td>
                    <td>{org.plateRate}</td>
                    <td>{org.menu}</td>
                    <td>
                      <button
                        className="organizer-delete-btn"
                        onClick={() => handleDelete(org.id)}
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

export default EventOrganizerList;
