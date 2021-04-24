export const SitemapClassTemplate = (classes) => `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${classes
			.map(({ classId }) => {
				return `
					<url>
						<loc>https://www.kuclap.com/${classId}</loc>
						<changefreq>monthly</changefreq>
					</url>
				`;
			})
			.join("")}
	</urlset>
	`;

export const SitemapReviewTemplate = (reviews) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${reviews
			.map(({ reviewId }) => {
				return `
                    <url>
                        <loc>https://www.kuclap.com/review/${reviewId}</loc>
                        <changefreq>monthly</changefreq>
                    </url>
                `;
			})
			.join("")}
    </urlset>
    `;
