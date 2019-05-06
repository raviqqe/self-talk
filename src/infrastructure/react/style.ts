import { createGlobalStyle } from "styled-components";
import { css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background: khaki;
    margin: 0;
    padding: 0;
    color: #222;
    font-family: "Noto Sans", sans-serif;
    line-height: 1.4;
    font-size: 16px;
  }
`;

export const boxShadow = css`
  box-shadow: 0rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
`;
