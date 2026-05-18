import { useEffect, useRef, useState } from "react";

export function LumaCharacter({ mood, isReacting }) {
  const [currentScale, setCurrentScale] = useState(1);
  const [currentGlow, setCurrentGlow] = useState(12);
  const breathRef = useRef(0);

  useEffect(() => {
    let frame;
    const animate = () => {
      breathRef.current += 0.02;
      const breathe = Math.sin(breathRef.current) * 0.03;
      const targetScale = isReacting ? 1.18 : mood === "calm" ? 0.92 : mood === "animated" ? 1.1 : 1;
      const targetGlow  = isReacting ? 28   : mood === "calm" ? 6    : mood === "animated" ? 20  : 12;
      setCurrentScale((s) => s + (targetScale + breathe - s) * 0.12);
      setCurrentGlow((g)  => g + (targetGlow - g) * 0.1);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [mood, isReacting]);

  return (
    <>
      <style>{`
        @keyframes lumaFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes lumaEyes {
          0%,90%,100% { transform: scaleY(1); }
          95%          { transform: scaleY(0.1); }
        }
      `}</style>

      <div style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 10,
        animation: "lumaFloat 4s ease-in-out infinite",
        pointerEvents: "none",
      }}>
        <svg width="90" height="90" viewBox="0 0 90 90"
          style={{
            transform: `scale(${currentScale})`,
            filter: `drop-shadow(0 0 ${currentGlow}px rgba(160,100,255,0.8))`,
            transition: "transform 0.1s ease",
          }}>
          <defs>
            <radialGradient id="bodyGrad" cx="45%" cy="40%" r="55%">
              <stop offset="0%"   stopColor="#c084fc" />
              <stop offset="60%"  stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#4c1d95" />
            </radialGradient>
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#e9d5ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="45" cy="48" r="38" fill="rgba(139,92,246,0.08)" />
          <ellipse cx="45" cy="50" rx="28" ry="26" fill="url(#bodyGrad)" />
          <ellipse cx="45" cy="46" rx="18" ry="16" fill="url(#coreGrad)" />

          <g style={{ animation: isReacting ? "none" : "lumaEyes 4s ease-in-out infinite" }}>
            <ellipse cx="36" cy="47" rx="5" ry="5.5" fill="#1a0533" />
            <circle cx="37.5" cy="45.5" r="1.8" fill="white" opacity="0.9" />
          </g>

          <g style={{ animation: isReacting ? "none" : "lumaEyes 4s ease-in-out infinite" }}>
            <ellipse cx="54" cy="47" rx="5" ry="5.5" fill="#1a0533" />
            <circle cx="55.5" cy="45.5" r="1.8" fill="white" opacity="0.9" />
          </g>

          <path
            d={isReacting ? "M 38 57 Q 45 63 52 57" : "M 39 57 Q 45 61 51 57"}
            stroke="#e9d5ff" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9"
          />

          <line x1="45" y1="22" x2="45" y2="15" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
          <circle cx="45" cy="13" r="3.5" fill="#c084fc" />
          <circle cx="45" cy="13" r="1.5" fill="#f3e8ff" opacity="0.9" />
        </svg>
      </div>
    </>
  );
}