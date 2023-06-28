let currentDate = new Date();
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = week[currentDate.getDay()];
let currentHour = currentDate.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = currentDate.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let h5 = document.querySelector("h5");
h5.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;

function handleLocation(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let city = document.querySelector("h1");
  city.innerHTML = `${input.value}`;
  searchCity(input.value);
}

let displayName = document.querySelector("#input-location");
displayName.addEventListener("submit", handleLocation);

// Week 5 Homework
function weatherConditions(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML =
    Math.round(response.data.main.temp_max) +
    "\u00B0" +
    " / " +
    Math.round(response.data.main.temp_min) +
    "\u00B0";
  document.querySelector("#feels-like").innerHTML =
    "Feels like: " + Math.round(response.data.main.feels_like) + "\u00B0";

  document.querySelector("#clouds").innerHTML =
    "Clouds: " + response.data.clouds.all + "%";

  document.querySelector("#wind-speed").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + " m/s";
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "bff072a9132941ace910fa356cbfe57c";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(weatherConditions);
}

//bonus feature
function currentLocation(position) {
  let apiKey = "bff072a9132941ace910fa356cbfe57c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(weatherConditions);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let geoLocation = document.querySelector("#current-location-button");
geoLocation.addEventListener("click", getLocation);
