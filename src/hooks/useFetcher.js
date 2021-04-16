import { useContext, useEffect, useState } from "preact/hooks";
import useQuestionFetcher from "./useQuestionFetcher";
import useReviewFetcher from "./useReviewFetcher";
import APIs from "../components/utility/apis";
import { SelectContext } from "../context/SelectContext";

const useFetcherClass = (props) => {
	const { classID, fetchTarget }  = props
	const { dispatch: dispatchSelected } = useContext(SelectContext);
	// const [loading, setLoading] = useState(false)
	// const [loadMore, setLoadMore] = useState(true);
	// const [underflow, setUnderFlow] = useState(false);
	const [classScore, setClassScore] = useState({
		homework: 0,
		interest: 0,
		how: 0,
	});

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
	}, [])

	const { score, ...reviewState } = useReviewFetcher({ 
		// loading, 
		// setLoading,
		// loadMore, 
		// setLoadMore, 
		// underflow, setUnderFlow,
		...props
	})

	const questionState = useQuestionFetcher({ 
		// loading, 
		// setLoading,
		// loadMore, 
		// setLoadMore, 
		// underflow, setUnderFlow,
		...props
	})

	switch (fetchTarget) {
		case "review":
			return { 
				score: classScore,
				// loading,
				// loadMore, 
				// underflow,
				// setUnderFlow,
				...reviewState
			}
		case "question":
			return { 
				score: classScore,
				// loading,
				// loadMore, 
				// underflow,
				// setUnderFlow,
				handleFetchingReviewsAndClass: reviewState.handleFetchingReviewsAndClass, 
				...questionState
			}
		default:
			return null
	}
};

export default useFetcherClass;
