const express = require("express");
const { h } = require("preact");
const render = require("preact-render-to-string");
const App = require("./src/components/app");
const path = require("path");
// import express from "express";
// import { h } from "preact";
// import render from "preact-render-to-string";
// import path from "path";
// import App from "./src/components/app";

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.listen(8080);

app.get("*", (req, res) => {
  const html = render(<App url={req.url} />);

  res.send(`
      <!DOCTYPE html>
      <html>
          <body>
              <div id="app">${html}</div>
              <script src="./app.js"></script>
          </body>
      </html>
    `);
});
