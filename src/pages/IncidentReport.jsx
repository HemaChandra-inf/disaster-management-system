import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon in Vite
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const defaultPosition = [20.5937, 78.9629];

function MapClick({ setPosition, setLocation }) {
  useMapEvents({
    async click(e) {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      setPosition([lat, lon]);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );

        const data = await response.json();

        if (data.display_name) {
          setLocation(data.display_name);
        }
      } catch {
        setLocation(`${lat.toFixed(5)}, ${lon.toFixed(5)}`);
      }
    },
  });

  return null;
}

function MapUpdater({ position }) {
  const map = useMap();

  if (position) {
    map.flyTo(position, 15);
  }

  return null;
}

function IncidentReport({ user }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchLocation(e) {
    e.preventDefault();

    if (!search.trim()) {
      setMessage("Please enter a place to search.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
      );

      const data = await response.json();

      if (data.length > 0) {
        const place = data[0];
        const lat = Number(place.lat);
        const lon = Number(place.lon);

        setPosition([lat, lon]);
        setLocation(place.display_name);
      } else {
        setMessage("Location not found. Try another search.");
      }
    } catch {
      setMessage("Unable to search location. Please try again.");
    }

    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !location || !description) {
      setMessage("Please fill in all fields and select a location.");
      return;
    }

    const incidents =
      JSON.parse(localStorage.getItem("dms_incidents")) || [];

    const newIncident = {
      id: Date.now(),
      title,
      location,
      latitude: position ? position[0] : null,
      longitude: position ? position[1] : null,
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
    setSearch("");
    setPosition(null);
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

        <h3>📍 Select Incident Location</h3>

        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <input
            type="text"
            placeholder="Search city, area, street or landmark"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="button" onClick={searchLocation}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <p>Select a place by searching or clicking directly on the map.</p>

        <MapContainer
          center={defaultPosition}
          zoom={5}
          style={{
            height: "350px",
            width: "100%",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClick
            setPosition={setPosition}
            setLocation={setLocation}
          />

          <MapUpdater position={position} />

          {position && (
            <Marker position={position} icon={markerIcon} />
          )}
        </MapContainer>

        <input
          type="text"
          placeholder="Selected Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {position && (
          <p>
            Latitude: {position[0].toFixed(5)} |
            Longitude: {position[1].toFixed(5)}
          </p>
        )}

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