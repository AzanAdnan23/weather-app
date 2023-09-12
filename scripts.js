let city;

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  city = document.getElementById("inputText").value;

  fetchWeatherData(city);
});

function filterData(data) {
  const currentWeather = data.current;
  const location = data.location;

  const weatherInfoHtml = `
    <strong><h2>Weather in ${location.name}, ${location.region}</h2></strong>
    <p><strong>Temperature:</strong> ${currentWeather.temp_c}°C</p>
    <p><strong>Feels Like:</strong> ${currentWeather.feelslike_c}°C</p>
    <p><strong>Humidity:</strong> ${currentWeather.humidity}%</p>
    <p><strong>UV Index:</strong> ${currentWeather.uv}</p>
    <p><strong>Visibility:</strong> ${currentWeather.vis_km} km</p>
    <p><strong>Wind:</strong> ${currentWeather.wind_dir} ${currentWeather.wind_kph} km/h</p>
    <p><strong>Last Updated:</strong> ${currentWeather.last_updated}</p>
`;

  document.getElementById("weatherInfo").innerHTML = weatherInfoHtml;
}

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=344a9165173a4e29980110925231009&q=${city}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    filterData(data);

    console.log(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
