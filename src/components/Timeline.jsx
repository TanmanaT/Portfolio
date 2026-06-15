import React from "react";

export const Timeline = ({ items }) => {
  return (
    <div className="timeline-wrapper">
      {items.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-marker">
            <span className="marker-emoji">{item.logo}</span>
          </div>
          <div className="timeline-content-card">
            <div className="timeline-card-header">
              <h3 className="timeline-role">{item.role}</h3>
              <span className="timeline-duration">{item.duration}</span>
            </div>
            <h4 className="timeline-company">{item.company}</h4>
            {item.location && <span className="timeline-location">📍 {item.location}</span>}
            <p className="timeline-description">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
