import { useEffect, useState } from "preact/hooks";
import useQuestionFetcher from "./useQuestionFetcher";
import useReviewFetcher from "./useReviewFetcher";

const useFetcherClass = (props) => {
	const { fetchTarget }  = props
	const [loadMore, setLoadMore] = useState(true);

	useEffect(() => {
		setLoadMore(true)
	}, [fetchTarget])
	
	const reviewState = useReviewFetcher({ loadMore, setLoadMore, ...props})
	const questionState = useQuestionFetcher({ loadMore, setLoadMore, ...props})

	switch (fetchTarget) {
		case "review":
			return { loadMore, ...reviewState}
		case "question":
			return { loadMore, ...questionState}
		default:
			return null
	}
};

export default useFetcherClass;
