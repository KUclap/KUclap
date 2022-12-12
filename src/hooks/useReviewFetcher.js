import { useEffect, useRef, useState } from "preact/hooks";

import APIs from "../components/utility/apis";

const useReviewFetcherClass = ({ classID, fetchTarget }) => {
	// ### Define states for review fetching
	const isMatchFetchTarget = fetchTarget === "review";
	const [isMounted, setIsMounted] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadMore, setLoadMore] = useState(true);
	const [underflow, setUnderFlow] = useState(false);
	const refIsMatchFetchTarget = useRef(isMatchFetchTarget);
	const [score, setScore] = useState({
		homework: 0,
		interest: 0,
		how: 0,
	});
	const [paging, setPaging] = useState({
		page: 0,
		offset: 20,
	});

	useEffect(() => {
		// reference on the props
		// We have to use ref instead state because eventlistener initial with context then the prop will not mutate when current state change
		// this useEffect use for pass value to the refernce then ref's value will change on the eventlistener
		refIsMatchFetchTarget.current = isMatchFetchTarget;
	}, [isMatchFetchTarget]);

	const scrollingListener = () => {
		const adaptor = document.getElementById("adaptor");
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
			setReviews([]);
			setUnderFlow(false);
			setLoadMore(true);
		}
	}, [isMatchFetchTarget]);

	// Fetch reviews when loadMore change.
	useEffect(() => {
		if (!underflow && !loading && loadMore) {
			if (isMatchFetchTarget) {
				setLoading(true);
				if (!classID) {
					// fetch reviews by last review : home page
					APIs.getLastReviews(paging.page, paging.offset, (res) => {
						const { data } = res;
						if (!data) {
							setUnderFlow(true);
						} else {
							setPaging({ ...paging, page: paging.page + 1 });
							setReviews([...reviews, ...data]);
							// if (data.length !== paging.offset) setUnderFlow(true);
						}
						setLoading(false);
					});
				} else {
					// fetch reviews by class id : class Page
					APIs.getReviewsByClassId(classID, paging.page, paging.offset, (res) => {
						const { data } = res;
						if (!data) {
							setUnderFlow(true);
						} else {
							setPaging({ ...paging, page: paging.page + 1 });
							setReviews([...reviews, ...data]);
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
		// const adaptor = document.getElementById("adaptor");
		// if (adaptor && typeof window !== "undefined") {
		// 	if (adaptor?.clientHeight <= window.innerHeight && adaptor?.clientHeight) {
		// 		setLoadMore(true);
		// 	}
		// }
		if (!underflow && !loadMore && !loading && reviews.length < paging.offset) {
			setLoadMore(true);
		}
	}, [reviews]);

	// #### Helper function for manage on context.

	const handleFetchingReviewsAndClass = (classID) => {
		setPaging({ ...paging, page: 1 });
		setReviews([]);
		setLoading(true);
		setUnderFlow(false);
		APIs.getReviewsByClassId(classID, 0, paging.offset, (res) => {
			if (res.data === null) {
				setUnderFlow(true);
			} else {
				setReviews(res.data);
				setUnderFlow(false);
			}
			setLoading(false);
		});

		APIs.getClassDetailByClassId(classID, (res) => {
			setScore({
				homework: res.data.stats.homework,
				interest: res.data.stats.interest,
				how: res.data.stats.how,
			});
		});
	};

	const handleCardDeleted = (currentRoute, classID = null) => {
		// Each page will pass currentRoute's prop on ReviewCard's component.
		// currentRoute's prop use for tracking ReviewCard's component mountinhg what route.
		switch (currentRoute) {
			case "HOME": {
				// Q: Why didn't use handleFetchingReviewsAndClass function
				// A: handleFetchingReviewsAndClass use for fetching review when you need review and detail from some class.
				//    On Home page,you just make some interupt on loadMore state that loadMore state will fetching review on current page.
				//    This statement use for reset state and interupt on loadMore.
				setPaging({ ...paging, page: 0 });
				setReviews([]);
				setUnderFlow(false);
				setLoadMore(true);
				break;
			}
			case "CLASS": {
				handleFetchingReviewsAndClass(classID);
				break;
			}
			case "REVIEW": {
				handleFetchingReviewsAndClass(classID);
				break;
			}
			default:
				break;
		}
	};

	return {
		reviews,
		setReviews,
		loading,
		loadMore,
		underflow,
		setUnderFlow,
		paging,
		setPaging,
		score,
		setScore,
		handleFetchingReviewsAndClass,
		handleCardDeleted,
	};
};

export default useReviewFetcherClass;
