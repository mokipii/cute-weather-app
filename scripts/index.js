//Week 4
let now = new Date();
let hour = now.getHours();
let minute = String(now.getMinutes()).padStart(2, "0");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = document.querySelector(".date");
date.innerHTML = `${day} ${hour}:${minute}`;

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
  todayIcon.innerHTML = `<img src="images/${response.data.weather[0].icon}.png" width="70" 
     height="70">`;
  todayIcon.setAttribute("alt", response.data.weather[0].description);
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
