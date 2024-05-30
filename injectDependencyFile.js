const { withAppBuildGradle } = require("@expo/config-plugins");

module.exports = function withAndroidStrategiesPlugin(config) {
  return withAppBuildGradle(config, (config) => {
    config.modResults.contents += `
    allprojects {
      repositories {
        flatDir { dirs "$rootDir/../../../node_modules/chainway-terra-pdk-sdk/android/libs" } 
      }
    }
        `;
    return config;
  });
};
