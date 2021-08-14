const path = require("path");
const deepmerge = require("deepmerge");
const fs = require("fs");
const prettier = require("prettier");

const ALLOWERD_FRAMEWORKS = ["shopify", "shopify_local", "bigcommerce"];

const withFrameworkConfig = (defaultConfig = {}) => {
  let framework = defaultConfig?.framework?.name;

  if (!framework) {
    throw new Error(
      "The api framework is missing, please add a valid provider!"
    );
  }

  if (!ALLOWERD_FRAMEWORKS.includes(framework)) {
    throw new Error(
      `The api framework ${framework} cannot be found, please use one of ${ALLOWERD_FRAMEWORKS.join(
        ", "
      )}`
    );
  }

  if (framework === "shopify_local") {
    framework = "shopify";
  }

  // Change next.config to include common and framework specific configuration
  const frameworkNextConfig = require(path.join(
    "../",
    framework,
    "next.config"
  ));
  const config = deepmerge(defaultConfig, frameworkNextConfig);

  // Also change tsconfig.json for aliasing framework
  updateTsConfigWithFramework(framework);

  return config;
};

const updateTsConfigWithFramework = (framework) => {
  const tsPath = path.join(process.cwd(), "tsconfig.json");
  const tsConfig = require(tsPath); // process.cwd (current working directory) points to root folder
  tsConfig.compilerOptions.paths["@framework"] = [`framework/${framework}`];
  tsConfig.compilerOptions.paths["@framework/*"] = [`framework/${framework}/*`];
  fs.writeFileSync(
    tsPath,
    prettier.format(JSON.stringify(tsConfig), {
      parser: "json",
    })
  );
};

module.exports = { withFrameworkConfig };
