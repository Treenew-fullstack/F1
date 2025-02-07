import { useEffect } from 'react';
import axios from 'axios';
import fetchUserLocation from './userLocation.js';

function WeatherApp({ selectedCity, setWeatherData, setCityName, setSelectedCity }) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const geoUrl = 'http://api.openweathermap.org/geo/1.0/reverse';

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                let url;
                if (selectedCity) {
                    url = `${weatherUrl}?q=${selectedCity}&appid=${apiKey}&units=metric&lang=ru`;
                } else {
                    const userLocation = await fetchUserLocation();
                    if (userLocation) {
                        const reverseGeocodeUrl = `${geoUrl}?lat=${userLocation.latitude}&lon=${userLocation.longitude}&limit=1&appid=${apiKey}&lang=ru`;
                        const geoResponse = await axios.get(reverseGeocodeUrl);
                        setCityName(geoResponse.data[0]?.name || 'Неизвестный город');

                        url = `${weatherUrl}?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${apiKey}&units=metric&lang=ru`;
                    } else {
                        setSelectedCity('Moscow');
                        url = `${weatherUrl}?q=Moscow&appid=${apiKey}&units=metric&lang=ru`;
                    }
                }
                const response = await axios.get(url);
                setWeatherData(response.data);
            } catch (error) {
                if (error.code === 'ERR_NETWORK') {
                    console.error('Ошибка сети или тайм-аут соединения!');
                } else if (error.status === 401) {
                    console.error('Неверный API ключ!');
                } else {
                    console.error('Ошибка при получении данных о погоде:', error);
                }
            }
        };

        fetchWeatherData();
    }, [apiKey, selectedCity, setWeatherData, setCityName, setSelectedCity]);

    return null;
}

export default WeatherApp;