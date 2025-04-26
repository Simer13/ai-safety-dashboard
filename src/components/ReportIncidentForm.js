import React, { useState } from "react";

const ReportIncidentForm = ({ onAddIncident }) => {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIncident = {
      id: Date.now(), // Unique ID
      title,
      severity,
      description,
      reported_at: new Date().toISOString(), // Current date/time
    };

    onAddIncident(newIncident);

    // Clear the form
    setTitle("");
    setSeverity("Low");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Report New Incident</h2>

      <input 
        type="text" 
        placeholder="Incident Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required
      />

      <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required
      />

      <button type="submit">Submit Incident</button>
    </form>
  );
};

export default ReportIncidentForm;
