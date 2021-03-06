import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import styled, { withTheme } from "styled-components";

import AnswerList from "./AnswerList";
import { blue_75, red } from "./Colors";
import { BodySmall, Subject, WhiteCircularProgress } from "./DesignSystemStyles";
import QuestionHeader from "./QuestionHeader";
import APIs from "../utility/apis";
import { getColorHash, navigateToClassPage } from "../utility/helper";
import { DownArrow, RightArrow } from "../utility/Icons";

const Container = styled.div`
	border: 0.2rem solid ${(props) => props.theme.borderColor};
	border-radius: 1rem;
	margin: 3rem 0;
	padding: 1.6rem;
	min-width: 27.6rem;
	overflow: hidden;
	display: flex;
	flex-direction: column;

	${Subject} {
		transform: translateY(-2.9rem);
	}
`;

const Question = styled.div`
	font-size: 1.8rem;
	font-weight: 400;
	margin-top: 1.2rem;
	color: ${(props) => props.theme.mainText};
	white-space: pre-line;
	overflow-wrap: break-word;
`;

const Line = styled.div`
	background-color: ${(props) => props.theme.borderColor};
	border-radius: 100px;
	width: 100%;
	height: 0.2rem;
`;

const AnswerHeader = styled.div`
	font-size: 1.2rem;
	margin: 1.2rem 0;
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

const ReadAnswerButton = styled.button`
	display: flex;
	position: absolute;
	right: 0;
	background-color: ${(props) => props.theme.body};
	color: ${(props) => props.theme.mainText};
	padding-left: 1.2rem;

	svg {
		transform: rotate(${(props) => (props.showAnswers ? 0 : "-180deg")});
		transition: all 0.3s ease-in-out;
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
	margin: 0 0.4rem;
`;

const InputContainer = styled.div`
	margin-top: 1.2rem;
`;

const InputField = styled.input`
	font-size: 1.6rem;
	background-color: ${(props) => props.theme.body};
	border: 0.2rem solid ${(props) => props.theme.borderColor};
	border-radius: 0.6rem;
	padding: 0.3rem 1.2rem;
	width: 100%;
	color: ${(props) => props.theme.mainText};
	outline: ${blue_75};

	&::placeholder {
		color: #888;
	}
`;

const AnswerField = styled(InputField)`
	height: ${(props) => (props.isAnswering ? "auto" : "3.4rem")};
	resize: vertical;
	overflow: auto;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const AnswerFooter = styled.div`
	font-size: 1.8rem;
	font-weight: 600;
	color: ${(props) => props.theme.mainText};
	display: flex;
	align-items: center;
	justify-content: space-between;

	${InputField} {
		margin: 0 1.3rem 0 1rem;
		padding: 0.1rem 1.2rem;
		width: 100%;
	}
`;

const Button = styled.button`
	background-color: hsl(214, 84%, 56%);
	color: #fff;
	padding: 0.3rem 0.7rem;
	border-radius: 0.4rem;
	font-size: 1.6rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	height: 3rem;
	min-width: 5rem;

	> svg {
		path {
			fill: white;
		}
	}

	&:hover {
		background-color: #9ac1ee;
	}
`;

const Warning = styled.div`
	color: ${red};
	margin-bottom: 0.5rem;
`;

const QuestionCard = (props) => {
	const { questionInfo, isBadge } = props;

	const defaultAnswer = {
		answer: "",
		author: "",
	};
	const defaultRequire = {
		answer: false,
		author: false,
	};

	const [answers, setAnswers] = useState();
	const [numberAnswer, setNumberAnswer] = useState(questionInfo.numberAnswer);
	const [isAnswering, setIsAnswering] = useState(false);
	const [answerInfo, setAnswerInfo] = useState(defaultAnswer);
	const [isLoading, setLoading] = useState(false);
	const [required, setRequired] = useState(defaultRequire);
	const [showAnswers, setShowAnswers] = useState(false);

	const handleOnChange = (e, field) => {
		let value = e.target.value;
		if (field === "author" && e.key === "Enter") {
			// console.log("sending");
			sendAnswer();
		}
		if (/^\s/.test(value)) {
			value = answerInfo.answer;
		}
		setAnswerInfo({ ...answerInfo, [field]: value });
	};

	const sendAnswer = () => {
		const isAnswerTooShort = answerInfo.answer.length < 3;
		const isAuthorIsEmpty = answerInfo.author === "";
		const areAllInputsValid = !isAnswerTooShort && !isAuthorIsEmpty;
		localStorage.setItem(`kuclap.com-v1-author`, answerInfo.author);

		if (areAllInputsValid) {
			setLoading(true);
			setRequired(defaultRequire);
			const answerPayload = {
				questionId: questionInfo.questionId,
				...answerInfo,
			};
			APIs.answerQuestion(answerPayload, () => {
				if (showAnswers) {
					setAnswers([
						...answers,
						{
							...answerPayload,
							createdAt: new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-14" }),
						},
					]);
				}
				setShowAnswers(true);
				setNumberAnswer(numberAnswer + 1);
				setAnswerInfo(defaultAnswer);
				setLoading(false);
			});
		} else {
			setRequired({
				answer: isAnswerTooShort,
				author: isAuthorIsEmpty,
			});
		}
	};

	useEffect(() => {
		if (localStorage.getItem(`kuclap.com-v1-author`)) {
			setAnswerInfo({ ...answerInfo, author: localStorage.getItem(`kuclap.com-v1-author`) });
		}
	}, []);

	return (
		<Container>
			{isBadge && (
				<Subject
					color={getColorHash(questionInfo.classId)}
					onClick={() => navigateToClassPage(questionInfo.classId, "question")}
				>
					{questionInfo.classId}
					<BodySmall as="span"> | {questionInfo.classNameTH}</BodySmall>
				</Subject>
			)}
			<QuestionHeader isBadge={isBadge} {...props} />
			<Question>{questionInfo.question}</Question>
			{numberAnswer > 0 && (
				<>
					<AnswerHeader>
						<Line />
						<ReadAnswerButton showAnswers={showAnswers} onClick={() => setShowAnswers(!showAnswers)}>
							คำตอบทั้งหมด
							<NoOfAnswer>{numberAnswer}</NoOfAnswer>
							<DownArrow />
						</ReadAnswerButton>
					</AnswerHeader>
					{showAnswers && (
						<AnswerList
							answers={answers}
							setAnswers={setAnswers}
							showAnswers={showAnswers}
							questionId={questionInfo.questionId}
							classId={questionInfo.classId}
						/>
					)}
				</>
			)}
			<InputContainer>
				{required.answer && <Warning>คำตอบต้องยาวไม่ต่ำกว่า 3 ตัวอักษร</Warning>}
				<AnswerField
					as="textarea"
					placeholder="ตอบคำถามนี้"
					onFocus={() => setIsAnswering(true)}
					onChange={(e) => handleOnChange(e, "answer")}
					value={answerInfo.answer}
					isAnswering={isAnswering}
				/>
			</InputContainer>
			{isAnswering && (
				<InputContainer>
					{required.author && <Warning>กรุณากรอกนามปากกาผู้ตอบ</Warning>}
					<AnswerFooter>
						โดย
						<InputField
							onKeyUp={(e) => handleOnChange(e, "author")}
							value={answerInfo.author}
							placeholder="นามปากกาผู้ตอบ"
						/>
						<Button onClick={sendAnswer}>
							{isLoading ? (
								<WhiteCircularProgress size="2rem" />
							) : (
								<>
									ส่ง <RightArrow />
								</>
							)}
						</Button>
					</AnswerFooter>
				</InputContainer>
			)}
		</Container>
	);
};

export default withTheme(QuestionCard);
