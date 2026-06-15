import React, { useState, useEffect } from "react";
import { playMeow } from "./SynthesizedAudio";

export const NekoHelper = () => {
  const [bubbleText, setBubbleText] = useState("Hi! I'm Neko-chan! Scroll around to explore! 🐾");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Dialog map based on ID values of page sections
    const dialogs = {
      hero: "Hi, welcome! Scroll down to explore Tanmana's tech skills! 🐾",
      console: "You can type commands in the neko-terminal! Try typing 'secret'! 📟",
      skills: "A lot of cool tech here! Click any skill tag for a bubble pop! ⚡",
      projects: "Here are some cool projects! Try filtering them by category! 📂",
      experience: "IIT Guwahati and NIELIT research internships! Pretty cool! 🎓",
      volunteer: "NSS community work! Giving back is super important! 🌟",
      footer: "Thanks for visiting! Feel free to reach out via email! 🎀"
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -40% 0px", // focus on the middle section of the screen
      threshold: 0.15
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (dialogs[id]) {
            setBubbleText(dialogs[id]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Grab elements by id
    const sections = ["hero", "console", "skills", "projects", "experience", "volunteer", "footer"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        zIndex: 9998,
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",
        fontFamily: "'Fredoka', sans-serif",
        pointerEvents: "none",
        userSelect: "none",
        animation: "floatHelper 3.5s ease-in-out infinite"
      }}
    >
      {/* Speech bubble */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          border: "2px solid #4a3b32",
          borderRadius: "15px",
          padding: "10px 14px",
          fontSize: "12px",
          fontWeight: "bold",
          color: "#4a3b32",
          maxWidth: "180px",
          boxShadow: "4px 4px 0px #4a3b32",
          position: "relative",
          pointerEvents: "auto"
        }}
      >
        {bubbleText}
        {/* Cute speech bubble arrow */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "-8px",
            width: "0",
            height: "0",
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderLeft: "8px solid #4a3b32"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "11px",
            right: "-6px",
            width: "0",
            height: "0",
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            borderLeft: "7px solid white"
          }}
        />
      </div>

      {/* Cute Helper Pixel Cat Mascot */}
      <div
        style={{
          width: "48px",
          height: "48px",
          background: "var(--secondary-color)",
          border: "3px solid #4a3b32",
          borderRadius: "50%",
          boxShadow: "3px 3px 0px #4a3b32",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          pointerEvents: "auto",
          cursor: "pointer"
        }}
        onClick={() => {
          setBubbleText("Nyaa~ I love debugging at 3 AM! 🐾");
          playMeow();
        }}
      >
        😺
      </div>
    </div>
  );
};
