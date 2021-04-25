import { useContext, useEffect, useState } from "preact/hooks";

import APIs from "../components/utility/apis";
import { SelectContext } from "../context/SelectContext";
import useQuestionFetcher from "./useQuestionFetcher";
import useRecapFetcher from "./useRecapFetcher";
import useReviewFetcher from "./useReviewFetcher";

const useFetcherClass = (props) => {
	const { classID, fetchTarget } = props;
	const { dispatch: dispatchSelected } = useContext(SelectContext);

	const [classScore, setClassScore] = useState({
		homework: 0,
		interest: 0,
		how: 0,
	});

	const { score, ...reviewState } = useReviewFetcher({
		...props,
	});

	const questionState = useQuestionFetcher({
		...props,
	});

	const recapState = useRecapFetcher(props);

	useEffect(() => {
		if (classID) {
			APIs.getClassDetailByClassId(classID, (res) => {
				dispatchSelected({
					type: "selected",
					value: { label: res.data.label, classID: res.data.classId },
				});

				setClassScore({
					homework: res.data.stats.homework,
					interest: res.data.stats.interest,
					how: res.data.stats.how,
				});
			});
		}
	}, []);

	useEffect(() => {
		// This useEffect use for debounce and disable blinking when data change
		// previous data will mutate with new data from fetching but fetchTarget change faster than data's tab change
		// that occure blink data mutation: User can see previous data before loading state start.
		reviewState.setReviews([]);
		questionState.setQuestions([]);
		recapState.setRecaps([]);
	}, [fetchTarget]);

	switch (fetchTarget) {
		case "review":
			return {
				score: classScore,
				handleFetching: {
					ReviewsAndClass: reviewState.handleFetchingReviewsAndClass,
					QuestionsAndClass: questionState.handleFetchingQuestionsAndClass,
					RecapsAndClass: recapState.handleFetchingRecapsAndClass,
				},
				...reviewState,
			};
		case "question":
			return {
				score: classScore,
				handleFetching: {
					ReviewsAndClass: reviewState.handleFetchingReviewsAndClass,
					QuestionsAndClass: questionState.handleFetchingQuestionsAndClass,
					RecapsAndClass: recapState.handleFetchingRecapsAndClass,
				},
				...questionState,
			};
		case "recap":
			return {
				score: classScore,
				handleFetching: {
					ReviewsAndClass: reviewState.handleFetchingReviewsAndClass,
					QuestionsAndClass: questionState.handleFetchingQuestionsAndClass,
					RecapsAndClass: recapState.handleFetchingRecapsAndClass,
				},
				...recapState,
			};
		default:
			return null;
	}
};

export default useFetcherClass;
