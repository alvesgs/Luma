import { useState, useCallback, useRef } from "react";
import { Canvas } from "./components/Canvas.jsx";
import { LumaCharacter } from "./components/LumaCharacter.jsx";

export default function App() {
  const [mood, setMood] = useState("normal");
  const [isReacting, setIsReacting] = useState(false);
  const timerRef = useRef(null);

  const handleMoodChange = useCallback((newMood) => {
    setMood(newMood);
  }, []);

  const handleTouch = useCallback(() => {
    setIsReacting(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsReacting(false), 400);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Canvas onMoodChange={handleMoodChange} onTouch={handleTouch} />
      <LumaCharacter mood={mood} isReacting={isReacting} />
    </div>
  );
}