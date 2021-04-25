import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import styled, { withTheme } from "styled-components";

import { Backdrop, Input } from "../common/DesignSystemStyles";
import { CopyLink, DoneGreen, Facebook, Line, Twitter } from "../utility/Icons";
import { shareReview } from "../utility/share";

import "animate.css";

const Card = styled.div`
	width: 80%;
	background: transparent;
	border-radius: 9px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 3;

	${Input} {
		width: 28rem;
	}

	> span > svg {
		height: 140px;
		width: 140px;
		margin-bottom: 1rem;
	}
`;

const Thankyou = styled.p`
	color: hsl(144, 28%, 58%);
	font-size: 2.4rem;
	font-weight: 600;
	text-align: center;
	color: hsl(138, 50%, 76%);
`;

const TextCount = styled.p`
	color: white;
	font-size: 2rem;
	white-space: nowrap;
	margin-bottom: 2rem;
`;

const Text = styled.button`
	color: white;
	font-size: 1.8rem;
	white-space: nowrap;
	margin-bottom: 2rem;
`;

const ShareButton = styled.button`
	background: ${(props) => props.theme.solid};
	border-radius: 100px;
	height: 60px;
	width: 60px;
	justify-content: center;
	align-items: center;

	svg {
		height: 40px;
		width: 40px;
		margin-top: 4px;

		path {
			fill: ${(props) => props.theme.mainText};
		}
	}

	&:hover {
		background: hsl(138, 50%, 76%);
	}
`;

const ShareContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	max-width: 24rem;
	margin: 1rem 0;
`;

const InputCustom = styled(Input)`
	color: ${props => props.theme.mainText};
	border-color: ${(props) => (props.isCopied ? "hsl(138, 50%, 76%)" : props.theme.mainText)};
	margin-top: 1rem;
`;

const ShareText = styled.p`
	color: ${(props) => (props.isCopied ? "hsl(138, 50%, 76%)" : props.theme.mainText)};
	font-size: 2rem;

	svg {
		height: 16px;
		width: 16px;
		margin-right: 1rem;

		path {
			fill: ${props => props.theme.mainText};
		}
	}
`;

const ShareModal = styled.div`
	background: ${(props) => props.theme.solid};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	margin: 1.4rem 0;
	border-radius: 8px;
	border: 4px solid ${props => props.theme.borderColor};
`

const AlertComponent = (props) => {
	const { close, reviewId, classId, classNameTH } = props;
	const [isCopied, setIsCopied] = useState(false);
	const [count, setCount] = useState(5);
	const saveCallback = useRef();

	const handleClose = () => {
		close();
	};

	function callbackCount() {
		setCount(count - 1);
		if (count === 0) {
			handleClose();
		}
	}

	const handleShareReview = (type) => {
		shareReview(type, reviewId, classId, classNameTH, setIsCopied);
	};

	useEffect(() => {
		saveCallback.current = callbackCount;
	});

	useEffect(() => {
		function tick() {
			saveCallback.current();
		}

		const timing = setInterval(tick, 1000);
		return () => clearInterval(timing);
	}, []);

	return (
		<>
			<Backdrop show={true} onClick={handleClose} />
			<Card>
				<span className="bounceIn">
					<DoneGreen />
				</span>
				<Thankyou>ขอบคุณที่เขียนรีวิวบน KUclap นะครับ/ค่ะ 💚</Thankyou>
				<ShareModal>
					<ShareText>แชร์รีวิวของคุณให้กับเพื่อน ๆ</ShareText>
					<ShareContainer>
						<ShareButton onClick={() => handleShareReview("facebook")}>
							<Facebook />
						</ShareButton>
						<ShareButton onClick={() => handleShareReview("twitter")}>
							<Twitter />
						</ShareButton>
						<ShareButton onClick={() => handleShareReview("line")}>
							<Line />
						</ShareButton>
					</ShareContainer>
					<ShareText>
						<CopyLink /> คัดลอกลิงก์
					</ShareText>
					{isCopied && <ShareText isCopied={isCopied}>คัดลอกเรียบร้อย!</ShareText>}
					<InputCustom
						isCopied={isCopied}
						onClick={handleShareReview}
						value={`https://kuclap.com/review/${reviewId}`}
						readOnly
					/>
				</ShareModal>
				<TextCount>จะปิดหน้านี้ในอีก {count} วินาที</TextCount>
				<Text onClick={handleClose}>( จิ้มเบาๆ หนึ่งครั้งเพื่อปิด )</Text>
			</Card>
		</>
	);
};

export default withTheme(AlertComponent);
