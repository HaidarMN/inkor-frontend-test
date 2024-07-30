import { useEffect, useState } from "react";

import axiosApi from "./services/axios";
import { responseCurrent } from "./types";

import { MdSunny, MdDewPoint } from "react-icons/md";
import { WiHumidity, WiCloudyGusts } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { BsArrowsCollapse } from "react-icons/bs";

import Astronomy from "./components/Astronomy";
import GridItem from "./components/GridItem";
import ForecastHour from "./components/ForecastHour";
import ForecastDay from "./components/ForecastDay";

const App = () => {
  const [location, setLocation] = useState<string>("");
  const [response, setResponse] = useState<responseCurrent>();

  const getAirQualityName = (val: number | undefined) => {
    switch (val) {
      case 1:
      case 2:
      case 3:
        return `Low (${val})`;
      case 4:
      case 5:
      case 6:
        return `Moderate (${val})`;
      case 7:
      case 8:
      case 9:
        return `High (${val})`;
      default:
        return `Very High (10)`;
    }
  };
  const getAirQualityColor = (val: number | undefined) => {
    switch (val) {
      case 1:
      case 2:
      case 3:
        return `w-[${val}0%] bg-green-600`;
      case 4:
      case 5:
      case 6:
        return `w-[${val}0%] bg-amber-600`;
      case 7:
      case 8:
      case 9:
        return `w-[${val}0%] bg-red-600`;
      default:
        return `w-[${val}0%] bg-orange-600`;
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setLocation(`${position.coords.latitude},${position.coords.longitude}`),
      );
    } else {
      alert("This browser doesn't support GPS");
    }
  };
  const getResponse = async () => {
    try {
      const response = await axiosApi.get("/current.json", {
        params: {
          q: location,
          aqi: "yes",
        },
      });
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      getResponse();
    }
  }, [location]);

  return (
    <div
      className={`overflow-x-hidden flex flex-col md:flex-row h-screen p-2 md:p-4 text-white ${response?.current.is_day === 1 ? "bg-gradient-to-br from-[#56CCF2] to-[#2F80ED]" : "bg-gradient-to-br from-[#2C5364] via-[#203A43] to-[#0F2027]"}`}
    >
      <div className="flex flex-col items-center gap-10 w-full md:w-2/5 h-full p-4">
        <div className="flex flex-row items-center w-full justify-between h-80">
          <div className="flex gap-2 flex-col">
            <span className="text-4xl lg:text-6xl font-medium">
              {response?.current.temp_c}&deg;
            </span>
            <span className="text-lg lg:text-xl">
              {response?.current.condition.text}
            </span>
            <span className="text-sm lg:text-base">
              Feels like {response?.current.feelslike_c}&deg;
            </span>
          </div>

          <img
            src={response?.current.condition.icon}
            alt={response?.current.condition.text}
            className="w-32 lg:w-40"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-4 w-full">
          <div className="rounded-md w-full col-span-2 p-4 items-center flex flex-col gap-2 bg-black/20">
            <h2 className="text-sm lg:text-lg">Air quality</h2>
            <span className="font-bold text-base lg:text-xl">
              {getAirQualityName(
                response?.current.air_quality["gb-defra-index"],
              )}
            </span>
            <div className="relative w-60 mt-2">
              <div className="w-full bg-gray-400 rounded-full h-2"></div>
              <div
                className={`absolute inset-0 rounded-full h-2 ${getAirQualityColor(response?.current.air_quality["gb-defra-index"])}`}
              ></div>
            </div>
          </div>

          <GridItem
            icon={<MdSunny />}
            title="UV index"
            body={response?.current.uv}
          />

          <GridItem
            icon={<WiHumidity />}
            title="Humidity"
            body={response?.current.humidity}
          />

          <GridItem
            icon={<LuWind />}
            title="Wind"
            body={response?.current.wind_kph}
          />

          <GridItem
            icon={<WiCloudyGusts />}
            title="Gust"
            body={response?.current.gust_kph}
          />

          <GridItem
            icon={<MdDewPoint />}
            title="Dew point"
            body={response?.current.dewpoint_c}
          />

          <GridItem
            icon={<BsArrowsCollapse />}
            title="Pressure"
            body={response?.current.pressure_mb}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full md:w-3/5 h-fit p-4">
        <ForecastHour location={location} />
        <ForecastDay location={location} />
        <Astronomy location={location} />
      </div>
    </div>
  );
};

export default App;
