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
    weatherData = await rawWeatherData.json()
}

function fillWeatherData() {
    let columnValue = 1, columnCount = 0;
    for (let i = 0; i < weatherData.list.length; i++) {
        if (++columnCount >= 8) {
            columnValue++
            columnCount = 0
        }
        let columnSelectorID = `#datacolumn-${columnValue}`
        const selectedColumn = document.querySelector(columnSelectorID)
        selectedColumn.textContent = weatherData["list"][i]["main"]["temp"]
    }
}

async function searchCity() {
    await getWeatherData(searchBox.value)
    fillWeatherData()
}

let apiKey = "66cab58a00be0e1b64b6ac3f24d0eb2b"
let cityLatitude, cityLongitude, weatherData;
const searchBox = document.getElementById('search-box')
const searchButton = document.getElementById('search-button')
searchButton.addEventListener('click', searchCity)