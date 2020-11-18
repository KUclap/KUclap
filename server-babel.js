"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('module-alias/register');

var dotenv = require("dotenv");

var axios = require("axios");

var sirv = require("sirv");

var polka = require("polka");

var _require = require("preact"),
    h = _require.h;

var _require2 = require("path"),
    basename = _require2.basename;

var _require3 = require("fs"),
    readFileSync = _require3.readFileSync;

var compression = require("compression")();

var render = require("preact-render-to-string");

var bundle = require("./build/ssr-build/ssr-bundle"); // const AppDOM = require('./src/index')
// const prepass = require('preact-ssr-prepass')


var App = bundle.default;
dotenv.config({
  path: ".env." + process.env.NODE_ENV
});
var _process$env$PORT = process.env.PORT,
    PORT = _process$env$PORT === void 0 ? 8000 : _process$env$PORT;
var template = {
  html: readFileSync("./build/index.html", "utf8")
};
var RGX = /<div id="app"[^>]*>.*?(?=<script)/i;

function setHeaders(res, file) {
  var cache = basename(file) === "sw.js" ? "private,no-cache" : "public,max-age=31536000,immutable";
  res.setHeader("Cache-Control", cache); // don't cache service worker file
}

function SitemapEndpoint(_x, _x2) {
  return _SitemapEndpoint.apply(this, arguments);
}

function _SitemapEndpoint() {
  _SitemapEndpoint = _asyncToGenerator(function* (req, res) {
    try {
      var _yield$axios$get = yield axios.get(process.env.URL_API + "/classes"),
          classes = _yield$axios$get.data;

      var sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n    <urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n        " + classes.map(function (_ref) {
        var classId = _ref.classId;
        return "\n                    <url>\n                        <loc>https://www.kuclap.com/" + classId + "</loc>\n                        <changefreq>monthly</changefreq>\n                    </url>\n                ";
      }).join("") + "\n    </urlset>\n    ";
      res.setHeader("Content-Type", "text/xml");
      res.write(sitemap);
      res.end();
    } catch (error) {
      res.setHeader("Content-Type", "text/html");
      res.end("ERROR: Fetching from daatabase");
    }
  });
  return _SitemapEndpoint.apply(this, arguments);
}

function replaceMetaOnClassTemplate(templateClassPage, detailClass) {
  templateClassPage.html = templateClassPage.html.replace(/\{CLASS_ID\}/g, detailClass.classId);
  templateClassPage.html = templateClassPage.html.replace(/\{CLASS_NAME_TH\}/g, detailClass.nameTh);
  templateClassPage.html = templateClassPage.html.replace(/\{CLASS_NAME_EN\}/g, detailClass.nameEn);
  templateClassPage.html = templateClassPage.html.replace(/\{CLASS_LABEL\}/g, detailClass.label);
  templateClassPage.html = templateClassPage.html.replace(/\{CLASS_URL\}/g, "https://www.kuclap.com/" + detailClass.classId);
}

function replaceMetaOnReviewTemplate(templateReviewPage, detailClass, detailReview) {
  templateReviewPage.html = templateReviewPage.html.replace(/\{GLOBAL_STATE\}/g, JSON.stringify({
    currentClass: detailClass,
    currentReview: detailReview
  }));
  templateReviewPage.html = templateReviewPage.html.replace(/\{CLASS_ID\}/g, detailClass.classId);
  templateReviewPage.html = templateReviewPage.html.replace(/\{CLASS_NAME_TH\}/g, detailClass.nameTh);
  templateReviewPage.html = templateReviewPage.html.replace(/\{CLASS_NAME_EN\}/g, detailClass.nameEn);
  templateReviewPage.html = templateReviewPage.html.replace(/\{CLASS_LABEL\}/g, detailClass.label);
  templateReviewPage.html = templateReviewPage.html.replace(/\{REVIEW_URL\}/g, "https://www.kuclap.com/review/" + detailReview.reviewId);
  templateReviewPage.html = templateReviewPage.html.replace(/\{REVIEW_TEXT\}/g, detailReview.text);
  templateReviewPage.html = templateReviewPage.html.replace(/\{REVIEW_AUTHOR\}/g, detailReview.author);
  templateReviewPage.html = templateReviewPage.html.replace(/\{REVIEW_IMAGE\}/g, "https://og-image.kuclap.com/" + encodeURIComponent(detailReview.text) + ".png?classId=" + detailReview.classId + "&classNameTH=" + detailReview.classNameTH);
}

