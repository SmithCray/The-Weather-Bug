var searchBtn = document.getElementById("searchBtn");
var searchValue;

var apiKey = "a0319eb37ce77ad079d0ac97c12ee4bd";
var lat;
var lon;

function forecastWeather() {
  var forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid={API key}`;

  fetch(forecastApi).then(function (response) {
    console.log(response);
  });
}

function currentWeather(city) {
  //api call for current weather
  var currentApi =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=a0319eb37ce77ad079d0ac97c12ee4bd";
  var currentApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(currentApi).then(function (response) {
    console.log(response);
    //lat = response.;
    //lon = response.;
    forecastWeather();
  });
}

searchBtn.addEventListener("click", function () {
  console.log("Hi");
  searchValue = document.getElementById("searchBox").value;
  currentWeather(searchValue);
});
