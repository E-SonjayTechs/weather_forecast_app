//third script
const apiKey = "b4a59a55086d41dd48ecee66ff701713";

// 1-Day Forecast (Current Weather)
async function getCurrentWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weatherResult");
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = ""; // clear 5-day forecast

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  weatherDiv.innerHTML = "Loading current weather...";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;

    // Tooltip text with icons
    const tooltipTemp = `🌡️ Temperature: ${temp}°C`;
    const tooltipHumidity = `💧 Humidity: ${humidity}%`;
    const tooltipWind = `🌬️ Wind Speed: ${wind} m/s`;
    const tooltipCondition = `☁️ Condition: ${desc}`;

    weatherDiv.innerHTML = `
      <div class="card text-center shadow-sm mt-3">
        <div class="card-body">
          <h4 class="fw-bold text-primary">${data.name}, ${data.sys.country}</h4>
          <img src="${icon}" alt="Weather icon" class="img-fluid" style="width:80px;">
          <p class="mt-2 mb-0 text-capitalize"><b>${desc}</b></p>
          <hr class="my-2">
          <div class="d-flex justify-content-around">
            <p class="mb-0" data-bs-toggle="tooltip" title="${tooltipTemp}">🌡️ ${temp}°C</p>
            <p class="mb-0" data-bs-toggle="tooltip" title="${tooltipHumidity}">💧 ${humidity}%</p>
            <p class="mb-0" data-bs-toggle="tooltip" title="${tooltipWind}">🌬️ ${wind} m/s</p>
            <p class="mb-0" data-bs-toggle="tooltip" title="${tooltipCondition}">☁️ ${desc}</p>
          </div>
        </div>
      </div>
    `;

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(el => new bootstrap.Tooltip(el));

  } catch (error) {
    weatherDiv.innerHTML = `<p class="text-danger">Error fetching weather data: ${error.message}</p>`;
  }
}

// 5-Day Forecast with Tooltip Icons
async function getFiveDayForecast() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weatherResult");
  const forecastDiv = document.getElementById("forecast");
  weatherDiv.innerHTML = ""; // clear 1-day weather

  if (!city) {
    forecastDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  forecastDiv.innerHTML = "Loading 5-day forecast...";

  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const forecastData = await response.json();

    const daily = {};
    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      const time = item.dt_txt.split(" ")[1];
      if (time === "12:00:00") daily[date] = item;
    });

    forecastDiv.innerHTML = "";

    Object.keys(daily).forEach(date => {
      const item = daily[date];
      const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
      const temp = Math.round(item.main.temp);
      const desc = item.weather[0].main;
      const humidity = item.main.humidity;
      const wind = item.wind.speed;

      const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "short" });

      // Tooltip text with icons
      const tooltipText = `🌡️ Temp: ${temp}°C\n💧 Humidity: ${humidity}%\n🌬️ Wind: ${wind} m/s\n☁️ Condition: ${desc}`;

      forecastDiv.innerHTML += `
        <div class="col-6 col-md-2 forecast-day mb-3">
          <div class="card border-0 text-center shadow-sm"
               data-bs-toggle="tooltip"
               data-bs-placement="top"
               title="${tooltipText.replace(/"/g, '&quot;')}">
            <div class="card-body">
              <h6 class="fw-bold">${dayName}</h6>
              <img src="${icon}" class="img-fluid" alt="${desc}">
              <p class="mb-0">🌡️ ${temp}°C</p>
              <small class="text-muted">${desc}</small>
            </div>
          </div>
        </div>
      `;
    });

    // Initialize tooltips for all cards
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(el => new bootstrap.Tooltip(el));

  } catch (error) {
    forecastDiv.innerHTML = `<p class="text-danger">Error fetching 5-day forecast: ${error.message}</p>`;
  }
}









