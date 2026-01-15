// 🔑 Replace with your actual OpenWeatherMap API key
const apiKey = "4cf8075b6e2a6d9e6fa7553b562b2ffe";

const statusMsg = document.getElementById("statusMsg");
const resultBox = document.getElementById("weatherResult");
const btn = document.getElementById("getWeatherBtn");

btn.addEventListener("click", getWeather);

async function getWeather() {
  const rawCity = document.getElementById("cityInput").value.trim();
  if (!rawCity) {
    statusMsg.textContent = "Please enter a city name.";
    return;
  }

  const city = encodeURIComponent(rawCity);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  statusMsg.textContent = "Fetching weather…";

  try {
    const response = await fetch(url);

    // Network or API-level error
    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      const message = errData?.message ? `Error: ${errData.message}` : `Error: ${response.status} ${response.statusText}`;
      statusMsg.textContent = message;
      resultBox.innerHTML = `<p>⚠️ Unable to fetch weather. Try another city.</p>`;
      return;
    }

    const data = await response.json();

    // API returns cod as number (e.g., 200, 404)
    if (data.cod !== 200) {
      statusMsg.textContent = `Error: ${data.message || "Unknown error"}`;
      resultBox.innerHTML = `<p>❌ ${data.message || "City not found"}</p>`;
      return;
    }

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>🌡️ Feels Like: ${data.main.feels_like} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      <p>☁️ Condition: ${capitalize(data.weather[0].description)}</p>
    `;

    resultBox.innerHTML = weatherHTML;
    statusMsg.textContent = "✅ Weather loaded";
  } catch (error) {
    statusMsg.textContent = "Network error. Check your connection.";
    resultBox.innerHTML = `<p>⚠️ Error fetching data</p>`;
    console.error("Weather fetch error:", error);
  }
}

function capitalize(str) {
  return str.split(" ").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
}
