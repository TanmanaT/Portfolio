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

      <div className="project-card-badge">
        {Array.isArray(project.category) ? project.category.join(" & ") : project.category}
      </div>
      <div className="project-card-header">
        <FolderGit2 className="project-folder-icon" size={24} />
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link-icon"
              title="GitHub Repository"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          )}
          {project.demoLink && (
            <a 
              href={project.demoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link-icon"
              title="Live Dashboard"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
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
      : projects.filter((p) => {
          if (Array.isArray(p.category)) {
            return p.category.some((cat) => cat.toLowerCase() === filter.toLowerCase());
          }
          return p.category.toLowerCase() === filter.toLowerCase();
        });

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
