import { h } from "preact";
import { useState } from "preact/hooks";
import styled, { withTheme } from "styled-components";

import { DownArrow, RightArrow, ThreeDots } from "../utility/Icons";

const Container = styled.div`
	border: 0.2rem solid ${(props) => props.theme.borderColor};
	border-radius: 1rem;
	margin: 3rem 0;
	padding: 1.6rem;
	min-width: 27.6rem;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

const QuestionAuthor = styled.div`
	font-size: 1.2rem;
	font-weight: 500;
	color: ${(props) => props.theme.mainText};
`;

const CreatedAt = styled.div`
	font-size: 1rem;
	font-weight: 300;
	color: hsl(0, 0%, 51%);
`;

const Question = styled.div`
	font-size: 1.8rem;
	font-weight: 400;
	margin-top: 1.2rem;
	color: ${(props) => props.theme.mainText};
`;

const QuestionHeader = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;

	> svg {
		height: 1.8rem;
		width: 1.8rem;
	}
`;

const Line = styled.div`
	background-color: ${(props) => props.theme.borderColor};
	border-radius: 100px;
	width: 100%;
	height: 0.2rem;
`;

const AnswerHeader = styled.div`
	font-size: 1.2rem;
	margin-top: 1.2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;

	> svg {
		path {
			fill: ${(props) => props.theme.subText};
		}
	}
`;

const NoOfAnswerContainer = styled.div`
	display: flex;
	position: absolute;
	right: 0;
	background-color: white;
	padding-left: 1.2rem;

	> div {
		margin: 0 0.4rem;
	}
`;

const NoOfAnswer = styled.div`
	background-color: hsl(214, 84%, 56%);
	height: 1.8rem;
	width: 1.8rem;
	font-size: 1rem;
	border-radius: 100%;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InputField = styled.input`
	font-size: 1.6rem;
	background-color: ${(props) => props.theme.body};
	border: 0.2rem solid ${(props) => props.theme.borderColor};
	border-radius: 0.6rem;
	padding: 0.3rem 1.2rem;
	margin-top: 1.2rem;

	&::placeholder {
		color: #888;
	}
`;

const AnswerFooter = styled.div`
	font-size: 1.8rem;
	font-weight: 600;
	color: ${(props) => props.theme.mainText};
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 1.2rem;

	${InputField} {
		margin: 0 1.3rem 0 1rem;
		padding: 0.1rem 1.2rem;
		width: 100%;
	}
`;

const Button = styled.div`
	background-color: hsl(214, 84%, 56%);
	color: #fff;
	padding: 0.3rem 0.7rem;
	border-radius: 0.4rem;
	font-size: 1.6rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	cursor: pointer;

	> svg {
		path {
			fill: white;
		}
	}

	&:hover {
		background-color: #9ac1ee;
	}
`;

const QuestionCard = (props) => {
	const { questionInfo } = props;

	const [isAnswering, setIsAnswering] = useState(false);

	return (
		<Container>
			<QuestionHeader>
				<div>
					<QuestionAuthor>คำถามจาก {questionInfo.authorQuestion}</QuestionAuthor>
					<CreatedAt>{questionInfo.createdAt}</CreatedAt>
				</div>
				<ThreeDots />
			</QuestionHeader>
			<Question>{questionInfo.question}</Question>
			{questionInfo.answer?.length > 0 && (
				<AnswerHeader>
					<Line />
					<NoOfAnswerContainer>
						คำตอบทั้งหมด
						<NoOfAnswer>{questionInfo.answer.length}</NoOfAnswer>
						<DownArrow />
					</NoOfAnswerContainer>
				</AnswerHeader>
			)}
			<InputField placeholder="ตอบคำถามนี้" onFocus={() => setIsAnswering(true)} />
			{isAnswering && (
				<AnswerFooter>
					โดย
					<InputField placeholder="นามปากกาผู้ตอบ" />
					<Button>
						ส่ง <RightArrow />
					</Button>
				</AnswerFooter>
			)}
		</Container>
	);
};

export default withTheme(QuestionCard);
