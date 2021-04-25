import { useEffect, useRef, useState } from "preact/hooks";

import APIs from "../components/utility/apis";

const useQuestionFetcherClass = ({ classID, fetchTarget }) => {
	// ### Define states for review fetching
	const isMatchFetchTarget = fetchTarget === "question";
	const [isMounted, setIsMounted] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadMore, setLoadMore] = useState(true);
	const [underflow, setUnderFlow] = useState(false);
	const refIsMatchFetchTarget = useRef(isMatchFetchTarget);
	const [paging, setPaging] = useState({
		page: 0,
		offset: 5,
	});
	// console.log(underflow, loading, loadMore);
	useEffect(() => {
		// reference on the props
		// We have to use ref instead state because eventlistener initial with context then the prop will not mutate when current state change
		// this useEffect use for pass value to the refernce then ref's value will change on the eventlistener
		refIsMatchFetchTarget.current = isMatchFetchTarget;
	}, [isMatchFetchTarget]);

	const scrollingListener = () => {
		const adaptor = document.getElementById("adaptor-question");
		if (adaptor && refIsMatchFetchTarget.current) {
			if (adaptor.getBoundingClientRect().bottom <= window.innerHeight) {
				if (!loading) {
					setLoadMore(true);
				}
			}
		}
	};

	// ### Lifecycle for handle fetching
	useEffect(() => {
		// Fetching detail of class that class selected.
		// isMounted is state for checking that eventlistener called then use interupt state for fetching.
		if (!isMounted) {
			if (typeof window !== "undefined") {
				if (!isMounted) setIsMounted(true); // call one time.
				window.addEventListener("scroll", scrollingListener, { passive: true });
			}
		} else if (isMatchFetchTarget) {
			// setLoadMore(true);
			setPaging({ ...paging, page: 0 });
			setQuestions([]);
			setLoading(false);
			setUnderFlow(false);
			setLoadMore(true);
		}
	}, [isMatchFetchTarget]);

	// Fetch questions when loadMore change.
	useEffect(() => {
		if (!underflow && !loading && loadMore) {
			if (isMatchFetchTarget) {
				setLoading(true);
				if (!classID) {
					// fetch questions by last review : home page
					APIs.getLastQuestions(paging.page, paging.offset, (res) => {
						const { data } = res;
						if (!data) {
							setUnderFlow(true);
						} else {
							setPaging({ ...paging, page: paging.page + 1 });
							setQuestions([...questions, ...data]);
							// if (data.length !== paging.offset) setUnderFlow(true);
						}
						setLoading(false);
					});
				} else {
					// fetch questions by class id : class Page
					APIs.getQuestionsByClassId(classID, paging.page, paging.offset, (res) => {
						const { data } = res;
						if (!data) {
							setUnderFlow(true);
						} else {
							setPaging({ ...paging, page: paging.page + 1 });
							setQuestions([...questions, ...data]);
							// if (data.length !== paging.offset) setUnderFlow(true);
						}
						setLoading(false);
					});
				}
			}
		}
		setLoadMore(false);
	}, [loadMore]);

	// loading and fetch more when review a few.
	useEffect(() => {
		// const adaptor = document.getElementById("adaptor-question");
		// if (adaptor && typeof window !== "undefined") {
		// 	if (adaptor?.clientHeight <= window.innerHeight && adaptor?.clientHeight) {
		if (!underflow && !loadMore && !loading && questions.length < paging.offset) {
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
				// setUnderFlow(false);
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
