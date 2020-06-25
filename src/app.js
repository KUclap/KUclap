import { h, Component } from "preact";
import { Router } from "preact-router";
import baseroute from "./components/utility/baseroute";
import { ThemeProvider } from "styled-components";
import * as themes from "./assets/themes";
import AsyncRoute from "preact-async-route";

import { SelectProvider } from "./context/SelectContext";
import { ModalProvider } from "./context/ModalContext";

import HomePage from "./route/HomePage";
import ClassPage from "./route/ClassPage";
import FormReviewCreatePage from "./route/FormReviewCreatePage";
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
      <ModalProvider>
        <SelectProvider>
          <ThemeProvider theme={themes[this.state.theme]}>
            <Router onChange={this.handleRoute}>
              <AsyncRoute
                path={`${baseroute}/`}
                toggleTheme={this.toggleTheme}
                component={HomePage}
              />
              <AsyncRoute
                path={`${baseroute}/:classID`}
                toggleTheme={this.toggleTheme}
                component={ClassPage}
              />
              <AsyncRoute
                path={`${baseroute}/form/create/:classID`}
                toggleTheme={this.toggleTheme}
                component={FormReviewCreatePage}
              />
            </Router>
          </ThemeProvider>
        </SelectProvider>
      </ModalProvider>
    );
  }
}
