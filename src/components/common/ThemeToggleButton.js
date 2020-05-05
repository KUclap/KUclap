import styled, { withTheme } from "styled-components";
import media from "styled-media-query";
import { Dark, Light } from "../utillity/Icons";

const Button = styled.div`
  background: white;
  border: 2px solid ${(props) => props.theme.bodyText};

  width: 72px;
  height: 36px;
  border-radius: 18px;
  
  ${media.lessThan("medium")`
    width: 56px;
    height: 28px;
  `}

  ${media.lessThan("small")`
    width: 48px;
    height: 24px;
  `}
  
  ${(props) => props.right ? `
    position: absolute;
    right: 0;
    margin-top: 3rem;
    margin-right: 3rem;
  ` : ''}
`;
const Circle = styled.div`
  border: 2px solid black;
  margin: 2px;
  background ${(props) => props.theme.body};
  float: ${(props) => props.theme.name === 'dark' ? 'right' : 'left'};

  padding: 4px;
  width: 28px;
  height: 28px;
  border-radius: 14px;

  ${media.lessThan("medium")`
    padding: 2px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
  `}

  ${media.lessThan("small")`
    padding: 1px;
    width: 16px;
    height: 16px;
    border-radius: 8px;
  `}

  svg {
    width: 100%;
    height: 100%;
  }
`

const ThemeToggleButton = (props) => {
  return <Button {...props}>
          <Circle>{ props.theme.name === 'dark' ? <Dark /> : <Light /> }</Circle>
        </Button>
}

export default withTheme(ThemeToggleButton);
