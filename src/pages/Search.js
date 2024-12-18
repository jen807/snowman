import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchSnowyCities } from "../api";
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
  max-height: 60vh; /* 스크롤 영역 제한 */
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
  const [cities, setCities] = useState([]); // 눈이 내리는 도시 목록
  const [query, setQuery] = useState(""); // 검색어 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 데이터 호출
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchSnowyCities(); // API 호출
        setCities(data);
      } catch (err) {
        setError("Failed to fetch snowy cities.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // 검색어에 따라 도시 필터링
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
                  {city.name}, {city.sys.country}
                </h3>
                <p>❄ {city.weather[0].description}</p>
                <p>🌡 {city.main.temp} °C</p>
              </ListItem>
            ))
          ) : (
            <p style={{ color: "white" }}>No snowy cities found...</p>
          )}
        </ListContainer>
      )}
      <img src={background2} alt="bg" />
    </Container>
  );
};

export default Search;
