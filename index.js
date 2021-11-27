var searchBtn = document.getElementById("searchBtn");
var currentWeatherDiv = document.querySelector("#currentWeather");
var fiveDay = document.querySelector("#fiveDay");
var cityList = document.querySelector("#cityList");
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
      fiveDay.textContent = "";

      for (var i = 0; i < 5; i++) {
        var forecastDate = forecastData.daily[i].dt;
        var forecastTemp = forecastData.daily[i].temp.day;

        var forecastConversion = (forecastTemp - 273.15) * 1.8 + 32;
        console.log(forecastConversion);

        var forecastWind = forecastData.daily[i].wind_speed;
        var forecastHumidity = forecastData.daily[i].humidity + " %";

        var timeDate = new Date(forecastDate * 1000);
        console.log(timeDate);

        var cardDiv = document.createElement("div");
        var hDt = document.createElement("h3");
        var pForecastTemp = document.createElement("p");
        var pForecastWind = document.createElement("p");
        var pForecastHumidity = document.createElement("p");

        hDt.textContent = "" + timeDate;
        pForecastTemp.textContent = "" + forecastConversion + " °F";
        pForecastWind.textContent = "" + forecastWind;
        pForecastHumidity.textContent = "" + forecastHumidity;

        cardDiv.classList.add("card");
        hDt.classList.add("card-title");
        pForecastTemp.classList.add("card-text");
        pForecastWind.classList.add("card-text");
        pForecastHumidity.classList.add("card-text");

        cardDiv.classList.add("col-2");

        cardDiv.appendChild(hDt);
        cardDiv.appendChild(pForecastTemp);
        cardDiv.appendChild(pForecastWind);
        cardDiv.appendChild(pForecastHumidity);

        fiveDay.appendChild(cardDiv);
      }
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
      currentWeatherDiv.textContent = "";

      var city = currentData.name;
      var date = currentData.dt;

      var currentTime = new Date(date * 1000);

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

      h3.textContent = city + " " + currentTime;
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

function cityButtons(city) {
  var pastCities = document.createElement("button");
  pastCities.textContent = city;
  pastCities.classList.add("pastCities");
  cityList.appendChild(pastCities);
}

cityList.addEventListener("click", function (event) {
  var prevCity = event.target.innerHTML;
  currentWeather(prevCity);
});

searchBtn.addEventListener("click", function () {
  console.log("Hi");
  var searchValue = document.getElementById("searchBox").value;
  document.getElementById("searchBox").value = "";
  currentWeather(searchValue);
  cityButtons(searchValue);
});
