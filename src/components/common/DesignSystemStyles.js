import styled from "styled-components";
import ic_cancel_white from "../../assets/icons/ic_cancel_white.svg";

const blue = "hsl(214, 84%, 56%)"
const blue_75 = "hsl(214, 84%, 75%)"
const blue_95 = "hsl(214, 84%, 95%)"

const grey = "hsl(0, 0%, 31%)"

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

  &:hover {
    background-color: ${blue_95};
  }
`

const Heading = styled.p`
  font-weight: 600;
  color: ${(props) =>
    props.desc ? props.theme.placeholderText : props.theme.mainText};
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
  background-color: ${inputStyles.backgroundColor};
  border: ${inputStyles.border};
  border-color: ${(props) => props.theme.lightColor};
  border-radius: ${inputStyles.borderRadius};
  color: ${(props) => props.theme.bodyText};
  font-size: ${inputStyles.fontSize};
  padding: ${inputStyles.padding};
  height: 3.4rem;

  &::placeholder {
    color: ${(props) => props.theme.placeholderText};
  }
`

const TextArea = styled.textarea`
  background-color: ${inputStyles.backgroundColor};
  border: ${inputStyles.border};
  border-color: ${(props) => props.theme.lightColor};
  border-radius: ${inputStyles.borderRadius};
  font-size: ${inputStyles.fontSize};
  padding: ${inputStyles.padding};
  resize: none;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  color: ${(props) => props.theme.bodyText};
  
  &::placeholder {
    color: ${(props) => props.theme.placeholderText};
  }
`

const ModalBackdrop = styled.div`
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

const ModalActions = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;

  button {
    margin: 1.6rem 1.6rem 0;
  }
`

const Modal = styled.div`
  border: ${(props) =>
    props.theme.name === "dark" ? `0.3rem solid ${props.theme.lightColor}` : 0};
  border-radius: 10px;
  background-color: ${(props) => props.theme.body};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2.8rem 1.2rem;
  font-weight: 500;
  font-size: 2rem;
  line-height: 3.4rem;
  text-align: center;
  display: ${(props) => (props.show === true ? "block" : "none")};
  z-index: 1;
  max-width: 42rem;
  width: 84%;

  ${Input} {
    width: 18rem;
    margin-top: 1.2rem;
    align-self: flex-start;
  }
`

export {
	PrimaryButton,
  SecondaryButton,
  ModalBackdrop,
  ModalActions,
  Modal,
  Heading1,
  Heading2,
  Input,
  BodyMedium,
  BodySmall,
  BodyTiny,
  TextArea,
}