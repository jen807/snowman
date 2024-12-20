import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchWeatherData, predefinedCities } from "../api";
import { useNavigate } from "react-router-dom";
import background2 from "../img/backgound2.png";
import snowmansvg from "../img/snowman.svg";

const Container = styled.div`
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  position: relative;
  padding: 40px 0;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
`;

const Bg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Title = styled.h2`
  font-family: "AHN_L";
  color: white;
  font-size: 32px;
  text-align: center;
  letter-spacing: 1px;
  margin: 10px 0;
`;

const Input = styled.input`
  all: unset;
  width: 80%;
  padding: 5px 10px;
  border-bottom: 1px solid white;
  font-size: 22px;
  margin: 10px 0;
  text-align: left;
  font-family: "AHN_L";
  color: white;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const ListContainer = styled.ul`
  list-style: none;
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  max-height: 71vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListItem = styled.li`
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid white;
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 10px 20px 6px 20px;
  text-align: center;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 60px;
  cursor: pointer;

  h3 {
    margin: 0;
    font-size: 20px;
    color: #1e5475;
    text-align: left;
  }
  p {
    font-size: 14px;
    margin-top: 2px;
    color: #41718f;
    font-weight: 500;
  }

  h5 {
    color: #41718f;
    font-size: 14px;
    text-align: right;
    font-weight: 500;
    margin: 0;
    margin-top: 2px;
  }

  h2 {
    font-size: 14px;
    margin-top: 4px;
    color: #41718f;
    font-weight: 500;
    text-align: right;
  }

  div {
    margin-top: 2px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
  }
`;

const Search = () => {
  const [cities, setCities] = useState(predefinedCities);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCitiesWeather = async () => {
      try {
        setLoading(true);
        const updatedCities = await Promise.all(
          predefinedCities.map(async (city) => {
            const weatherData = await fetchWeatherData(city.name);
            if (weatherData) {
              const localTime = new Date(
                (weatherData.dt + weatherData.timezone) * 1000
              );
              const hours = localTime.getUTCHours();
              const minutes = localTime.getUTCMinutes();
              const formattedTime = `${hours % 12 || 12}:${minutes
                .toString()
                .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;

              return {
                ...city,
                weather: weatherData.weather[0].description,
                temp: weatherData.main.temp,
                time: formattedTime,
              };
            }
            return city;
          })
        );
        setCities(updatedCities);
      } catch (err) {
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCitiesWeather();
  }, []);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleCityClick = (cityName) => {
    navigate(`/detail/${cityName}`);
  };

  return (
    <Container>
      <Title>Where we can go?</Title>
      <Input
        type="text"
        placeholder="Enter a city name!"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p style={{ color: "white" }}>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : filteredCities.length > 0 ? (
        <ListContainer>
          {filteredCities.map((city) => (
            <ListItem key={city.id} onClick={() => handleCityClick(city.name)}>
              <h3>
                {city.name}
                {city.time && <p>{city.time}</p>}
              </h3>
              <div>
                {city.weather && <h5>❄ {city.weather}</h5>}
                {city.temp && <h2>🌡 {city.temp} °C</h2>}
              </div>
            </ListItem>
          ))}
        </ListContainer>
      ) : (
        <img
          src={snowmansvg}
          alt="No snowy cities"
          style={{ marginTop: "200px" }}
        />
      )}
      <Bg src={background2} alt="bg" />
    </Container>
  );
};

export default Search;
