import { h, createContext } from "preact";
import useFetcher from "../hooks/useFetcher";

const FetcherContext = createContext();

const FetcherProvider = (props) => {
  const state = useFetcher(props);

  return (
    <FetcherContext.Provider
      value={{
        ...state,
      }}
    >
      {props.children}
    </FetcherContext.Provider>
  );
};
export { FetcherContext, FetcherProvider };
