const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      document.getElementById("weatherResult").innerHTML = `<p>City not found ❌</p>`;
      return;
    }

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      <p>☁️ Condition: ${data.weather[0].description}</p>
    `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>Error fetching data ⚠️</p>`;
  }
}
