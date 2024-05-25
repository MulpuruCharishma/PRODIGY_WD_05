import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    const apiKey = '97c2ab1de2d76cb84b1fda826720f7f9'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      console.log(response.data); // Log the response data for debugging
      setWeather(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching weather data', error);
      setWeather(null);
      setError('City not found or an error occurred');
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather Application</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={getWeather}>Get Weather</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div className="weather-result">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
