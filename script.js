const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let phrase = "Seu Gya";
let fontSize = 20;
let columns = Math.floor(canvas.width / (fontSize * phrase.length));
let drops = Array(columns).fill(1);

// Cor laranja
let color = "#FFA500";

let explosions = [];

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    ctx.fillText(phrase, i * phrase.length * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 2;
    this.speedX = (Math.random() - 0.5) * 6;
    this.speedY = (Math.random() - 0.5) * 6;
    this.alpha = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function createExplosion(x, y) {
  for (let i = 0; i < 20; i++) {
    explosions.push(new Particle(x, y));
  }
}

function animateExplosions() {
  for (let i = explosions.length - 1; i >= 0; i--) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].alpha <= 0) {
      explosions.splice(i, 1);
    }
  }
}

function animate() {
  drawMatrix();
  animateExplosions();
  requestAnimationFrame(animate);
}

animate();

canvas.addEventListener('click', (e) => {
  createExplosion(e.clientX, e.clientY);
});
