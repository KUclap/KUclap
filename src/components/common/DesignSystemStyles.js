import styled, { css } from "styled-components";
import CircularProgress from '@material-ui/core/CircularProgress'
import ic_cancel_white from "../../assets/icons/ic_cancel_white.svg";
import { 	blue,
	blue_75,
	blue_95, 
  blue_97,
  sea_pink} from "./Colors"
import MenuItem from '@material-ui/core/MenuItem'
 
const inpStyles = css`
  background-color: transparent;
  border: 0.2rem solid;
  border-radius: 0.6rem;
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem;
` 

const inputStyles = {
  backgroundColor: "transparent",
  border: `0.2rem solid`,
  borderRadius: "0.6rem",
  padding: "1.2rem 1.6rem",
  fontSize: "1.6rem",
}

const buttonStyles = {
  padding: "0.2rem 1.6rem",
  borderRadius: "0.4rem",
  fontSize: "1.6rem"
}

const PrimaryButton = styled.button`
	background-color: ${blue};
  color: white;
  padding: ${buttonStyles.padding};
  border-radius: ${buttonStyles.borderRadius};
  font-size: ${buttonStyles.fontSize};
  font-weight: 500;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  cursor: pointer;

  &:active {
    background-color: ${blue};
  }

  &:hover {
    background-color: ${blue_75};
  }
`

const SecondaryButton = styled(PrimaryButton)`
  background-color: transparent;
  color: ${blue};
  box-shadow: inset 0 0 0 0.1rem ${blue};

  &:active {
    background-color: ${blue_95};
  }

  &:hover {
    background-color: ${blue_97};
  }
`

const Heading = styled.p`
  font-weight: 600;
  color: ${(props) =>
    props.desc ? props.theme.subText : props.theme.mainText};
`

const Heading1 = styled(Heading)`
  font-size: 1.8rem;
`

const Heading2 = styled(Heading)`
  font-size: 1.6rem;
`

const BodyMedium = styled.p`
  font-weight: 400;
  font-size: 1.6rem;
  color: ${(props) => props.theme.mainText};
`

const BodySmall = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: inherit;
`

const BodyTiny = styled.p`
  font-size: 1.2rem;
  color: inherit;
`

const Input = styled.input`
  ${inpStyles};
  
  border-color: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.mainText};
  height: 3.4rem;

  &::placeholder {
    color: ${(props) => props.theme.subText};
  }
`

const TextArea = styled.textarea`
  background-color: ${inputStyles.backgroundColor};
  border: ${inputStyles.border};
  border-color: ${(props) => props.theme.borderColor};
  border-radius: ${inputStyles.borderRadius};
  font-size: ${inputStyles.fontSize};
  padding: ${inputStyles.padding};
  resize: none;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  color: ${(props) => props.theme.mainText};
  
  &::placeholder {
    color: ${(props) => props.theme.subText};
  }
`

const ModalActions = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;

  button {
    margin: 1.6rem 1.6rem 0;
    height: 2.8rem;
    min-width: 6.5rem;
  }
`

const ModalHeader = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 1.4rem 0;
  border-bottom: 0.3rem solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.mainText};

  svg {
    width: 3rem;
    height: 3rem;
    margin-left: 0.6rem;

    path {
      fill: ${(props) => props.theme.mainText};
      stroke: ${(props) => props.theme.mainText};
    }
  }
`;

const Backdrop = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: hsla(10, 10%, 10%, 50%);
  display: ${(props) => (props.show === true ? "block" : "none")};
  z-index: 1;
  cursor: url(${ic_cancel_white}) 205 205, auto;
`

const WhiteCircularProgress = styled(CircularProgress)`
    && {
        color: white;
    }
`

const MenuContentContainer = styled.div`
    width: 12.7rem;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    margin: 0 0.7rem;
    padding: 1rem 0;
    border-bottom: 0.1rem solid ${(props) => props.theme.subText};
    cursor: default;
`

const MenuContent = styled.div`
    display: flex;
    justify-content: space-between;
    user-select: none;

    &:not(:first-child) {
        margin-top: 0.2rem;
    }

    span:last-child {
        color: ${blue};
    }
`

const MenuItemCustom = styled(MenuItem)`
    &.MuiMenuItem-root {
        font-family: 'Kanit', arial, sans-serif;
        padding: 1rem;
        font-size: 1.2rem;
        justify-content: center;
        color: ${(props) => props.theme.mainText};

        &:hover {
            background: ${(props) => props.theme.menuItem.hover};
            color: ${(props) => props.theme.mainText};
        }

        &:active {
            background: ${(props) => props.theme.menuItem.active};
            color: ${(props) => props.theme.mainText};
        }
    }
`

const RequiredDot = styled.div`
    width: 0.6rem;
    height: 0.6rem;
    margin-left: 0.4rem;
    background: ${sea_pink};
    border-radius: 100%;
`

export {
	PrimaryButton,
  SecondaryButton,
  Heading1,
  Heading2,
  Input,
  BodyMedium,
  BodySmall,
  BodyTiny,
  TextArea,
  ModalActions,
  Backdrop,
  ModalHeader,
  WhiteCircularProgress,
  MenuContentContainer,
  MenuContent,
  MenuItemCustom,
  RequiredDot
}