import React from "react";
import IncidentCard from "./IncidentCard";

const IncidentList = ({ incidents, onDelete }) => {
  return (
    <div>
      {incidents.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default IncidentList;
