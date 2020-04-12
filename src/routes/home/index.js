import { h } from "preact";
import style from "./style";

const Home = () => (
  <div class={style.home} style={{ fontFamily: "Kanit" }}>
    <h1>Home</h1>
    <p>This is the Home component.</p>
  </div>
);

export default Home;
