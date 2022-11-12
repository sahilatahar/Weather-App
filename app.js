const apiKey = `3265874a2c77ae4a04bb96236a642d2f`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")
const wind = document.querySelector("#wind")
// const API = `https://api.openweathermap.org/data/2.5/weather?
// q=${city}&appid=${apiKey}&units=metric`
// const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`


form.addEventListener(
    "submit",
    function (event) {
        console.log(search.value);
        getWeather(search.value)
        event.preventDefault();
    }
)

const getWeather = async (cityName) => {
    weather.innerHTML = `<h2> Loading... </h2>`;
    wind.innerHTML = ``;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return updateWeather(data);
}

const updateWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h1> City Not found </h1>`;
        return;
    }
    weather.innerHTML = `<div>
                <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'
                    alt="image" id="weatherImage">
            </div>
            <div>
                <h1>${data.main.temp} ℃</h1>
                <h4>${data.weather[0].main}</h4>
            </div>`;

    wind.innerHTML = `
                <h3>Wind Speed : ${data.wind.speed} m/s</h3>
                    `;

}


async function getWeatherByLocation() {
    let position;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateWeatherByLocation);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

const updateWeatherByLocation = async (position) => {
    console.log(position);
    weather.innerHTML = `<h2> Loading... </h2>`;
    wind.innerHTML = ``;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    data.main.temp = kelvinToCelsius(data.main.temp);
    console.log(data);
    return updateWeather(data);
}

function kelvinToCelsius(kelvin) {
    return (Math.round((kelvin - 273.15) * 100) / 100).toFixed(2);;
}

function onButtonMouseOver() {
    document.getElementById("searchByLocation").style.backgroundColor = "#8e44ad";
    document.getElementById("searchByLocation").style.color = "white";
    document.getElementById("searchByLocation").style.border = "1px solid white";
}


function onButtonMouseOut() {
    document.getElementById("searchByLocation").style.backgroundColor = "white";
    document.getElementById("searchByLocation").style.color = "black";
    document.getElementById("searchByLocation").style.border = "1px solid black";
}