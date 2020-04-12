import "./style";
import { h } from "preact";
import App from "./components/app";

const HOChelmet = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&display=swap"
        rel="stylesheet"
      />
      <App />
    </>
  );
};

export default HOChelmet;
