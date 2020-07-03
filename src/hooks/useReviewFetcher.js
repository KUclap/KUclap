import { useContext, useEffect, useState } from "preact/hooks";
import APIs from "../components/utility/apis";
import { SelectContext } from "../context/SelectContext";

const useReviewFetcherClass = ({ classID }) => {
  // ### Define states for review fetching
  const { dispatch: dispatchSelected } = useContext(SelectContext);
  const [reviews, setReviews] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [underflow, setUnderFlow] = useState(false);
  const [paging, setPaging] = useState({
    page: 0,
    offset: 5,
  });
  const [score, setScore] = useState({
    homework: 0,
    interest: 0,
    how: 0,
  });

  // ### Lifecycle for handle fetching
  useEffect(() => {
    // Fetching detail of class that class selected.
    if (classID)
      APIs.getClassDetailByClassId(classID, (res) => {
        dispatchSelected({
          type: "selected",
          value: { label: res.data.label, classID: res.data.classId },
        });

        setScore({
          homework: res.data.stats.homework,
          interest: res.data.stats.interest,
          how: res.data.stats.how,
        });
      });

    const adaptor = document.getElementById("adaptor");
    if (adaptor && typeof window !== "undefined")
      window.addEventListener("scroll", () => {
        if (adaptor.getBoundingClientRect().bottom <= window.innerHeight) {
          if (!loading) {
            setLoadMore(true);
          }
        }
      });
  }, []);

  // Fetch reviews when loadMore change.
  useEffect(() => {
    if (!underflow && !loading && loadMore) {
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
          }
          setLoading(false);
        });
      }
    }
    setLoadMore(false);
  }, [loadMore]);

  // loading and fetch more when review a few.
  useEffect(() => {
    const adaptor = document.getElementById("adaptor");
    if (adaptor && typeof window !== "undefined")
      if (adaptor.clientHeight <= window.innerHeight && adaptor.clientHeight) {
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
      default:
        break;
    }
  };

  return {
    reviews,
    setReviews,
    loadMore,
    setLoadMore,
    loading,
    setLoading,
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
