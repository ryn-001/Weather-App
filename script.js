const apiKey = "&appid=ff04f79daeeea420ce5792f84207dfbb";
let API = "https://api.openweathermap.org/data/2.5/weather?q=";
let city = "";

async function fecthAPI(city){
    try{
        const response = await fetch(API + city + apiKey);
        const data = await response.json();
        return data;
    }catch(e){
        return null;
    }
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
searchButton.addEventListener("click", async () => {
    city = searchInput.value.toLowerCase();
    
    if(city.trim() === "") return;

    let data = await fecthAPI(city);
    console.log(data);

    const cityName = document.getElementById("city-name");
    cityName.innerHTML = data.name;

    const weatherIcon = document.getElementById("icon");
    weatherIcon.setAttribute("src",`http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    weatherIcon.setAttribute("alt","kys");

    const mainWeather = document.getElementById("main-weather");
    mainWeather.innerHTML = data.weather[0].main;
    

});
