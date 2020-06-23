import { h, render } from "preact";
import App from "./components/app";
import wrap from "./components/utillity/styled-components-ssr";
// export default App;
if (typeof window !== "undefined")
  render(wrap(<App />), document.body, document.getElementById("app"));
