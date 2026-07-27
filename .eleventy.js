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
  eleventyConfig.addPassthroughCopy("./src/favicon.svg");
  eleventyConfig.addPassthroughCopy("./src/files");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  /** 2026-02-17 — for <time datetime> */
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  /** 2026.02.17 — the index reads as a revision history, so dates are fixed-width. */
  eleventyConfig.addFilter("revDate", (d) =>
    new Date(d).toISOString().slice(0, 10).replace(/-/g, ".")
  );

  /** Reading time, derived from the rendered post body. */
  eleventyConfig.addFilter("readingTime", (content) => {
    const words = String(content).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 220))} min read`;
  });

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