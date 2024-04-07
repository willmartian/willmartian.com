const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");


module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/favicon.png");
  eleventyConfig.addPassthroughCopy("./src/files");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("packageVersion", () => `v${packageVersion}`);

  eleventyConfig.addPlugin(inclusiveLangPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.setDataDeepMerge(true);

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
    },
  };
};