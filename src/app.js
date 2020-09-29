import { h, Component } from "preact";
import { Router } from "preact-router";
import AsyncRoute from "preact-async-route";

import * as themes from "./assets/themes";
import baseroute from "./components/utility/baseroute";
import ClassPage from "./route/ClassPage";
import FormReviewCreatePage from "./route/FormReviewCreatePage";
import HomePage from "./route/HomePage";
import Provider from "./providers/AppProvider";

import withClasses from "./HOC/withClasses";

class App extends Component {
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
    this.currentUrl = e.url;
  };

  render() {
    const { classes } = this.props;
    return (
      // <>
      <div id="app">
        <Provider theme={themes[this.state.theme]} {...this.props}>
          <Router url={this.props.url} onChange={this.handleRoute}>
            <AsyncRoute
              path={`${baseroute}/`}
              toggleTheme={this.toggleTheme}
              component={HomePage}
              classes={classes}
            />
            <AsyncRoute
              path={`${baseroute}/:classID`}
              toggleTheme={this.toggleTheme}
              component={ClassPage}
              classes={classes}
            />
            <AsyncRoute
              path={`${baseroute}/form/create/:classID`}
              toggleTheme={this.toggleTheme}
              component={FormReviewCreatePage}
              classes={classes}
            />
          </Router>
        </Provider>
      </div>
      // </>
    );
  }
}

export default withClasses(App);
