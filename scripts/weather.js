const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const windSpeed = document.querySelector('#speed');
const humidity = document.querySelector("#humidity");

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&units=imperial&appid=b04526d795953ba74040ce82b862c119';

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
} 
  
apiFetch();

function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;

    humidity.textContent = weatherData.main.humidity;
    const speed = weatherData.wind.speed.toFixed(0)
    windSpeed.innerHTML = `${speed} mph`;
    //calc_windChill(currentTemp, speed);
}
// function calc_windChill(temp, speed){
//     if (temp <= 50  && speed >= 3.0) {
//       const chill = 35.74 + (0.6215 * temp) - (35.75 * Math.pow(speed, 0.16)) + 
//       (0.4275 * temp * Math.pow(speed, 0.16));
  
//       document.getElementById("chill").textContent = Math.round(chill);
//     }
//     else {
//         document.getElementById("chill").textContent = " N/A";
//     }
//   }
//   apiFetch();
