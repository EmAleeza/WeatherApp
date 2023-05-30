const apiKey = '406ce7e46c2bd1e0641a36fa8bb65272';
const time = document.getElementById('time');
const currentDate = document.getElementById('date');
const searchBox = document.getElementById('type-box');
const searchBtn = document.getElementById('searchBtn');
const weatherIcon = document.getElementById('icon');

// Set date and time
setInterval(() => {
    let now = new Date();
    let hours = now.getHours();
    const hours12Format = (hours >= 13) ? hours % 12 : hours;
    let minutes = now.getMinutes();   
    const amPm = (hours >= 12) ? 'PM' : 'AM';
    time.innerHTML = (hours12Format < 10 ? '0'+hours12Format : hours12Format )+ ':' + (minutes < 10 ? '0' +minutes : minutes) + ' ' + `<span id="am-pm">${amPm}</span> `;
}, 1000);

async function getWeatherData(city) {
    const uRL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

    if (city.trim() === '') {
        // Display an error message for invalid input
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.parent1').style.display = 'block';
        return; // Exit the function
    }

    let url = await fetch(uRL + city + `&appid=${apiKey}`);
    let data = await url.json();
    console.log(data);

    if (url.status !== 404) {
        document.getElementById('city').innerHTML = data.name;
        document.getElementById('temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.getElementById('humidity').innerHTML = data.main.humidity + '%';
        document.getElementById('pressure').innerHTML = data.main.pressure;
        document.getElementById('windspeed').innerHTML = data.wind.speed + 'Km/h';
        document.getElementById('sunrise').innerHTML =data.sys.sunrise;
        document.getElementById('sunset').innerHTML = data.sys.sunset;

        if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = './Images/1.png';
        } else if (data.weather[0].main === 'Thunderstorm') {
            weatherIcon.src = './Images/cloudnew-thander.png';
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = './Images/sunnynew-icon.png';
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = './Images/sun-cloud-rainnew.png';
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = './Images/rainynew-icon.png';
        }

        document.querySelector('.container').style.display = 'block';
        document.querySelector('.parent1').style.display = 'none';
    } else {
        // Display an error message for invalid city
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.parent1').innerHTML = ` <div class="parent">
        <div class="sec-container">
            <div class="card border-0  text-white">
               <i class="fa-shake"> <img src="./Images/wepik-export-20230530102820bwIa.png" class="img-fluid bg-img" alt="..." width="300px"></i>
            </div>
            <h5 class="error">Enter valid city name..</h5>
        </div>
    </div>`;
        document.querySelector('.parent1').style.display = 'block';
    }
}

searchBtn.addEventListener('click', () => {
    getWeatherData(searchBox.value);
});









