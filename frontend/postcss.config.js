/* eslint-disable no-undef */
const tailwindcss = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer"),
    purgecss({
      content: ["./src/**/*.js", "./public/*.html"],
      css: ["./src/App.css", "./src/Components/Main/map.css"],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
