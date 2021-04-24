import APIs from "../adapters/fetcher.adapter";

import { SitemapReviewTemplate } from "../data/sitemap.template";

const SitemapService = async (req, res) => {
	try {
		APIs.getAllReviews((resClass) => {
			const sitemap = SitemapReviewTemplate(resClass.data);
			res.setHeader("Content-Type", "text/xml");
			res.write(sitemap);
			res.end();
		});
	} catch (error) {
		res.setHeader("Content-Type", "text/html");
		res.end(`ERROR: Fetching from daatabase`);
	}
};

export default SitemapService;
