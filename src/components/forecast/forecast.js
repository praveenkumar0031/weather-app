// components/forecast/forecast.js
import React from 'react';
import './forecast.css';

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Forecast = ({ data }) => {
    // Group forecast data by day (assuming the API returns forecast in 3-hour intervals)
    const dailyData = [];
    const dayIndices = {};

    // Process and group the forecast data by day
    data.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const dayOfWeek = date.getDay();
        const dayName = WEEK_DAYS[dayOfWeek];
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });

        const fullDay = `${dayName}, ${formattedDate}`;

        if (dayIndices[fullDay] === undefined) {
            dayIndices[fullDay] = dailyData.length;
            dailyData.push({
                day: dayName,
                date: formattedDate,
                fullDay,
                icon: item.weather[0].icon,
                description: item.weather[0].description,
                temp: item.main.temp,
                temp_min: item.main.temp_min,
                temp_max: item.main.temp_max,
                humidity: item.main.humidity,
                wind: item.wind.speed
            });
        } else {
            const index = dayIndices[fullDay];
            // Update min/max temps if needed
            dailyData[index].temp_min = Math.min(dailyData[index].temp_min, item.main.temp_min);
            dailyData[index].temp_max = Math.max(dailyData[index].temp_max, item.main.temp_max);
        }
    });

    // Limit to 5 days
    const forecastData = dailyData.slice(0, 5);

    return (
        <div className="forecast">
            <div className="forecast-title">5-Day Forecast</div>
            <div className="forecast-container">
                {forecastData.map((item, idx) => (
                    <div key={idx} className="forecast-item">
                        <div className="forecast-date">
                            <div>{item.day}</div>
                            <div>{item.date}</div>
                        </div>
                        <img
                            alt={item.description}
                            className="forecast-icon"
                            src={`/icons/${item.icon}.png`}
                        />
                        <div className="forecast-temp">{Math.round(item.temp)}°C</div>
                        <div className="forecast-min-max">
                            <span className="forecast-min">{Math.round(item.temp_min)}°</span>
                            <span className="forecast-max">{Math.round(item.temp_max)}°</span>
                        </div>
                        <div className="forecast-desc">{item.description}</div>
                        <div className="forecast-details">
                            <div className="forecast-wind">
                                <span>Wind: {Math.round(item.wind)} m/s</span>
                            </div>
                            <div className="forecast-humidity">
                                <span>Humidity: {item.humidity}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
