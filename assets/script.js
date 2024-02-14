var apiKey = "26ac9b217628bb0e75592659042448df";
var keyCount = 0;
var searchButton = $(".searchButton");

console.log(apiKey);

for (var i = 0; i < localStorage.length; i++) {
  var city = localStorage.getItem(i);

  var cityName = $(".list-group").addClass("list-group-item");

  cityName.append("<li>" + city + "</li>");
}

searchButton.click(function displayWeather(event) {
  event.preventDefault();
  var cityName = $(".cityName").val().trim();
  var cityName = $(".cityName").val();
  var apiUrlCurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&Appid=" +
    apiKey +
    "&units=imperial";
  var apiUrlFiveDay =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&Appid=" +
    apiKey +
    "&units=imperial";

  if (cityName === "") {
    alert("Please enter a valid city");
    return;
  } else {
    $.ajax({
      url: apiUrlCurrent,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var local = localStorage.setItem(keyCount, response.name);
      keyCount = keyCount + 1;

      var currentWeatherCard = $(".currentCard")
        .append("<div>")
        .addClass("card-body");
      currentWeatherCard.empty();
      var currentCityName = currentWeatherCard.append("<p>");

      currentWeatherCard.append(currentCityName);

      var searchItem = $(".list-group").addClass("list-group-item");
      searchItem.append("<li>" + response.name + "</li>");

      var timeUTC = new Date(response.dt * 1000);
      currentCityName.append(
        response.name + " (" + timeUTC.toLocaleDateString("en-US") + ")"
      );
      currentCityName.append(
        `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`
      );

      var currentConditions = currentCityName.append(currentConditions);
      currentConditions.append(
        "<p>" + "Temperature: " + response.main.temp + "</p>"
      );
      currentConditions.append(
        "<p>" + "Humidity: " + response.main.humidity + "%" + "</p>"
      );
      currentConditions.append(
        "<p>" + "Wind Speed: " + response.wind.speed + "</p>"
      );

      $.ajax({
        url: apiUrlFiveDay,
        method: "GET",
      }).then(function (response) {
        console.log(response);

        var futureDayArr = [3, 11, 19, 27, 35];
        var fiveDayContainer = $(".fiveDayCard").addClass("card-body");
        var fiveDaySingleCard = $(".fiveDaySingleCard").addClass("card-text");
        fiveDaySingleCard.empty();

        futureDayArr.forEach(function (i) {
          var forecastUTC = new Date(response.list[i].dt * 1000);
          forecastUTC = forecastUTC.toLocaleDateString("en-US");

          fiveDayContainer.append(
            "<div>" +
              "<p>" +
              forecastUTC +
              "</p>" +
              `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` +
              "<p>" +
              "Temperature: " +
              response.list[i].main.temp +
              "</p>" +
              "<p>" +
              "Humidity: " +
              response.list[i].main.humidity +
              "%" +
              "</p>" +
              "</div>"
          );
        });
      });
    });
  }
});
