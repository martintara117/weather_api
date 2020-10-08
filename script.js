let apiKey = "85b394aecf7ef94b9d97722dd2a1d6b1";
let queryUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=`;
let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=`;

$("nav > button").on("click", function () {
  let city = $("nav input").val();
  citySearch(city);
});

function citySearch(city) {
  $.ajax({
    url: queryUrl + city,
    method: "GET",
  }).then(currentWeather);
  $.ajax({
    url: forecastUrl + city,
    method: "GET",
  }).then((forecastResponse) => {
    console.log(forecastResponse);
    for (i = 0; i < 40; i += 8) {
      console.log(forecastResponse.list[i]);
    }
  });
}
function currentWeather(response) {
  let city = response.name;
  let temp = response.main.temp;
  let humidity = response.main.humidity;
  let windSpeed = response.wind.speed;
  $("main section:first-child").html(`
    <h2>${city}</h2>
    <p>Temperature: ${temp}</p>
    <p>Humidity: ${humidity}</p>
    <p>Wind Speed: ${windSpeed}</p>
  `);
}
