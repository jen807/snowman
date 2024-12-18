import axios from "axios";

const API_KEY = "a2a44b9f27b1f370dce8b97d7282d04d";
const BASE_URL = "https://api.openweathermap.org/data/2.5/find";

// 눈이 오는 도시를 가져오는 함수
export const fetchSnowyCities = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: "", // 빈 문자열로 전체 데이터 가져오기
        units: "metric",
        appid: API_KEY,
      },
    });

    // "snow"가 포함된 날씨만 필터링
    const snowyCities = response.data.list.filter((city) =>
      city.weather.some((w) => w.description.toLowerCase().includes("snow"))
    );

    return snowyCities;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw new Error("Failed to fetch snowy cities");
  }
};
