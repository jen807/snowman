import axios from "axios";

const API_KEY = "a2a44b9f27b1f370dce8b97d7282d04d";

export const predefinedCities = [
  {
    id: 1,
    name: "Helsinki",
    country: "FI",
    coord: { lat: 60.1695, lon: 24.9354 },
  },
  {
    id: 2,
    name: "Moscow",
    country: "RU",
    coord: { lat: 55.7558, lon: 37.6173 },
  },
  {
    id: 3,
    name: "Reykjavik",
    country: "IS",
    coord: { lat: 64.1355, lon: -21.8954 },
  },
  { id: 4, name: "Oslo", country: "NO", coord: { lat: 59.9139, lon: 10.7522 } },
  {
    id: 5,
    name: "Stockholm",
    country: "SE",
    coord: { lat: 59.3293, lon: 18.0686 },
  },
  {
    id: 6,
    name: "Anchorage",
    country: "US",
    coord: { lat: 61.2181, lon: -149.9003 },
  },
  {
    id: 7,
    name: "Quebec City",
    country: "CA",
    coord: { lat: 46.8139, lon: -71.2082 },
  },
  {
    id: 8,
    name: "Sapporo",
    country: "JP",
    coord: { lat: 43.0618, lon: 141.3545 },
  },
  {
    id: 9,
    name: "Zurich",
    country: "CH",
    coord: { lat: 47.3769, lon: 8.5417 },
  },
  {
    id: 10,
    name: "Tallinn",
    country: "EE",
    coord: { lat: 59.437, lon: 24.7536 },
  },
  {
    id: 11,
    name: "Fairbanks",
    country: "US",
    coord: { lat: 64.8378, lon: -147.7164 },
  },
  {
    id: 12,
    name: "Harbin",
    country: "CN",
    coord: { lat: 45.8038, lon: 126.5347 },
  },
  {
    id: 13,
    name: "Nuuk",
    country: "GL",
    coord: { lat: 64.1835, lon: -51.7216 },
  },
  {
    id: 14,
    name: "Vladivostok",
    country: "RU",
    coord: { lat: 43.1155, lon: 131.8855 },
  },
  {
    id: 15,
    name: "Banff",
    country: "CA",
    coord: { lat: 51.1784, lon: -115.5708 },
  },
  {
    id: 16,
    name: "Innsbruck",
    country: "AT",
    coord: { lat: 47.2692, lon: 11.4041 },
  },
  {
    id: 17,
    name: "Trondheim",
    country: "NO",
    coord: { lat: 63.4305, lon: 10.3951 },
  },
  {
    id: 18,
    name: "Yellowknife",
    country: "CA",
    coord: { lat: 62.454, lon: -114.372 },
  },
  {
    id: 19,
    name: "Barrow",
    country: "US",
    coord: { lat: 71.2906, lon: -156.7887 },
  },
  {
    id: 20,
    name: "Murmansk",
    country: "RU",
    coord: { lat: 68.9707, lon: 33.0748 },
  },
  {
    id: 21,
    name: "Rovaniemi",
    country: "FI",
    coord: { lat: 66.5039, lon: 25.7294 },
  },
  {
    id: 22,
    name: "Bergen",
    country: "NO",
    coord: { lat: 60.3913, lon: 5.3221 },
  },
  {
    id: 23,
    name: "Alta",
    country: "NO",
    coord: { lat: 69.9689, lon: 23.2716 },
  },
  {
    id: 24,
    name: "Davos",
    country: "CH",
    coord: { lat: 46.8022, lon: 9.8355 },
  },
  {
    id: 25,
    name: "Kiruna",
    country: "SE",
    coord: { lat: 67.8557, lon: 20.2252 },
  },
];

export const fetchWeatherData = async (cityName) => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: cityName,
          units: "metric",
          appid: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    return null;
  }
};

export const isSnowing = (weatherData) => {
  return weatherData.weather.some((w) => w.main.toLowerCase() === "snow");
};

export const fetchSnowyCities = async () => {
  try {
    const citiesWithWeather = await Promise.all(
      predefinedCities.map(async (city) => {
        const weatherData = await fetchWeatherData(city.name);
        if (weatherData && isSnowing(weatherData)) {
          return {
            ...city,
            weather: weatherData.weather[0].description,
            temp: weatherData.main.temp,
          };
        }
        return null;
      })
    );
    return citiesWithWeather.filter((city) => city !== null);
  } catch (error) {
    console.error("눈 오는 도시 데이터 가져오는 중 오류 발생:", error);
    return [];
  }
};
