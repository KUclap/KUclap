import { h, createContext } from "preact";
import { useReducer, useEffect } from "preact/hooks";

let reducer = (state, action) => {
  switch (action.type) {
    case "selected":
      return { label: action.value.label, classID: action.value.classID };
    case "change_label":
      return { ...state, label: action.value.label };
    case "change_classID":
      return { ...state, classID: action.value.classID };
    default:
      return;
  }
};

const initialState = { label: "กำลังโหลดข้อมูลวิชา...", classID: "" };
const SelectContext = createContext(initialState);

const SelectProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getFocusWithoutScrolling = () => {
    if (
      document.activeElement &&
      document.activeElement.blur &&
      typeof document.activeElement.blur === "function"
    ) {
      document.activeElement.blur();
    }
  };

  useEffect(() => {
    getFocusWithoutScrolling();
  }, [state]);

  return (
    <SelectContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SelectContext.Provider>
  );
};
export { SelectContext, SelectProvider };
