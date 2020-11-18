import App from "./app";
import withStyledComponentSSR from "./HOC/withStyledComponentSSR";

// export default function (initData){
    // return withStyledComponentSSR(<App initData={initData} />);
// }

export default withStyledComponentSSR(App);

// if (typeof window !== "undefined")
//   render(
//     withStyledComponentSSR(<App />),
//     document.body,
//     document.getElementById("app")
//   );

// export default App;
