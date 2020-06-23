import { h, render } from "preact";
import App from "./app";
import wrap from "./components/utility/styled-components-ssr";

if (typeof window !== "undefined")
  render(wrap(<App />), document.body, document.getElementById("app"));
