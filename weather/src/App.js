import React, { useState } from 'react';
import './App.css';
import WeatherApp from './components/weatherAPI.js';
import { cityNames, cities } from './components/listCities.js';

function App() {
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');

  const iconUrl = 'https://openweathermap.org/img/w/';

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setSelectedCity(event.target.value);
  };

  return (
      <div className="App">
        <nav className="container">
          <nav className='label-container'>
            <h1>Прогноз погоды</h1>

            <label htmlFor="city-select">Город:</label>
            <select id="city-select" value={city} onChange={handleCityChange} className='select-weather'>
              {cities.map((cityOption) => (
                  <option key={cityOption.value} value={cityOption.value}>{cityOption.label}</option>
              ))}
            </select>
          </nav>

          <WeatherApp
              selectedCity={selectedCity}
              setWeatherData={setWeatherData}
              setCityName={setCityName}
              setSelectedCity={setSelectedCity}
          />

          {weatherData && (
              <nav className='weather-container'>
                <h1>Текущая погода в {selectedCity ? cityNames[selectedCity] : cityNames[cityName]}:</h1>
                <nav className='show-current-weather'>
                  <nav className='temperature'>{Math.floor(weatherData.list[0].main.temp)}°C</nav>
                  <img src={`${iconUrl}${weatherData.list[0].weather[0].icon}.png`} alt='icon'/>
                </nav>

                <p>{weatherData.list[0].weather[0].description}</p>

                <nav className='details'>
                  <nav>
                    <p>Ощущается как:</p>
                    <p>{Math.floor(weatherData.list[0].main.feels_like)}°C</p>
                  </nav>

                  <nav>
                    <p>Влажность:</p>
                    <p>{weatherData.list[0].main.humidity}%</p>
                  </nav>

                  <nav>
                    <p>Скорость ветра:</p>
                    <p>{weatherData.list[0].wind.speed} м/с</p>
                  </nav>
                </nav>

                <h1>Ближайшая погода на 5 дней в {selectedCity ? cityNames[selectedCity] : cityNames[cityName]}:</h1>
                <nav className='weather-five-days'>
                  {weatherData.list.filter((_, index) => index % 8 === 0).map((forecast, index) => (
                      <nav key={index}>
                        <h1>{Math.floor(forecast.main.temp)}°C</h1>
                        <p><strong>Дата:</strong> {new Date(forecast.dt_txt).toLocaleDateString()}</p>
                        <p><strong>На улице будет:</strong></p>
                        <p>{forecast.weather[0].description}</p>
                        <img src={`${iconUrl}${forecast.weather[0].icon}.png`} alt='icon'/>
                      </nav>
                  ))}
                </nav>
              </nav>
          )}
        </nav>
      </div>
  );
}

export default App;