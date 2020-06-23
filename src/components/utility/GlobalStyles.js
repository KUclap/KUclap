import { createGlobalStyle } from "styled-components";
import media from "styled-media-query";

const GlobalStyles = createGlobalStyle`
html {
  font-size: 62.5%; /* 10px at html, body */
  scroll-behavior: smooth;
  
  ${media.lessThan("medium")`
      font-size: 55.5%; 
  `}

  ${media.lessThan("small")`
      font-size: 48.5%; 
  `}

} 
body {
  color: ${(props) => props.theme.bodyText || "#f5f5f5"};
  background: ${(props) => props.theme.body || "#191b1f"};
  font-family: 'Kanit', arial, sans-serif;
  font-weight: 400; 
  height: auto;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: ${(props) => (props.overflow === true ? "hidden" : "auto")}
} 

* {
  box-sizing: border-box;
  /* user-select: none;  */
}
`;

export default GlobalStyles;
