import { useEffect } from "react";

export function useTouchEvents(onTouch) {
  useEffect(() => {
    const handleTouch = (e) => {
      e.preventDefault();
      for (let touch of e.touches) {
        onTouch({ x: touch.clientX, y: touch.clientY });
      }
    };
    const handleMouse = (e) => {
      if (e.buttons !== 1) return;
      onTouch({ x: e.clientX, y: e.clientY });
    };
    const handleClick = (e) => {
      onTouch({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("touchstart", handleTouch, { passive: false });
    window.addEventListener("touchmove",  handleTouch, { passive: false });
    window.addEventListener("mousemove",  handleMouse);
    window.addEventListener("click",      handleClick);
    return () => {
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove",  handleTouch);
      window.removeEventListener("mousemove",  handleMouse);
      window.removeEventListener("click",      handleClick);
    };
  }, [onTouch]);
}