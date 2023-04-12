import { h, createContext } from "preact";
import useFetcher from "../hooks/useFetcher";
import { Alert } from "@mui/material";

const FetcherContext = createContext();

const FetcherProvider = (props) => {
  const state = useFetcher(props);

  return (
    <FetcherContext.Provider
      value={{
        ...state,
      }}
    >
      <Alert severity="error">
        ขณะนี้ระบบกำลังขัดข้อง ทางเรากำลังแก้ไขอย่างเต็มที่ กรุณาลองใหม่อีกครั้งภายหลังนะคะ 😭
      </Alert>
      {props.children}
    </FetcherContext.Provider>
  );
};
export { FetcherContext, FetcherProvider };
