import styled, { keyframes } from "styled-components";
import homebackground from "../img/homebackground.png";
import { Link } from "react-router-dom";
import TitleWrap from "../components/TitleWrap";

// 눈이 떨어지는 애니메이션
const snowfall = keyframes`
  0% {
    transform: translateY(-20px); /* 최상단 위에서 시작 */
    opacity: 1;
  }
  100% {
    transform: translateY(100vh); /* 화면 끝까지 내려감 */
    opacity: 0; /* 스르륵 사라짐 */
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  position: relative;
  padding: 150px 0;
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

// 눈 조각 스타일
const Snowflake = styled.div`
  position: absolute;
  top: ${(props) => props.startTop}px; /* 최상단 위에서 10~20px 랜덤 */
  left: ${(props) => props.left}%; /* 랜덤 위치 */
  width: ${(props) => props.size}px; /* 눈 크기 */
  height: ${(props) => props.size}px;
  background-color: white;
  border-radius: 50%;
  animation: ${snowfall} ${(props) => props.duration}s linear infinite;
  animation-delay: ${(props) => props.delay}s; /* 랜덤한 딜레이 */
  opacity: ${(props) => props.opacity};
`;

const Title = styled.div`
  font-family: "AHN_L";
  color: white;
  font-size: 62px;
  text-align: center;
  margin-bottom: 75px;
`;

const Start = styled.div`
  font-family: "AHN_L";
  width: 155px;
  height: 40px;
  background-color: white;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;

  a {
    font-size: 32px;
    font-weight: bold;
    color: #a8d0e9;
    text-decoration: none;
  }
`;

const SnowfallContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 클릭 이벤트 방지 */
  overflow: hidden; /* 화면 밖으로 나가는 눈 숨김 */
`;

const Home = () => {
  // 눈 조각 생성
  const createSnowflake = () => ({
    id: Math.random(),
    startTop: Math.random() * -10 - 10, // -10px ~ -20px 범위
    left: Math.random() * 100, // 0 ~ 100% 랜덤 위치
    size: Math.random() * 4 + 2, // 2 ~ 6px 크기
    duration: Math.random() * 5 + 7, // 7 ~ 12초 애니메이션 지속 시간
    delay: Math.random() * 5, // 0 ~ 5초 랜덤 딜레이
    opacity: Math.random() * 0.8 + 0.2, // 0.2 ~ 1 투명도
  });

  const snowflakes = Array.from({ length: 50 }, () => createSnowflake());

  return (
    <>
      <TitleWrap title="Home" />
      <Container>
        <SnowfallContainer>
          {snowflakes.map((flake) => (
            <Snowflake
              key={flake.id}
              startTop={flake.startTop}
              left={flake.left}
              size={flake.size}
              duration={flake.duration}
              delay={flake.delay}
              opacity={flake.opacity}
            />
          ))}
        </SnowfallContainer>
        <Title>
          Do you <br /> wanna build
          <br /> a snowman
          <br /> with me?
        </Title>
        <Link
          to={"/search"}
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#A8D0E9",
            textDecoration: "none",
          }}
        >
          <Start>Start</Start>
        </Link>
        <img src={homebackground} alt="bg" />
      </Container>
    </>
  );
};

export default Home;
