import criticalCssPlugin from "preact-cli-plugin-critical-css";
export default (config, env, helpers, options) => {
  const publicPath = process.env.GITHUB_PAGES
    ? `/${process.env.GITHUB_PAGES}/`
    : "/";
  const ghEnv =
    process.env.GITHUB_PAGES && JSON.stringify(`${process.env.GITHUB_PAGES}`);

  config.output.publicPath = publicPath;
  const { plugin } = helpers.getPluginsByName(config, "DefinePlugin")[0];
  Object.assign(plugin.definitions, { ["process.env.GITHUB_PAGES"]: ghEnv });
  criticalCssPlugin(config, env, options);
};

// import criticalCssPlugin from "preact-cli-plugin-critical-css";

// export default (config, env) => {
//   const options = {
//     // Passed directly to the 'critical' module (this is optional)
//   };

//   criticalCssPlugin(config, env, options);
// };
