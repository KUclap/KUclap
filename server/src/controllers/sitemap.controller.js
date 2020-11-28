import APIs from '../adapters/fetcher.adapter'

import { SitemapTemplate } from '../data/sitemap.template'

const SitemapService = async (req, res) => {
    try {
        
        APIs.getAllClasses((resClass) => {
            const sitemap = SitemapTemplate(resClass.data)
            res.setHeader("Content-Type", "text/xml");
            res.write(sitemap);
            res.end();
        })

    } catch (error) {
      res.setHeader("Content-Type", "text/html");
      res.end(`ERROR: Fetching from daatabase`);
    }
}  

export default SitemapService