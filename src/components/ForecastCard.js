import React from 'react';
import './ForecastCard.css';

const ForecastCard = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;

  const getDailyForecasts = () => {
    const dailyData = {};
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: date,
          temp: item.main.temp,
          icon: item.weather[0].icon,
          description: item.weather[0].description
        };
      }
    });

    return Object.values(dailyData).slice(0, 5);
  };

  const forecasts = getDailyForecasts();

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecasts.map((day, index) => {
          const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;
          const dayName = day.date.toLocaleDateString('en-US', { weekday: 'short' });
          
          return (
            <div key={index} className="forecast-day">
              <span className="forecast-day-name">{dayName}</span>
              <img 
                src={iconUrl} 
                alt={day.description}
                className="forecast-icon"
              />
              <span className="forecast-temp">{Math.round(day.temp)}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
