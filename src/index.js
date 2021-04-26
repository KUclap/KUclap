import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";
import "react-virtualized/styles.css";

import "./assets/css/style.css";

import App from "./app";
import withStyledComponentSSR from "./HOC/withStyledComponentSSR";

export default withStyledComponentSSR(App);
