const apiKey = "&appid=ff04f79daeeea420ce5792f84207dfbb";
let API = "https://api.openweathermap.org/data/2.5/weather?q=";
let city = localStorage.getItem("city");
let data = null;

async function fecthAPI(city) {
    try {
        const response = await fetch(API + city + apiKey);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (e) {
        return null;
    }
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
searchButton.addEventListener("click", async () => {
    city = searchInput.value.toLowerCase();
    localStorage.setItem("city", city);

    if (city.trim() === "") {
        alert("Enter name of city");
        return;
    }

    data = await fecthAPI(city);

    if (data === null || data.cod === "404" || data.cod === 404) {
        alert("Enter valid city");
        return;
    }

    addDataToDOM(data);
});

function addDataToDOM(data) {
    const cityName = document.getElementById("city-name");
    cityName.innerHTML = data.name;

    const weatherIcon = document.getElementById("icon");
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    weatherIcon.setAttribute("alt", "kys");

    const mainWeather = document.getElementById("main-weather");
    mainWeather.innerHTML = data.weather[0].main;

    const mainWeatherDesc = document.getElementById("main-description");
    mainWeatherDesc.innerHTML = camelCase(data.weather[0].description);

    const temp = document.getElementById("temp");
    temp.innerHTML = `${String((Number(data.main.temp) - 273).toFixed(2))} °C`;

    const humid = document.getElementById("humid");
    humid.innerHTML = `${data.main.humidity}%`;
}

function camelCase(s) {
    let ss = "";

    for (let i = 0; i < s.length; i++) {
        if (i == 0 && s[i] != " ") ss += s[i].toUpperCase();
        else if (s[i - 1] == " ") ss += s[i].toUpperCase();
        else ss += s[i];
    }

    return ss;
}

async function init() {
    if (city !== undefined) {
        data = await fecthAPI(city);

        if (data === null || data.cod === 404) {
            alert("Enter valid city");
        }

        addDataToDOM(data);
    }
}
init();
