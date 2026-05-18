import { useRef, useEffect, useCallback } from "react";
import { ParticleSystem } from "../systems/ParticleSystem.js";
import { StarField } from "../systems/StarField.js";
import { MoodEngine } from "../systems/MoodEngine.js";
import { AudioSystem } from "../systems/AudioSystem.js";
import { useTouchEvents } from "../hooks/useTouchEvents.js";

const particles = new ParticleSystem();
const stars = new StarField(window.innerWidth, window.innerHeight);
const mood = new MoodEngine();
const audio = new AudioSystem();

export function Canvas({ onMoodChange, onTouch }) {
  const canvasRef = useRef(null);
  const lastTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars.resize(window.innerWidth, window.innerHeight);
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = (time) => {
      const dt = Math.min((time - lastTime.current) / 1000, 0.05);
      lastTime.current = time;

      ctx.fillStyle = mood.getBackground();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.update();
      stars.draw(ctx);

      particles.update(dt);
      particles.draw(ctx);

      mood.update();
      onMoodChange?.(mood.getMood());

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [onMoodChange]);

  const handleTouch = useCallback(
    ({ x, y }) => {
      audio.init();
      audio.playTone(x, window.innerWidth);
      particles.spawn(x, y);
      mood.recordTouch();
      onTouch?.({ x, y });
    },
    [onTouch]
  );

  useTouchEvents(handleTouch);

  return <canvas ref={canvasRef} />;
}