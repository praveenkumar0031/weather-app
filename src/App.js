import { useState } from 'react';
import Search from './components/search/search';
import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import { weather_Api_Url, weather_Api_Key } from './api';
import Forecast from './components/forecast/forecast'; // You'll need to create this component

function App() {
  const [currentWeather, SetCurrentWeather] = useState(null);
  const [forecast, SetForeCast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnSearchchange = (searchData) => {
    if (!searchData) return;
    
    setLoading(true);
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(`${weather_Api_Url}/weather?lat=${lat}&lon=${lon}&appid=${weather_Api_Key}&units=metric`);
    const ForecastFetch = fetch(`${weather_Api_Url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_Api_Key}&units=metric`);

    Promise.all([CurrentWeatherFetch, ForecastFetch])
      .then(async (response) => {
        const WeatherResponse = await response[0].json();
        const ForecastResponse = await response[1].json();

        SetCurrentWeather({ city: searchData.label, ...WeatherResponse });
        SetForeCast({ city: searchData.label, ...ForecastResponse });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="container">
      <h1 className="app-title">Weather Forecast</h1>
      <p className="app-description">
        Search for a city to get current weather conditions and forecast
      </p>
      
      <Search onSearchChange={handleOnSearchchange}
       />
      
      {loading && <div className="loading">Loading weather data...</div>}
      
      {currentWeather && <CurrentWeather data={currentWeather} />}
      
      {forecast && <Forecast data={forecast} />}
      
      <div className="footer">
        <p>
          Data provided by <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">OpenWeather</a>
        </p>
      </div>
    </div>
  );
}

export default App;