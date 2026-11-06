import { useState } from "react";

function Admin() {
  const [activeTab, setActiveTab] = useState("overview");

  const [users] = useState(
    JSON.parse(localStorage.getItem("dms_users")) || []
  );

  const [incidents, setIncidents] = useState(
    JSON.parse(localStorage.getItem("dms_incidents")) || []
  );

  const [volunteers, setVolunteers] = useState(
    JSON.parse(localStorage.getItem("dms_volunteers")) || []
  );

  const [editingIncident, setEditingIncident] = useState(null);
  const [editingVolunteer, setEditingVolunteer] = useState(null);

  function deleteIncident(id) {
    const updatedIncidents = incidents.filter(
      (incident) => incident.id !== id
    );

    setIncidents(updatedIncidents);
    localStorage.setItem(
      "dms_incidents",
      JSON.stringify(updatedIncidents)
    );
  }

  function deleteVolunteer(id) {
    const updatedVolunteers = volunteers.filter(
      (volunteer) => volunteer.id !== id
    );

    setVolunteers(updatedVolunteers);
    localStorage.setItem(
      "dms_volunteers",
      JSON.stringify(updatedVolunteers)
    );
  }

  function saveIncident(e) {
    e.preventDefault();

    const updatedIncidents = incidents.map((incident) =>
      incident.id === editingIncident.id
        ? editingIncident
        : incident
    );

    setIncidents(updatedIncidents);
    localStorage.setItem(
      "dms_incidents",
      JSON.stringify(updatedIncidents)
    );

    setEditingIncident(null);
  }

  function saveVolunteer(e) {
    e.preventDefault();

    const updatedVolunteers = volunteers.map((volunteer) =>
      volunteer.id === editingVolunteer.id
        ? editingVolunteer
        : volunteer
    );

    setVolunteers(updatedVolunteers);
    localStorage.setItem(
      "dms_volunteers",
      JSON.stringify(updatedVolunteers)
    );

    setEditingVolunteer(null);
  }

  return (
    <div className="admin-page">
      <h2>🛡️ Admin Control Panel</h2>
      <p className="admin-description">
        Monitor and manage Disaster Management System data.
      </p>

      <div className="admin-tabs">
        <button onClick={() => setActiveTab("overview")}>
          Overview
        </button>

        <button onClick={() => setActiveTab("users")}>
          Users ({users.length})
        </button>

        <button onClick={() => setActiveTab("incidents")}>
          Incidents ({incidents.length})
        </button>

        <button onClick={() => setActiveTab("volunteers")}>
          Volunteers ({volunteers.length})
        </button>
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div className="admin-stats">
          <div className="admin-stat-card">
            <h3>{users.length}</h3>
            <p>Registered Users</p>
          </div>

          <div className="admin-stat-card">
            <h3>{incidents.length}</h3>
            <p>Total Incidents</p>
          </div>

          <div className="admin-stat-card">
            <h3>{volunteers.length}</h3>
            <p>Volunteers</p>
          </div>
        </div>
      )}

      {/* USERS */}
      {activeTab === "users" && (
        <div className="data-section">
          <h3>Registered Users</h3>

          {users.length === 0 ? (
            <p>No users registered yet.</p>
          ) : (
            users.map((user, index) => (
              <div className="data-card" key={index}>
                <h3>{user.name}</h3>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Role:</b> {user.role}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* INCIDENTS */}
      {activeTab === "incidents" && (
        <div className="data-section">
          <h3>Reported Incidents</h3>

          {incidents.length === 0 ? (
            <p>No incidents reported yet.</p>
          ) : (
            incidents.map((incident) => (
              <div className="data-card" key={incident.id}>
                <h3>{incident.title}</h3>
                <p><b>Location:</b> {incident.location}</p>
                <p>{incident.description}</p>
                <p><b>Reported by:</b> {incident.reportedBy}</p>
                <p><b>Status:</b> {incident.status}</p>

                <button
                  className="edit-btn"
                  onClick={() =>
                    setEditingIncident({ ...incident })
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteIncident(incident.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* EDIT INCIDENT FORM */}
      {editingIncident && (
        <div className="edit-form">
          <h3>Edit Incident</h3>

          <form onSubmit={saveIncident}>
            <input
              type="text"
              value={editingIncident.title}
              onChange={(e) =>
                setEditingIncident({
                  ...editingIncident,
                  title: e.target.value,
                })
              }
            />

            <input
              type="text"
              value={editingIncident.location}
              onChange={(e) =>
                setEditingIncident({
                  ...editingIncident,
                  location: e.target.value,
                })
              }
            />

            <textarea
              value={editingIncident.description}
              onChange={(e) =>
                setEditingIncident({
                  ...editingIncident,
                  description: e.target.value,
                })
              }
            />

            <select
              value={editingIncident.status}
              onChange={(e) =>
                setEditingIncident({
                  ...editingIncident,
                  status: e.target.value,
                })
              }
            >
              <option value="Active">Active</option>
              <option value="Resolved">Resolved</option>
              <option value="In Progress">In Progress</option>
            </select>

            <button type="submit">Save Changes</button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditingIncident(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* VOLUNTEERS */}
      {activeTab === "volunteers" && (
        <div className="data-section">
          <h3>Registered Volunteers</h3>

          {volunteers.length === 0 ? (
            <p>No volunteers registered yet.</p>
          ) : (
            volunteers.map((volunteer) => (
              <div className="data-card" key={volunteer.id}>
                <h3>{volunteer.name}</h3>
                <p><b>Skill:</b> {volunteer.skill}</p>
                <p><b>Joined:</b> {volunteer.joinedDate}</p>

                <button
                  className="edit-btn"
                  onClick={() =>
                    setEditingVolunteer({ ...volunteer })
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteVolunteer(volunteer.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* EDIT VOLUNTEER FORM */}
      {editingVolunteer && (
        <div className="edit-form">
          <h3>Edit Volunteer</h3>

          <form onSubmit={saveVolunteer}>
            <input
              type="text"
              value={editingVolunteer.name}
              onChange={(e) =>
                setEditingVolunteer({
                  ...editingVolunteer,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              value={editingVolunteer.skill}
              onChange={(e) =>
                setEditingVolunteer({
                  ...editingVolunteer,
                  skill: e.target.value,
                })
              }
            />

            <button type="submit">Save Changes</button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditingVolunteer(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Admin;