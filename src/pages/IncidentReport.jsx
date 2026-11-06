import { useState } from "react";

function IncidentReport({ user }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !location || !description) {
      setMessage("Please fill in all fields.");
      return;
    }

    const incidents =
      JSON.parse(localStorage.getItem("dms_incidents")) || [];

    const newIncident = {
      id: Date.now(),
      title,
      location,
      description,
      reportedBy: user.name,
      date: new Date().toLocaleString(),
      status: "Active",
    };

    incidents.push(newIncident);

    localStorage.setItem(
      "dms_incidents",
      JSON.stringify(incidents)
    );

    setMessage("Incident reported successfully!");

    setTitle("");
    setLocation("");
    setDescription("");
  }

  return (
    <div className="form-page">
      <h2>🚨 Report an Incident</h2>

      <form className="incident-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Incident Title (e.g., Flood)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          placeholder="Describe the incident"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit Report</button>
      </form>

      <p className="message">{message}</p>
    </div>
  );
}

export default IncidentReport;