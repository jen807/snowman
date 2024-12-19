import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchWeatherData, predefinedCities } from "../api";
import background2 from "../img/backgound2.png";

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

  img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

const Title = styled.h2`
  font-family: "AHN_L";
  color: white;
  font-size: 32px;
  text-align: center;
  letter-spacing: 1px;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border-radius: 20px;
  border: none;
  outline: none;
  font-size: 16px;
  margin: 20px 0;
  text-align: center;
`;

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListItem = styled.li`
  background: #dff6f0;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;

  h3 {
    margin: 0;
    color: #333;
  }
  p {
    margin: 5px 0;
    color: #555;
  }
`;

const Search = () => {
  const [cities, setCities] = useState(predefinedCities);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      ) : (
        <ListContainer>
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <ListItem key={city.id}>
                <h3>
                  {city.name}, {city.country}
                </h3>
                {city.time && <p>🕒 {city.time}</p>}
                {city.weather && <p>❄ {city.weather}</p>}
                {city.temp && <p>🌡 {city.temp} °C</p>}
              </ListItem>
            ))
          ) : (
            <p style={{ color: "white" }}>There's no snowy cities here...</p>
          )}
        </ListContainer>
      )}
      <img src={background2} alt="bg" />
    </Container>
  );
};

export default Search;
