import styled, { withTheme } from "styled-components";
import { Dark, Light } from "../utillity/Icons";

const Button = styled.div`
  background: white;

  width: 7.2rem;
  height: 3.5rem;
  border-radius: 1.8rem;
  /* border: ${(props) => props.theme.name === 'light' ? `0.2rem solid ${props.theme.bodyText}` : 0}; */
  /* border: 0.2rem solid ${(props) => props.theme.bodyText}; */
  box-shadow: ${(props) => props.theme.name === 'dark' ? 0 : `0 0 0 0.25rem ${props.theme.bodyText}`};
  
  ${(props) => props.right ? `
    position: absolute;
    right: 0;
    margin-top: 3rem;
    margin-right: 3rem;
  ` : ''}
`;
const Circle = styled.div`
  background: ${(props) => props.theme.body};
  position: absolute;
  left: ${(props) => props.theme.name === 'dark' ? '50%' : 0};
  right: ${(props) => props.theme.name === 'dark' ? 0 : '50%'};
  transition: all 300ms ease-in-out;

  margin: 0.4rem;
  padding: 0.4rem;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 1.4rem;
  border: 0.2rem solid black;

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
