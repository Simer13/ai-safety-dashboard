import React, { useState } from "react";
import IncidentList from "../components/IncidentList";
import ReportIncidentForm from "../components/ReportIncidentForm";

export default function Home() {
  const [incidents, setIncidents] = useState([
    { id: 1, title: "Broken Traffic Light", severity: "High", description: "Traffic light not working at Main Street", reported_at: "2025-03-15T00:00:00Z" },
    { id: 2, title: "Pothole on 5th Ave", severity: "Medium", description: "Large pothole causing problems", reported_at: "2025-03-16T00:00:00Z" },
    { id: 3, title: "Biased Recommendation Algorithm", severity: "Medium", description: "Algorithm consistently favored certain demographics", reported_at: "2025-03-15T10:00:00Z" },
  ]);

  const [filter, setFilter] = useState("All");

  const addIncident = (newIncident) => {
    setIncidents((prev) => [newIncident, ...prev]);
  };

  const deleteIncident = (id) => {
    setIncidents((prev) => prev.filter((incident) => incident.id !== id));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter incidents based on selected filter
  const filteredIncidents = incidents.filter((incident) => {
    if (filter === "All") return true;
    return incident.severity === filter;
  });

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1>Incident Dashboard</h1>

      {/* Filter Dropdown */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="filter">Filter by Severity: </label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Add New Incident Form */}
      <ReportIncidentForm onAddIncident={addIncident} />

      {/* Incident List */}
      <IncidentList incidents={filteredIncidents} onDelete={deleteIncident} />
    </div>
  );
}
