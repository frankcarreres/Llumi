// craco.config.js
// eslint-disable-next-line no-undef
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
        // detecta el source-map-loader
        if (
          rule.enforce === "pre" &&
          rule.use &&
          rule.use.some((u) => u.loader && u.loader.includes("source-map-loader"))
        ) {
          // excluye html2pdf.js
          rule.exclude = /node_modules\/html2pdf\.js/;
        }
        return rule;
      });
      return webpackConfig;
    },
  },
};
