import React, { useState, useEffect } from "react";
import { portfolioData } from "./data/portfolioData";
import { WanderingCat } from "./components/WanderingCat";
import { InteractiveTerminal } from "./components/InteractiveTerminal";
import { Timeline } from "./components/Timeline";
import { ProjectGrid } from "./components/ProjectGrid";
import { SparkleTrail } from "./components/SparkleTrail";
import { NekoHelper } from "./components/NekoHelper";
import { PawNavigation } from "./components/PawNavigation";
import { StatsBar } from "./components/StatsBar";
import { Typewriter } from "./components/Typewriter";
import { playBubble, startCozyMusic, stopCozyMusic } from "./components/SynthesizedAudio";
import { ThemeContext } from "./context/ThemeContext";
import { Mail, Sparkles, Heart, Volume2, VolumeX } from "lucide-react";

// Inline Custom Brand SVGs to prevent dependency issues with lucide-react brand icon removals
const GithubIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
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
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

function App() {
  const { profile, skills, experience, volunteer, projects } = portfolioData;
  const [theme, setTheme] = useState("strawberry");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Sync theme selection to document body
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Clean up music loop on component unmount
  useEffect(() => {
    return () => {
      stopCozyMusic();
    };
  }, []);

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal-section");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const cycleTheme = () => {
    playBubble();
    const themes = ["strawberry", "mint", "blueberry", "peach"];
    const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIdx]);
  };

  const toggleMusic = () => {
    playBubble();
    if (isMusicPlaying) {
      stopCozyMusic();
    } else {
      startCozyMusic();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <ThemeContext.Provider value={theme}>
    <div className="app-container">
      {/* Cuteness upgrades: Sparkles, Cat mascot, Dialog Guide */}
      <SparkleTrail />
      <WanderingCat />
      <NekoHelper />
      <PawNavigation />

      {/* Floating Drifting Background elements */}
      <div className="drifting-cloud" style={{ top: "15%", animationDelay: "0s" }}>☁️</div>
      <div className="drifting-cloud" style={{ top: "45%", animationDelay: "10s", fontSize: "36px" }}>🎈</div>
      <div className="drifting-cloud" style={{ top: "75%", animationDelay: "5s", fontSize: "28px" }}>🌸</div>
      <div className="drifting-cloud" style={{ top: "25%", animationDelay: "18s", fontSize: "24px" }}>✨</div>

      {/* Top Controls Bar */}
      <div className="top-controls">
        <button
          onClick={toggleMusic}
          className="control-btn"
          title={isMusicPlaying ? "Mute Lofi Ambient" : "Play Cozy Lofi Ambient"}
        >
          {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        <button
          onClick={cycleTheme}
          className="control-btn"
          title="Cycle Theme Style"
        >
          🐾
        </button>
      </div>

      {/* Hero Header */}
      <header className="hero-card" id="hero">
        <div className="hero-layout">
          <div className="avatar-wrapper">
            <div className="avatar-frame">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  className="avatar-image"
                  alt={profile.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                    const fallback = document.createElement("div");
                    fallback.className = "avatar-placeholder";
                    fallback.innerText = "🐱";
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
              ) : (
                <div className="avatar-placeholder">🐱</div>
              )}
            </div>
            <div className="status-badge">{profile.status}</div>
          </div>
          <div className="hero-info">
            <h1 className="hero-name">
              <Typewriter text={profile.name} speed={60} delay={200} />
            </h1>
            <p className="hero-tagline">
              <Typewriter text={profile.subtitle} speed={35} delay={profile.name.length * 60 + 600} />
            </p>
            <p className="hero-bio">{profile.about}</p>
            <div className="hero-socials">
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
                <GithubIcon size={20} />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                <LinkedinIcon size={20} />
              </a>
              <a href={profile.socials.email} className="social-icon-btn" title="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Counter Row */}
      <StatsBar />

      {/* Interactive terminal.sh */}
      <section className="reveal-section" id="console">
        <h2 className="section-title">
          <span className="title-emoji">📟</span> Interactive Console
        </h2>
        <InteractiveTerminal />
      </section>

      {/* Skills Showcase */}
      <section className="reveal-section" id="skills">
        <h2 className="section-title">
          <span className="title-emoji">⚡</span> Tech Stack
        </h2>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <div key={index} className="skill-tag" onClick={playBubble}>
              <Sparkles size={14} style={{ color: "var(--primary-color)" }} />
              {skill.name}
            </div>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="reveal-section" id="projects">
        <h2 className="section-title">
          <span className="title-emoji">📂</span> Projects
        </h2>
        <ProjectGrid projects={projects} />
      </section>

      {/* Experience Timeline */}
      <section className="reveal-section" id="experience">
        <h2 className="section-title">
          <span className="title-emoji">⏳</span> Experience
        </h2>
        <Timeline items={experience} />
      </section>

      {/* Volunteer Work */}
      <section className="reveal-section" id="volunteer">
        <h2 className="section-title">
          <span className="title-emoji">🌟</span> Volunteer Work
        </h2>
        <Timeline items={volunteer} />
      </section>

      {/* Footer / Connect */}
      <footer className="footer-card" id="footer">
        <h3 className="footer-text">Let's build something cute & smart together! 🐾</h3>
        <p>Feel free to reach out via email or LinkedIn.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
            <LinkedinIcon size={20} />
          </a>
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
            <GithubIcon size={20} />
          </a>
          <a href={profile.socials.email} className="social-icon-btn" title="Email">
            <Mail size={20} />
          </a>
        </div>
        <p className="footer-copy">
          Made with <Heart size={12} fill="var(--primary-color)" stroke="none" /> by Tanmana.
        </p>
      </footer>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
