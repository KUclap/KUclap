import styled, { keyframes } from "styled-components";

import {
	BubbleBottom,
	BubbleTop,
	Heart,
	LargeBubble,
	LeftHand,
	MediumBubble,
	RightHand,
	SmallBubble,
} from "../utility/Icons";

const leftHandMove = keyframes`
	0% { 
		transform: rotate(10deg);
	}

	50% { 
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(10deg);
	}
`;

const rightHandMove = keyframes`
	0% { 
		transform: rotate(0deg);
	}

	50% { 
		transform: rotate(10deg);
	}

	0% { 
		transform: rotate(0deg);
	}
`;

const bubbleTopMove = keyframes`
	0% {
		transform: scale(0.8);
	}

	50% {
		transform: scale(0.85);
	}

	75% {
		transform: scale(0.9);
	}

	100% {
		transform: scale(0.8);
	}
`;

const bubbleBottomMove = keyframes`
	0% {
		transform: scale(0.8);
	}

	50% {
		transform: scale(0.9);
	}

	100% {
		transform: scale(0.8);
	}
`;

const mediumBubbleMove = keyframes`
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.2);
	}

	100% {
		transform: scale(1);
	}
`;

const smallBubbleMove = keyframes`
	0% {
		transform: scale(0.8);
	}

	25% {
		transform: scale(0.9);
	}

	50% {
		transform: scale(0.95);
	}

	75% {
		transform: scale(1);
	}

	100% {
		transform: scale(0.8);
	}
`;

const largeBubbleMove = keyframes`
	0% {
		transform: scale(1);
	}

	25% {
		transform: scale(0.8);
	}

	100% {
		transform: scale(1);
	}
`;

const heartMove = keyframes`
	0% {
		top: 25px;
	}

	75% {
		top: 5px;
		opacity: 0.9;
	}


	100% {
		top: 0px;
		opacity: 0;
	}
`;

const Container = styled.div`
	position: relative;
	height: 6.4rem;
	width: 6.4rem;

	svg {
		position: absolute;

		&#left-hand {
			top: 14.3px;
			left: 11.29px;
			animation: ${leftHandMove} 2s linear infinite;
		}

		&#bubble-top {
			top: 15.1px;
			left: 18px;
			animation: ${bubbleTopMove} 2s linear infinite;
		}

		&#bubble-bottom {
			top: 37px;
			left: 32px;
			animation: ${bubbleBottomMove} 2s linear infinite;
		}

		&#large-bubble {
			top: 8px;
			left: 55px;
			animation: ${largeBubbleMove} 2.5s linear infinite;
		}

		&#small-bubble {
			top: 30px;
			left: 62px;
			animation: ${smallBubbleMove} 1.5s linear infinite;
		}

		&#medium-bubble {
			top: 16px;
			left: 0;
			animation: ${mediumBubbleMove} 1.5s linear infinite;
		}

		&#heart {
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			animation: ${heartMove} 2s linear infinite;
		}

		&#right-hand {
			top: 19.04px;
			left: 13.32px;
			animation: ${rightHandMove} 2s linear infinite;
		}
	}
`;

const HandWashing = () => {
	return (
		<Container>
			<LeftHand id="left-hand" />
			<BubbleTop id="bubble-top" />
			<BubbleBottom id="bubble-bottom" />
			<LargeBubble id="large-bubble" />
			<SmallBubble id="small-bubble" />
			<MediumBubble id="medium-bubble" />
			<Heart id="heart" />
			<RightHand id="right-hand" />
		</Container>
	);
};

export default HandWashing;
