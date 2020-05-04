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
  
  state = {
    theme: "light"
  };

  componentDidMount() {
    if (Object.keys(themes).includes(localStorage.theme)) this.setState({ theme: localStorage.theme });
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.setState({ theme: "dark" });
      localStorage.setItem("theme", "dark");
    }
  };

  toggleTheme = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState(prev => {
      if (prev.theme === "dark") return { theme: "light" };
      else return { theme: "dark" };
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
