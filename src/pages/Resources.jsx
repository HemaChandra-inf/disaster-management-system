function Resources() {
  const resources = [
    {
      name: "Emergency Shelter",
      description: "Safe temporary accommodation for affected people.",
      availability: "Available",
    },
    {
      name: "Food and Water",
      description: "Essential food and clean drinking water supplies.",
      availability: "Available",
    },
    {
      name: "Medical Support",
      description: "First aid and emergency medical assistance.",
      availability: "Limited",
    },
    {
      name: "Emergency Transport",
      description: "Transportation for evacuation and rescue.",
      availability: "Available",
    },
  ];

  return (
    <div className="resources-page">
      <h2>📦 Emergency Resources</h2>
      <p>Available resources for disaster-affected areas.</p>

      <div className="resource-grid">
        {resources.map((resource, index) => (
          <div className="resource-card" key={index}>
            <h3>{resource.name}</h3>
            <p>{resource.description}</p>
            <span>{resource.availability}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;