import { useContext, useEffect, useState } from "preact/hooks";
import APIs from "../components/utility/apis";
import { SelectContext } from "../context/SelectContext";

const useQuestionFetcherClass = ({ loadMore, setLoadMore, classID, fetchTarget }) => {
	// ### Define states for review fetching
	const isMatchFetchTarget = (fetchTarget === "question")
	const { dispatch: dispatchSelected } = useContext(SelectContext);
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [underflow, setUnderFlow] = useState(false);
	const [paging, setPaging] = useState({
		page: 0,
		offset: 5,
	});

	// ### Lifecycle for handle fetching
	useEffect(() => {
		// Fetching detail of class that class selected.
		if (isMatchFetchTarget) {
			if (classID)
				APIs.getClassDetailByClassId(classID, (res) => {
					dispatchSelected({
						type: "selected",
						value: { label: res.data.label, classID: res.data.classId },
					});
				});
	
			const adaptor = document.getElementById("adaptor-question");
			if (adaptor && typeof window !== "undefined") {
				window.addEventListener("scroll", () => {
					if (adaptor.getBoundingClientRect().bottom <= window.innerHeight) {
						if (!loading) {
							setLoadMore(true);
						}
					}
				});
			}
		}
	}, []);

	// Fetch questions when loadMore change.
	useEffect(() => {
		if (isMatchFetchTarget) {
			if (!underflow && !loading && loadMore) {
				setLoading(true);
				// fetch questions by class id : class Page
				APIs.getQuestionsByClassId(classID, paging.page, paging.offset, (res) => {
					const { data } = res;
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
		}
	}, [loadMore]);

	// loading and fetch more when review a few.
	useEffect(() => {
		const adaptor = document.getElementById("adaptor-question");
		if (adaptor && typeof window !== "undefined")
			if (adaptor?.clientHeight <= window.innerHeight) {
				setLoadMore(true);
			}
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
		setLoading,
		underflow,
		setUnderFlow,
		paging,
		setPaging,
		handleFetchingQuestionsAndClass,
		handleCardDeleted,
	};
};

export default useQuestionFetcherClass;
