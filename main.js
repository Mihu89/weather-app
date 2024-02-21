/* Code for version 0.1
// api settings
const api = {
    key: "bd5e378503939ddaee76f12ad7a97608",
    url: "https://api.openweathermap.org/data/3.0"
}

const searchbox = document.querySelector('.search-box');
console.log(searchbox);

searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    // console.log("Event: ", evt);
    if (evt.keyCode == 13) {
        getResult(searchbox.value);
    }
}

function getResult(location) {
    console.log(location);

    // https://api.openweathermap.org/data/2.5/weater?q=Chisinau&units=metric&APPID=

    fetch(`${api.url}/weather?q=${location}&units=metric&APPID=${api.key}`)
        .then(weather => {
            console.log("weather: ", weather);
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    let cityValue = searchbox.value;
    let city = document.querySelector('.city');
    city.innerHTML = cityValue;

    let currentDate = new Date();
    let date = document.querySelector('.date');
    date.innerHTML = currentDate;

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${weather.current.temp}<span>°C</span>`;

    let weather_element = document.querySelector('.weather');
    weather_element.innerHTML = weather.current.weater.main + ", " + weather.current.weater.description;
    console.log("End");
} */

const cityInput = document.querySelector('.city-input');
const searchButton = document.querySelector('.search-btn');
const locationButton = document.querySelector('.location-btn');
const currentWeather = document.querySelector('.current-weather');
const weatherCards = document.querySelector('.weather-cards');

const apiKey = "bd5e378503939ddaee76f12ad7a97608";

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index == 0){
        return `<div class="current-weather">
        <h2>${cityName} (${weatherItem})</h2>
        <h5>Temperature: ${weatherItem}°C</h5>
        <h5>Wind: ${weatherItem} m/s</h5>
        <h5>Humidity: ${weatherItem}%</h5>
    </div>
    <div class="icon>
        <img src="" alt="weather-icon"/>
        <h6>${weatherItem}</h6>
    </div>`;
    } else {
        return `<li class="card">
        <h3>${weatherItem}</h3>
        <img src="" alt="weather-icon"/>
        <h5>Temp </h5>
        <h5>Wind</h5>
        <h5>Humidity</h5>
    </li>`;
    }
}

const getWeatherDetails = (cityName, latitude, longitude) =>{
    const weatherAPI_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`;

    fetch(weatherAPI_URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if(cityName === "") return;
    const weatherGeo_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    fetch(weatherGeo_URL)
    .then(response => response.json())
    .then(data => {
        console.log("Geo location: " + data);
        if(!data.lenght){
            alert("Such location/city/country/code doesn't exist");
        }
    });
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            // get weater for current location
            const weatherAPI_URL = `https://api.openweathermap.org/geo/reverse?lat=${latitude}&lon=${longitude}&limit=1&APPID=${apiKey}`;
            fetch(weatherAPI_URL)
            .then(response => response.json())
            .then(data => {
                console.log("getUserCoordinates: " + data);
                if(!data.lenght){
                    alert("Such location/city/country/code doesn't exist");
                }
            })
            .catch(() => {
                alert("Error when getting weater for current location");
            });
        },
        error => {
            if(error.code === error.PERMISSION_DENIED){
                alert("Geolocation request was denied, please grant permision and retry.");
            } else {
                alert("Geo location request faild, try again");
            }
        }
    );
}

// add event listners

searchButton.addEventListener("click", getCityCoordinates());
locationButton.addEventListener("click", getUserCoordinates());
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());