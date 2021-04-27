import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import styled from "styled-components";

import APIs from "../utility/apis";
import AnswerCard from "./AnswerCard";
import { AnswerSkeletonA, AnswerSkeletonB } from "./QuestionSkeleton";

const AnswerListContainer = styled.div`
	display: grid;
	grid-gap: 1.2rem;
	margin-top: 1.2rem;
`;

const AnswerList = (props) => {
	const { questionId, showAnswers, answers, setAnswers, classId } = props;
	const [isLoading, setIsLoading] = useState(!answers);

	useEffect(() => {
		if (showAnswers && !answers) {
			// console.log("loading");
			APIs.getAnswersByQuestionId(questionId, (res) => {
				const questionAnswers = res.data;
				setAnswers(questionAnswers);
				setIsLoading(false);
			});
		}
	}, [showAnswers]);

	return (
		<AnswerListContainer>
			{isLoading ? (
				<>
					<AnswerSkeletonA />
					<AnswerSkeletonB />
				</>
			) : (
				answers?.map((answerInfo) => <AnswerCard answerInfo={answerInfo} classId={classId} />)
			)}
		</AnswerListContainer>
	);
};

export default AnswerList;
