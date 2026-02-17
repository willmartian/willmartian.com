// @ts-check

import fs from "fs";
import path from "path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRss from "@11ty/eleventy-plugin-rss";

const processor = postcss([tailwindcss()]);

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.on("eleventy.before", async () => {
    const inputPath = path.resolve("./src/css/style.css");
    const outputPath = "./_site/css/output.css";
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    const css = fs.readFileSync(inputPath, "utf8");
    const result = await processor.process(css, { from: inputPath, to: outputPath });
    fs.writeFileSync(outputPath, result.css);
  });

  eleventyConfig.addWatchTarget("./src/css/style.css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/favicon.png");
  eleventyConfig.addPassthroughCopy("./src/files");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.setDataDeepMerge(true);

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
    },
  };
};