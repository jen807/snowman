import React, { useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import result from "../img/result.png";

const Container = styled.div`
  width: 100%;
  max-width: 393px;
  min-height: 800px; /* 충분히 큰 높이 설정 */
  margin: 0 auto;
  position: relative;
  padding: 40px 0;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  overflow: visible;

  h3 {
    font-family: "AHN_L";
    color: white;
    font-size: 40px;
    text-align: center;
    font-weight: 300;
  }

  div {
    margin-top: 25px;
  }
`;

const Title = styled.h2`
  font-family: "AHN_L";
  color: white;
  font-size: 40px;
  font-weight: 300;
  text-align: center;
  letter-spacing: 1px;
  line-height: 60px;
  margin: 10px 0;
`;

const Input = styled.input`
  all: unset;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 36px;
  width: 100px;
  max-width: 200px;
  font-family: "AHN_L";
  text-align: center;
  color: white;
  font-weight: 300;
`;

const Button = styled.button`
  background: #6c9bd0;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  border-radius: 30px;
  margin: 10px;
  font-size: 20px;
  font-family: "Noto Sans KR";
`;

const ButtonWrap = styled.div`
  display: flex;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    font-family: "AHN_L";
    color: white;
    font-size: 36px;
    margin-right: 10px;
    font-weight: 300;
  }
`;

const Bg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Detail = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const captureRef = useRef(null);

  const handleSave = async () => {
    // 숨기기: 버튼
    const buttons = captureRef.current.querySelectorAll("button");
    buttons.forEach((button) => (button.style.visibility = "hidden"));

    // `input` 태그 내용을 `span`으로 임시 변경
    const inputs = captureRef.current.querySelectorAll("input");
    const spans = [];
    inputs.forEach((input) => {
      const span = document.createElement("span");
      span.textContent = input.value;
      span.style.cssText = window.getComputedStyle(input).cssText;
      span.style.fontFamily = "AHN_L";
      span.style.color = "white";
      span.style.fontSize = "36px";
      span.style.borderBottom = "none";
      input.parentNode.replaceChild(span, input);
      spans.push({ input, span });
    });

    // 캡처
    const canvas = await html2canvas(captureRef.current, {
      useCORS: true,
      scale: 2, // 고해상도
      windowWidth: captureRef.current.scrollWidth,
      windowHeight: captureRef.current.scrollHeight,
    });

    // 저장
    const link = document.createElement("a");
    link.download = `${cityName}.png`;
    link.href = canvas.toDataURL();
    link.click();

    // 복구: 버튼 및 입력 필드
    buttons.forEach((button) => (button.style.visibility = "visible"));
    spans.forEach(({ input, span }) => {
      span.parentNode.replaceChild(input, span);
    });
  };

  return (
    <Container ref={captureRef}>
      <div>
        <Box>
          <h2>To.</h2>
          <Input />
        </Box>
        <Title>
          Do you <br /> wanna build
          <br /> a snowman
          <br /> with me
        </Title>
        <h3>in {cityName}</h3>
        <Box>
          <h2>From.</h2>
          <Input />
        </Box>
        <ButtonWrap>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => navigate("/")}>Home</Button>
        </ButtonWrap>
      </div>
      <Bg src={result} alt="bg" />
    </Container>
  );
};

export default Detail;
