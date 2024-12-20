import React, { useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import detailbackground from "../img/detailbackground.png"

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


const Title = styled.h2`
  font-family: "AHN_L";
  color: #1e5475;
  font-size: 28px;
  text-align: center;
`;

const Input = styled.input`
  all: unset;
  border-bottom: 1px solid white;
  font-size: 18px;
  width: 100px;
  max-width: 200px;
  margin: 10px 0;
`;

const Button = styled.button`
  background: #41718f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;
  font-family: "AHN_L";
`;

const Wrap = styled.div`
display: flex;

h2{
  font-family: "AHN_L";
color: white;
font-size: 40px;
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
    const canvas = await html2canvas(captureRef.current);
    const link = document.createElement("a");
    link.download = `${cityName}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Container ref={captureRef}>
      <Wrap>
        <h2>
        To
        </h2>
      <Input />
      </Wrap>
      <Title>Do you wanna build a snowman with me?</Title>
      <h3>in {cityName}</h3>
      <Input />
      <Button onClick={handleSave}>Save</Button>
      <Button onClick={() => navigate("/")}>Home</Button>
      <Bg src={detailbackground} alt="bg" />
    </Container>
  );
};

export default Detail;
