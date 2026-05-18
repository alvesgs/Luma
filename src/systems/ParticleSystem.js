const COLORS = [
  [270, 70, 65],
  [280, 80, 70],
  [260, 60, 75],
  [290, 65, 60],
  [250, 75, 80],
];

class Particle {
  constructor(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 1.5;
    this.life = 1.0;
    this.maxLife = Math.random() * 1.5 + 0.8;
    this.radius = Math.random() * 4 + 2;
    const c = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.h = c[0];
    this.s = c[1];
    this.l = c[2];
  }

  update(dt) {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.08;
    this.vx *= 0.98;
    this.life -= dt / this.maxLife;
    this.radius *= 0.995;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life) * 0.9;
    ctx.fillStyle = `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
    ctx.shadowColor = `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  isDead() {
    return this.life <= 0 || this.radius < 0.3;
  }
}

export class ParticleSystem {
  constructor() {
    this.particles = [];
    this.maxParticles = 500;
  }

  spawn(x, y, count = 14) {
    for (let i = 0; i < count; i++) {
      if (this.particles.length < this.maxParticles) {
        this.particles.push(new Particle(x, y));
      }
    }
  }

  update(dt) {
    this.particles = this.particles.filter((p) => {
      p.update(dt);
      return !p.isDead();
    });
  }

  draw(ctx) {
    this.particles.forEach((p) => p.draw(ctx));
  }
}