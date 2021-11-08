//Week 4
let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let nowDay = days[now.getDay()];
  let nowMinutes = now.getMinutes();
  let nowHours = now.getHours();

  if (nowHours < 10) {
    nowHours = "0" + nowHours;
  }

  if (nowMinutes < 10) {
    nowMinutes = "0" + nowMinutes;
  }

  let formattedDate = document.querySelector(".date");
  formattedDate.innerHTML = `${nowDay}, ${nowHours}:${nowMinutes}`;
  return formattedDate;
}
console.log(formatDate(now));

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//showing forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-3">
      <div class="card-title">${formatDay(forecastDay.dt)}</div>
      <img src="images/${
        forecastDay.weather[0].icon
      }.png" class="card-img-top" alt="sunny" width="42" />
      <div class ="weather-forecast-temperatures"><span class="card-text">${Math.round(
        forecastDay.temp.max
      )}°</span><span class="weather-temp-min"><span class="card-text">${Math.round(
          forecastDay.temp.min
        )}°</span></span>
    </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// connecting API to forecast
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ad793a6d772939c31783de5822791acf";
  let apiUrl3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl3).then(displayForecast);
}

//Showing temperature and everything else
let units = "metric";
let apiKey = "ad793a6d772939c31783de5822791acf";
function displayTemperature(response) {
  let city = response.data.name;
  ctemperature = response.data.main.temp;

  let location = document.querySelector(".location");
  location.innerHTML = `${city}`;

  let temp = document.querySelector(".temperature");
  temp.innerHTML = Math.round(ctemperature);

  let description = document.querySelector(".description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let todayIcon = document.querySelector("#todayIcon");
  todayIcon.innerHTML = `<img src="scripts/images/${response.data.weather[0].icon}.png" width="80" 
     height="80">`;
  todayIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
function buttonClick(event) {
  event.preventDefault();
  let city = document.querySelector("#input").value;
  searchCity(city);
}
let form = document.querySelector("#search-input");
form.addEventListener("submit", buttonClick);

//Geolocation API Find Position
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl2).then(displayTemperature);
}
//When Current button is clicked
function clickCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", clickCurrent);

//fahrenheit and celsius

function changeFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let ftemp = (ctemperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(ftemp);
}

function changeCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temp.innerHTML = Math.round(ctemperature);
}

let ctemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);

searchCity("Melbourne");
