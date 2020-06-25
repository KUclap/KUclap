import { h, createContext } from "preact";
import useReviewFetcher from "../hooks/useReviewFetcher";

const ReviewFetcherContext = createContext();

const ReviewFetcherProvider = (props) => {
  const state = useReviewFetcher(props);

  return (
    <ReviewFetcherContext.Provider
      value={{
        ...state,
      }}
    >
      {props.children}
    </ReviewFetcherContext.Provider>
  );
};
export { ReviewFetcherContext, ReviewFetcherProvider };
