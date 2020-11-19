import { h } from "preact";
import { createGlobalStyle, withTheme } from "styled-components";
import media from "styled-media-query";

const GlobalStyles = createGlobalStyle`
html {
  scroll-behavior: smooth;

  font-size: 76.5%; /* 10px at html, body */

  ${media.lessThan("medium")`
      font-size: 69.5%; 
  `}

  ${media.lessThan("small")`
      /* font-size: 48.5%;  */
      font-size: 62.5%;
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
  overflow: ${(props) => (props.isOverflow === true ? "hidden" : "auto")};
} 

button {
  font-family: 'Kanit', arial, sans-serif;
}

* {
  box-sizing: border-box;
  /* user-select: none;  */
}
`;

const GlobalComponent = (props) => {
  const { isOverflow } = props;
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <GlobalStyles isOverflow={isOverflow} />
    </>
  );
};

export default withTheme(GlobalComponent);
