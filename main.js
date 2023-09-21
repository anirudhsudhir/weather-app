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
    console.log(weatherData["list"])
}

function createDataColumns() {
    weatherDataDay.textContent = ""
    for (let i = 1; i <= columnEntries; i++) {
        const dataColumn = document.createElement('div')
        dataColumn.classList.add('data-column')
        let dataColumnID = `datacolumn-${i}`
        dataColumn.setAttribute('id', dataColumnID)
        weatherDataDay.appendChild(dataColumn)
    }
}

function fillWeatherData() {
    const selectedColumn = document.querySelector('#datacolumn-1')
    selectedColumn.textContent = ""
    for (let i = 2; i <= columnEntries; i++) {
        let columnSelectorID = `#datacolumn-${i}`
        const selectedColumn = document.querySelector(columnSelectorID)
        selectedColumn.textContent = weatherData["list"][0]["main"]["temp"]
    }
}

async function searchCity() {
    await getWeatherData(searchBox.value)
    createDataColumns()
    fillWeatherData()
}

let apiKey = "66cab58a00be0e1b64b6ac3f24d0eb2b"
let cityLatitude, cityLongitude, weatherData;
const searchBox = document.getElementById('search-box')
const searchButton = document.getElementById('search-button')
const weatherDataDay = document.querySelector('#weatherdata-day')
const hoursPassed = (new Date()).getHours();
let columnEntries = 8 - (hoursPassed % 3) + 1

searchButton.addEventListener('click', searchCity)