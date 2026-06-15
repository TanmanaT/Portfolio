import { useCallback } from "react";

/**
 * useTilt – Returns onMouseMove / onMouseLeave handlers that apply a
 * subtle 3-D rotation + glare to a card element.
 *
 * @param {React.RefObject} ref   – ref attached to the card element
 * @param {number}          maxDeg – maximum tilt degrees (default 12)
 */
export const useTilt = (ref, maxDeg = 12) => {
  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // cursor x inside card
      const y = e.clientY - rect.top;  // cursor y inside card
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Normalise to -1 … +1
      const rotY = ((x - cx) / cx) * maxDeg;
      const rotX = -((y - cy) / cy) * maxDeg;

      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
      el.style.transition = "transform 0.1s ease";

      // Move glare overlay
      const glare = el.querySelector(".card-glare");
      if (glare) {
        const gx = (x / rect.width) * 100;
        const gy = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.28) 0%, transparent 70%)`;
        glare.style.opacity = "1";
      }
    },
    [ref, maxDeg]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.transition = "transform 0.4s ease";

    const glare = el.querySelector(".card-glare");
    if (glare) {
      glare.style.opacity = "0";
    }
  }, [ref]);

  return { onMouseMove, onMouseLeave };
};
