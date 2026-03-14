// 1. Logic Dark Mode
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.checked = true;
        document.querySelector('.icon').textContent = '☀️';
    }
}

themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.querySelector('.icon').textContent = '☀️';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        document.querySelector('.icon').textContent = '🌙';
    }
});

// 2. Form Handling Sederhana
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = document.getElementById('formMsg');
        msg.textContent = "Terima kasih Rizky! Pesan berhasil terkirim.";
        msg.style.color = "green";
        contactForm.reset();
    });
}

// 3. Efek Partikel Sederhana (Canvas)
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
    }
    draw() {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 50; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
            particlesArray.push(new Particle());
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();
