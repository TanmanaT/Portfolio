import React, { useState, useEffect, useRef } from "react";
import { Terminal, CornerDownLeft, Sparkles } from "lucide-react";
import { playBubble } from "./SynthesizedAudio";

export const InteractiveTerminal = () => {
  const [history, setHistory] = useState([
    { text: "NekoOS v1.0.0 initialized.", type: "system" },
    { text: "Type 'help' or click a command bubble below to interact!", type: "info" }
  ]);
  const [input, setInput] = useState("");
  const terminalBodyRef = useRef(null);

  const commands = {
    help: "Available commands: [about] [skills] [cat] [secret] [clear]",
    about: "Tanmana is a BTech CSE student at KIIT. Passionate about Web Development, AI/ML, building responsive Web apps, and exploring cool tools! 🚀",
    skills: "🌟 Core Skills:\n- Python, Java, C++, SQL\n- Machine Learning, NLP & Transformers, Computer Vision, Edge AI\n- HTML5, CSS3, JavaScript, React\n- Servlet & JSP, JDBC & MySQL, Pandas & Seaborn, Streamlit",
    cat: "   /\\_/\\\n  ( o.o )\n   > ^ <   *purr* ~ Meow! 🐾",
    secret: `🐾 Psst... see that little cat roaming the bottom of the screen?\n\n👀 Try feeding it fish (click 'Feed 🐟' above the cat).\n\nEvery 3 fish = Level Up. The more you feed it...\nthe CHONKIER it gets. 🐱➡️🐈‍⬛\n\nFeed it enough and it gets SO fat it just... gives up.\nLevel 5 = maximum chonk. It will never walk again. Just Zzz... 😴💤\n\nAlso: Tanmana survives on debugging and caffeine. ☕✨`
  };

  const handleCommand = (cmdText) => {
    playBubble();
    const cleanCmd = cmdText.trim().toLowerCase();
    const newHistory = [...history, { text: `> ${cmdText}`, type: "command" }];

    if (cleanCmd === "secret" || cleanCmd === "cat") {
      window.dispatchEvent(new CustomEvent("spawn-hearts"));
    }

    if (cleanCmd === "clear") {
      setHistory([]);
      return;
    }

    if (commands[cleanCmd]) {
      newHistory.push({ text: commands[cleanCmd], type: "response" });
    } else if (cleanCmd === "") {
      // do nothing
    } else {
      newHistory.push({ text: `Command not found: '${cmdText}'. Type 'help' for options.`, type: "error" });
    }

    setHistory(newHistory);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [history]);

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="terminal-title">
          <Terminal size={14} style={{ marginRight: "6px" }} />
          neko-terminal.sh
        </div>
        <div className="terminal-status">
          <Sparkles size={12} className="sparkle-icon" />
          <span>online</span>
        </div>
      </div>

      <div className="terminal-body" ref={terminalBodyRef}>
        {history.map((line, idx) => (
          <div key={idx} className={`terminal-line ${line.type}`}>
            {line.text}
          </div>
        ))}
      </div>

      <div className="terminal-input-container">
        <span className="terminal-prompt">cat@tanmana:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="type a command..."
          className="terminal-input"
        />
        <button className="terminal-enter-btn" onClick={() => { handleCommand(input); setInput(""); }}>
          <CornerDownLeft size={14} />
        </button>
      </div>

      <div className="terminal-presets">
        <span className="preset-label">Quick Commands:</span>
        {Object.keys(commands).map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="preset-btn"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
