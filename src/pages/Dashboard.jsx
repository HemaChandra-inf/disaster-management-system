import { useState } from "react";
import IncidentReport from "./IncidentReport";
import Resources from "./Resources";
import Volunteers from "./Volunteers";
import Admin from "./Admin";

function Dashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState("home");

  const incidents =
    JSON.parse(localStorage.getItem("dms_incidents")) || [];

  const volunteers =
    JSON.parse(localStorage.getItem("dms_volunteers")) || [];

  function renderPage() {
    if (activePage === "incident") {
      return <IncidentReport user={user} />;
    }

    if (activePage === "resources") {
      return <Resources />;
    }

    if (activePage === "volunteers") {
      return <Volunteers />;
    }

    if (activePage === "admin") {
      return <Admin />;
    }

    const activeIncidents = incidents.filter(
      (incident) => incident.status === "Active"
    ).length;

    const resolvedIncidents = incidents.filter(
      (incident) => incident.status === "Resolved"
    ).length;

    return (
      <>
        <h2>Emergency Dashboard</h2>

        <div className="dashboard-cards">
          <div className="stat-card">
            <h3>{incidents.length}</h3>
            <p>Total Incidents</p>
          </div>

          <div className="stat-card">
            <h3>{activeIncidents}</h3>
            <p>Active Incidents</p>
          </div>

          <div className="stat-card">
            <h3>{volunteers.length}</h3>
            <p>Registered Volunteers</p>
          </div>

          <div className="stat-card">
            <h3>{resolvedIncidents}</h3>
            <p>Resolved Incidents</p>
          </div>
        </div>

        <div className="welcome-section">
          <h2>Welcome, {user.name} 👋</h2>
          <p>
            Stay informed and help your community during emergencies.
            Use this system to report incidents, access resources,
            and register as a volunteer.
          </p>

          <div className="quick-info">
            <p>
              <b>Your Role:</b> {user.role === "admin" ? "Administrator" : "User"}
            </p>
            <p>
              <b>System Status:</b> Operational
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>🚨 Disaster Management System</h1>
          <p>
            Welcome, <b>{user.name}</b>
          </p>
        </div>

        <button onClick={onLogout}>Logout</button>
      </header>

      <nav className="navigation">
        <button
          className={activePage === "home" ? "active-nav" : ""}
          onClick={() => setActivePage("home")}
        >
          Dashboard
        </button>

        <button
          className={activePage === "incident" ? "active-nav" : ""}
          onClick={() => setActivePage("incident")}
        >
          Report Incident
        </button>

        <button
          className={activePage === "resources" ? "active-nav" : ""}
          onClick={() => setActivePage("resources")}
        >
          Resources
        </button>

        <button
          className={activePage === "volunteers" ? "active-nav" : ""}
          onClick={() => setActivePage("volunteers")}
        >
          Volunteers
        </button>

        {user.role === "admin" && (
          <button
            className={activePage === "admin" ? "active-nav" : ""}
            onClick={() => setActivePage("admin")}
          >
            Admin Panel
          </button>
        )}
      </nav>

      <main className="dashboard-content">
        {renderPage()}
      </main>

      <footer className="footer">
        <p>
          © 2026 Disaster Management System | Emergency Response and Community Support
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;