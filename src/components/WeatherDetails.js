import React from 'react';
import './WeatherDetails.css';

const WeatherDetails = ({ weatherData }) => {
  if (!weatherData) return null;

  const humidity = weatherData.main.humidity;
  const windSpeed = (weatherData.wind.speed * 3.6).toFixed(1);
  const pressure = weatherData.main.pressure;
  const visibility = (weatherData.visibility / 1000).toFixed(1);
  const tempMax = Math.round(weatherData.main.temp_max);
  const tempMin = Math.round(weatherData.main.temp_min);
  const cloudiness = weatherData.clouds.all;
  
  const sunriseTime = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const detailItems = [
    { iconUrl: 'https://openweathermap.org/img/wn/09d@2x.png', label: 'HUMIDITY', value: `${humidity}%` },
    { iconUrl: 'https://openweathermap.org/img/wn/50d@2x.png', label: 'WIND', value: `${windSpeed} km/h` },
    { iconUrl: 'https://openweathermap.org/img/wn/13d@2x.png', label: 'AIR PRESSURE', value: `${pressure} hPa` },
    { iconUrl: 'https://openweathermap.org/img/wn/01d@2x.png', label: 'VISIBILITY', value: `${visibility} km` },
    { iconUrl: 'https://openweathermap.org/img/wn/02d@2x.png', label: 'MAX TEMP', value: `${tempMax}°C` },
    { iconUrl: 'https://openweathermap.org/img/wn/13n@2x.png', label: 'MIN TEMP', value: `${tempMin}°C` },
    { iconUrl: 'https://openweathermap.org/img/wn/03d@2x.png', label: 'CLOUDINESS', value: `${cloudiness}%` },
    { iconUrl: 'https://openweathermap.org/img/wn/01d@2x.png', label: 'SUNRISE', value: sunriseTime },
    { iconUrl: 'https://openweathermap.org/img/wn/01n@2x.png', label: 'SUNSET', value: sunsetTime },
  ];

  return (
    <div className="weather-details">
      <h3 className="details-title">Weather Details</h3>
      <div className="details-grid">
        {detailItems.map((item, index) => (
          <div key={index} className="detail-item">
            <img 
              src={item.iconUrl} 
              alt={item.label} 
              className="detail-icon-img"
            />
            <div className="detail-content">
              <span className="detail-label">{item.label}</span>
              <span className="detail-value">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
