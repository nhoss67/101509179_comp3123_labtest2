import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const tempCelsius = Math.round(weatherData.main.temp);
  const feelsLike = Math.round(weatherData.main.feels_like);
  
  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  
  const currentDate = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <h2 className="day-name">{dayName}</h2>
        <p className="date">{formattedDate}</p>
        <p className="location">
          <img 
            src="https://openweathermap.org/img/wn/10d@2x.png" 
            alt="Location" 
            className="location-icon-img"
          />
          {weatherData.name}, {weatherData.sys.country}
        </p>
      </div>

      <div className="weather-card-body">
        <div className="weather-icon-container">
          <img 
            src={iconUrl} 
            alt={weatherData.weather[0].description}
            className="weather-icon"
          />
        </div>
        
        <div className="temperature-container">
          <span className="temperature">{tempCelsius}</span>
          <span className="temperature-unit">°C</span>
        </div>
        
        <p className="weather-description">
          {weatherData.weather[0].description.charAt(0).toUpperCase() + 
           weatherData.weather[0].description.slice(1)}
        </p>
        
        <p className="feels-like">
          Feels like {feelsLike}°C
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
