const STAR_COLORS = [
  [255, 255, 255],
  [200, 200, 255],
  [180, 220, 255],
  [255, 200, 255],
];

class Star {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.brightness = Math.random();
    this.targetBrightness = Math.random();
    this.pulseSpeed = Math.random() * 0.008 + 0.003;
    this.radius = Math.random() * 2 + 0.5;
    const c = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    this.r = c[0];
    this.g = c[1];
    this.b = c[2];
  }

  update() {
    this.brightness += (this.targetBrightness - this.brightness) * this.pulseSpeed;
    if (Math.random() < 0.01) {
      this.targetBrightness = Math.random() * 0.8 + 0.1;
    }
  }

  draw(ctx) {
    const alpha = this.brightness * 0.9 + 0.1;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
    ctx.shadowColor = `rgb(${this.r},${this.g},${this.b})`;
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class StarField {
  constructor(w, h, count = 80) {
    this.stars = Array.from({ length: count }, () => new Star(w, h));
  }

  resize(w, h) {
    this.stars.forEach((s) => {
      s.x = Math.random() * w;
      s.y = Math.random() * h;
    });
  }

  update() {
    this.stars.forEach((s) => s.update());
  }

  draw(ctx) {
    this.stars.forEach((s) => s.draw(ctx));
  }
}