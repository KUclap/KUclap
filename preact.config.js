export default (config, env, helpers) => {
  // Define a `process.env.SSR` boolean constant:
  const DefinePlugin = helpers.getPluginsByName(config, "DefinePlugin")[0];
  DefinePlugin.plugin.definitions["process.env.SSR"] = String(env.ssr);

  const publicPath = process.env.GITHUB_PAGES
    ? `/${process.env.GITHUB_PAGES}/`
    : "/";
  const ghEnv =
    process.env.GITHUB_PAGES && JSON.stringify(`${process.env.GITHUB_PAGES}`);

  config.output.publicPath = publicPath;
  const { plugin } = helpers.getPluginsByName(config, "DefinePlugin")[0];
  Object.assign(plugin.definitions, { ["process.env.GITHUB_PAGES"]: ghEnv });
};
