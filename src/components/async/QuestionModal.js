import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import styled from "styled-components";

import { grey_75, red } from "../common/Colors";
import {
	Input,
	ModalActions,
	PrimaryButton,
	SecondaryButton,
	TextArea,
	WhiteCircularProgress,
} from "../common/DesignSystemStyles";
import Modal from "../common/Modal";
import APIs from "../utility/apis";

const QuestionField = styled(TextArea)`
	height: 12rem;
	width: 100%;
	margin-bottom: 1.2rem;
`;

const ConfirmButton = styled(PrimaryButton)`
	margin: 2rem 1.6rem 0;
`;

const CancelButton = styled(SecondaryButton)`
	margin: 2rem 1.6rem 0;
	color: ${(props) => props.theme.subText};
	box-shadow: inset 0 0 0 0.1rem ${(props) => props.theme.subText};

	&:hover {
		background: ${(props) => props.theme.lightBackground};
	}
`;

const CreateQuestionContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 1rem;
	line-height: normal;

	> span {
		font-size: 1.4rem;
		font-weight: 500;
		color: ${(props) => props.theme.mainText};
		max-width: 90%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-bottom: 1.6rem;
	}
`;

const InputFieldContainer = styled.div`
	display: flex;
	align-items: center;
	align-self: flex-start;
	margin-bottom: 1.6rem;

	> div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		> span:last-child {
			font-size: 1.2rem;
			color: ${grey_75};
		}
	}

	span {
		font-size: 1.8rem;
		white-space: nowrap;
	}

	${Input} {
		width: ${(props) => (props.small ? "9rem" : "100%")};
		margin: 0 1rem;
	}
`;

const Warning = styled.div`
	color: ${red};
	font-size: 1.4rem;
	line-height: normal;
	align-self: flex-start;
	margin-bottom: 0.6rem;
`;

const QuestionModal = (props) => {
	const { classID, className, showQuestionModal, setQuestionModal } = props;
	const defaultQuestionInfo = {
		classId: classID,
		question: "",
		author: "",
		auth: "",
	};
	const defaultRequire = {
		question: false,
		author: false,
		auth: false,
	};

	const [questionInfo, setQuestionInfo] = useState(defaultQuestionInfo);
	const [questionRequired, setQuestionRequied] = useState(defaultRequire);
	const [isLoading, setIsLoading] = useState(false);

	const closeQuestionModal = () => {
		setQuestionModal(false);
	};

	const handleNewQuestion = () => {
		if (!isLoading) {
			const isQuestionTooShort = questionInfo.question.length < 10;
			const isAuthorEmpty = questionInfo.author === "";
			const isAuthNotValid = questionInfo.auth.length < 4;
			const areAllInputsValid = !isQuestionTooShort && !isAuthorEmpty && !isAuthNotValid;

			localStorage.setItem(`kuclap.com-v1-author`, questionInfo.author);

			if (areAllInputsValid) {
				setQuestionRequied(defaultRequire);
				setIsLoading(true);
				APIs.createQuestion(questionInfo, () => {
					setQuestionInfo(defaultQuestionInfo);
					setIsLoading(false);
					location.reload();
				});
			} else {
				setQuestionRequied({
					question: isQuestionTooShort,
					author: isAuthorEmpty,
					auth: isAuthNotValid,
				});
			}
		}
	};

	const handleOnChange = (e, field) => {
		let value = e.target.value;
		if (/^\s/.test(value)) {
			value = questionInfo[field];
		}
		setQuestionInfo({ ...questionInfo, [field]: value });
	};

	const handleOnChangePassword = (e) => {
		let value = e.target.value;
		let newValue = questionInfo.auth;
		if (/^[0-9]*$/.test(value) && value.length <= 4) {
			newValue = value;
		}
		setQuestionInfo({ ...questionInfo, auth: newValue });
	};

	useEffect(() => {
		if (localStorage.getItem(`kuclap.com-v1-author`)) {
			setQuestionInfo({ ...questionInfo, author: localStorage.getItem(`kuclap.com-v1-author`) });
		}
	}, []);

	return (
		<Modal showModal={showQuestionModal} closeModal={closeQuestionModal}>
			<CreateQuestionContainer>
				สร้างคำถาม
				<span>วิชา {className}</span>
				{questionRequired.question && <Warning>กรุณากรอกคำถามอย่างน้อย 10 ตัวอักษร</Warning>}
				<QuestionField
					placeholder="เขียนคำถาม..."
					value={questionInfo.question}
					onChange={(e) => handleOnChange(e, "question")}
				/>
				{questionRequired.author && <Warning>กรุณากรอกนามปากกาผู้ถาม</Warning>}
				<InputFieldContainer>
					<span>โดย</span>
					<Input
						type="text"
						placeholder="นามปากกาผู้ถาม"
						value={questionInfo.author}
						onChange={(e) => handleOnChange(e, "author")}
					/>
				</InputFieldContainer>
				{questionRequired.auth && <Warning>กรุณากรอกเลข 4 หลัก</Warning>}
				<InputFieldContainer small>
					<div id="pin-field">
						<span>ตัวเลข 4 หลัก</span>
						<span>เพื่อใช้ลบคำถามในภายหลัง</span>
					</div>
					<Input
						aria-labelledby="pin-field"
						type="text"
						placeholder="ใส่เลข"
						value={questionInfo.auth}
						onChange={handleOnChangePassword}
					/>
				</InputFieldContainer>
				<ModalActions>
					<CancelButton onClick={closeQuestionModal}>ยกเลิก</CancelButton>
					<ConfirmButton onClick={handleNewQuestion}>
						{isLoading ? <WhiteCircularProgress size="2rem" /> : "สร้างคำถาม"}
					</ConfirmButton>
				</ModalActions>
			</CreateQuestionContainer>
		</Modal>
	);
};

export default QuestionModal;
