import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import imageWind from "./images/wind.png";
import imageWeather from "./images/Single-Weather-.jpeg";
function App() {
  //useStateHook
  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const [data, setData] = useState({});
  const [inputCity, setInputCity] = useState("");

  // axios

  const getDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = () => {
    getDetails(inputCity);
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };
  useEffect(() => {
    getDetails("delhi");
  }, []);

  return (
    <div className="col-md-12">
      <div className="weather-bg">
        <h1>WeatherApp</h1>
        <div className="d-grid gap-4 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            onChange={handleChangeInput}
          />

          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded weatherResultBox">
          <img className="weathericon" src={imageWeather} alt=" weather-icon" />

          <h5 className="weatherCity">{data?.name}</h5>

          <h6 className="weatherTemp">
            {(data?.main?.temp - 273.15).toFixed(2)}
          </h6>
          <div>
            <img
              className="humidityIcon"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwCOh1ITavUhW77XW177ZdM79EaIT4_IAtEk-qb1NY4g&usqp=CAU&ec=48665701"
            />

            <h2 className="humidityCity">{data?.main?.humidity} %</h2>

            <img className="windIcon" src={imageWind} />
            <h2 className="windCity">{data?.wind?.speed} km/hr</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
