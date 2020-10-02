const dotenv = require("dotenv");
const axios = require("axios");
const sirv = require("sirv");
const polka = require("polka");
const { h } = require("preact");
const { basename } = require("path");
const { readFileSync } = require("fs");
const compression = require("compression")();
const render = require("preact-render-to-string");
const bundle = require("./build/ssr-build/ssr-bundle");

const App = bundle.default;

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const { PORT = 8000 } = process.env;

const template = { html: readFileSync("./build/index.html", "utf8") };
const RGX = /<div id="app"[^>]*>.*?(?=<script)/i;

function setHeaders(res, file) {
  let cache =
    basename(file) === "sw.js"
      ? "private,no-cache"
      : "public,max-age=31536000,immutable";
  res.setHeader("Cache-Control", cache); // don't cache service worker file
}

async function SitemapEndpoint(req, res) {
  try {
    const { data: classes } = await axios.get(`${process.env.URL_API}/classes`);
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
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
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  } catch (error) {
    res.setHeader("Content-Type", "text/html");
    res.end(`ERROR: Fetching from daatabase`);
  }
}

function replaceMetaOnClassTemplate(templateClassPage, detailClass) {
  templateClassPage.html = templateClassPage.html.replace(
    /\{CLASS_ID\}/g,
    detailClass.classId
  );
  templateClassPage.html = templateClassPage.html.replace(
    /\{CLASS_NAME_TH\}/g,
    detailClass.nameTh
  );
  templateClassPage.html = templateClassPage.html.replace(
    /\{CLASS_NAME_EN\}/g,
    detailClass.nameEn.html
  );
  templateClassPage.html = templateClassPage.html.replace(
    /\{CLASS_LABEL\}/g,
    detailClass.label
  );
  templateClassPage.html = templateClassPage.html.replace(
    /\{CLASS_URL\}/g,
    `https://www.kuclap.com/${detailClass.classId}`
  );
}

function replaceMetaOnReviewTemplate(
  templateReviewPage,
  detailClass,
  detailReview
) {
  templateReviewPage.html = templateReviewPage.html.replace(
    /\{CLASS_ID\}/g,
    detailClass.classId
  );
  templateReviewPage.html = templateReviewPage.html.replace(
    /\{CLASS_NAME_TH\}/g,
    detailClass.nameTh
  );
  templateReviewPage.html = templateReviewPage.html.replace(
    /\{CLASS_NAME_EN\}/g,
    detailClass.nameEn
  );
  templateReviewPage.html = templateReviewPage.html.replace(
    /\{CLASS_LABEL\}/g,
    detailClass.label
  );
  templateReviewPage.html = templateReviewPage.html.replace(
    /\{REVIEW_URL\}/g,
    `https://www.kuclap.com/review/${detailReview.reviewId}`
  );
  templateReviewPage.html = templateReviewPage.html.replace(
    /\{REVIEW_TEXT\}/g,
    detailReview.text
  );
  templateReviewPage.html = templateReviewPage.html.replace(
    /\{REVIEW_AUTHOR\}/g,
    detailReview.author
  );
  templateReviewPage.html = templateReviewPage.html.replace(
    /\{REVIEW_IMAGE\}/g,
    `https://og-image.kuclap.com/${encodeURIComponent(
      detailReview.text
    )}.png?classId=${detailReview.classId}&classNameTH=${
      detailReview.classNameTH
    }`
  );
}

function validatorClassId(classID) {
  let reg = new RegExp("^[0-9]+$");
  if (classID.length === 8 && reg.test(classID)) return true;
  return false;
}

async function ApplicationEndpoint(req, res) {
  let detailClass;
  let { classID } = req.params;
  console.log("class-id from req :", classID);
  if (classID) {
    let templateClassPage = {
      html: readFileSync("./build/class/index.html", "utf8"),
    };
    if (validatorClassId(classID)) {
      try {
        const response = await axios.get(
          `${process.env.URL_API}/class/${classID}`
        );
        detailClass = response.data;
        replaceMetaOnClassTemplate(templateClassPage, detailClass);
        let body = render(h(App, { url: req.url }));
        res.setHeader("Content-Type", "text/html");
        res.end(templateClassPage.html.replace(RGX, body));
      } catch (error) {
        res.setHeader("Content-Type", "text/html");
        res.end(`ERROR: ${classID} is invalid classId.`);
      }
    } else {
      res.setHeader("Content-Type", "text/html");
      res.end(`ERROR: ${classID} is invalid classId.`);
    }
  } else {
    let body = render(h(App, { url: req.url }));
    res.setHeader("Content-Type", "text/html");
    res.end(template.replace(RGX, body));
  }
}

async function ReviewPageEndpoint(req, res) {
  let templateReviewPage = {
    html: readFileSync("./build/review/index.html", "utf8"),
  };
  let { reviewID } = req.params;
  console.log("review-id from req :", reviewID);
  if (reviewID) {
    try {
      const reviewResponse = await axios.get(
        `${process.env.URL_API}/review/${reviewID}`
      );
      const classResponse = await axios.get(
        `${process.env.URL_API}/class/${reviewResponse.data.classId}`
      );
      let detailReview = reviewResponse.data;
      let detailClass = classResponse.data;
      replaceMetaOnReviewTemplate(
        templateReviewPage,
        detailClass,
        detailReview
      );
      let body = render(h(App, { url: req.url }));
      res.setHeader("Content-Type", "text/html");
      res.end(templateReviewPage.html.replace(RGX, body));
    } catch (error) {
      let body = render(h(App, { url: req.url }));
      res.setHeader("Content-Type", "text/html");
      res.end(templateReviewPage.html.replace(RGX, body));
      // res.setHeader("Content-Type", "text/html");
      // res.end(`ERROR: ${reviewID} is invalid classId.`);
    }
  } else {
    res.setHeader("Content-Type", "text/html");
    res.end(`ERROR: ${reviewID} is invalid reviewId.`);
  }
}

polka()
  .use(compression)
  .use(sirv("build", { setHeaders }))
  .get("/sitemap", SitemapEndpoint)
  .get("/:classID", ApplicationEndpoint)
  .get("/review/:reviewID", ReviewPageEndpoint)
  .get("/form/create/:classID", ApplicationEndpoint)
  .listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
  });
