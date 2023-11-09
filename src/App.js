import { useState } from "react";
import "./App.css";
import EpubReader from "./epub/EpubReader";
import { fetchWeather } from "./api/fetchWeather";
import { set } from "lodash";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      console.log(query);
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        value={query}
        placeholder="Type City"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={searchWeather}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
    // <>
    //   <EpubReader epubUrl={require("./epub/file.epub")} />
    // </>
  );
}

export default App;
