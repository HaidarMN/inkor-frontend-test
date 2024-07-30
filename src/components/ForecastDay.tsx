import { useEffect, useState } from "react";

import { responseForecast } from "../types";
import axiosApi from "../services/axios";

import { LuCloudRainWind } from "react-icons/lu";

type props = {
  location: string;
};

const ForecastDay = ({ location }: props) => {
  const [forecast, setForecast] = useState<responseForecast>();

  const getForecast = async () => {
    try {
      const response = await axiosApi.get("/forecast.json", {
        params: {
          q: location,
          days: 3,
        },
      });
      setForecast(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getDayName = (val: string) => {
    const currentDay = new Date().getDay();
    const day = new Date(val).getDay();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (currentDay === day) {
      return "Today";
    } else {
      return dayNames[day];
    }
  };

  useEffect(() => {
    if (location) {
      getForecast();
    }
  }, [location]);

  return (
    <div className="rounded-md w-full p-4 bg-black/20 col-span-2">
      <table className="table-auto w-full">
        <tbody>
          {forecast?.forecast.forecastday.map((value) => (
            <tr>
              <td className="text-sm lg:text-lg font-medium">
                {getDayName(value.date)}
              </td>
              <td>
                <div className="flex flex-row items-center gap-2 text-xs lg:text-base text-gray-400">
                  <LuCloudRainWind />
                  {value.day.daily_chance_of_rain}%
                </div>
              </td>
              <td>
                <img
                  src={value.day.condition.icon}
                  alt={value.day.condition.text}
                  className="w-6 md:w-12 lg:w-auto"
                />
              </td>
              <td className="text-sm lg:text-lg font-medium">
                {Math.round(value.day.maxtemp_c)}&deg;
              </td>
              <td className="text-sm lg:text-lg font-medium">
                {Math.round(value.day.mintemp_c)}&deg;
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForecastDay;
