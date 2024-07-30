import { useEffect, useState } from "react";

import { responseForecast } from "../types";
import axiosApi from "../services/axios";

import { FaRegClock } from "react-icons/fa6";

type props = {
  location: string;
};

const ForecastHour = ({ location }: props) => {
  const currentTime = new Date().getTime();

  const [forecast, setForecast] = useState<responseForecast>();

  const getForecast = async () => {
    try {
      const response = await axiosApi.get("/forecast.json", {
        params: {
          q: location,
          days: 2,
        },
      });
      setForecast(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location) {
      getForecast();
    }
  }, [location]);

  return (
    <div className="rounded-md w-full p-4 flex flex-col gap-2 bg-black/20 col-span-2">
      <h2 className="flex flex-row items-center gap-2 text-lg pb-4 border-b border-gray-400 w-full">
        <FaRegClock />
        Hourly Forecast
      </h2>

      <div className="flex flex-row items-start gap-4 overflow-x-auto py-4">
        {forecast?.forecast.forecastday.map((value) =>
          value.hour
            .filter((item) => new Date(item.time).getTime() > currentTime)
            .map((fixValue) => (
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-400">
                  {fixValue.time.split(" ")[1]}
                </span>
                <img
                  src={fixValue.condition.icon}
                  alt={fixValue.condition.text}
                  className="w-10 lg:w-16"
                />
                <span className="font-medium text-base lg:text-lg">
                  {fixValue.temp_c}&deg;
                </span>
              </div>
            )),
        )}
      </div>
    </div>
  );
};

export default ForecastHour;
