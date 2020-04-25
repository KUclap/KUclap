import { keyframes } from "styled-components";

export const pulse = (color) => keyframes`
  0% {
    transform: scale(.85);
    background: transparent;
  }
  50%{
    transform: scale(1);
    background: ${color}
  }
  100%{
    transform: scale(.85);
    background: transparent;
  }
`;
