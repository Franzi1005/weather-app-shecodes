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

function changeTemperature(response) {
  let heading = document.querySelector("h1");
  let newCity = response.data.name;
  heading.innerHTML = `${newCity}`;
  let temperature = document.querySelector("#temperature");
  let actualTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = actualTemp;
  let weatherCond = document.querySelector("#weather-condition");
  let text = response.data.weather[0].description;
  weatherCond.innerHTML = `${text}`;
  let weatherElement = document.querySelector("#weather-icon");
  weatherElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

searchForm.addEventListener("submit", handleSubmit);

changeCity("New York");

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

currentLocBtn.addEventListener("click", showLocalPosition);
