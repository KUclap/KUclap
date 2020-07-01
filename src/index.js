// import { h, render } from "preact";
import App from "./app";
import withStyledComponentSSR from "./HOC/withStyledComponentSSR";
import withClasses from "./HOC/withClasses";

export default withStyledComponentSSR(withClasses(App));

// if (typeof window !== "undefined")
//   render(wrap(<App />), document.body, document.getElementById("app"));
