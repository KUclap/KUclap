import { useEffect, useRef, useState } from "preact/hooks";

import APIs from "../components/utility/apis";

const useRecapFetcherClass = ({ classID, fetchTarget }) => {
	// ### Define states for review fetching
	const isMatchFetchTarget = (fetchTarget === "recap");
	const [isMounted, setIsMounted] = useState(false);
	const [recaps, setRecaps] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadMore, setLoadMore] = useState(true);
	const [underflow, setUnderFlow] = useState(false);
	const refIsMatchFetchTarget = useRef(isMatchFetchTarget);
	const [paging, setPaging] = useState({
		page: 0,
		offset: 5,
	});

	useEffect(() => {
		// reference on the props
		// We have to use ref instead state because eventlistener initial with context then the prop will not mutate when current state change
		// this useEffect use for pass value to the refernce then ref's value will change on the eventlistener
		refIsMatchFetchTarget.current = isMatchFetchTarget;
	}, [isMatchFetchTarget]);

	const scrollingListener = () => {
		const adaptor = document.getElementById("adaptor-recap");
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
			setLoadMore(true);
		}
	}, [isMatchFetchTarget]);

	// Fetch recaps when loadMore change.
	useEffect(() => {
		if (!underflow && !loading && loadMore) {
			if (isMatchFetchTarget) {
				setLoading(true);
				if (!classID) {
					// fetch reviews by last review : home page
					APIs.getLastRecaps(paging.page, paging.offset, (res) => {
						const { data } = res;
						if (!data) {
							setUnderFlow(true);
						} else {
							setPaging({ ...paging, page: paging.page + 1 });
							setRecaps([...recaps, ...data]);
						}
						setLoading(false);
					});
				} else {
					// fetch recaps by class id : class Page
					APIs.getRecapsByClassId(classID, paging.page, paging.offset, (res) => {
						const { data } = res;
						if (!data) {
							setUnderFlow(true);
						} else {
							setPaging({ ...paging, page: paging.page + 1 });
							setRecaps([...recaps, ...data]);
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
		const adaptor = document.getElementById("adaptor-recap");
		if (adaptor && typeof window !== "undefined") {
			if (adaptor?.clientHeight <= window.innerHeight && adaptor.clientHeight) {
				setLoadMore(true);
			}
		}
	}, [recaps]);

	// #### Helper function for manage on context.

	const handleFetchingrecapsAndClass = (classID) => {
		setPaging({ ...paging, page: 1 });
		setRecaps([]);
		setLoading(true);
		setUnderFlow(false);
		APIs.getRecapsByClassId(classID, 0, paging.offset, (res) => {
			if (res.data === null) {
				setUnderFlow(true);
			} else {
				setRecaps(res.data);
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
				// Q: Why didn't use handleFetchingrecapsAndClass function
				// A: handleFetchingrecapsAndClass use for fetching review when you need review and detail from some class.
				//    On Home page,you just make some interupt on loadMore state that loadMore state will fetching review on current page.
				//    This statement use for reset state and interupt on loadMore.
				setPaging({ ...paging, page: 0 });
				setRecaps([]);
				setUnderFlow(false);
				setLoadMore(true);
				break;
			}
			case "CLASS": {
				handleFetchingrecapsAndClass(classID);
				break;
			}
			case "REVIEW": {
				handleFetchingrecapsAndClass(classID);
				break;
			}
			default:
				break;
		}
	};

	return {
		recaps,
		setRecaps,
		loading,
		loadMore,
		underflow,
		setUnderFlow,
		paging,
		setPaging,
		handleFetchingrecapsAndClass,
		handleCardDeleted,
	};
};

export default useRecapFetcherClass;
