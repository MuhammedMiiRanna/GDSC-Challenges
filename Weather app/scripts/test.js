

const apiKey = '5ac380a6344338786e91a0e565a4a21b'; // Replace with your API key
const city = 'New York'; // Replace with the desired city name

const weatherDataDiv = document.getElementById('weather-data');

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        // Extract the required weather data from the API response
        const currentWeather = data.weather[0].description;
        const currentTemp = data.main.temp;
        const currentDate = new Date().toLocaleDateString();

        // Display today's weather, temperature, and date
        const todayWeatherHTML = `<h2>Today's Weather: ${currentWeather}</h2>
                                  <p>Temperature: ${currentTemp} &#8451;</p>
                                  <p>Date: ${currentDate}</p>`;
        weatherDataDiv.innerHTML = todayWeatherHTML;

        // Fetch the 5-day forecast data
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    })
    .then(response => response.json())
    .then(data => {
        // Extract the forecast data for 5 days
        const forecastData = data.list;

        // Display max and min temperature for today and the next 4 days
        let forecastHTML = '<h2>5-Day Forecast:</h2>';
        for (let i = 0; i < 5; i++) {
            const forecastDate = new Date(forecastData[i].dt * 1000).toLocaleDateString();
            const maxTemp = forecastData[i].main.temp_max;
            const minTemp = forecastData[i].main.temp_min;
            forecastHTML += `<p>${forecastDate}: Max Temp: ${maxTemp} &#8451;, Min Temp: ${minTemp} &#8451;</p>`;
        }

        // Extract other weather data
        const windSpeed = data.list[0].wind.speed;
        const humidity = data.list[0].main.humidity;
        const visibility = data.list[0].visibility;
        const airPressure = data.list[0].main.pressure;

        // Display wind speed, humidity, visibility, and air pressure
        forecastHTML += `<p>Wind Speed: ${windSpeed} m/s</p>
                         <p>Humidity: ${humidity} %</p>
                         <p>Visibility: ${visibility} meters</p>
                         <p>Air Pressure: ${airPressure} hPa</p>`;

        // Update the weather data div with the 5-day forecast and other weather data
        weatherDataDiv.innerHTML = forecastHTML;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherDataDiv.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
    });
