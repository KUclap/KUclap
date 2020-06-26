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
    if (typeof window !== "undefined")
      window.addEventListener("scroll", () => {
        if (adaptor?.getBoundingClientRect().bottom <= window.innerHeight) {
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
    if (typeof window !== "undefined")
      if (adaptor?.clientHeight <= window.innerHeight && adaptor.clientHeight) {
        setLoadMore(true);
      }
  }, [reviews]);

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
  };
};

export default useReviewFetcherClass;
