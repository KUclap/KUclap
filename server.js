// const { ServerStyleSheet, StyleSheetManager } = require("styled-components");
const sirv = require("sirv");
const polka = require("polka");
const { h } = require("preact");
const { basename } = require("path");
const { readFileSync } = require("fs");
const compression = require("compression")();
const render = require("preact-render-to-string");
const bundle = require("./build/ssr-build/ssr-bundle");

const App = bundle.default;
const { PORT = 3000 } = process.env;

// TODO: improve this?
const RGX = /<div id="app"[^>]*>.*?(?=<script)/i;
const template = readFileSync("build/index.html", "utf8");

function setHeaders(res, file) {
  let cache =
    basename(file) === "sw.js"
      ? "private,no-cache"
      : "public,max-age=31536000,immutable";
  res.setHeader("Cache-Control", cache); // don't cache service worker file
}

polka()
  .use(compression)
  .use(sirv("build", { setHeaders }))
  .get("*", (req, res) => {
    let body = render(h(App, { url: req.url }));
    // const sheet = new ServerStyleSheet();
    // let body = render(sheet.collectStyles(h(App, { url: req.url })));
    // const styleTags = sheet.getStyleTags(); // sheet.getStyleElement();
    // sheet.seal();
    res.setHeader("Content-Type", "text/html");
    console.log(template.replace(RGX, body));
    res.end(template.replace(RGX, body));
  })
  .listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
  });

//"use strict";

// const express = require("express");
// const { h } = require("preact");
// const renderToString = require("preact-render-to-string");
// const { App } = require("./src/components/app");
// const path = require("path");

// const app = express();

// app.use(express.static(path.join(__dirname, "dist")));

// app.listen(8080);

// app.get("*", (req, res) => {
//   const html = renderToString(h(App, { url: req.url }));

//   res.send(`
// <!DOCTYPE html>
// <html>
//     <body>
//         <div id="app">${html}</div>
//         <script src="./app.js"></script>
//     </body>
// </html>
//     `);
// });
