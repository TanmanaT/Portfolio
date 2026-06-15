import React, { useEffect, useRef } from "react";

export const SparkleTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let sparkles = [];
    const colors = ["#ff9a8b", "#ffb3ba", "#baffc9", "#bae1ff", "#ffffba", "#e8c4ff"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e) => {
      if (Math.random() > 0.3) {
        sparkles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5, // drift upwards slightly
          size: Math.random() * 6 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1.0,
          decay: Math.random() * 0.02 + 0.02,
          isHeart: false
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleSpawnHearts = (e) => {
      const { x, y } = e.detail || {};
      const targetX = x || window.innerWidth / 2;
      const targetY = y || window.innerHeight / 2;
      for (let i = 0; i < 15; i++) {
        sparkles.push({
          x: targetX,
          y: targetY,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5 - 2, // burst upwards
          size: Math.random() * 8 + 8,
          color: "#ffb3ba", // pink hearts
          alpha: 1.0,
          decay: Math.random() * 0.015 + 0.015,
          isHeart: true
        });
      }
    };
    window.addEventListener("spawn-hearts", handleSpawnHearts);

    let animationFrame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        
        const r = s.size;
        if (s.isHeart) {
          // Draw a beautiful vector heart
          ctx.beginPath();
          ctx.moveTo(s.x, s.y - r * 0.3);
          ctx.bezierCurveTo(s.x - r * 0.5, s.y - r * 0.8, s.x - r, s.y - r * 0.3, s.x - r, s.y + r * 0.2);
          ctx.bezierCurveTo(s.x - r, s.y + r * 0.7, s.x - r * 0.2, s.y + r, s.x, s.y + r * 1.2);
          ctx.bezierCurveTo(s.x + r * 0.2, s.y + r, s.x + r, s.y + r * 0.7, s.x + r, s.y + r * 0.2);
          ctx.bezierCurveTo(s.x + r, s.y - r * 0.3, s.x + r * 0.5, s.y - r * 0.8, s.x, s.y - r * 0.3);
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw a cute 4-point sparkle star shape
          ctx.beginPath();
          ctx.moveTo(s.x, s.y - r);
          ctx.quadraticCurveTo(s.x, s.y, s.x + r, s.y);
          ctx.quadraticCurveTo(s.x, s.y, s.x, s.y + r);
          ctx.quadraticCurveTo(s.x, s.y, s.x - r, s.y);
          ctx.quadraticCurveTo(s.x, s.y, s.x, s.y - r);
          ctx.closePath();
          ctx.fill();

          // Draw a bright white center core for high-fidelity sparkle glow
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          const core = r * 0.4;
          ctx.moveTo(s.x, s.y - core);
          ctx.quadraticCurveTo(s.x, s.y, s.x + core, s.y);
          ctx.quadraticCurveTo(s.x, s.y, s.x, s.y + core);
          ctx.quadraticCurveTo(s.x, s.y, s.x - core, s.y);
          ctx.quadraticCurveTo(s.x, s.y, s.x, s.y - core);
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.restore();
      }

      animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("spawn-hearts", handleSpawnHearts);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999
      }}
    />
  );
};
