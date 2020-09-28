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

let templateClassPage = readFileSync("./build/class/index.html", "utf8");
const template = readFileSync("./build/index.html", "utf8");
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
                        <loc>https://kuclap.com/${classId}</loc>
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

function replaceMetaOnTemplate(detailClass) {
  templateClassPage = templateClassPage.replace(
    /\{CLASS_ID\}/g,
    detailClass.classId
  );
  templateClassPage = templateClassPage.replace(
    /\{CLASS_NAME_TH\}/g,
    detailClass.nameTh
  );
  templateClassPage = templateClassPage.replace(
    /\{CLASS_NAME_EN\}/g,
    detailClass.nameEn
  );
  templateClassPage = templateClassPage.replace(
    /\{CLASS_LABEL\}/g,
    detailClass.label
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
    if (validatorClassId(classID)) {
      try {
        const response = await axios.get(
          `${process.env.URL_API}/class/${classID}`
        );
        detailClass = response.data;
        replaceMetaOnTemplate(detailClass);
        let body = render(h(App, { url: req.url }));
        res.setHeader("Content-Type", "text/html");
        res.end(templateClassPage.replace(RGX, body));
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

polka()
  .use(compression)
  .use(sirv("build", { setHeaders }))
  .get("/sitemap", SitemapEndpoint)
  .get("/:classID", ApplicationEndpoint)
  .get("/form/create/:classID", ApplicationEndpoint)
  .listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
  });
