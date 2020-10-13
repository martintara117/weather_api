let apiKey = "85b394aecf7ef94b9d97722dd2a1d6b1";
let queryUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=`;
let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=`;
let uvUrl = `http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=${apiKey}`;
console.log(uvUrl);
pageLoad();

function pageLoad() {
  $("nav > button").on("click", function () {
    let city = $("nav input").val();
    citySearch(city);
  });
  searchBtn();
  let lastSearch = getLastSearch();
  if (!lastSearch) {
    citySearch("Atlanta");
  }
  if (lastSearch) {
    citySearch(lastSearch);
  }
}

function searchBtn() {
  let searchedCities = getStorageData();
  let html = "";
  for (let city of searchedCities) {
    html += `<button>${city}</button>`;
  }
  $("nav footer").html(html);
  $("nav footer button").click(function () {
    let city = $(this).text();
    citySearch(city);
  });
}

function citySearch(city) {
  $.ajax({
    url: queryUrl + city,
    method: "GET",
  }).then(currentWeather);
  // .then(saveCity);
  $.ajax({
    url: forecastUrl + city,
    method: "GET",
  }).then(forecastWeather);
  $.ajax({
    url: uvUrl + lat,
    lon,
    method: "GET",
  }).then(currentWeather);
}

function currentWeather(response) {
  let city = response.name;
  let icon = response.weather[0].icon;
  let temp = response.main.temp;
  let humidity = response.main.humidity;
  let windSpeed = response.wind.speed;
  $("main section:first-child").html(`
    <h2>${city}
    <img src="http://openweathermap.org/img/wn/${icon}.png" />
    </h2>
    <p>Temperature: ${temp}&deg;F</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} MPH</p>
  `);
  let isNewCity = saveCity(city);
  if (isNewCity) {
    searchBtn();
  }
}
function forecastWeather(response) {
  let html = "<h3>Five-Day Forecast:</h3>";
  for (let i = 0; i < response.list.length; i += 8) {
    let day = response.list[i];
    let myTrim = new RegExp(/^\d+-\d+-\d+/, "gmi");
    let execArr = myTrim.exec(day.dt_txt);
    let date = execArr[0];
    let icon = day.weather[0].icon;
    let temp = day.main.temp;
    let humidity = day.main.humidity;
    html += `
      <figure class="something"> 
        <h5>${date}</h5>
        <img src="http://openweathermap.org/img/wn/${icon}.png" />
        <p>Temp: ${temp}&deg;F</p>
        <p>Humidity: ${humidity}%</p>
      </figure>
    `;
  }
  $("main section:last-child").html(html);
}

function saveCity(city) {
  setLastSearch(city);
  let data = getStorageData();
  if (!data.includes(city)) {
    data.push(city);
    setStorageData(data);
    return true;
  }
  return false;
}

function getStorageData() {
  let data = localStorage.getItem("citiesSearched");
  if (!data) {
    return [];
  }
  return JSON.parse(data);
}

function setStorageData(data) {
  localStorage.setItem("citiesSearched", JSON.stringify(data));
}

function getLastSearch() {
  return localStorage.getItem("lastCitySearched");
}

function setLastSearch(city) {
  localStorage.setItem("lastCitySearched", city);
}
