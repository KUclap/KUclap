import { useState, useEffect } from "preact/hooks";
import APIs from "../components/utility/apis";

const useEngage = (reviewId, callback) => {
  const [actioning, setActioning] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [counter, setCounter] = useState(0);
  const [prevCounter, setPrevCounter] = useState(0);
  const [timeId, setTimeId] = useState(null);

  useEffect(() => {
    if (counter !== 0) setActionByKey();
  }, [counter]);

  const handleActionClick = () => {
    if (!actioning) {
      setAnimation(true);
      setCounter(counter + 1);
    }
  };

  const setActionByKey = () => {
    if (timeId !== null) clearTimeout(timeId);
    const timer = () =>
      setTimeout(() => {
        setActioning(true);
        if (callback) {
          // This callback for change APIs URL or Method's Fetcher.
          // At caller eg. ... = useEngage(reviewId, APIs.someMethod)
          callback(reviewId, counter - prevCounter, () => {
            setActioning(false);
            setPrevCounter(counter);
          });
        } else {
          APIs.putClapReviewByReviewId(reviewId, counter - prevCounter, () => {
            setActioning(false);
            setPrevCounter(counter);
          });
        }

        setTimeId(null);
      }, 1500);
    const id = timer();
    setTimeId(id);

    setTimeout(() => {
      setAnimation(false);
    }, 500);
  };

  return { counter, prevCounter, animation, handleActionClick };
};

export default useEngage;
