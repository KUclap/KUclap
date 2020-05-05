import { h, Component } from "preact";
import { Router } from "preact-router";
import baseroute from "../baseroute";
import { ThemeProvider } from "styled-components";
import * as themes from "../assets/themes";
// Code-splitting is automated for routes
import Home from "../routes/Home";

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  constructor(props) {
    super(props);

    let theme = "light";
    if (Object.keys(themes).includes(localStorage.theme)) theme = localStorage.theme;
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) theme = "dark";

    this.state = {
      theme
    };
  }

  toggleTheme = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState(prev => {
      const newTheme = prev.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    });
  };

  handleRoute = (e) => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <ThemeProvider theme={themes[this.state.theme]}>
        <Router onChange={this.handleRoute}>
          <Home path={`${baseroute}/`} classid="main" toggleTheme={this.toggleTheme} />
          {/* <Home path={`${baseroute}/:classid`} /> */}
        </Router>
      </ThemeProvider>
    );
  }
}
