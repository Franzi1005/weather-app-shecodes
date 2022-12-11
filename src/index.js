let now = new Date();

let allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let date = now.getDate();
let month = allMonths[now.getMonth()];
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let weekday = weekdays[now.getDay()];
let completeDate = document.querySelector("small");

completeDate.innerHTML = `${weekday}, ${month} ${date} ${year}, ${hours}:${minutes}`;

// challenge 2

let searchForm = document.querySelector("#city-input");
let cityInput = document.querySelector("#city-input-field");

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];
  let forecastDay = "";
  days.forEach(function (day) {
    forecastDay =
      forecastDay +
      `<div class="col-2">
          <div class="card weather-card">
            <div class="card-body weather-card-body">
              <h5 class="card-title">${day}</h5>
              <p class="card-text temperature">🔆<br />9°/20°</p>
            </div>
          </div>
        </div>`;
  });

  forecastElement.innerHTML = forecastDay;
}

function getForecast(response) {
  console.log(response.data.coord);
  let lon = response.data.coord.lon;
  let lat = response.data.coord.lat;
  let apiKey = "8a869017a9bbe9c440c0fea9e1fa0af6";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

//getForecast();

function changeTemperature(response) {
  let heading = document.querySelector("h1");
  let newCity = response.data.name;
  heading.innerHTML = `${newCity}`;
  let temperature = document.querySelector("#temperature");
  realTemperature = response.data.main.temp;
  let actualTemp = Math.round(realTemperature);
  temperature.innerHTML = actualTemp;
  let weatherCond = document.querySelector("#weather-condition");
  let text = response.data.weather[0].description;
  weatherCond.innerHTML = `${text}`;
  let weatherElement = document.querySelector("#weather-icon");
  weatherElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response);
}

function changeCity(city) {
  let apiKey = "8a869017a9bbe9c440c0fea9e1fa0af6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input-field").value;
  changeCity(city);
}

// challenge 3

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "8a869017a9bbe9c440c0fea9e1fa0af6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeTemperature);
}

function showLocalPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocBtn = document.querySelector("#current-location");

let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");
let temperatureElement = document.querySelector("#temperature");

let realTemperature = null;

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (realTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("highlighted-link");
  fahrenheitLink.classList.add("highlighted-link");
}

function showCelsius(event) {
  event.preventDefault();
  temperatureElement.innerHTML = Math.round(realTemperature);
  fahrenheitLink.classList.remove("highlighted-link");
  celsiusLink.classList.add("highlighted-link");
}

searchForm.addEventListener("submit", handleSubmit);
currentLocBtn.addEventListener("click", showLocalPosition);
fahrenheitLink.addEventListener("click", showFahrenheit);
celsiusLink.addEventListener("click", showCelsius);

changeCity("New York");
displayForecast();
