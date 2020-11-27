export const SitemapTemplate = (classes) =>  (`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${classes.map(({ classId }) => {
            return `
                    <url>
                        <loc>https://www.kuclap.com/${classId}</loc>
                        <changefreq>monthly</changefreq>
                    </url>
                `;
          })
          .join("")}
    </urlset>
    `);