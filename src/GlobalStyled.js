import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyled = createGlobalStyle`
${reset}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

@font-face {
    font-family: 'AHN_L';
    src: url('/fonts/AHN_L.TTF') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body{
    font-family: "AHN_L","Noto Sans KR", sans-serif;
  }
`;
