import React, { useState, useEffect } from "react";
import { playBubble } from "./SynthesizedAudio";

const PawSVG = ({ active }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    style={{
      fill: active ? "var(--primary-color)" : "transparent",
      stroke: "var(--border-color)",
      strokeWidth: "2",
      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    }}
  >
    <path d="M7 16c0-2 2-3.5 5-3.5s5 1.5 5 3.5c0 1.5-1.5 2.5-5 2.5s-5-1-5-2.5z" />
    <circle cx="5" cy="11" r="2.2" />
    <circle cx="9.5" cy="8" r="2.5" />
    <circle cx="14.5" cy="8" r="2.5" />
    <circle cx="19" cy="11" r="2.2" />
  </svg>
);

export const PawNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "console", label: "Terminal" },
    { id: "skills", label: "Tech Stack" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "volunteer", label: "Volunteering" },
    { id: "footer", label: "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Force footer highlight if user has scrolled to the absolute bottom
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("footer");
        return;
      }

      let currentSection = "hero";
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            currentSection = item.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    playBubble();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="paw-nav-sidebar">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <div
            key={item.id}
            className={`paw-nav-item ${isActive ? "active" : ""}`}
            onClick={() => handleNavClick(item.id)}
            title={item.label}
          >
            <span className="paw-nav-tooltip">{item.label}</span>
            <div className="paw-icon-container">
              <PawSVG active={isActive} />
            </div>
          </div>
        );
      })}
    </nav>
  );
};
