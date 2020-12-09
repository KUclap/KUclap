import { h } from "preact";
import { useState } from "preact/hooks";
import { Clap, Boo, Share } from "../utility/Icons";
import styled, { css } from "styled-components";
import { pulse } from "../utility/keyframs";
import useEngage from "../../hooks/useEngage";
import ShareModal from "./ShareModal";
import { BodyTiny, SecondaryButton } from "./DesignSystemStyles"
import { blue, grey_75, light_blue, red, sea_pink } from "./Colors";

const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0.4rem 0;
  align-items: center;
`;

const NumberAction = styled.span`
  color: ${(props) => props.color || "black"};
  white-space: nowrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${grey_75};

  span {
    user-select: none;
    margin-left: 0.3rem;
    width: 2.5rem;
    font-size: 1.4rem;
  }
`;

const ButtonWithIcon = styled(SecondaryButton)`
	border: 0.1rem solid ${grey_75};
	box-shadow: none;
	border-radius: 1.5rem;
	color: ${grey_75};
	height: fit-content;
	padding: 0rem 0.8rem;
	font-weight: normal;
  font-size: inherit;

	svg {
		height: 1.6rem;
		width: 1.6rem;

		path {
			fill: ${grey_75};
			stroke: ${grey_75};
		}
	}

  &:hover {
    background: ${(props) => props.theme.lightBackground};
  }
`

const ButtonIcon = styled.button`
  -webkit-tap-highlight-color: transparent;
	background: transparent;
	display: flex;
  text-align: right;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  align-self: flex-end;
  outline: none;

  span {
    margin-right: 1ch;
  }

  &:before {
    content: "";
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    z-index: -1;
    display: inline-block;
    transition: 0.25s ease-in;
    position: absolute;
    ${(props) =>
      props.clapAnimation === true
        ? css`
          & {
            animation: ${pulse("rgba(36, 87, 156, 25%)")} 0.5s ease;
          }
          `
        : props.booAnimation === true
        ? css`
          & {
            animation: ${pulse("rgba(173, 66, 16, 25%)")} 0.5s ease;
          }
          `
        : null}
  }

  &:hover:before {
    width: 3rem;
    height: 3rem;
    transform: scale(1.1);
    background: ${(props) =>
      props.type === "clap"
        ? "rgba(47, 128, 237, 9%)"
        : props.type === "boo"
        ? "rgba(241, 191, 157, 9%)"
        : props.theme.solid};
  }

  svg {
    #bg {
      transition: all 0.2s ease-in-out;
    }
    #clap {
      fill: ${(props) => (props.valueAction === false ? blue : null)};
    }
    #boo {
      fill: ${(props) => (props.valueAction === false ? red : null)};
    }
  }

  &:hover {
    svg {
      #clap {
        fill: ${(props) =>
          props.valueAction === false ? blue : light_blue};
      }
      #boo {
        fill: ${(props) =>
          props.valueAction === false ? red : sea_pink};
      }
      #arrow {
        fill: ${light_blue};
        stroke: ${light_blue};
      }
    }
  }

  &:active {
    svg {
      #clap {
        fill: ${blue};
      }
      #boo {
        fill: ${red};
      }
    }
  }
`;

const CardActions = (props) => {
	const { clap, boo, reviewId, classNameTH, classId, updateBoo, theme } = props
  const [showShareModal, setShareModal] = useState(false);

	const {
    counter: clapCounter,
    prevCounter: prevClapCounter,
    animation: clapAnimation,
    handleActionClick: handleClapActionClick,
  } = useEngage(reviewId);

  const {
    counter: booCounter,
    prevCounter: prevBooCounter,
    animation: booAnimation,
    handleActionClick: handleBooActionClick,
  } = useEngage(reviewId, updateBoo);

	const closeShareModal = () => {
    setShareModal(false);
  };

	const numberFormat = (value) => {
    let newValue = value;
    if (value >= 1000) {
      value /= 1000;
      newValue = `${value.toFixed(1)}k`;
    }
    return newValue;
  };

	return (
		<Actions>
			<ButtonContainer>
				<ButtonIcon
					type="clap"
					onClick={() => handleClapActionClick()}
					valueAction={clapCounter === prevClapCounter}
					clapAnimation={clapAnimation}
				>
					<Clap bgColor={theme.body} />
				</ButtonIcon>
				{clapCounter === prevClapCounter ? (
					<span>{numberFormat(clapCounter + clap)}</span>
				) : (
					<NumberAction color={blue}>
						{`+${clapCounter - prevClapCounter}`}
					</NumberAction>
				)}
			</ButtonContainer>
			<ButtonContainer>
				<ButtonIcon
					type="boo"
					onClick={() => handleBooActionClick("boo")}
					valueAction={booCounter === prevBooCounter}
					booAnimation={booAnimation}
				>
					<Boo bgColor={theme.body} />
				</ButtonIcon>
				{booCounter === prevBooCounter ? (
					<span>{numberFormat(booCounter + boo)}</span>
				) : (
					<NumberAction color={red}>
						{`+${booCounter - prevBooCounter}`}
					</NumberAction>
				)}
			</ButtonContainer>
			<ButtonWithIcon
				onClick={() => setShareModal(true)}
				type="share"
			>
				<BodyTiny>
					แชร์
				</BodyTiny>
				<Share />
			</ButtonWithIcon>
			<ShareModal 
				showShareModal={showShareModal}
        closeShareModal={closeShareModal}
				reviewId={reviewId}
				classNameTH={classNameTH}
				classId={classId}
			/>
		</Actions>     
	)
}

export default CardActions
