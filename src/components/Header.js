import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Header.css";

const Header = () => {
  const [data, setData] = useState({});
  const [inputCity, setInputCity] = useState("  ");

  document.title = "Weather || report";

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=4a2becfa53e4c051c63a7ebc731855a0";
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);

        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  useEffect(() => {
    getWeatherDetails(inputCity);
  }, []);

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };
  return (
    <div className="header">
      <div className="header-bg">
        <h2 className="title">
          <u>Weather App</u>
        </h2>
        <div className="search-field">
        <input
          type="text"
          className="form"
          value={inputCity}
          onChange={handleChangeInput}
        />
        </div>
        <div className="btn">
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="weather-result">
          <div className="logo">
          <img
            src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
            alt="not found"
          />
         </div>
          <div className="cityName">{data?.name}</div>
          <div className="temp">{(data?.main?.temp - 273.15).toFixed(2)} C</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
