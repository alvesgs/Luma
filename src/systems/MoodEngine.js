const MOODS = {
  calm:     { bg: [8,  6,  20], starSpeed: 0.5 },
  normal:   { bg: [5,  3,  15], starSpeed: 1.0 },
  animated: { bg: [25, 5,  35], starSpeed: 1.5 },
};

export class MoodEngine {
  constructor() {
    this.touchesInWindow = [];
    this.lastTouchTime = 0;
    this.mood = "normal";
    this.currentBg = [5, 3, 15];
    this.targetBg  = [5, 3, 15];
  }

  recordTouch() {
    const now = Date.now();
    this.lastTouchTime = now;
    this.touchesInWindow.push(now);
    this.touchesInWindow = this.touchesInWindow.filter((t) => now - t < 1500);
    this._updateMood();
  }

  _updateMood() {
    const tps = this.touchesInWindow.length / 1.5;
    const timeSince = Date.now() - this.lastTouchTime;
    if (timeSince > 8000)    this.mood = "calm";
    else if (tps > 3)        this.mood = "animated";
    else                     this.mood = "normal";
    this.targetBg = MOODS[this.mood].bg;
  }

  update() {
    this._updateMood();
    for (let i = 0; i < 3; i++) {
      this.currentBg[i] += (this.targetBg[i] - this.currentBg[i]) * 0.02;
    }
  }

  getBackground() {
    const [r, g, b] = this.currentBg;
    return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  }

  getMood() { return this.mood; }
}