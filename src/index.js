import App from "./app";
import withStyledComponentSSR from "./HOC/withStyledComponentSSR";

export default withStyledComponentSSR(App);

// if (typeof window !== "undefined")
//   render(
//     withStyledComponentSSR(<App />),
//     document.body,
//     document.getElementById("app")
//   );

// export default App;
