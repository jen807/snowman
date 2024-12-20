import React, { useRef } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import background2 from "../img/backgound2.png";

const Container = styled.div`
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  position: relative;
  padding: 20px 0;
  display: flex;
  justify-content: center;
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
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
`;

const Input = styled.input`
  all: unset;
  width: 80%;
  border-bottom: 1px solid white;
  font-size: 18px;
  text-align: center;
  margin: 10px 0;
  font-family: "AHN_L";

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Button = styled.button`
  background-color: #1e5475;
  color: white;
  font-size: 18px;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-family: "AHN_L";
  transition: background-color 0.3s;

  &:hover {
    background-color: #163d57;
  }
`;

const Detail = ({ cityName, onBack }) => {
  const captureRef = useRef(null);

  const handleSave = async () => {
    const element = captureRef.current;
    const canvas = await html2canvas(element, {
      useCORS: true,
      ignoreElements: (el) => el.tagName === "BUTTON" || el.tagName === "INPUT",
    });
    const link = document.createElement("a");
    link.download = `${cityName}-snowman.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Container>
      <div ref={captureRef}>
        <img src={background2} alt="Background" />
        <Input placeholder="To ______" />
        <Title>Do you wanna build a snowman with me?</Title>
        <Title>at {cityName}</Title>
        <Input placeholder="From ______" />
      </div>
      <Button onClick={handleSave}>Save</Button>
      <Button onClick={onBack}>Home</Button>
    </Container>
  );
};

export default Detail;
