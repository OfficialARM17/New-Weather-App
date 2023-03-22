import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImageRainy from './background-rainy.jpg';
import backgroundImageCloudy from './background-cloudy.jpg';
import backgroundImageNight from './background-night.jpg';
import backgroundImageClear from './background-clear.jpg';
import { Menu } from "./components/Menu.tsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { ReactDimmer } from "react-dimmer";
import "./index.css"


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [fontColor, setFontColor] = useState('white');
  const [isMenuOpen, setMenu] = useState(false);
  const [weatherCondition, setWeatherConditionStatement] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };



  const handleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  useEffect(() => {
    // Update the background image based on the weather and time
    if (data.weather) {
      const weather = data.weather[0].main;
      const currentTime = new Date().getHours();
      if (weather === 'Rain') {
        setBackgroundImage(backgroundImageRainy);
        setFontColor('white');
      }  else if (weather === 'Clear' && currentTime >= 6 && currentTime < 18) {
          setBackgroundImage(backgroundImageClear);
          setFontColor('black');
      } else if (currentTime < 6 || currentTime >= 18 && currentTime < 24) {
        setBackgroundImage(backgroundImageNight);
        setFontColor('white');
      } else {
        setBackgroundImage(backgroundImageCloudy);
        setFontColor('black');
      }
    }
  }, [data]);
  

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        color: fontColor, // sets the font color depending on the state variable
        height: '100vh',
        weatherCondition: weatherCondition,
      }}
    >
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="menu-section">
        <GiHamburgerMenu className="menu-btn" onClick={handleMenu} />
         <div className="nav"></div>
      </div>
      <Menu isMenuOpen={isMenuOpen} />

      <ReactDimmer
        isOpen={isMenuOpen}
        exitDimmer={setMenu}
        zIndex={100}
        blur={1.5}
      />
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="top">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="top">
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">
                  {data.wind.speed.toFixed()} metres/sec
                </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

