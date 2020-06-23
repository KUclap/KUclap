import { h, Component } from "preact";
import { Router } from "preact-router";
import baseroute from "./components/utility/baseroute";
import { ThemeProvider } from "styled-components";
import * as themes from "./assets/themes";
import AsyncRoute from "preact-async-route";

import Home from "./route/Home";

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  constructor(props) {
    super(props);

    let theme = "light";
    if (typeof localStorage === "object")
      if (Object.keys(themes).includes(localStorage.theme)) {
        theme = localStorage.theme;
      } else if (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        theme = "dark";
      }
    this.state = {
      theme,
    };
  }

  toggleTheme = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((prev) => {
      const newTheme = prev.theme === "dark" ? "light" : "dark";
      if (typeof window !== "undefined")
        localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    });
  };

  handleRoute = (e) => {
    setTimeout(() => {
      this.setState({
        currentUrl: e.url,
      });
    }, 0);
  };

  render() {
    return (
      <ThemeProvider theme={themes[this.state.theme]}>
        <Router onChange={this.handleRoute}>
          <AsyncRoute
            path={`${baseroute}/`}
            classid="main"
            toggleTheme={this.toggleTheme}
            component={Home}
          />
        </Router>
      </ThemeProvider>
    );
  }
}
