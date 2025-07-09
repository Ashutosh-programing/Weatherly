import { useQuery } from "@tanstack/react-query";
import { getApiData } from "../Api/MainAPI";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GiSunrise } from "react-icons/gi";
import { GiWaterDrop } from "react-icons/gi";
import { FaTemperatureLow } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { MdDewPoint } from "react-icons/md";
import { IoEye } from "react-icons/io5";

type FormInput = {
  location: string;
};
type WeatherData = {
  location: {
    name: string;
    country: string;
    tz_id: string;
  };
  current: {
    temp_c: number;
    vis_km: number;
    condition: {
      text: string;
      icon: string;
    };
    feelslike_c: number;
    humidity: number;
    uv: number;
    dewpoint_c: number;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        totalprecip_mm: number;
      };
      hour: {
        condition: {
          icon: string;
          text: string;
        };
        time: string;
        temp_c: number;
      }[];
      astro: {
        moon_phase: string;
        moonset: string;
        sunrise: string;
        sunset: string;
      };
    }[];
  };
};

const getWeekDay = (date: string) => {
  const formatedDate = new Date(date);
  return formatedDate.toLocaleString("en-US", { weekday: "short" });
};

const Home = () => {
  // const [isMobile,setIsMobile] = useState<boolean>(false);
  // useEffect(()=>{
  //   if(window.innerWidth < 400){
  //     setIsMobile(true);
  //   }
  //   else{
  //     console.log("")
  //   }
  // },[])
  const [location, setLocation] = useState<string>("London");

  const { data, isLoading, error } = useQuery<WeatherData>({
    queryKey: ["Api", location],
    queryFn: () => getApiData(location),
  });
  const condition = data?.current.condition.text.toLowerCase();

  const { register, reset, handleSubmit } = useForm<FormInput>();

  const onsubmit: SubmitHandler<FormInput> = (data) => {
    setLocation(data.location);
    reset();
  };

  const arr = [
    {
      name: "SUNRISE",
      icon: <GiSunrise />,
      content1: data?.forecast.forecastday[0].astro.sunrise,
      content2: `sunset : ${data?.forecast.forecastday[0].astro.sunset}`,
    },
    {
      name: "PERCIPITAION",
      icon: <GiWaterDrop />,
      content1: `${data?.forecast.forecastday[0].day.totalprecip_mm} mm in last 24 hrs`,
      content2: "0 mm expected in next 24 hrs",
    },
    {
      name: "FEELS LIKE",
      icon: <FaTemperatureLow />,
      content1: `${data?.current.feelslike_c}  °`,
      content2: "Feels warmer",
    },
    {
      name: "WAXING GIBBOUS",
      icon: <FaMoon />,
      content1: <img className="h-20 w-20" src="/moon.png" alt="moon" />,
      content2: `Next Moonset: ${data?.forecast.forecastday[0].astro.moonset}`,
    },
    {
      name: "HUMIDITY",
      icon: <MdDewPoint />,
      content1: `${data?.current.humidity} %`,
      content2: `The dew point is ${data?.current.dewpoint_c}  ° right now`,
    },
    {
      name: "VISIBILITY",
      icon: <IoEye />,
      content1: `${data?.current.vis_km} km`,
      content2: "Perfectly clear view",
    },
  ];

  if (isLoading)
    return (
      <div
        id="loading-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60"
      >
        <svg
          className="animate-spin h-8 w-8 text-white mr-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>

        <span className="text-white text-3xl font-bold">Loading...</span>
      </div>
    );
  if (error) return  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="Data Not Found"
        className="w-40 h-40 mb-6 animate-pulse"
      />
      <h1 className="text-3xl md:text-5xl font-bold mb-2">Oops! Data Not Found</h1>
      <p className="text-lg text-gray-300 text-center max-w-md">
        We couldn't find the data you were looking for. Please check your query or try again later.
      </p>
    </div>;
  return (
    <div>
      <div className="home-page-container h-screen overflow-x-hidden w-full p-4">
        <div className="bg-conditon overflow-hidden">
          {[
            "Moderate rain",
            "Rain",
            "Light rain",
            "Light rain shower",
            "Patchy rain nearby",
            "Patchy rain possible",
            "Patchy freezing drizzle possible",
            "Patchy light drizzle",
            "Light drizzle",
            "Freezing drizzle",
            "Heavy freezing drizzle",
            "Moderate or heavy rain shower",
            "Torrential rain shower",
        
          ]
            .toString()
            .toLowerCase()
            .includes(condition as string) && (
            <div className="absolute inset-0 overflow-scroll min-h-screen w-full -z-10 ">
              <video
                src={`${window.innerWidth < 400? "/light_rain.mp4":'/light_rain.mp4'}`}
                className="w-full min-h-screen overflow-scroll object-cover"
                muted
                playsInline
                loop
                autoPlay
              ></video>
            </div>
          )}
          {[
            "Thundery outbreaks possible",
            "Patchy light rain with thunder",
            "Moderate or heavy rain with thunder",
            "Heavy rain at times",
            "Moderate or heavy freezing rain",
          ].toString().toLowerCase().includes(condition as string) && (
            <div className="absolute inset-0 overflow-scroll min-h-screen w-full -z-10">
              <video
                src={`${window.innerWidth < 400? "/rain.mp4":'/rain.mp4'}`}
                className="w-full min-h-screen overflow-scroll object-cover"
                muted
                playsInline
                loop
                autoPlay
              ></video>
            </div>
          )}
        {["Mist", "Fog", "Freezing fog"].toString().toLowerCase().includes(condition as string) && (
            <div className="absolute inset-0 overflow-scroll min-h-screen w-full -z-10">
              <video
                src={`${window.innerWidth < 400? "/mist.mp4":'/mist.mp4'}`}
                className="w-full min-h-screen overflow-scroll object-cover"
                muted
                playsInline
                loop
                autoPlay
              ></video>
            </div>
          )}

          {["Partly Cloudy", "Cloudy", "Overcast"].toString().toLowerCase().includes(
            condition as string
          ) && (
            <div className="absolute inset-0 -z-10 min-h-screen w-full overflow-scroll">
              <video
                src={`${window.innerWidth < 400? "/cloudy.mp4":'/cloudy.mp4'}`}
                className="w-full min-h-screen overflow-scroll object-cover"
                muted
                playsInline
                loop
                autoPlay
              ></video>
            </div>
          )}
          {["Sunny", "clear"].toString().toLowerCase().includes(condition as string) && (
            <div className="absolute inset-0 overflow-scroll min-h-screen w-full -z-10">
              <video
                src={`${window.innerWidth < 400? "/sunny.mp4":'/sunny.mp4'}`}
                className="min-h-screen w-full overflow-scroll object-cover"
                muted
                playsInline
                loop
                autoPlay
              ></video>
            </div>
          )}
          {[
            "Light snow",
            "Moderate snow",
            "Heavy snow",
            "Patchy snow possible",
            "Blowing snow",
            "Patchy light snow",
            "Patchy moderate snow",
            "Ice pellets",
            "Light sleet showers",
            "Patchy sleet possible",
            "Moderate or heavy sleet",
            "Light sleet showers",
            "Patchy light snow with thunder",
            "Moderate or heavy sleet showers",
            "Light snow showers",
            "Moderate or heavy snow showers",
            "Light showers of ice pellets",
            "Moderate or heavy showers of ice pellets",
            "Moderate or heavy snow with thunder",
            "Blizzard",
          ].toString().toLowerCase().includes(condition as string) && (
            <div className="absolute inset-0 overflow-scroll min-h-screen w-full -z-10">
              <video
                src={`${window.innerWidth < 400? "/snow.mp4":'/snow.mp4'}`}
                className="w-full min-h-screen overflow-scroll object-cover"
                muted
                playsInline
                loop
                autoPlay
              ></video>
            </div>
          )}
        </div>
        <div className="first-container flex items-center justify-end w-full h-12 ">
          <form
            className="flex items-center gap-2 rounded-lg text-white focus-within:ring-2 focus-within:ring-blue-500 backdrop-blur-3xl w-52 p-1 text-sm"
            onSubmit={handleSubmit(onsubmit)}
          >
            <input
              className="outline-none bg-inherit text-sm"
              autoComplete="off"
              type="text"
              {...register("location")}
              placeholder="Search"
            />
            <button className="text-gray-400" type="submit">
              <CiSearch size={20} />
            </button>
          </form>
        </div>
        <div className="second-container p-4  text-white flex items-center justify-center">
          {
            <div className="first-component text-sm">
              <p className="flex items-center justify-center">
                {data?.location.country}
              </p>

              <p className="text-3xl flex items-center justify-center">
                {data?.location.name}
              </p>

              <p className="text-7xl flex items-center justify-center pl-10">
                {data?.current.temp_c} °
              </p>

              <div className="flex items-center justify-center gap-3">
                <p>{data?.current.condition.text}</p>
                <img
                  src={data?.current.condition.icon}
                  className="h-5 w-5"
                  alt=""
                />
              </div>
              <div className="high-low flex gap-5 justify-center items-center">
                <p className="">
                  H:{data?.forecast.forecastday[0].day.maxtemp_c} °
                </p>
                <p className="">
                  L:{data?.forecast.forecastday[0].day.mintemp_c} °
                </p>
              </div>
            </div>
          }
        </div>
        <div className="third-container text-white flex items-center justify-center overflow-x-hidden">
          <div className="third-container-wrapper flex p-2 overflow-x-auto xl:max-w-7xl w-full scrollbar-hide backdrop-blur-2xl rounded-xl">
            {data?.forecast.forecastday[0].hour.map((e) => {
              return (
                <div className="md:min-w-32 min-w-20" key={e.time}>
                  <p className="mb-3">{e.time.split(' ')[1]}</p>
                  <p className="mb-3">
                    <img className="h-9 w-9" src={e.condition.icon} alt="" />
                  </p>
                  <p>{e.temp_c}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="fourth-container xl:max-w-7xl mx-auto py-3 flex gap-10 justify-between flex-wrap lg:flex-nowrap  text-white text-sm">
          <div className="fourth-container-wrapper  w-full lg:max-w-lg p-2 rounded-xl md:max-h-[453px] h-auto backdrop-blur-3xl">
            {data?.forecast.forecastday.map(({ day, date }) => {
              return (
                <div className="flex mx-auto justify-between items-center py-2" key={date}>
                  <p className="md:w-20 w-5 text-center">{getWeekDay(date)}</p>
                  <p className="w-10  flex items-center justify-center ">
                    <img className="h-7 w-7" src={day.condition.icon} alt="" />
                  </p>
                  <p className="md:w-24 w-10 text-center">min : {day.mintemp_c} ° </p>
                  <div className="w-24 sm:w-44 relative  h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-red-500 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                  <p className="md:w-24 w-12 text-center ">max : {day.maxtemp_c} °</p>
                </div>
              );
            })}
          </div>
          <div className="fourth-container-wrapper-2 lg:grid flex flex-wrap lg:grid-cols-2 xl:grid-cols-3 lg:gap-10 justify-between overflow-hidden gap-5 text-white">
            {arr.map((e) => {
              return (
                <div
                  key={e.name}
                  className="flex flex-col p-2 gap-3 min-h-48 h-48 items-center w-full min-[468px]:w-24 justify-between backdrop-blur-2xl min-w-48  min-[570px]:w-64 sm:w-48 rounded-lg"
                >
                  <div className="flex gap-2 items-center text-gray-300">
                    <p className="">{e.icon}</p> <p className="">{e.name}</p>
                  </div>
                  <p className="min-[468]:text-2xl text-xl pb-9">{e.content1}</p>
                  <p className="text-sm">{e.content2}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;




