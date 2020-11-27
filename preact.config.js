// import envVars from "preact-cli-plugin-env-vars";
// const { parsed } = require("dotenv-safe").config();
const path = require("path");
export default (config, env, helpers) => {
  
  // Change path to static files (default request route to root "/")
  if(process.env.NODE_ENV === "production" && !process.env.IS_DEV){
    config.output.publicPath = '/static/';
  }
    

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
  
    
  
  // Base route - config
  // const publicPath = process.env.BASE_ROUTE
  //   ? `/${process.env.BASE_ROUTE}/`
  //   : "/";
  // const ghEnv =
  //   process.env.BASE_ROUTE && JSON.stringify(`${process.env.BASE_ROUTE}`);

  // config.output.publicPath = publicPath;
  // Object.assign(plugin.definitions, { ["process.env.BASE_ROUTE"]: ghEnv });
};
