const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const createConfig = () => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  config.resolver.unstable_enablePackageExports = true;

  const defaultResolveRequest = resolver.resolveRequest;
  config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (moduleName === "@tanstack/react-form") {
      return {
        filePath: path.resolve(
          __dirname,
          "node_modules/@tanstack/react-form/dist/cjs/index.cjs"
        ),
        type: "sourceFile",
      };
    }
    if (moduleName === "@tanstack/form-core") {
      return {
        filePath: path.resolve(
          __dirname,
          "node_modules/@tanstack/form-core/dist/cjs/index.cjs"
        ),
        type: "sourceFile",
      };
    }
    return defaultResolveRequest?.(context, moduleName, platform) ?? context.resolveRequest(context, moduleName, platform);
  };

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
};

const config = createConfig();
module.exports = withNativeWind(config);