import { h, Component } from "preact";
import { Router } from "preact-router";
import baseroute from "../baseroute";
// Code-splitting is automated for routes
import Home from "../routes/Home";

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */

  handleRoute = (e) => {
    setTimeout(() => {
      this.setState({
        currentUrl: e.url,
      });
    }, 0);
  };

  render() {
    return (
      <Router onChange={this.handleRoute}>
        <Home path={`${baseroute}/`} classid="main" />
        {/* <Home path={`${baseroute}/:classid`} /> */}
      </Router>
    );
  }
}
