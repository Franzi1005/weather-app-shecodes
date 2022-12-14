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

let searchForm = document.querySelector("#city-input");
let cityInput = document.querySelector("#city-input-field");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastDay = "";
  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastDay =
        forecastDay +
        `<div class="col-2">
          <div class="card weather-card">
            <div class="card-body weather-card-body">
              <h5 class="card-title">${formatDay(day.dt)}</h5>
              <img src = "http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png" width= "50" />
             <p class="card-text temperature"><span>${Math.round(
               day.temp.min
             )}</span>° / <span>${Math.round(day.temp.max)}</span>°</p>
            </div>
          </div>
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastDay;
}

function getForecast(response) {
  let lon = response.data.coord.lon;
  let lat = response.data.coord.lat;
  let apiKey = "8a869017a9bbe9c440c0fea9e1fa0af6";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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

let temperatureElement = document.querySelector("#temperature");

let realTemperature = null;

searchForm.addEventListener("submit", handleSubmit);
currentLocBtn.addEventListener("click", showLocalPosition);

changeCity("New York");
