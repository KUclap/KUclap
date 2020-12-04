import styled from "styled-components";

const blue = "hsl(214, 84%, 56%)"
const blue_75 = "hsl(214, 84%, 75%)"
const blue_95 = "hsl(214, 84%, 95%)"

const buttonStyles = {
  padding: "0.3rem 1.8rem",
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

export {
	PrimaryButton,
  SecondaryButton
}