////Second script
//const apiKey = "b4a59a55086d41dd48ecee66ff701713";
//
//async function getCurrentWeather() {
//  const city = document.getElementById("cityInput").value;
//  const weatherDiv = document.getElementById("weatherResult");
//  const forecastDiv = document.getElementById("forecast");
//  forecastDiv.innerHTML = ""; // clear 5-day forecast
//
//  if (!city) {
//    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
//    return;
//  }
//
//  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//
//  weatherDiv.innerHTML = "Loading current weather...";
//
//  try {
//    const response = await fetch(url);
//    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//    const data = await response.json();
//
//    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//    const temp = data.main.temp;
//    const desc = data.weather[0].description;
//    const humidity = data.main.humidity;
//    const wind = data.wind.speed;
//
//    weatherDiv.innerHTML = `
//      <h3>${data.name}, ${data.sys.country}</h3>
//      <img src="${icon}" alt="Weather icon">
//      <p><b>${desc.toUpperCase()}</b></p>
//      <p>🌡️ Temp: ${temp}°C</p>
//      <p>💧 Humidity: ${humidity}%</p>
//      <p>🌬️ Wind Speed: ${wind} m/s</p>
//    `;
//  } catch (error) {
//    weatherDiv.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
//  }
//}
//
//
//async function getFiveDayForecast() {
//  const city = document.getElementById("cityInput").value;
//  const weatherDiv = document.getElementById("weatherResult");
//  const forecastDiv = document.getElementById("forecast");
//  weatherDiv.innerHTML = ""; // clear current weather
//
//  if (!city) {
//    forecastDiv.innerHTML = "<p>Please enter a city name.</p>";
//    return;
//  }
//
//  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
//
//  forecastDiv.innerHTML = "Loading 5-day forecast...";
//
//  try {
//    const response = await fetch(forecastUrl);
//    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//    const forecastData = await response.json();
//
//    const daily = {}; // store one reading per day
//
//    forecastData.list.forEach(item => {
//      const date = item.dt_txt.split(" ")[0];
//      const time = item.dt_txt.split(" ")[1];
//      if (time === "12:00:00") {
//        daily[date] = item;
//      }
//    });
//
//    forecastDiv.innerHTML = "";
//    Object.keys(daily).forEach(date => {
//      const item = daily[date];
//      const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
//      const temp = Math.round(item.main.temp);
//      const desc = item.weather[0].main;
//
//      const options = { weekday: "short" };
//      const dayName = new Date(date).toLocaleDateString("en-US", options);
//
//      forecastDiv.innerHTML += `
//      <div class="col-6 col-md-2 forecast-day">
//        <div class="card border-0 text-center shadow-sm">
//          <div class="card-body">
//            <h6 class="fw-bold">${dayName}</h6>
//            <img src="${icon}" class="img-fluid" alt="">
//            <p class="mb-0">${temp}°C</p>
//            <small class="text-muted">${desc}</small>
//          </div>
//        </div>
//      </div>
//    `;
//
//    });
//
//  } catch (error) {
//    forecastDiv.innerHTML = `<p>Error fetching 5-day forecast: ${error.message}</p>`;
//  }
//}
//
//
//
//
////First script
////async function getWeather() {
////  const city = document.getElementById("cityInput").value;
////  const apiKey = "b4a59a55086d41dd48ecee66ff701713"; // Replace with your OpenWeatherMap API key
////  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
////
////  const weatherDiv = document.getElementById("weatherResult");
////  weatherDiv.innerHTML = "Loading...";
////
////  try {
////    const response = await fetch(url);
////    if (!response.ok) {
////      throw new Error(`HTTP error! status: ${response.status}`);
////    }
////    const data = await response.json();
////
////    if (data.cod === "404") {
////      weatherDiv.innerHTML = `<p>❌ City not found. Try again.</p>`;
////      return;
////    }
////
////    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
////    const temp = data.main.temp;
////    const desc = data.weather[0].description;
////    const humidity = data.main.humidity;
////    const wind = data.wind.speed;
////
////    weatherDiv.innerHTML = `
////      <h3>${data.name}, ${data.sys.country}</h3>
////      <img src="${icon}" alt="Weather icon">
////      <p><b>${desc.toUpperCase()}</b></p>
////      <p>🌡️ Temp: ${temp}°C</p>
////      <p>💧 Humidity: ${humidity}%</p>
////      <p>🌬️ Wind Speed: ${wind} m/s</p>
////    `;
////  } catch (error) {
////    weatherDiv.innerHTML = `<p>Error fetching weather data.</p>`;
////  }
////}
