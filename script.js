const api = {
    key: "34cae81e7d712a38b0c6249536e4e18e",
    base: 'https://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery);

function setQuery(input){
    if(input.keyCode === 13 || input.which === 13){
        getResults(searchBox.value);
    }
}

function getResults (query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date'); 
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}${String.fromCharCode(176)}C`;

    let weather_el = document.querySelector('.weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}${String.fromCharCode(176)}C / ${Math.round(weather.main.temp_max)}${String.fromCharCode(176)}C`

    // console.log(city);
    // let search = {
    //     city: 'City: ' + console.log(city.innerText),
    //     date: console.log(date.innerText),
    //     temperature: console.log(temp.innerText),
    //     weather: console.log(weather_el.innerText),
    //     hiLow:  console.log(hilow.innerText)
    // };
    let search = {
        city: city.innerText,
        date: date.innerText,
        temperature: temp.innerText,
        weather:  weather_el.innerText,
        hiLow: hilow.innerText
    };
    console.log(search);
}

function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}; 

if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('../serviceWorker.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`))
    })
}