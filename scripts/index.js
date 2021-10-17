//Week 5
let units = "metric";
let apiKey = "ad793a6d772939c31783de5822791acf";
function showTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);

  let location = document.querySelector(".location");
  location.innerHTML = `${city}`;

  let displayTemp = document.querySelector(".temperature");
  displayTemp.innerHTML = temperature;
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function buttonClick(event) {
  event.preventDefault();
  let city = document.querySelector("#input").value;
  searchCity(city);
}
let form = document.querySelector("#search-input");
form.addEventListener("submit", buttonClick);

//bonus
//Geolocation API Find Position

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl2).then(showTemperature);
}
//When Current button is clicked
function clickCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", clickCurrent);

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
  "Saturday"
];
let day = days[now.getDay()];
let date = document.querySelector(".date");
date.innerHTML = `${day} ${hour}:${minute}`;

function changeFahrenheit(event) {
  event.preventDefault();
  let ftemperature = document.querySelector(".temperature");
  ftemperature.innerHTML = "66";
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);

function changeCelsius(event) {
  event.preventDefault();
  let ctemperature = document.querySelector(".temperature");
  ctemperature.innerHTML = "20";
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);
