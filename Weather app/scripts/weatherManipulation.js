

let DefaultCity = "New York";
DefaultCity = "London";

const neutralDarkBleu = "rgb(16, 14, 29)";
const primaryFontColor = "rgb(231, 231, 231)";
const btnColor = "rgb(110, 112, 122)";
let celsiusIsSelected = true;
let fahrenheitBtn = document.getElementById('fahrenheitBtn');
let celsiusBtn = document.getElementById('celsiusBtn');
celsiusBtn.style.backgroundColor = primaryFontColor;
celsiusBtn.style.color = neutralDarkBleu;

setDate();
todaysWeather(DefaultCity);
getCityWeather(DefaultCity);


function setDate() {
    const date = new Date();
    const dateElement = document.getElementById("date");
    dateElement.innerText = `${String(date).slice(0, 15)}`
}

function todaysWeather(location) {
    function changeLocation(location) {
        document.getElementById("location").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${location}`;
    }
    // Replace 'New York' with your desired city name
    loadApiKeyAndFetchWeather(location);

    // Fetch weather data using an API key loaded from a file
    function fetchWeather(location, apiKey) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const weatherState = data.weather[0].main
                const currentTemperature = data.main.temp;

                changeLocation(location);
                document.getElementById('weather-state').innerText = weatherState;
                document.getElementById('tempurature').innerHTML = `
              <span id="todays-tempurature-level" class="tempurature-level">${parseInt(currentTemperature)}</span><span id="temp-level-metric" class="temp-metric"><sup>o</sup>C</span>`;
                document.getElementById('primary-img').innerHTML = `
              <img src="images/${getWeatherImg(weatherState)}" alt="shower weather" />`;

            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    // Load the API key from a file and fetch weather data
    function loadApiKeyAndFetchWeather(location) {
        fetch('apiKey.txt') // Load the API key from apiKey.txt
            .then(response => response.text())
            .then(apiKey => {
                if (apiKey) {
                    fetchWeather(location, apiKey.trim()); // Fetch weather data using the loaded API key
                } else {
                    console.log('API Key could not be retrieved.');
                }
            })
            .catch(error => {
                console.error('Error loading API key:', error);
            });
    }
}

function getWeatherImg(weatherState) {
    // map weather states with the avialable emojis
    const weatherIcons = {
        "Clear Sky": "Clear.png",
        "Clear": "Clear.png",
        "Fog": "Fog.png",
        "Mist": "Fog.png",
        "Dust": "Haze.png",
        "Sand": "Haze.png",
        "Haze": "Haze.png",
        "Smoke": "Haze.png",
        "Volcanic Ash": "Haze.png",
        "": "Hail.png",
        "Broken Clouds": "HeavyCloud.png",
        "Overcast Clouds": "HeavyCloud.png",
        "Few Clouds": "LightCloud.png",
        "Clouds": "HeavyCloud.png",
        "Scattered Clouds": "LightCloud.png",
        "Rain": "HeavyRain.png",
        "Drizzle": "LightRain.png",
        "Shower": "Shower.png",
        "Sleet": "Sleet.png",
        "Snow": "Snow.png",
        "Squalls": "Squalls.png",
        "Tornado": "Tornado.png",
        "Thunderstorm": "Thunderstorm.png"
    };
    return weatherIcons[weatherState];
}

function getCityWeather(city) {

    function getDayOfWeek(date) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayIndex = date.getDay();
        return daysOfWeek[dayIndex];
    }

    function getForecastData(forecastData, days = 5) {

        const daysData = {};
        let index = 0;

        const firstDayDate = new Date(forecastData[0].dt * 1000).getDate();
        let lastDate = firstDayDate

        for (let date of forecastData) {
            const currentDate = new Date(date.dt * 1000).getDate();

            if (currentDate > lastDate) {
                lastDate = currentDate;
                daysData[index] = date;
                index++;
            }

            // break when we have enough daysData
            if (currentDate > (firstDayDate + days)) {
                break;
            }
        }
        return daysData;
    }

    function daysWeather(forecastData) {
        const element = document.getElementById("days");
        element.innerHTML = "";
        console.log('> weather ', forecastData);

        for (let key of Object.keys(forecastData)) {
            let date = new Date(forecastData[key].dt * 1000)
            console.log('> forecastData[key]:', forecastData[key].weather[0].main);

            const dayCard = document.createElement('div');
            dayCard.className = "day-card";
            dayCard.innerHTML = `
            <div class="day-date">${getDayOfWeek(date)}</div>
            <div class="day-img">
                <img src="../images/${getWeatherImg(forecastData[key].weather[0].main)}" alt="Snow-day">
            </div>
            <div class="day-temp">
                <Span class="day-temp-max tempurature-level">${parseInt(forecastData[key].main.temp_max)}</span> <span class="temp-metric"><sup>o</sup>C</span>
                &ensp;
                <Span class="day-temp-min tempurature-level">${parseInt(forecastData[key].main.temp_min)}</span> <span class="temp-metric temp-metric-min"><sup>o</sup>C</span>
            </div>`;
            element.appendChild(dayCard);
        }

    }

    function highlights(forecastData) {

        function toMph(metersPerSecond) {
            const metersToMilesConversionFactor = 0.00062137119223733;
            const secondsToHoursConversionFactor = 3600;

            const milesPerHour = metersPerSecond * metersToMilesConversionFactor * secondsToHoursConversionFactor;
            return milesPerHour;
        }

        function degreesToDirection(degrees) {
            const sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
            const index = Math.floor((degrees + 22.5) % 360 / 45);
            return sectors[index];
        }

        function metersToMiles(meters) {
            const conversionFactor = 0.00062137119223733;
            return meters * conversionFactor;
        }

        // Extract other weather data from the first forecast entry (current weather)
        const windSpeedValue = forecastData.wind.speed;
        const windDirectionValue = forecastData.wind.deg;
        const humidityValue = forecastData.main.humidity;
        const visibilityValue = forecastData.visibility;
        const airPressureValue = forecastData.main.pressure;

        // Debug: Display wind speed, humidity, visibility, and air pressure
        console.log('Wind Speed:', windSpeedValue);
        console.log('Wind Direction:', windDirectionValue);
        console.log('Humidity:', humidityValue);
        console.log('Visibility:', visibilityValue);
        console.log('Air Pressure:', airPressureValue);

        // select highlights section
        // const highlights = document.getElementById("highlights");
        const windDiv = document.getElementById("wind");
        const humidityDiv = document.getElementById("humidity");
        const humidityDivProgressBar = document.getElementById("progress-bar");
        const visibilityDiv = document.getElementById("visibility");
        const airDiv = document.getElementById("air");

        // }
        windDiv.innerHTML =
            `
        <p>Wind status</p>
        <p>
            <span class="lf-span">${parseInt(toMph(windSpeedValue))}</span>
            <span class="mf-span">mph</span>
        </p>
        <p>
            <i class="fa-solid fa-location-arrow"></i> 
            ${degreesToDirection(windDirectionValue)}
        </p>
        `;


        humidityDiv.innerHTML = `
        <p>Humidity</p>
        <p>
            <span class="lf-span">${humidityValue}</span> 
            <span class="mf-span">%</span>
        </p>
        <div class="progress-bar__container">
            <p>
              <div id="progress-bar" style="left: -${100 - humidityValue}%">
                  <span class="progress-bar__text"></span>
              </div>
            </p>
        </div>`;
        // humidityDivProgressBar.style.left = `-${humidityValue}%`;

        visibilityDiv.innerHTML = `
        <p>Visibility</p>
        <p>
            <span class="lf-span">${metersToMiles(visibilityValue).toFixed(1)}</span> 
            <span class="mf-span">miles</span>
        </p>
        `;
        airDiv.innerHTML = `
        <p>Air Pressure</p>
        <p><span class="lf-span">${airPressureValue}</span> <span class="mf-span">mb</span></p>
        `;
    }

    async function readApiKey(filePath = 'apiKey.txt') {
        try {
            const response = await fetch(filePath);
            const apiKey = await response.text();
            return apiKey;
        } catch (error) {
            console.error("Error fetching apiKey:", error);
            return null;
        }
    }

    async function fetchWeatherData(city) {
        const apiKey = await readApiKey();

        if (!apiKey) {
            console.log("API Key could not be retrieved.");
            return;
        }

        try {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    // Extract the forecast data for 5 days
                    let forecastData = data.list;
                    forecastData = getForecastData(forecastData, 5);

                    // Shows days highlights
                    daysWeather(forecastData);
                    // Shows today's highlights
                    highlights(forecastData[0]);
                })
                .catch(error => {
                    console.error("Error fetching weather data:", error);
                    cityNotAvialable(city);
                });

        } catch (error) {
        }
    }

    // Call fetchWeatherData function with the desired city name
    fetchWeatherData(city);
}

function changeCity(city) {
    getCityWeather(city);
    todaysWeather(city);
}

function cityNotAvialable(City) {
    console.error(City, "City is not available, we'll get you the default city:", DefaultCity)
    // alert(City, "City is not available, we'll get you the default city:", DefaultCity)
    fetchWeatherData(DefaultCity);
}

// ////////////////////////////////////////////////////////
// Gps button
document.getElementById('gps-button').addEventListener('click', () => {
    const currentCity = getPosition();
    changeCity(currentCity);
});

function getPosition() {

    // Check if Geolocation is available in the browser
    if ("geolocation" in navigator) {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log("Position:", position);
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            // Use reverse geocoding to get the city name
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(">> data of city:", data);
                    const cityName = data.address.city_district || data.address.city || data.address.town || data.address.village || data.address.hamlet;

                    if (cityName) {
                        console.log("City:", cityName);
                        return cityName;
                    } else {
                        console.log("City name not available.");
                    }
                })
                .catch(error => {
                    console.error("Error fetching city name:", error);
                });

            // You can now use these latitude and longitude values for further processing
        }, function (error) {
            console.error("Error getting location:", error);
        });

    } else {
        console.error("Geolocation is not available in this browser.");
    }
}

// ////////////////////////////////////////////////////////
// Search Bar
const searchBar = document.getElementById('search-bar');
const primaryContent = document.getElementById('primary-content');
searchBar.style.width = primaryContent.style.width;

document.getElementById('search-button').addEventListener("click", () => {
    searchBar.style.left = 0;
});
document.getElementById('x-btn').addEventListener("click", () => {
    event.preventDefault(); // Prevent the default form submission
    searchBar.style.left = '-100%';
});

fetch('../json/cities.json')
    .then(response => response.json())
    .then(data => {
        console.log('> data:', data);
        // You can now work with the parsed JSON data
        const cityDropdown = document.getElementById('cities-list');
        // Populate the dropdown with city names
        for (const city in data) {
            if (data.hasOwnProperty(city)) {
                const option = document.createElement('li');
                // option.value = city;
                // option.textContent = city;
                option.innerText = city;
                cityDropdown.appendChild(option);
            }
        }

        const searchInput = document.getElementById('search-location');
        const list = document.getElementById('cities-list');
        const items = list.getElementsByTagName('li');

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            for (const item of items) {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        });

        list.addEventListener('click', (event) => {
            const clickedItem = event.target;
            if (clickedItem.tagName === 'LI') {
                const selectedItemText = clickedItem.textContent;
                searchInput.value = selectedItemText;
            }
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));

// ////////////////////////////////////////////////////////
// Submit the form
searchBar.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target); // Create a FormData object from the form
    const formDataObject = {};

    // Convert the FormData object to a plain object
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Debug
    console.log(formDataObject);

    changeCity(formDataObject["search-location"]);
    searchBar.style.left = '-100%';

    // document.getElementById('btn-locationSearch').addEventListener("click", () => {
    //     // changeCity(currentCity);
    // });
});


// ////////////////////////////////////////////////////////
// Metrics

function celsiusToFahrenheit(celsius) {
    return parseInt((parseInt(celsius) * 9 / 5) + 32);
}

// Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit) {
    return parseInt((parseInt(fahrenheit) - 32) * 5 / 9);
}

document.getElementById("temp-metrics-btn").addEventListener("click", (event) => {
    const tempuratureLevelArray = document.querySelectorAll('.tempurature-level');
    const tempMetricArray = document.querySelectorAll('.temp-metric');

    if (!celsiusIsSelected && event.target.id === "celsiusBtn") {

        // <p id="tempurature"><span id="tempurature-level"></span><span id="celsius"><sup>o</sup>C</span></p>
        // [0].textContent
        celsiusIsSelected = true;
        for (const tempLvl of tempuratureLevelArray) {
            tempLvl.innerText = fahrenheitToCelsius(tempLvl.innerText);
        }
        for (const tempMetric of tempMetricArray) {
            tempMetric.innerHTML = "<sup>o</sup>C";
        }

        celsiusBtn.style.backgroundColor = primaryFontColor;
        celsiusBtn.style.color = neutralDarkBleu;
        fahrenheitBtn.style.backgroundColor = btnColor;
        fahrenheitBtn.style.color = primaryFontColor;

    } else if (celsiusIsSelected && event.target.id === "fahrenheitBtn") {

        celsiusIsSelected = false;
        for (const tempLvl of tempuratureLevelArray) {
            tempLvl.innerText = celsiusToFahrenheit(tempLvl.innerText);
        }
        for (const tempMetric of tempMetricArray) {
            tempMetric.innerHTML = "<sup>o</sup>F";
        }

        fahrenheitBtn.style.backgroundColor = primaryFontColor;
        fahrenheitBtn.style.color = neutralDarkBleu;
        celsiusBtn.style.backgroundColor = btnColor;
        celsiusBtn.style.color = primaryFontColor;

    }

})

