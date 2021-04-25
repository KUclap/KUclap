import { h, createContext } from "preact";
import useQuestionFetcher from "../hooks/useQuestionFetcher";

const QuestionFetcherContext = createContext();

const QuestionFetcherProvider = (props) => {
	const state = useQuestionFetcher(props);
	return (
		<QuestionFetcherContext.Provider
			value={{
				...state,
			}}
		>
			{props.children}
		</QuestionFetcherContext.Provider>
	);
};
export { QuestionFetcherContext, QuestionFetcherProvider };
