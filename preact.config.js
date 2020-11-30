// import envVars from "preact-cli-plugin-env-vars";
// const { parsed } = require("dotenv-safe").config();
const path = require("path");
export default (config, env, helpers) => {

  const currentPath = path.join(__dirname);
  const DefinePlugin = helpers.getPluginsByName(config, "DefinePlugin")[0];
  const { plugin } = DefinePlugin;

  const { parsed } = require("dotenv").config({
    path: `${currentPath}/.env.${process.env.NODE_ENV}`,
  });

  Object.assign(
    plugin.definitions,
    Object.keys(parsed).reduce(
      (env, key) => ({
        ...env,
        [`process.env.${key}`]: JSON.stringify(parsed[key]),
      }),
      {}
    )
  );
  // Define a `process.env.SSR` boolean constant:
  DefinePlugin.plugin.definitions["process.env.SSR"] = String(env.ssr);

  // Change path to static files (default request route to root "/")
  if(process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "production" || process.env.NODE_ENV === "preproduction"){
    config.output.publicPath = '/static/';
  }
};
