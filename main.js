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




}