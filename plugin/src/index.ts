import { withProjectBuildGradle, ConfigPlugin } from "@expo/config-plugins";

const withChainwaySdk: ConfigPlugin<{ monorepo?: boolean }> = (
  config,
  { monorepo = false },
) => {
  return withProjectBuildGradle(config, (config) => {
    if (monorepo) {
      config.modResults.contents += `
      allprojects {
        repositories {
          flatDir { dirs "$rootDir/../../../node_modules/chainway-terra-pdk-sdk/android/libs" } 
        }
      }`;
    } else {
      config.modResults.contents += `
      allprojects {
        repositories {
          flatDir { dirs "$rootDir/../node_modules/chainway-terra-pdk-sdk/android/libs" } 
        }
      }`;
    }
    return config;
  });
};

export default withChainwaySdk;
