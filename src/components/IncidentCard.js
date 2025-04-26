import React, { useState, useEffect } from "react";

const IncidentCard = ({ incident, onDelete }) => {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    // Only format the date on the client-side
    setFormattedDate(new Date(incident.reported_at).toLocaleDateString());
  }, [incident.reported_at]);

  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
      <h3>{incident.title}</h3>
      <p>Severity: {incident.severity}</p>

      {/* Render formatted date only after client-side rendering */}
      {formattedDate && <p>Reported Date: {formattedDate}</p>}

      {/* View Details Button */}
      <button onClick={toggleDetails} style={{ marginTop: "0.5rem" }}>
        {showDetails ? "Hide Details" : "View Details"}
      </button>
      
      {/* Toggle Description */}
      {showDetails && <p>{incident.description}</p>}

      {/* Delete Button */}
      <button 
        onClick={() => onDelete(incident.id)} 
        style={{ marginTop: "0.5rem", backgroundColor: "red", color: "white" }}>
        Delete
      </button>
    </div>
  );
};

export default IncidentCard;
