import { useEffect, useState } from "react";

import axiosApi from "../services/axios";
import { responseAstronomy } from "../types";

import { WiSunrise, WiSunset, WiMoonrise, WiMoonset } from "react-icons/wi";

type props = {
  location: string;
};

type AstronomyItemProps = {
  icon: React.ReactNode;
  time: string | undefined;
};

const AstronomyItem = ({ icon, time }: AstronomyItemProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl lg:text-5xl">{icon}</span>
      <span className="text-sm font-medium lg:text-lg">{time}</span>
    </div>
  );
};

const Astronomy = ({ location }: props) => {
  const [astronomy, setAstronomy] = useState<responseAstronomy>();

  const getAstronomy = async () => {
    try {
      const response = await axiosApi.get("/astronomy.json", {
        params: {
          q: location,
          dt: new Date(),
        },
      });
      setAstronomy(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location) {
      getAstronomy();
    }
  }, [location]);

  return (
    <>
      <div className="col-span-2 grid w-full grid-cols-2 divide-x-2 divide-gray-400 rounded-md bg-black/20 py-4 md:col-span-1">
        <AstronomyItem
          icon={<WiSunrise />}
          time={astronomy?.astronomy.astro.sunrise}
        />
        <AstronomyItem
          icon={<WiSunset />}
          time={astronomy?.astronomy.astro.sunset}
        />
      </div>

      <div className="col-span-2 grid w-full grid-cols-2 divide-x-2 divide-gray-400 rounded-md bg-black/20 py-4 md:col-span-1">
        <AstronomyItem
          icon={<WiMoonrise />}
          time={astronomy?.astronomy.astro.moonrise}
        />
        <AstronomyItem
          icon={<WiMoonset />}
          time={astronomy?.astronomy.astro.moonset}
        />
      </div>
    </>
  );
};

export default Astronomy;
