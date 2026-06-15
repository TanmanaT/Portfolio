import React, { useState, useRef } from "react";
import { FolderGit2, ExternalLink } from "lucide-react";
import { useTilt } from "../hooks/useTilt";

const TiltCard = ({ project }) => {
  const ref = useRef(null);
  const { onMouseMove, onMouseLeave } = useTilt(ref, 10);

  return (
    <div
      ref={ref}
      className="project-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Glare overlay — positioned by useTilt */}
      <div className="card-glare" aria-hidden="true" />

      <div className="project-card-badge">{project.category}</div>
      <div className="project-card-header">
        <FolderGit2 className="project-folder-icon" size={24} />
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-icon">
          <ExternalLink size={18} />
        </a>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag, tIdx) => (
          <span key={tIdx} className="project-tag">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const ProjectGrid = ({ projects }) => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "AI/ML", "Web Dev"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="projects-section-container">
      <div className="filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-tab-btn ${filter === cat ? "active" : ""}`}
          >
            {cat === "All" ? "✨ All" : cat}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map((project, idx) => (
          <TiltCard key={idx} project={project} />
        ))}
      </div>
    </div>
  );
};
