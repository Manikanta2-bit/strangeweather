# 🚲 Stranger Weather | The Upside Down Forecast

![Project Banner](https://img.shields.io/badge/Theme-Stranger_Things-red?style=for-the-badge) ![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> *"Something is coming. Something hungry for blood. A shadow grows on the wall behind you, swallowing you in darkness."*

**Stranger Weather** is a creative, atmospheric weather application inspired by the Netflix series *Stranger Things*. It transforms standard weather data into an immersive "Upside Down" experience, complete with falling spores, retro 80s typography, and eerie glowing effects.

## 🌟 Features

* **Real-Time Weather Data:** Fetches current temperature, humidity, wind speed, and conditions for any city worldwide.
* **The Upside Down Atmosphere:**
    * **Particle System:** An HTML5 Canvas animation of falling "spores" (particles) that changes behavior based on the weather (e.g., rain falls faster, wind blows sideways).
    * **Retro Aesthetic:** Uses the iconic Benguiat font, glowing red neon text, and flickering header effects.
    * **Christmas Lights:** Animated bulb decorations inspired by the Byers' living room.
    * **Custom Cursor:** A glowing red orb replaces the default mouse pointer for deeper immersion.
* **Responsive Design:** Works seamlessly on desktop and mobile devices.
* **Social Integration:** Footer links to the developer's profiles.

## 🛠️ Tech Stack

* **HTML5** - Structure and layout.
* **CSS3** - Animations, glowing effects, and custom cursor styling.
* **JavaScript (ES6+)** - API integration, DOM manipulation, and canvas particle physics.
* **API:** [WeatherAPI.com](https://www.weatherapi.com/) (Real-time weather JSON).

## 🚀 How to Run Locally

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/stranger-weather.git](https://github.com/YOUR_USERNAME/stranger-weather.git)
    cd stranger-weather
    ```

2.  **Open the Project**
    Simply open the `index.html` file in your preferred web browser.

3.  **API Configuration (Important)**
    The project uses a free key from WeatherAPI.com.
    * Open `script.js`.
    * Locate the variable `const API_KEY`.
    * If the key is invalid or expired, sign up for a free key at [WeatherAPI.com](https://www.weatherapi.com/) and replace it:
        ```javascript
        const API_KEY = "YOUR_NEW_API_KEY_HERE";
        ```

