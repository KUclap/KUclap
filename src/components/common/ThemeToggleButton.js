import styled, { withTheme } from "styled-components";
import { Dark, Light } from "../utility/Icons";

const Button = styled.div`
	background: white;
	cursor: pointer;
	width: 4.8rem;
	height: 2.4rem;
	border-radius: 10rem;
	display: flex;
	align-items: center;
	box-shadow: ${(props) => (props.theme.name === "dark" ? 0 : `0 0 0 0.1rem ${props.theme.mainText}`)};
	position: relative;
	${(props) =>
		props.right &&
		`
    position: absolute;
    right: 0;
    margin-top: 1.6rem;
    margin-right: 3rem;
  `}
`;

const Circle = styled.div`
	background: ${(props) => props.theme.body};
	position: absolute;
	left: ${(props) => (props.theme.name === "dark" ? "50%" : 0)};
	right: ${(props) => (props.theme.name === "dark" ? 0 : "50%")};
	transition: all 300ms ease-in-out;
	display: flex;
	align-items: center;
	justify-content: center;

	margin: 0 0.3rem;
	width: 1.8rem;
	height: 1.8rem;
	border-radius: 1.4rem;
	box-shadow: 0 0 0 0.1rem black;

	svg {
		width: 1.2rem;
		height: 1.2rem;
	}
`;

const ThemeToggleButton = (props) => {
	return (
		<Button {...props}>
			<Circle>{props.theme.name === "dark" ? <Dark /> : <Light />}</Circle>
		</Button>
	);
};

export default withTheme(ThemeToggleButton);
