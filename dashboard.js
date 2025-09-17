const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

// Elements
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const extraInfo = document.getElementById("extra-info");
const forecastContainer = document.getElementById("forecast-container");

// Fetch Weather by City
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === 200) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)} °C`;
    condition.textContent = data.weather[0].main;
    extraInfo.textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} km/h`;

    changeTheme(data.weather[0].main);
  } else {
    alert("City not found!");
  }
}

// Change Theme based on Weather
function changeTheme(weather) {
  if (weather.includes("Cloud")) {
    document.body.style.background = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
  } else if (weather.includes("Rain")) {
    document.body.style.background = "linear-gradient(to bottom, #2c3e50, #3498db)";
  } else if (weather.includes("Clear")) {
    document.body.style.background = "linear-gradient(to bottom, #56ccf2, #2f80ed)";
  } else if (weather.includes("Snow")) {
    document.body.style.background = "linear-gradient(to bottom, #e0eafc, #cfdef3)";
  } else {
    document.body.style.background = "#1e1e1e";
  }
}

// Event Listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      cityName.textContent = data.name;
      temperature.textContent = `${Math.round(data.main.temp)} °C`;
      condition.textContent = data.weather[0].main;
      extraInfo.textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} km/h`;

      changeTheme(data.weather[0].main);
    });
  } else {
    alert("Geolocation not supported!");
  }
});
