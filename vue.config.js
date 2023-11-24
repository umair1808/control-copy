const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
  },
  css: {
    extract: false,
  },
  productionSourceMap: false,
};
