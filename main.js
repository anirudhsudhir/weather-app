async function getCityData(cityName) {
    try {
        let geocodeEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
        let rawLocationData = await fetch(geocodeEndpoint);
        let locationData = await rawLocationData.json();
        cityLatitude = locationData[0]["lat"]
        cityLongitude = locationData[0]["lon"]
    }
    catch {
        throw new Error('Location Data Unavailable!')
    }
}

async function getWeatherData() {
    try {
        let weatherEndpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityLatitude}&lon=${cityLongitude}&appid=${apiKey}&units=metric`
        let rawWeatherData = await fetch(weatherEndpoint)
        weatherData = await rawWeatherData.json()
    }
    catch (error) {
        throw new Error('Weather Data Unavailable!')
    }
}

function createDataColumns() {
    weatherDataDay.textContent = ""
    for (let i = 1; i <= 6; i++) {
        const dataColumn = document.createElement('div')
        dataColumn.classList.add('data-column')
        let dataColumnID = `datacolumn-${i}`
        dataColumn.setAttribute('id', dataColumnID)
        weatherDataDay.appendChild(dataColumn)
    }
}

function fillWeatherData() {
    let blankImage = new Image()
    const firstColumn = document.querySelector('#datacolumn-1')
    firstColumn.innerHTML += `Date<br>`
    firstColumn.appendChild(blankImage)
    firstColumn.innerHTML += `Temperature<br>Feels Like<br>`
    firstColumn.innerHTML += `Humidity<br>Description<br>`
    firstColumn.innerHTML += `Chance of Rain<br>`
    let jsonIndex = 0
    for (let i = 2; i <= 6; i++) {
        let currentWeatherData = weatherData["list"][jsonIndex]
        if (jsonIndex === 0) {
            let currentDayHours = (new Date()).getHours()
            let dayWeatherCount = 8 - Math.trunc(currentDayHours / 3)
            jsonIndex += dayWeatherCount + 3
        }
        else jsonIndex += 8
        let columnSelectorID = `#datacolumn-${i}`
        const selectedColumn = document.querySelector(columnSelectorID)
        weatherIcon = document.createElement('img')
        weatherIcon.src = `https://openweathermap.org/img/wn/${currentWeatherData["weather"][0]["icon"]}@2x.png`
        selectedColumn.innerHTML += `${(currentWeatherData["dt_txt"]).substring(0, 10).split('-').reverse().join('-')}<br>`
        selectedColumn.appendChild(weatherIcon)
        selectedColumn.innerHTML += `<br>${currentWeatherData["main"]["temp"]}&deg;C<br>${currentWeatherData["main"]["feels_like"]}&deg;C<br>`
        selectedColumn.innerHTML += `${Math.trunc(Number(currentWeatherData["main"]["humidity"]))}%<br>`
        let weatherDescription = currentWeatherData["weather"][0]["description"]
        selectedColumn.innerHTML += `${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}<br>`
        selectedColumn.innerHTML += `${Math.trunc(Number(currentWeatherData["pop"]) * 100)}% <br>`
    }
}

async function searchCity() {
    if (searchBox.value === '') {
        weatherDataDay.textContent = "Please enter a city or region!"
    }
    else {
        try {
            await getCityData(searchBox.value)
            await getWeatherData()
            createDataColumns()
            fillWeatherData()
        }
        catch (error) {
            weatherDataDay.textContent = error
        }
    }
}

let apiKey = "66cab58a00be0e1b64b6ac3f24d0eb2b"
let cityLatitude, cityLongitude, weatherData;
const searchBox = document.getElementById('search-box')
const searchButton = document.getElementById('search-button')
const weatherDataDay = document.querySelector('#weatherdata-day')

searchButton.addEventListener('click', searchCity)