 import { cities } from '../json/cities.json';

        const cityDropdown = document.getElementById('city-dropdown');

        // Populate the dropdown with city names
        for (const city in cities) {
            if (cities.hasOwnProperty(city)) {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                cityDropdown.appendChild(option);
            }
        }

        // Listen for selection changes
        cityDropdown.addEventListener('change', () => {
            const selectedCity = cityDropdown.value;
            const selectedCountry = cities[selectedCity];
            console.log(`You selected ${selectedCity}, which is in ${selectedCountry}.`);
        });

// /////////////////////////////////////////////////////////////////
// function getPosition() {

//     // Check if Geolocation is available in the browser
//     if ("geolocation" in navigator) {
//         // Get the user's current position
//         navigator.geolocation.getCurrentPosition(function (position) {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;

//             console.log("Position:", position);
//             console.log("Latitude:", latitude);
//             console.log("Longitude:", longitude);

//             // Use reverse geocoding to get the city name
//             const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
//             fetch(apiUrl)
//                 .then(response => response.json())
//                 .then(data => {
//                     const cityName = data.address.city || data.address.town || data.address.village || data.address.hamlet;

//                     if (cityName) {
//                         console.log("City:", cityName);
//                     } else {
//                         console.log("City name not available.");
//                     }
//                 })
//                 .catch(error => {
//                     console.error("Error fetching city name:", error);
//                 });

//             // You can now use these latitude and longitude values for further processing
//         }, function (error) {
//             console.error("Error getting location:", error);
//         });

//     } else {
//         console.error("Geolocation is not available in this browser.");
//     }


// }

// // //////////////////////////////////////////////////////////////////
// // // Import the fs module
// // const fs = require('fs');

// // // Read the contents of the .gitignore file
// // fs.readFile('.gitignore', 'utf8', (err, data) => {
// //     if (err) {
// //         console.error('Error reading .gitignore file:', err);
// //         return;
// //     }

// //     console.log('Contents of .gitignore:');
// //     console.log(data);
// // });
// // //////////////////////////////////////////////////////////////////
// // const apiKey = '5ac380a6344338786e91a0e565a4a21b'; // Replace with your API key
// // const city = 'New York'; // Replace with the desired city name

// // const weatherDataDiv = document.getElementById('weather-data');

// // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
// //     .then(response => response.json())
// //     .then(data => {
// //         // Extract the required weather data from the API response
// //         const currentWeather = data.weather[0].description;
// //         const currentTemp = data.main.temp;
// //         const currentDate = new Date().toLocaleDateString();

// //         // Display today's weather, temperature, and date
// //         const todayWeatherHTML = `<h2>Today's Weather: ${currentWeather}</h2>
// //                                   <p>Temperature: ${currentTemp} &#8451;</p>
// //                                   <p>Date: ${currentDate}</p>`;
// //         weatherDataDiv.innerHTML = todayWeatherHTML;

// //         // Fetch the 5-day forecast data
// //         return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
// //     })
// //     .then(response => response.json())
// //     .then(data => {
// //         // Extract the forecast data for 5 days
// //         const forecastData = data.list;

// //         // Display max and min temperature for today and the next 4 days
// //         let forecastHTML = '<h2>5-Day Forecast:</h2>';
// //         for (let i = 0; i < 5; i++) {
// //             const forecastDate = new Date(forecastData[i].dt * 1000).toLocaleDateString();
// //             const maxTemp = forecastData[i].main.temp_max;
// //             const minTemp = forecastData[i].main.temp_min;
// //             forecastHTML += `<p>${forecastDate}: Max Temp: ${maxTemp} &#8451;, Min Temp: ${minTemp} &#8451;</p>`;
// //         }

// //         // Extract other weather data
// //         const windSpeed = data.list[0].wind.speed;
// //         const humidity = data.list[0].main.humidity;
// //         const visibility = data.list[0].visibility;
// //         const airPressure = data.list[0].main.pressure;

// //         // Display wind speed, humidity, visibility, and air pressure
// //         forecastHTML += `<p>Wind Speed: ${windSpeed} m/s</p>
// //                          <p>Humidity: ${humidity} %</p>
// //                          <p>Visibility: ${visibility} meters</p>
// //                          <p>Air Pressure: ${airPressure} hPa</p>`;

// //         // Update the weather data div with the 5-day forecast and other weather data
// //         weatherDataDiv.innerHTML = forecastHTML;
// //     })
// //     .catch(error => {
// //         console.error('Error fetching weather data:', error);
// //         weatherDataDiv.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
// //     });
