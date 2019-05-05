import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background: khaki;
    margin: 0;
    padding: 0;
    color: black;
    font-family: "Noto Sans", sans-serif;
    line-height: 1.4;
    font-size: 16px;
  }
`;
