import { h } from "preact";
import { useEffect, useState } from 'preact/hooks'
import styled from 'styled-components'
import APIs from "../utility/apis"
import { AnswerSkeletonA, AnswerSkeletonB } from './QuestionSkeleton'
import parseDate from "../utility/parseDate";

const AnswerListContainer = styled.div`
    display: grid;
    grid-gap: 1.2rem;
    margin-top: 1.2rem;
`

const AnswerContainer = styled.div`
	background: ${props => props.theme.lightBlueBackground};
	font-size: 1.6rem;
    border-radius: 8px;
    padding: 0.6rem 1.1rem;
    display: flex;
    flex-direction: column;
`

const AnswerDetailsContainer = styled.div`
	font-size: 1.2rem;
    margin-top: 0.4rem;
    align-self: flex-end;
    color: ${props => props.theme.subText};

	span {
		font-size: 1rem;
	}
`

const AnswerList = (props) => {
    const { questionId, showAnswers, answers, setAnswers } = props
    const [isLoading, setIsLoading] = useState(!answers)

    useEffect(() => {
        if (showAnswers && !answers) {
            console.log("loading")
            APIs.getAnswersByQuestionId(questionId, (res) => {
                const questionAnswers = res.data
                setAnswers(questionAnswers)
                setIsLoading(false)
            })
        }
    }, [showAnswers])

    return (
        <AnswerListContainer>
            {
                isLoading ? <>
                    <AnswerSkeletonA />
                    <AnswerSkeletonB />
                </> :
                answers?.map((answerInfo) => 
                    <AnswerContainer>
                        {answerInfo.answer}
                        <AnswerDetailsContainer>
                            คำตอบของ {answerInfo.author} <span>{parseDate(answerInfo.createdAt)}</span>
                        </AnswerDetailsContainer>
                    </AnswerContainer>
                )
            }
        </AnswerListContainer>
    )
}

export default AnswerList
