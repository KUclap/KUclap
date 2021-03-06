// import "module-alias/register"
import { basename } from "path";
import compression from "compression";
import dotenv from "dotenv";
import polka from "polka";
import sirv from "sirv";
import ClassEndpoint from "./src/controllers/class.contoller";
import HomeEndpoint from "./src/controllers/home.controller";
import ReviewEndpoint from "./src/controllers/review.controller";
import SitemapClassEndpoint from "./src/controllers/sitemap.classes.controller";
import SitemapReviewEndpoint from "./src/controllers/sitemap.reviews.controller";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const { PORT, ENV_KU_CLAP } = process.env;

function setHeaders(res, file) {
	let cache =
		basename(file) === "sw-esm.js" || basename(file) === "sw.js"
			? "private,no-cache"
			: "public,max-age=31536000,immutable";
	res.setHeader("Cache-Control", cache); // don't cache service worker file
}

// function logging(req, res, next){
//   console.log("Request from client 🌟 : ", req.url)
//   next()
// }

polka()
	.use(compression())
	// .use(logging)
	.get("/sitemap", SitemapClassEndpoint)
	.get("/sitemap/reviews", SitemapReviewEndpoint)
	.get(/(\/robots\.txt|favicon\.ico)/i, sirv("build", { setHeaders }))
	.use("/static", sirv("build", { setHeaders }))
	.get("/", HomeEndpoint)
	.get("/:classID", ClassEndpoint)
	.get("/review/:reviewID", ReviewEndpoint)
	.get("/form/create/:classID", ClassEndpoint)
	.listen(process.env.PORT || PORT || 8000, (err) => {
		if (err) throw err;
		console.log(`> 🔧 Mode: ${ENV_KU_CLAP}`);
		console.log(`> 🚀 Running on localhost:${PORT}`);
	});
