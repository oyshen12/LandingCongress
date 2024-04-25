const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/variables.scss"',
      },
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },
  outputDir: "dist",
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        public: path.resolve(__dirname, "public"),
      },
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9090,
  },
});
