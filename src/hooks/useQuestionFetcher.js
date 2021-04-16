import { useEffect, useState } from "preact/hooks";
import APIs from "../components/utility/apis";

const useQuestionFetcherClass = ({ classID, fetchTarget }) => {
	// ### Define states for review fetching
	const isMatchFetchTarget = (fetchTarget === "question")
	console.log("tab question: ", isMatchFetchTarget)
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(false)
	const [loadMore, setLoadMore] = useState(true);
	const [underflow, setUnderFlow] = useState(false);
	const [paging, setPaging] = useState({
		page: 0,
		offset: 5,
	});

	console.log(!underflow , !loading , loadMore)
	// ### Lifecycle for handle fetching
	useEffect(() => {
		console.log("mounted", isMatchFetchTarget)

		// Fetching detail of class that class selected.
			const adaptor = document.getElementById("adaptor-question");
			if (adaptor && typeof window !== "undefined") {
				console.log("adapter detail: ", adaptor.getBoundingClientRect().bottom, window.innerHeight)
				window.addEventListener("scroll", () => {
					console.log("Question / did mount listener: ", isMatchFetchTarget)
					if(isMatchFetchTarget)
						if (adaptor.getBoundingClientRect().bottom <= window.innerHeight) {
							if (!loading) {
								setLoadMore(true);
							}
						}
				});
			}

	}, [isMatchFetchTarget]);

	// useEffect(() => {
	// 	if(isMatchFetchTarget)
	// 		setLoadMore(true);
	// }, [isMatchFetchTarget])

	// Fetch questions when loadMore change.
	useEffect(() => {
		console.log("loadmore active", loadMore, isMatchFetchTarget,"state: " ,!underflow , !loading , loadMore)
		// if (isMatchFetchTarget) {
			if (!underflow && !loading && loadMore) {
				setLoading(true);
				console.log("fetching..")

				// fetch questions by class id : class Page
				
					APIs.getQuestionsByClassId(classID, paging.page, paging.offset, (res) => {
						const { data } = res;
						console.log(data)
						if (!data) {
							setUnderFlow(true);
						} else {
							setPaging({ ...paging, page: paging.page + 1 });
							setQuestions([...questions, ...data]);
						}
						setLoading(false);
					});
				
			} 
			setLoadMore(false);
		// }
	}, [loadMore]);

	// loading and fetch more when review a few.
	useEffect(() => {
		// if (isMatchFetchTarget) {
			const adaptor = document.getElementById("adaptor-question");
			if (adaptor && typeof window !== "undefined") {
				if (adaptor?.clientHeight <= window.innerHeight && adaptor.clientHeight) {
					setLoadMore(true);
				}
			}
		// }
	}, [questions]);

	// #### Helper function for manage on context.

	const handleFetchingQuestionsAndClass = (classID) => {
		setPaging({ ...paging, page: 1 });
		setQuestions([]);
		setLoading(true);
		setUnderFlow(false);
		APIs.getQuestionsByClassId(classID, 0, paging.offset, (res) => {
			if (res.data === null) {
				setUnderFlow(true);
			} else {
				setQuestions(res.data);
				setUnderFlow(false);
			}
			setLoading(false);
		});
	};

	const handleCardDeleted = (currentRoute, classID = null) => {
		// Each page will pass currentRoute's prop on ReviewCard's component.
		// currentRoute's prop use for tracking ReviewCard's component mountinhg what route.
		switch (currentRoute) {
			case "HOME": {
				// Q: Why didn't use handleFetchingQuestionsAndClass function
				// A: handleFetchingQuestionsAndClass use for fetching review when you need review and detail from some class.
				//    On Home page,you just make some interupt on loadMore state that loadMore state will fetching review on current page.
				//    This statement use for reset state and interupt on loadMore.
				setPaging({ ...paging, page: 0 });
				setQuestions([]);
				setUnderFlow(false);
				setLoadMore(true);
				break;
			}
			case "CLASS": {
				handleFetchingQuestionsAndClass(classID);
				break;
			}
			case "REVIEW": {
				handleFetchingQuestionsAndClass(classID);
				break;
			}
			default:
				break;
		}
	};

	return {
		questions,
		setQuestions,
		loading,
		loadMore, 
		underflow,
		setUnderFlow,
		paging,
		setPaging,
		handleFetchingQuestionsAndClass,
		handleCardDeleted,
	};
};

export default useQuestionFetcherClass;
