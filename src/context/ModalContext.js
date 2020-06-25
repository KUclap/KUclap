import { h, createContext } from "preact";
import { useReducer } from "preact/hooks";

let reducer = (state, action) => {
  switch (action.type) {
    case "setter":
      return { ...state, showModal: action.value };
    case "toggle":
      return { ...state, showModal: !state.showModal };
    case "open":
      return { ...state, showModal: true };
    case "close":
      return { ...state, showModal: false };
    default:
      return;
  }
};

const initialState = { showModal: false };
const ModalContext = createContext(initialState);

const ModalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ModalContext.Provider>
  );
};
export { ModalContext, ModalProvider };
