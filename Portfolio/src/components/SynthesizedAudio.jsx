// Web Audio API Synthesizer for cute retro meow and bubble sounds without any external file dependencies.
let audioCtx = null;
let musicInterval = null;
let currentMusicSource = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
};

export const playMeow = () => {
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle"; // Warm, cute retro sound
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    
    // Meow pitch sweep (starts low, goes high, decays down)
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.35);

    // Gain envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.start(now);
    osc.stop(now + 0.5);
  } catch (e) {
    console.warn("Audio Context failed to play meow:", e);
  }
};

export const playBubble = () => {
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {
    // ignore
  }
};

// Play a gentle, synthesized cozy retro music loop
export const startCozyMusic = () => {
  try {
    initAudio();
    let index = 0;
    // Cute pentatonic scale notes (C4, D4, E4, G4, A4, C5)
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

    const playChime = () => {
      const now = audioCtx.currentTime;
      // Play a soft chord (3 overlapping note chimes)
      const baseNote = notes[Math.floor(Math.random() * notes.length)];
      const third = notes[(notes.indexOf(baseNote) + 2) % notes.length];
      const fifth = notes[(notes.indexOf(baseNote) + 4) % notes.length];

      [baseNote, third * 0.5, fifth].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0, now + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.02, now + i * 0.1 + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 1.8);

        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 2.0);
      });
    };

    // Trigger chimes periodically
    playChime();
    musicInterval = setInterval(playChime, 3000);
  } catch (e) {
    console.warn("Lofi chimes failed to start:", e);
  }
};

export const stopCozyMusic = () => {
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
};
