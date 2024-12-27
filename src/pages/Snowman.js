import React, { useState } from "react";
import styled from "styled-components";
import TitleWrap from "../components/TitleWrap";
import background2 from "../img/backgound2.png";

// Import all images
import basic from "../img/snowmanimg/basic.svg";
import bear from "../img/snowmanimg/bear.svg";
import bunny from "../img/snowmanimg/bunny.svg";
import cat from "../img/snowmanimg/cat.svg";
import dog from "../img/snowmanimg/dog.svg";
import eyecry from "../img/snowmanimg/eyecry.svg";
import eyeheart from "../img/snowmanimg/eyeheart.svg";
import eyebasic from "../img/snowmanimg/eyebasic.svg";
import eyedrunk from "../img/snowmanimg/eyedrunk.svg";
import eyesad from "../img/snowmanimg/eyesad.svg";
import mouthw from "../img/snowmanimg/mouthw.svg";
import mouthsmile from "../img/snowmanimg/mouthsmile.svg";
import handsdown from "../img/snowmanimg/handsdown.svg";
import handsup from "../img/snowmanimg/handsup.svg";
import ribbonpink from "../img/snowmanimg/ribbonpink.svg";
import ribbonblue from "../img/snowmanimg/ribbonblue.svg";
import handsup2 from "../img/snowmanimg/handsup2.svg"
import handsdown2 from "../img/snowmanimg/handsdown2.svg"
import handsshy from "../img/snowmanimg/handsshy.svg"
import scarfblue from "../img/snowmanimg/scarfblue.svg"
import scarfred from "../img/snowmanimg/scarfred.svg"
import scarfgreen from "../img/snowmanimg/scarfgreen.svg"

const Container = styled.div`
  width: 100%;
  max-width: 393px;
  min-height: 800px;
  margin: 0 auto;
  position: relative;
  padding: 20px 0;
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

const Button = styled.button`
  background: #6c9bd0;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 5px;
  font-size: 14px;
  font-family: "Noto Sans KR";
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px 0;
`;

const SnowmanFrame = styled.div`
  position: relative;
  width: 50px;
  height: 100px;
  margin: 20px auto;
`;

const Layer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Snowman = () => {
  const [body, setBody] = useState(basic);
  const [eyes, setEyes] = useState(eyecry);
  const [mouth, setMouth] = useState(mouthw);
  const [hands, setHands] = useState(handsdown);
  const [accessory, setAccessory] = useState(ribbonpink);

  return (
    <>
      <TitleWrap title="snowman" />
      <Container>
        <SnowmanFrame>
          <Layer>
            <img src={body} alt="body" />
          </Layer>
          <Layer>
            <img src={eyes} alt="eyes" />
          </Layer>
          <Layer>
            <img src={mouth} alt="mouth" />
          </Layer>
          <Layer>
            <img src={hands} alt="hands" />
          </Layer>
          <Layer>
            <img src={accessory} alt="accessory" />
          </Layer>
        </SnowmanFrame>

        <Title>Build My Own Snowman</Title>

        {/* Body Options */}
        <ButtonWrap>
          <Button onClick={() => setBody(basic)}>Basic</Button>
          <Button onClick={() => setBody(bear)}>Bear</Button>
          <Button onClick={() => setBody(bunny)}>Bunny</Button>
          <Button onClick={() => setBody(cat)}>Cat</Button>
          <Button onClick={() => setBody(dog)}>Dog</Button>
        </ButtonWrap>

        {/* Eyes Options */}
        <ButtonWrap>
          <Button onClick={() => setEyes(eyecry)}>Crying Eyes</Button>
          <Button onClick={() => setEyes(eyeheart)}>Heart Eyes</Button>
          <Button onClick={() => setEyes(eyebasic)}>Basic Eyes</Button>
          <Button onClick={() => setEyes(eyesad)}>Sad Eyes</Button>
          <Button onClick={() => setEyes(eyedrunk)}>Drunk Eyes</Button>
        </ButtonWrap>

        {/* Mouth Options */}
        <ButtonWrap>
          <Button onClick={() => setMouth(mouthw)}>Wide Mouth</Button>
          <Button onClick={() => setMouth(mouthsmile)}>Smile</Button>
        </ButtonWrap>

        {/* Hands Options */}
        <ButtonWrap>
          <Button onClick={() => setHands(handsdown)}>Hands Down</Button>
          <Button onClick={() => setHands(handsup)}>Hands Up</Button>
          <Button onClick={() => setHands(handsup2)}>Hands Up</Button>
          <Button onClick={() => setHands(handsdown2)}>Hands Up</Button>
          <Button onClick={() => setHands(handsshy)}>Hands Up</Button>
        </ButtonWrap>

        {/* Accessory Options */}
        <ButtonWrap>
          <Button onClick={() => setAccessory(ribbonpink)}>Pink Ribbon</Button>
          <Button onClick={() => setAccessory(ribbonblue)}>Blue Ribbon</Button>
          <Button onClick={() => setAccessory(scarfblue)}>Blue Scarf</Button>
          <Button onClick={() => setAccessory(scarfgreen)}>Green Scarf</Button>
          <Button onClick={() => setAccessory(scarfred)}>Red Scarf</Button>
        </ButtonWrap>

        <Bg src={background2} alt="bg" />
      </Container>
    </>
  );
};

export default Snowman;
