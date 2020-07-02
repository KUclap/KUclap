import { h, render } from "preact";
import App from "./app";
import withStyledComponentSSR from "./HOC/withStyledComponentSSR";
// import withClasses from "./HOC/withClasses";

// export default withStyledComponentSSR(App);

if (typeof window !== "undefined")
  render(
    withStyledComponentSSR(<App />),
    document.body,
    document.getElementById("app")
  );
