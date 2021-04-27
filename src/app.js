import { Component, h } from "preact";
// import AsyncRoute from "preact-async-route";
import { Router } from "preact-router";

import * as themes from "./assets/themes";
import baseroute from "./components/utility/baseroute";
import GlobalComponent from "./components/utility/GlobalComponent";
import withClasses from "./HOC/withClasses";
import Provider from "./providers/AppProvider";
import ClassPage from "./routes/ClassPage";
import FormReviewCreatePage from "./routes/FormReviewCreatePage";
import HomePage from "./routes/HomePage";
import ReviewPage from "./routes/ReviewPage";

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
				theme = localStorage.getItem("theme");
			} else if (
				typeof window !== "undefined" &&
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches
			) {
				theme = "dark";
			}
		this.state = {
			theme,
			global: (typeof window !== "undefined" && window?.__GLOBAL_STATE__) || null,
		};
	}

	toggleTheme = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.setState((prev) => {
			const newTheme = prev.theme === "dark" ? "light" : "dark";
			if (typeof window !== "undefined") localStorage.setItem("theme", newTheme);
			return { theme: newTheme };
		});
	};

	handleRoute = (e) => {
		this.currentUrl = e.url;
	};

	render() {
		const { classes, currentClass, currentReview } = this.props;

		return (
			<div id="app">
				<Provider theme={themes[this.state.theme]} {...this.props}>
					<GlobalComponent />
					<Router url={this.props.url} onChange={this.handleRoute}>
						<HomePage path={`${baseroute}/`} toggleTheme={this.toggleTheme} classes={classes} />
						<ClassPage path={`${baseroute}/:classID`} toggleTheme={this.toggleTheme} classes={classes} />
						<FormReviewCreatePage
							path={`${baseroute}/form/create/:classID`}
							toggleTheme={this.toggleTheme}
							classes={classes}
						/>
						<ReviewPage
							path={`${baseroute}/review/:reviewID`}
							toggleTheme={this.toggleTheme}
							classes={classes}
							currentReview={
								currentReview || (typeof window !== "undefined" && this.state.global?.currentReview)
							}
							currentClass={
								currentClass || (typeof window !== "undefined" && this.state.global?.currentClass)
							}
						/>
						{/* <AsyncRoute
							path={`${baseroute}/`}
							toggleTheme={this.toggleTheme}
							// component={HomePage}
							getComponent={() => import("./routes/HomePage").then((module) => module.default)}
							classes={classes}
						/>
						<AsyncRoute
							path={`${baseroute}/:classID`}
							toggleTheme={this.toggleTheme}
							// component={ClassPage}
							getComponent={() => import("./routes/ClassPage").then((module) => module.default)}
							classes={classes}
						/>
						<AsyncRoute
							path={`${baseroute}/form/create/:classID`}
							toggleTheme={this.toggleTheme}
							// component={FormReviewCreatePage}
							getComponent={() =>
								import("./routes/FormReviewCreatePage").then((module) => module.default)
							}
							classes={classes}
						/>
						<AsyncRoute
							path={`${baseroute}/review/:reviewID`}
							toggleTheme={this.toggleTheme}
							// component={ReviewPage}
							getComponent={() => import("./routes/ReviewPage").then((module) => module.default)}
							classes={classes}
							currentReview={
								currentReview || (typeof window !== "undefined" && this.state.global?.currentReview)
							}
							currentClass={
								currentClass || (typeof window !== "undefined" && this.state.global?.currentClass)
							}
						/> */}
					</Router>
				</Provider>
			</div>
		);
	}
}

export default withClasses(App);
