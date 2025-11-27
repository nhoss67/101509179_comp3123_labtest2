import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import ForecastCard from './components/ForecastCard';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'fe492a024e1be5961f731575b621ce24';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const fetchWeatherData = async (searchCity) => {
    if (!searchCity || searchCity.trim() === '') {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?q=${encodeURIComponent(searchCity.trim())}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?q=${encodeURIComponent(searchCity.trim())}&appid=${API_KEY}&units=metric`
      );
      setForecastData(forecastResponse.data);

    } catch (err) {
      console.error('Error fetching weather data:', err);
      if (err.response) {
        if (err.response.status === 404) {
          setError(`City "${searchCity}" not found. Please check the spelling and try again.`);
        } else if (err.response.status === 401) {
          setError('API key error. Please check the API key configuration.');
        } else {
          setError(`Error: ${err.response.data.message || 'Failed to fetch weather data.'}`);
        }
      } else if (err.request) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData('Toronto');
  }, []);

  const handleSearch = (searchCity) => {
    fetchWeatherData(searchCity);
  };

  return (
    <div className="App">
      <div className="background-overlay"></div>
      
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            <img 
              src="https://openweathermap.org/img/wn/02d@2x.png" 
              alt="Weather" 
              className="header-weather-icon"
            />
            <span class="title-bold">Niaj's</span> <span class="title-gradient">Weather</span> App
          </h1>
          <p className="app-subtitle">Check the weather for <strong> any </strong> city</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <img 
              src="https://openweathermap.org/img/wn/50d@2x.png" 
              alt="Error" 
              className="error-weather-icon"
            />
            <p>{error}</p>
          </div>
        )}

        {weatherData && !loading && !error && (
          <div className="weather-content">
            <div className="main-weather">
              <WeatherCard weatherData={weatherData} />
            </div>
            
            <div className="weather-info">
              <WeatherDetails weatherData={weatherData} />
              {forecastData && <ForecastCard forecastData={forecastData} />}
            </div>
          </div>
        )}

        <footer className="app-footer">
          <p>
            COMP3123 Lab Test 2 | Uses OpenWeatherAPI
            <br />
            Niaj Hossain | 101509179
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
