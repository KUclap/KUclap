import { h } from "preact";
import { useState } from "preact/hooks";
import styled from "styled-components";
import APIs from "../utility/apis";
import { grey, red } from "./Colors";
import { Input, ModalActions, PrimaryButton, SecondaryButton, TextArea, WhiteCircularProgress } from "./DesignSystemStyles";
import Modal from "./Modal";

const QuestionField = styled(TextArea)`
    height: 12rem;
    width: 100%;
    margin: 1.6rem 0;
`

const ConfirmButton = styled(PrimaryButton)`
    margin: 2rem 1.6rem 0;
`

const CancelButton = styled(SecondaryButton)`
    margin: 2rem 1.6rem 0;
    color: ${(props) => props.theme.subText};
    box-shadow: inset 0 0 0 0.1rem ${(props) => props.theme.subText};

    &:hover {
        background: ${(props) => props.theme.lightBackground};
    }
`

const CreateQuestionContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 1rem;

	> span {
		font-size: 1.4rem;
		font-weight: 500;
		color: ${grey};
		max-width: 90%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
`

const AuthorFieldContainer = styled.div`
	display: flex;
	align-items: center;
	align-self: flex-start;

	${Input} {
		margin: 0 1rem;
	}
`

const Warning = styled.div`
    color: ${red};
`

const QuestionModal = (props) => {
    const { classID, className, showQuestionModal, setQuestionModal } = props
    const defaultQuestionInfo = {
        classId: classID,
        question: "",
        authorQuestion: ""
    }
    const defaultRequire = {
        question: false,
        author: false
    }

    const [questionInfo, setQuestionInfo] = useState(defaultQuestionInfo)
    const [questionRequired, setQuestionRequied] = useState(defaultRequire)
    const [isLoading, setIsLoading] = useState(false)

    const closeQuestionModal = () => {
        setQuestionModal(false)
    }
    
    const handleNewQuestion = () => {
        if (!isLoading) {
            const isQuestionTooShort = (questionInfo.question.length < 10)
            const isAuthorEmpty = (questionInfo.author === "")
            const areAllInputsValid = (!isQuestionTooShort && !isAuthorEmpty)
            if (areAllInputsValid) {
                setIsLoading(true)
                APIs.createQuestion(questionInfo, () => {
                    setQuestionInfo(defaultQuestionInfo)
                    setQuestionRequied(defaultRequire)
                    setIsLoading(false)
                    location.reload()
                })
            } else {
                setQuestionRequied({
                    question: isQuestionTooShort,
                    author: isAuthorEmpty
                })
            }
        }
    }

    const handleOnChange = (e, field) => {
        let value = e.target.value
        if (/^\s/.test(value)) {
            value = ''
        }
        setQuestionInfo({ ...questionInfo, [field]: value })
    }

    return (
        <Modal
			showModal={showQuestionModal}
			closeModal={closeQuestionModal}
		>
			<CreateQuestionContainer>
				สร้างคำถาม
				<span>วิชา {className}</span>
				<Warning>{questionRequired.question ? 
                    "กรุณากรอกคำถามอย่างน้อย 10 ตัวอักษร" : 
                        questionRequired.author ? "กรุณากรอกนามปากกาผู้ถาม" : ""}
                </Warning>
				<QuestionField 
					placeholder="เขียนคำถาม..."
                    value={questionInfo.question}
                    onChange={(e) => handleOnChange(e, "question")}
				/>
				<AuthorFieldContainer>
					<span>โดย</span>
					<Input
						type="text"
						placeholder="นามปากกาผู้ถาม"
						value={questionInfo.authorQuestion}
						onChange={(e) => handleOnChange(e, "authorQuestion")}
					/>
				</AuthorFieldContainer>
				<ModalActions>
					<CancelButton onClick={closeQuestionModal}>ยกเลิก</CancelButton>
					<ConfirmButton onClick={handleNewQuestion}>
						{isLoading ? <WhiteCircularProgress size="2rem" /> : 'สร้างคำถาม'}
					</ConfirmButton>
				</ModalActions>
			</CreateQuestionContainer>
		</Modal>
    )
}

export default QuestionModal
