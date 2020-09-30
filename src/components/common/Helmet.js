import { h } from "preact";
import Helmet from "preact-helmet";

const HelmetComponent = ({ content }) => {
  return (
    <Helmet
      htmlAttributes={{ lang: "th", amp: undefined }} // amp takes no value
      title="KUclap"
      titleTemplate={content.title}
      defaultTitle="KUclap : เว็บไซต์ค้นหาและแบ่งปันรีวิววิชาบูรณาการ มก."
      titleAttributes={{ itemprop: "name", lang: "th" }}
      //base={{ target: "_blank", href: "https://www.kuclap.com/" }}
      meta={[
        // Robot
        // { name: "robots", content: "noindex" },
        // Primary Meta Tags
        { name: "title", content: `${content.title}` },
        { name: "description", content: `${content.description}` },
        // Open Graph / Facebook
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://www.kuclap.com/" },
        { property: "og:title", content: `KUclap - ${content.title}` },
        {
          property: "og:description",
          content: `${content.description}`,
        },
        { property: "og:image", content: content.image },
        // Twitter
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:url", content: "https://www.kuclap.com/" },
        { property: "twitter:title", content: `KUclap - ${content.title}` },
        {
          property: "twitter:description",
          content: `${content.description}`,
        },
        { property: "twitter:image", content: content.image },
      ]}
    />
  );
};

export default HelmetComponent;
