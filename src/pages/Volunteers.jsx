import { useState } from "react";

function Volunteers() {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [message, setMessage] = useState("");

  function handleVolunteer(e) {
    e.preventDefault();

    if (!name || !skill) {
      setMessage("Please fill in all fields.");
      return;
    }

    const volunteers =
      JSON.parse(localStorage.getItem("dms_volunteers")) || [];

    const newVolunteer = {
      id: Date.now(),
      name,
      skill,
      joinedDate: new Date().toLocaleDateString(),
    };

    volunteers.push(newVolunteer);

    localStorage.setItem(
      "dms_volunteers",
      JSON.stringify(volunteers)
    );

    setMessage("Thank you for registering as a volunteer!");

    setName("");
    setSkill("");
  }

  return (
    <div className="form-page">
      <h2>🙋 Volunteer Registration</h2>
      <p>Join our disaster response volunteer network.</p>

      <form className="incident-form" onSubmit={handleVolunteer}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Your Skills (e.g., First Aid)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <button type="submit">Register as Volunteer</button>
      </form>

      <p className="message">{message}</p>
    </div>
  );
}

export default Volunteers;