import React, { useState, useEffect, useRef } from "react";
import { playMeow } from "./SynthesizedAudio";
import { useTheme } from "../context/ThemeContext";

// Pixel art representations of a cat using SVG grids to render perfectly pixelated cats.
const PixelCatSVG = ({ pose, color = "#ff9a8b" }) => {
  const primary = color;
  const secondary = "#fff";
  const accent = "#ffb3ba";
  const dark = "#4a3b32";

  const poses = {
    stand: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0],
      [0,1,2,2,1,0,0,1,2,2,1,0,0,0,0,0],
      [0,1,2,4,2,1,1,2,4,2,1,0,0,0,0,0],
      [0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
      [0,1,2,5,2,2,2,2,5,2,1,0,0,0,0,0],
      [0,1,2,2,2,1,1,2,2,2,1,0,0,1,1,0],
      [0,0,1,2,2,4,4,2,2,1,0,0,1,2,1],
      [0,0,0,1,2,2,2,2,1,0,0,1,2,2,1],
      [0,0,1,2,2,2,2,2,2,1,1,2,2,1,0],
      [0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
      [0,1,2,3,2,3,2,3,2,3,2,1,0,0,0],
      [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0],
      [0,0,1,1,2,2,1,1,2,2,1,0,0,0,0],
      [0,0,0,1,3,1,0,1,3,1,0,0,0,0,0],
      [0,0,0,0,1,1,0,0,1,1,0,0,0,0,0]
    ],
    walk1: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0],
      [0,1,2,2,1,0,0,1,2,2,1,0,0,0,0,0],
      [0,1,2,4,2,1,1,2,4,2,1,0,0,0,0,0],
      [0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
      [0,1,2,5,2,2,2,2,5,2,1,0,0,0,0,0],
      [0,1,2,2,2,1,1,2,2,2,1,0,0,0,0,0],
      [0,0,1,2,2,4,4,2,2,1,0,0,1,1,0],
      [0,0,0,1,2,2,2,2,1,0,1,1,2,1],
      [0,0,1,2,2,2,2,2,2,1,2,2,2,1],
      [0,1,2,2,2,2,2,2,2,2,2,2,1,0],
      [0,1,2,3,2,3,2,3,2,3,2,1,0,0],
      [0,0,1,1,2,2,1,1,2,2,1,0,0,0],
      [0,0,0,1,3,1,0,1,2,1,0,0,0,0],
      [0,0,0,0,1,1,0,1,3,1,0,0,0,0],
      [0,0,0,0,0,0,0,0,1,1,0,0,0,0]
    ],
    walk2: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0],
      [0,1,2,2,1,0,0,1,2,2,1,0,0,0,0,0],
      [0,1,2,4,2,1,1,2,4,2,1,0,0,0,0,0],
      [0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
      [0,1,2,5,2,2,2,2,5,2,1,0,0,0,0,0],
      [0,1,2,2,2,1,1,2,2,2,1,0,1,1,0],
      [0,0,1,2,2,4,4,2,2,1,0,1,2,1],
      [0,0,0,1,2,2,2,2,1,0,1,2,2,1],
      [0,0,1,2,2,2,2,2,2,1,1,2,1,0],
      [0,1,2,2,2,2,2,2,2,2,2,2,1,0],
      [0,1,2,3,2,3,2,3,2,3,2,1,0,0],
      [0,0,1,1,2,2,1,1,2,2,1,0,0,0],
      [0,0,0,1,2,1,0,1,3,1,0,0,0,0],
      [0,0,0,1,3,1,0,0,1,1,0,0,0,0],
      [0,0,0,0,1,1,0,0,0,0,0,0,0,0]
    ],
    sit: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0],
      [0,1,2,2,1,0,0,1,2,2,1,0,0,0,0,0],
      [0,1,2,4,2,1,1,2,4,2,1,0,0,0,0,0],
      [0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
      [0,1,2,5,2,2,2,2,5,2,1,0,0,0,0,0],
      [0,1,2,2,2,1,1,2,2,2,1,0,0,0,0,0],
      [0,0,1,2,2,4,4,2,2,1,0,0,1,1,0],
      [0,0,0,1,2,2,2,2,1,0,1,1,2,1],
      [0,0,1,2,2,2,2,2,2,1,2,2,1,0],
      [0,1,2,2,2,2,2,2,2,2,2,1,0,0],
      [0,1,2,3,2,2,2,2,3,2,1,0,0,0],
      [0,1,2,2,3,2,2,3,2,2,1,0,0,0],
      [0,0,1,2,2,2,2,2,2,1,0,0,0,0],
      [0,0,0,1,3,1,1,3,1,0,0,0,0,0],
      [0,0,0,0,1,1,1,1,0,0,0,0,0,0]
    ],
    sleep: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0],
      [0,0,0,0,1,2,2,1,1,2,2,1,0,0,0,0],
      [0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0],
      [0,0,0,1,2,2,2,2,2,2,2,2,1,0,0,0],
      [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
      [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
      [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
      [0,0,1,2,3,2,2,3,2,2,3,2,2,1,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]
  };

  const grid = poses[pose] || poses.stand;

  return (
    <svg width="48" height="48" viewBox="0 0 16 16" style={{ imageRendering: "pixelated" }}>
      {grid.map((row, y) =>
        row.map((pixel, x) => {
          if (pixel === 0) return null;
          let fillColor = dark;
          if (pixel === 2) fillColor = primary;
          if (pixel === 3) fillColor = secondary;
          if (pixel === 4) fillColor = accent;
          if (pixel === 5) fillColor = pose === "sleep" ? dark : "#99e556"; // green eyes or dark line

          return (
            <rect
              key={`${y}-${x}`}
              x={x}
              y={y}
              width="1"
              height="1"
              fill={fillColor}
            />
          );
        })
      )}
    </svg>
  );
};

const THEME_CAT_COLORS = {
  strawberry: "#ff9a8b",
  mint:       "#7bb591",
  blueberry:  "#79a1eb",
  peach:      "#f7a072",
};

export const WanderingCat = () => {
  const theme = useTheme();
  const [position, setPosition] = useState(15); // horizontal % position
  const [pose, setPose] = useState("stand"); // stand, walk1, walk2, sit, sleep
  const [direction, setDirection] = useState("right"); // left, right
  const [meowText, setMeowText] = useState("");
  const actionTimeoutRef = useRef(null);

  // Friendship Mini-Game state
  const [friendship, setFriendship] = useState(1);
  const [hearts, setHearts] = useState(0);
  const [treatX, setTreatX] = useState(null);
  const [treatY, setTreatY] = useState(null);

  // Keep ref in sync so the RAF/timeout loop can read latest friendship
  useEffect(() => { friendshipRef.current = friendship; }, [friendship]);
  
  // Track treat coordinates for drawing
  const currentPosRef = useRef(15);
  const targetTreatRef = useRef(null);
  // Mirror friendship in a ref so the behavior loop (closure) can read it
  const friendshipRef = useRef(1);

  useEffect(() => {
    let currentPos = currentPosRef.current;
    let currentDir = "right";
    let isMoving = false;
    let animationFrame;

    const behaviorLoop = () => {
      // If cat is chasing a treat, skip normal random wander behaviors
      if (targetTreatRef.current !== null) {
        actionTimeoutRef.current = setTimeout(behaviorLoop, 1000);
        return;
      }

      const rand = Math.random();
      // Level 5 cat is too full and fat — always sleeps, never walks
      if (friendshipRef.current >= 5) {
        isMoving = false;
        setPose("sleep");
        actionTimeoutRef.current = setTimeout(behaviorLoop, 5000);
        return;
      }
      if (rand < 0.4) {
        isMoving = true;
        currentDir = Math.random() > 0.5 ? "right" : "left";
        setDirection(currentDir);
      } else if (rand < 0.75) {
        isMoving = false;
        setPose("sit");
      } else {
        isMoving = false;
        setPose("sleep");
      }

      actionTimeoutRef.current = setTimeout(behaviorLoop, 3000 + Math.random() * 3000);
    };

    const updatePosition = () => {
      // Treat chasing pathfinding
      if (targetTreatRef.current !== null) {
        isMoving = true;
        const target = targetTreatRef.current;
        
        // Move towards treat
        if (currentPos < target) {
          currentPos += 0.8; // move faster to get food
          currentDir = "right";
          setDirection("right");
        } else {
          currentPos -= 0.8;
          currentDir = "left";
          setDirection("left");
        }

        // Toggle walking pose frames
        setPose(prev => (prev === "walk1" ? "walk2" : "walk1"));

        // Cat reaches treat!
        if (Math.abs(currentPos - target) < 1.5) {
          isMoving = false;
          setPose("sit");
          targetTreatRef.current = null;
          setTreatX(null);
          setTreatY(null);
          
          // Confetti hearts trigger
          window.dispatchEvent(
            new CustomEvent("spawn-hearts", {
              detail: {
                x: window.innerWidth * (currentPos / 100),
                y: window.innerHeight - 50
              }
            })
          );

          playMeow();
          setMeowText("Yum! 🐟💖");
          
          setHearts(prev => {
            const nextHearts = prev + 1;
            if (nextHearts >= 3) {
              setFriendship(lvl => lvl + 1);
              setMeowText("Lvl Up! Besties! 💕🐾");
              return 0;
            }
            return nextHearts;
          });

          setTimeout(() => {
            setMeowText("");
          }, 2500);
        }
      } else if (isMoving) {
        // Standard wander position updates
        setPose(prev => (prev === "walk1" ? "walk2" : "walk1"));
        if (currentDir === "right") {
          currentPos += 0.4;
          if (currentPos > 85) {
            currentDir = "left";
            setDirection("left");
          }
        } else {
          currentPos -= 0.4;
          if (currentPos < 8) {
            currentDir = "right";
            setDirection("right");
          }
        }
      }

      currentPosRef.current = currentPos;
      setPosition(currentPos);
      animationFrame = setTimeout(updatePosition, 150);
    };

    behaviorLoop();
    updatePosition();

    return () => {
      clearTimeout(actionTimeoutRef.current);
      clearTimeout(animationFrame);
    };
  }, []);

  const spawnFish = (e) => {
    e.stopPropagation();
    if (treatX !== null) return; // one treat at a time
    playMeow();
    
    // Pick a random falling x location near the cat
    const randomOffset = (Math.random() - 0.5) * 40; // drop relative to screen middle/cat
    const dropX = Math.max(10, Math.min(85, currentPosRef.current + randomOffset));
    
    setTreatX(dropX);
    setTreatY(0);
    targetTreatRef.current = dropX;

    // Simulate falling treat animation
    let y = 0;
    const fallInterval = setInterval(() => {
      y += 10;
      if (y >= window.innerHeight - 60) {
        clearInterval(fallInterval);
      } else {
        setTreatY(y);
      }
    }, 40);
  };

  const handleCatClick = () => {
    playMeow();
    const meows = ["Meow! 🐾", "Mew~ 🎀", "Purrr... ✨", "Nyaaa~ 🐱", "Feed me code! 💻"];
    const randomMeow = meows[Math.floor(Math.random() * meows.length)];
    setMeowText(randomMeow);
    setPose("sit");
    setTimeout(() => {
      setMeowText("");
    }, 2000);
  };

  return (
    <>
      {/* Falling fish treat */}
      {treatX !== null && (
        <div
          style={{
            position: "fixed",
            left: `${treatX}%`,
            top: `${treatY}px`,
            fontSize: "24px",
            zIndex: 9997,
            pointerEvents: "none",
            animation: "wobble 1s infinite alternate"
          }}
        >
          🐟
        </div>
      )}

      {/* Wandering Cat container */}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: `${position}%`,
          zIndex: 9999,
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {/* Dialogue Bubble */}
        {meowText && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "2px solid #4a3b32",
              borderRadius: "8px",
              padding: "3px 8px",
              fontSize: "10px",
              fontWeight: "bold",
              color: "#4a3b32",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              animation: "floatMeow 2s ease-in-out infinite",
              fontFamily: "'Fredoka', sans-serif",
              marginBottom: "8px"
            }}
          >
            {meowText}
          </div>
        )}

        {/* Friendship Heart Stats Bubble & Feed control */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            border: "1.5px solid #4a3b32",
            borderRadius: "12px",
            padding: "2px 8px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            boxShadow: "2px 2px 0px #4a3b32",
            marginBottom: "5px",
            pointerEvents: "auto"
          }}
        >
          <span style={{ fontSize: "9px", fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}>
            {friendship >= 5 ? "😴 Chonk Lvl MAX" : `Lvl ${friendship} ${"💖".repeat(hearts) || "🤍"}`}
          </span>
          {friendship < 5 && (
            <button
              onClick={spawnFish}
              disabled={treatX !== null}
              style={{
                background: "var(--accent-color)",
                border: "1px solid #4a3b32",
                borderRadius: "6px",
                padding: "1px 5px",
                fontSize: "8px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Feed 🐟
            </button>
          )}
          {friendship >= 5 && (
            <span style={{ fontSize: "9px" }}>Zzz 💤</span>
          )}
        </div>

        {/* Cat Sprite Render — gets fatter with each friendship level */}
        {(() => {
          // Scale map: level 1 = normal, level 5 = very chonky
          const scaleMap = { 1: 1, 2: 1.12, 3: 1.28, 4: 1.48, 5: 1.72 };
          const fatScale = scaleMap[Math.min(friendship, 5)] ?? 1;
          // At level 5 always force sleep pose visually
          const displayPose = friendship >= 5 ? "sleep" : pose;
          return (
            <div
              onClick={handleCatClick}
              title={friendship >= 5 ? "Zzz... 😴 (too full to move)" : "Click to meow!"}
              style={{
                cursor: "pointer",
                transform: `scaleX(${direction === "right" ? fatScale : -fatScale}) scaleY(${fatScale})`,
                transformOrigin: "bottom center",
                transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)"
              }}
            >
              <PixelCatSVG pose={displayPose} color={THEME_CAT_COLORS[theme] ?? "#ff9a8b"} />
            </div>
          );
        })()}
      </div>
    </>
  );
};
