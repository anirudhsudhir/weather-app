const dataDump = document.getElementById('data-dump')
let apiKey = "66cab58a00be0e1b64b6ac3f24d0eb2b"
let cityLatitude = "", cityLongitude = "";
getWeatherData("Bangalore");

async function getCityData(cityName) {
    let geocodeEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
    let rawLocationData = await fetch(geocodeEndpoint);
    let locationData = await rawLocationData.json();
    cityLatitude = locationData[0]["lat"]
    cityLongitude = locationData[0]["lon"]
}

async function getWeatherData(cityName) {
    await getCityData(cityName)
    let weatherEndpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityLatitude}&lon=${cityLongitude}&appid=${apiKey}`
    let rawWeatherData = await fetch(weatherEndpoint)
    let weatherData = await rawWeatherData.json()
    let currentTemperature = weatherData["list"][0]["main"]["temp"]
    dataDump.textContent = currentTemperature
}