let apiKey = "85b394aecf7ef94b9d97722dd2a1d6b1";
let city = "Atlanta";
let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
let button = document.getElementById("test");

function citySearch() {
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
  $.ajax({
    url: forecastUrl,
    method: "GET",
  }).then((forecastResponse) => {
    console.log(forecastResponse);
    for (i = 0; i < 40; i += 8) {
      console.log(forecastResponse.list[i]);
    }
  });
}
button.addEventListener("click", citySearch);
