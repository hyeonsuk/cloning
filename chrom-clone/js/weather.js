const weatherContainer = document.querySelector(".js-weather");
const weatherTitle = weatherContainer.querySelector(".js-title");
const weatherIcon = weatherContainer.querySelector(".js-icon");
const placeTitle = document.querySelector(".js-place");

const API_KEY = "f4d2fc71166d2a24164ad8ce3c117683";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        console.log(response);
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const iconImg = new Image();
        iconImg.src = `https://api.openweathermap.org/img/w/${json.weather[0].icon}.png`;
        const country = json.sys.country;
        const place = json.name;
        weatherTitle.innerText = `${temperature}ºC`;
        weatherIcon.appendChild(iconImg);
        placeTitle.innerText = `${place} in ${country}`;
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();