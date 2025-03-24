// @ts-check

import inclusiveLangPlugin from "@11ty/eleventy-plugin-inclusive-language";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRss from "@11ty/eleventy-plugin-rss";
import readingTime from 'eleventy-plugin-reading-time';
import  EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import tailwindcss from "@tailwindcss/vite";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/public");
  eleventyConfig.addPassthroughCopy("./src/files");

  eleventyConfig.addPassthroughCopy({
    ['node_modules/@shoelace-style/shoelace/dist/']: "assets/shoelace/dist",
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addPlugin(inclusiveLangPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      plugins: [tailwindcss()]
    }
  });
  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.setDataDeepMerge(true);

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
    },
  };
};