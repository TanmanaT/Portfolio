import React, { useState, useEffect } from "react";

/**
 * Typewriter – Reveals `text` one character at a time.
 * Shows a blinking cursor while typing; fades it out when done.
 *
 * Props:
 *   text      {string}  – the text to animate
 *   speed     {number}  – ms between characters (default 55)
 *   delay     {number}  – ms before starting (default 0)
 *   className {string}  – forwarded to the wrapper span
 */
export const Typewriter = ({ text = "", speed = 55, delay = 0, className = "" }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);

    let startTimeout;
    let interval;

    startTimeout = setTimeout(() => {
      let idx = 0;
      interval = setInterval(() => {
        idx++;
        setDisplayed(text.slice(0, idx));
        if (idx >= text.length) {
          clearInterval(interval);
          // Keep cursor blinking briefly, then mark done
          setTimeout(() => setDone(true), 800);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayed}
      <span className={`typewriter-cursor${done ? " typewriter-cursor--done" : ""}`}>|</span>
    </span>
  );
};
