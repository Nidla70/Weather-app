import "./App.css";
import { useEffect, useState } from "react";

import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import axios from "axios";

import {
  BsCloudHaze2Fill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
  BsCloudDrizzleFill,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

//api key
const APIkey = "e71b8d4eb7d2c0891b7b8d00bc4edd23";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("sarajevo");
  const [inputValue, setInputValue] = useState("");
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    input.value = "";

    e.preventDefault();
  };

  // get data
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) => {
      setTimeout(() => {
        setData(res.data);
      }, 1500);
    });
  }, [location]);

  if (!data) {
    return (
      <div
        className="w-full 
      h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-no-repeat bg-cover bg-center 
      flex flex-col items-center justify-center px-4 lg:px-0"
      >
        <div>
          <ImSpinner8 className="text-5xl animate-spin text-cyan-600" />
        </div>
      </div>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy className="text-blue-400" />;

      break;
    case "Haze":
      icon = <BsCloudHaze2Fill className="text-blue-600" />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-blue-800" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-yellow-400" />;

      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-blue-400" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-blue-200" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm className="text-blue-900" />;
      break;
  }

  const date = new Date();

  return (
    <div
      className="w-full 
    h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-no-repeat bg-cover bg-center 
    flex flex-col items-center justify-center px-4 lg:px-0"
    >
      <form
        className={`h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32x] mb-8`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent capitalize outline-none placeholder:text-white text-white text-[15px]
            font-light pl-6 h-full "
            type="text"
            placeholder="Search...."
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className=" bg-[#1ab8ed] w-20 h-12 rounded-full flex justify-center items-center hover:bg-[#15avdd] transition  transform hover:scale-110"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      <div
        className="w-full bg-sky-500/30 max-w-[450px] min-h-[584px] text-white backdrop-blur-[32px]
      rounded-[32px] py-12 px-6 "
      >
        <div>
          <div className="flex items-center gap-x-5">
            <div className="text-[87px]">{icon}</div>

            <div>
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>
          <div className="my-20 ">
            <div className="flex justify-center items-center">
              <div className="text-[144px] leading-none font-light">
                {parseInt(data.main.temp)}
              </div>
              <div className="text-3xl">
                <TbTemperatureCelsius />
              </div>
            </div>
            <div className="capitalize text-center">
              {data.weather[0].description}
            </div>
          </div>
          <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsEye />
                </div>
                <div>
                  Visability
                  <span className="ml-2">{data.visibility / 1000} km</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsThermometer />
                </div>
                <div className="flex">
                  Feels like
                  <span className=" flex ml-2">
                    {parseInt(data.main.feels_like)}
                    <TbTemperatureCelsius />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsWater />
                </div>
                <div>
                  Humidity
                  <span className="ml-2">{data.main.humidity} %</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsWind />
                </div>
                <div>
                  Wind
                  <span className="ml-2">{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
