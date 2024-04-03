import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
function App() {
  // const [currentTab, setCurrentTab] = useState("userweather");
  const [weatherData, setWeatherData] = useState(null);
  const [anyWeatherData, setAnyWeatherData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [access, setAccess] = useState(true);
  const [mode, setMode] = useState("userWeather");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);
  function getlocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  async function showPosition(position) {
    const { latitude, longitude } = position.coords;
    setAccess(false);
    const response = await fetchWeatherData(latitude, longitude);
    setWeatherData(response);
    // console.log(response);
  }

  async function fetchWeatherData(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }
  // const fetchUserWeatherInfo = async (coordinates) => {
  //   setLoading(true);
  //   try {
  //     const { lat, lon } = coordinates;
  //     const response = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  //     );
  //     const data = await response.json();
  //     setWeatherData(data);
  //     console.log(data);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  async function handleSearch(event) {
    event.preventDefault();
    if (!searchInput.trim()) return;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${API_KEY}`
    );
    const data = await response.json();
    setAnyWeatherData(data);
    setSearchInput("");
  }

  // function switchTab(tab) {
  //   setCurrentTab(tab);
  //   if (tab === "userweather") {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(showPosition);
  //     } else {
  //       alert("Geolocation is not supported by this browser.");
  //     }
  //   }
  // }
  // async function fetchSearchWeatherInfo(city) {
  //   try {
  //     const response = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  //     );
  //     const data = await response.json();
  //     setWeatherData(data);
  //   } catch (error) {
  //     console.error("Error fetching search weather data:", error);
  //   }
  // }

  return (
    <div className=" wrapper w-screen h-screen p-2 flex flex-col  items-center ">
      <h1 className="text-4xl font-semibold m-[50px]">WEATHER-WISE</h1>
      <div className="flex w-[50%] justify-between font-semibold  ">
        <button
          onClick={() => setMode("userWeather")}
          className={`active:bg-white active:bg-opacity-30 rounded-md p-1 ${
            mode === "userWeather" ? "bg-blue-200 bg-opacity-50 " : ""
          }`}
        >
          Your Weather
        </button>
        <button
          onClick={() => setMode("anyWeather")}
          className={`active:bg-white active:bg-opacity-30 rounded-md p-1 ${
            mode === "anyWeather" ? "bg-blue-200 bg-opacity-50 " : ""
          }`}
        >
          Search Weather
        </button>
      </div>

      {/*  grant acccess of location   */}
      {access && (
        <div
          className="sub-container grant-location-container flex flex-col justify-center items-center
  gap-y-[20px]
"
        >
          <img
            src="location_image.png"
            width="80"
            height="80"
            loading="lazy"
            alt="grant-access"
          />
          <p className="font-bold text-2xl ">Grant Location Access</p>
          <p className="font-semibold tracking-tighter">
            Allow Access to get weather Information
          </p>
          <button
            className="btn 
            all:unset  uppercase rounded-md bg-[#3F72AF] cursor-pointer px-8 py-2 text-md font-semibold hover:bg-transparent
            "
            data-grantaccesss
            onClick={getlocation}
          >
            GRANT ACCESS
          </button>
        </div>
      )}
      {mode !== "userWeather" && (
        <form className="mt-4 gap-[20px] w-[100%] max-w-[600px] flex justify-center items-center default:none">
          <input
            className="w-[90%] h-[40px] p-[20px] bg-blue-200 bg-opacity-50   focus:outline-0   rounded-lg text-white placeholder:text-white "
            type="text"
            placeholder="Search for a city"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="btn 
            all:unset  uppercase rounded-full bg-[#3F72AF] cursor-pointer p-3 text-md font-semibold hover:bg-transparent
            "
            onClick={handleSearch}
            type="submit"
          >
            <img src="search.png" className="w-[20px] h-[20px]" />
          </button>
        </form>
      )}

      {!access && !weatherData && (
        <div className="sub-container loading-containers">
          <img src="/ZKZx (1).gif" width="80" height="80" />
          <p>Loading</p>
        </div>
      )}
      {mode === "anyWeather" && anyWeatherData && (
        <div className="flex flex-col justify-center items-center text-2xl font-semibold">
          <div className="flex  text-2xl py-2">
            {anyWeatherData?.name}
            <img
              className="w-[25px] h-[20px] m-2"
              src={`https://flagcdn.com/144x108/${anyWeatherData?.sys?.country.toLowerCase()}.png`}
              alt="weather icon"
            />
          </div>
          {anyWeatherData?.weather?.[0]?.description}
          <img
            className="w-[100px] h-[100px] "
            src={`http://openweathermap.org/img/w/${anyWeatherData?.weather?.[0]?.icon}.png`}
            alt="weather icon"
          />
          {`${parseFloat(anyWeatherData?.main?.temp - 273.15).toFixed(1)}°C`}
          <div className=" flex gap-[20px] my-4">
            <div className=" flex flex-col h-[150px]  w-[150px] rounded-md  justify-center items-center bg-blue-200 bg-opacity-50">
              <img src="wind.png" className="w-[50px]" />
              <h1 className="text-xl">WINDSPEED</h1>
              <div className="text-lg">
                {`${anyWeatherData?.wind?.speed} m/s`}
              </div>
            </div>
            <div className=" h-[150px] w-[150px] rounded-md flex flex-col justify-center items-center bg-blue-200 bg-opacity-50">
              <img src="humidity.png" className="w-[50px]" />
              <h1 className="text-xl">HUMIDITY</h1>
              <div className="text-lg">{`${anyWeatherData?.main?.humidity}%`}</div>
            </div>
            <div className=" h-[150px] w-[150px] rounded-md flex flex-col justify-center items-center bg-blue-200 bg-opacity-50">
              <img src="cloudy.png" className="w-[50px]" />
              <h1 className="text-xl">CLOUDS</h1>
              <div className="text-lg">{`${anyWeatherData?.clouds?.all}%`}</div>
            </div>
          </div>
        </div>
      )}

      {mode === "userWeather" && weatherData && (
        <div className="flex flex-col justify-center items-center text-2xl font-semibold">
          <div className="flex  text-2xl py-2">
            {weatherData?.name}
            <img
              className="w-[25px] h-[20px] m-2"
              src={`https://flagcdn.com/144x108/${weatherData?.sys?.country.toLowerCase()}.png`}
              alt="weather icon"
            />
          </div>
          {weatherData?.weather?.[0]?.description}
          <img
            className="w-[100px] h-[100px] "
            src={`http://openweathermap.org/img/w/${weatherData?.weather?.[0]?.icon}.png`}
            alt="weather icon"
          />
          {`${parseFloat(weatherData?.main?.temp - 273.15).toFixed(1)}°C`}
          <div className=" flex gap-[20px] my-4">
            <div className=" flex flex-col h-[150px]  w-[150px] rounded-md  justify-center items-center bg-blue-200 bg-opacity-50">
              <img src="wind.png" className="w-[50px]" />
              <h1 className="text-xl">WINDSPEED</h1>
              <div className="text-lg">{`${weatherData?.wind?.speed} m/s`}</div>
            </div>
            <div className=" h-[150px] w-[150px] rounded-md flex flex-col justify-center items-center bg-blue-200 bg-opacity-50">
              <img src="humidity.png" className="w-[50px]" />
              <h1 className="text-xl">HUMIDITY</h1>
              <div className="text-lg">{`${weatherData?.main?.humidity}%`}</div>
            </div>
            <div className=" h-[150px] w-[150px] rounded-md flex flex-col justify-center items-center bg-blue-200 bg-opacity-50">
              <img src="cloudy.png" className="w-[50px]" />
              <h1 className="text-xl">CLOUDS</h1>
              <div className="text-lg">{`${weatherData?.clouds?.all}%`}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
