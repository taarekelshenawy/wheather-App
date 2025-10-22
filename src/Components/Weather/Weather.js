// Refactored React Weather Component
import React, { useEffect, useRef, useState } from 'react';
import "./Weather.css";
import searchicon from "../images/search.png";
import sunny from "../images/sunny.png";
import humidity from "../images/humidity.png";
import windspeed from "../images/wind.png";
import drizzle from "../images/drizzel.png";
import mist from "../images/heavy-rain.png";
import snow from "../images/snow.png";
import clouds from "../images/clouds.png";
import rain from "../images/rain.png";
import { Audio } from 'react-loader-spinner';
import logo from '../images/logo.svg';

export default function Weather() {
  const [weather, setWeather] = useState({
    temperature: 2,
    country: "london",
    humidity: "25",
    windSpeed: "48",
  });
  const [image, setImage] = useState(sunny);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef();
  const apikey = process.env.REACT_APP_WEATHER_API_KEY;

  const imageMap = {
    Clear: sunny,
    Drizzle: drizzle,
    Mist: mist,
    Snow: snow,
    Clouds: clouds,
    Rain: rain,
  };

  async function fetchCityWeather(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`);
      const data = await response.json();

      if (response.status === 404) {
        document.querySelector(".display").style.display = "none";
        document.getElementById("valid").innerHTML = "Invalid city name";
      } else {
        document.querySelector(".display").style.display = "block";
        document.getElementById("valid").innerHTML = "";

        const weatherMain = data.weather[0].main;
        setImage(imageMap[weatherMain] || sunny);

        setWeather({
          temperature: data.main.temp,
          country: data.name,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCityWeather("egypt");
  }, []);

  function handleSearch() {
    const city = inputRef.current.value;
    if (city) fetchCityWeather(city);
    inputRef.current.value = "";
  }

  return (
    <div className='container'>
      {loading ? (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Audio height="80" width="80" ariaLabel="loading" />
        </div>
      ) : (
        <div>
          <header>
            <div className='title'>
              <img src={logo} alt='weather logo' className='weather_logo' />
            </div>
          </header>
          <div className='weather_content'>
            <h1>How's the sky looking today?</h1>
            <div className='search'>
              <input type='text' placeholder='Search city' ref={inputRef} />
              <img src={searchicon} alt='search icon' width='40' onClick={handleSearch} />
            </div>
            <p id='valid'></p>
            <div className='country-details'>
              <h3>{weather.country}</h3>
              <div className='country-degree'>
                <img src={image} alt='weather icon' className='weathericon' width='90' />
                <p>{Math.round(weather.temperature)} °C</p>
              </div>
            </div>
            <div className='display'>
              <div className='weatherinfo'>
                <div className='humidity'>
                  <img src={humidity} alt='humidity icon' />
                  <div>
                    <p>{weather.humidity}%</p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className='windspeed'>
                  <img src={windspeed} alt='wind speed icon' />
                  <div>
                    <p>{Math.round(weather.windSpeed)} km/h</p>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

