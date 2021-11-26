var searchBtn = document.getElementById("searchBtn");
var currentWeatherDiv = document.querySelector("#currentWeather");
//var searchValue;

var apiKey = "d8cf782e3cf7bd46d6aaeff9cbd9a0b4";
var uvIndex = "";

//var lat;
//var lon;

function forecastWeather(lat, lon) {
  var forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(forecastApi)
    .then(function (forecastResponse) {
      return forecastResponse.json();
    })
    .then(function (forecastData) {
      console.log(forecastData);
    });
}

function currentWeather(city) {
  //api call for current weather
  var currentApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  console.log(currentApi);

  fetch(currentApi)
    .then(function (currentResponse) {
      return currentResponse.json();
    })
    .then(function (currentData) {
      console.log(currentData);

      var city = currentData.name;
      var date = currentData.dt;
      var temp = currentData.main.temp;
      var wind = currentData.wind.speed;
      var humidity = currentData.main.humidity;
      //var div = document.createElement("div");
      // var currentDiv = `
      //     <h3>${city} ${date}</h3>
      //     <p>Temp: ${temp}</p>
      //     <p>Wind: ${wind}</p>
      //     <p>Humidity: ${humidity}</p>
      //     <p>UV Index:</p>
      // `;
      var pWind = document.createElement("p");
      var h3 = document.createElement("h3");
      var pTemp = document.createElement("p");
      var pHumidity = document.createElement("p");

      h3.textContent = city + " " + date;
      pTemp.textContent = "Temp: " + temp;
      pWind.textContent = "Wind: " + wind;
      pHumidity.textContent = "Humidity: " + humidity;
      currentWeatherDiv.appendChild(h3);
      currentWeatherDiv.appendChild(pTemp);
      currentWeatherDiv.appendChild(pWind);
      currentWeatherDiv.appendChild(pHumidity);
      //   weatherDiv.appendChild(div);

      var lat = currentData.coord.lat;
      var lon = currentData.coord.lon;
      forecastWeather(lat, lon);
    });
}

searchBtn.addEventListener("click", function () {
  console.log("Hi");
  var searchValue = document.getElementById("searchBox").value;
  currentWeather(searchValue);
});
