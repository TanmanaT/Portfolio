import React, { useState, useEffect, useRef } from "react";

const STATS = [
  { emoji: "🧪", target: 2,  label: "Internships",        suffix: "",  color: "#ff9a8b" },
  { emoji: "📂", target: 3,  label: "Projects Built",     suffix: "+", color: "#79a1eb" },
  { emoji: "🌿", target: 1,  label: "Year NSS Volunteer", suffix: "+", color: "#7bb591" },
  { emoji: "⚡", target: 3,  label: "Skill Domains",      suffix: "",  color: "#f7a072" },
];

const useCountUp = (target, isVisible, duration = 1400) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let rafId = null;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(target); // ensure exact final value
      }
    };

    rafId = requestAnimationFrame(step);

    // Cleanup: cancel any in-flight animation frame (fixes React StrictMode double-mount)
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVisible, target, duration]);

  return count;
};


const StatTile = ({ emoji, target, label, suffix, color, isVisible, delay = 0 }) => {
  const count = useCountUp(target, isVisible);
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const t = setTimeout(() => setPopped(true), delay);
      return () => clearTimeout(t);
    }
  }, [isVisible, delay]);

  return (
    <div className={`stat-tile${popped ? " stat-tile--popped" : ""}`}>
      {/* Decorative accent blob */}
      <div className="stat-tile-blob" style={{ background: color }} />

      <div className="stat-emoji">{emoji}</div>

      <div className="stat-number" style={{ color }}>
        {count}
        {suffix}
      </div>

      <div className="stat-label">{label}</div>

      {/* Bottom accent line */}
      <div className="stat-accent-line" style={{ background: color }} />
    </div>
  );
};

export const StatsBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-bar" ref={ref} id="stats">
      {STATS.map((stat, i) => (
        <StatTile key={stat.label} {...stat} isVisible={isVisible} delay={i * 120} />
      ))}
    </div>
  );
};