function validatorClassId(classID) {
  var reg = new RegExp("^[0-9]+$");
  if (classID.length === 8 && reg.test(classID)) return true;
  return false;
}

function ApplicationEndpoint(_x3, _x4) {
  return _ApplicationEndpoint.apply(this, arguments);
}

function _ApplicationEndpoint() {
  _ApplicationEndpoint = _asyncToGenerator(function* (req, res) {
    var detailClass;
    var classID = req.params.classID;
    console.log("class-id from req :", classID);

    if (classID) {
      var templateClassPage = {
        html: readFileSync("./build/class/index.html", "utf8")
      };

      if (validatorClassId(classID)) {
        try {
          var response = yield axios.get(process.env.URL_API + "/class/" + classID);
          detailClass = response.data;
          replaceMetaOnClassTemplate(templateClassPage, detailClass);
          var body = render(h(App, {
            url: req.url
          }));
          res.setHeader("Content-Type", "text/html");
          res.end(templateClassPage.html.replace(RGX, body));
        } catch (error) {
          res.setHeader("Content-Type", "text/html");
          res.end("ERROR: " + classID + " is invalid classId.");
        }
      } else {
        res.setHeader("Content-Type", "text/html");
        res.end("ERROR: " + classID + " is invalid classId.");
      }
    } else {
      var _body = render(h(App, {
        url: req.url
      }));

      res.setHeader("Content-Type", "text/html");
      res.end(template.replace(RGX, _body));
    }
  });
  return _ApplicationEndpoint.apply(this, arguments);
}

function ReviewPageEndpoint(_x5, _x6) {
  return _ReviewPageEndpoint.apply(this, arguments);
}

function _ReviewPageEndpoint() {
  _ReviewPageEndpoint = _asyncToGenerator(function* (req, res) {
    var templateReviewPage = {
      html: readFileSync("./build/review/index.html", "utf8")
    };
    var reviewID = req.params.reviewID;
    console.log("review-id from req :", reviewID);

    if (reviewID) {
      try {
        var reviewResponse = yield axios.get(process.env.URL_API + "/review/" + reviewID);
        var classResponse = yield axios.get(process.env.URL_API + "/class/" + reviewResponse.data.classId);
        var detailReview = reviewResponse.data;
        var detailClass = classResponse.data;
        replaceMetaOnReviewTemplate(templateReviewPage, detailClass, detailReview); // console.log(detailClass)
        // let body = render(h(App, { url: req.url }));
        // let body = render(App({ detailClass, detailReview }))

        var body = render(h(h(App, {
          url: req.url,
          detailClass: detailClass,
          detailReview: detailReview
        })));
        res.setHeader("Content-Type", "text/html");
        res.end(templateReviewPage.html.replace(RGX, body));
      } catch (error) {
        var _body2 = render(h(App, {
          url: req.url
        }));

        res.setHeader("Content-Type", "text/html");
        res.end(templateReviewPage.html.replace(RGX, _body2)); // res.setHeader("Content-Type", "text/html");
        // res.end(`ERROR: ${reviewID} is invalid classId.`);
      }
    } else {
      res.setHeader("Content-Type", "text/html");
      res.end("ERROR: " + reviewID + " is invalid reviewId.");
    }
  });
  return _ReviewPageEndpoint.apply(this, arguments);
}

polka().use(compression).use(sirv("build", {
  setHeaders: setHeaders
})).get("/sitemap", SitemapEndpoint).get("/review/:reviewID", ReviewPageEndpoint).get("/form/create/:classID", ApplicationEndpoint).get("/:classID", ApplicationEndpoint).listen(PORT, function (err) {
  if (err) throw err;
  console.log("> Running on localhost:" + PORT);
});