/* ------------------------------------------------
   1. CUSTOM CURSOR LOGIC
   ------------------------------------------------ */
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

/* ------------------------------------------------
   2. CONFIGURATION (WEATHERAPI.COM)
   ------------------------------------------------ */
const API_KEY = "c4e9935e35f7422392944746260601"; 

/* ------------------------------------------------
   3. PARTICLE SYSTEM
   ------------------------------------------------ */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let weatherCondition = 'default';

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() { this.reset(); }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
        
        // Adjust for Rain/Storm
        if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle') || weatherCondition.includes('storm')) {
            this.speedY = Math.random() * 10 + 5; 
            this.size = Math.random() * 1.5 + 0.5;
            this.opacity = 0.6;
        } 
        // Adjust for Snow
        else if (weatherCondition.includes('snow') || weatherCondition.includes('blizzard') || weatherCondition.includes('ice')) {
            this.speedY = Math.random() * 2 + 1;
            this.size = Math.random() * 3 + 1;
        }
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Loop particles when they fall off screen
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
        
        // Wind effect
        if (weatherCondition.includes('wind')) {
            this.x += 3;
        }
    }
    
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = window.innerWidth < 600 ? 50 : 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* ------------------------------------------------
   4. APP LOGIC (FETCH WEATHER)
   ------------------------------------------------ */
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const statusMsg = document.getElementById('status-msg');
const weatherDisplay = document.getElementById('weather-display');

async function fetchWeather(city) {
    showLoading();
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
        
        if (!response.ok) {
            throw new Error("City not found or API issue.");
        }

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        showError("Could not find city. Try again.");
        console.error(error);
    }
}

function updateUI(data) {
    statusMsg.textContent = "";
    weatherDisplay.style.display = "block";

    const temp = Math.round(data.current.temp_c);
    const conditionText = data.current.condition.text;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;

    document.getElementById('temp-val').textContent = temp + "°C";
    document.getElementById('weather-desc').textContent = conditionText;
    document.getElementById('humidity-val').textContent = humidity + "%";
    document.getElementById('wind-val').textContent = windSpeed + " km/h";

    updateAtmosphere(conditionText);
}

function updateAtmosphere(condition) {
    weatherCondition = condition.toLowerCase();
    particles.forEach(p => p.reset());
}

function showLoading() {
    statusMsg.textContent = "Contacting the Upside Down...";
    statusMsg.className = "loading";
    weatherDisplay.style.display = "none";
}

function showError(msg) {
    statusMsg.textContent = msg;
    statusMsg.className = "error";
    weatherDisplay.style.display = "none";
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    }
});