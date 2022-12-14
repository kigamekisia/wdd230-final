const forecast = document.querySelector("#forecast");
const endpoint = "https://api.openweathermap.org/data/2.5/forecast?zip=92008&appid=b04526d795953ba74040ce82b862c119&units=imperial";

async function apiFetchForecast() {
    try {
        const response = await fetch(endpoint);
        if(response.ok) {
            const data = await response.json()
            displayForecastResults(data)
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecastResults(forecast_data) {
    let filtered_forecast = forecast_data.list.filter(forecast => forecast.dt_txt.includes(" 12:00:00"));
    filtered_forecast.slice(0, 3).forEach(forecast_day => {

        let week_day = new Date(forecast_day.dt * 1000).toLocaleDateString("en", {weekday: "long"});
        const weather_icon = forecast_day.weather[0].icon;
        const icon_src = `https://openweathermap.org/img/w/${weather_icon}.png`;
        const desc = forecast_day.weather[0].description;
        const weather_temp = forecast_day.main.temp.toFixed(0);

        let div = document.createElement('div');
        let day = document.createElement('h3');
        let icon = document.createElement('img');
        let temp = document.createElement('p');

        div.className = "forecast-day rounded-corners";
        day.textContent = week_day;

        icon.src = icon_src;
        icon.alt = desc;

        // temp.className = "forecast";
        temp.textContent = `${weather_temp}°F`;

        div.appendChild(day);
        div.appendChild(icon);
        div.appendChild(temp);

        forecast.appendChild(div);
    });
}

apiFetchForecast()
