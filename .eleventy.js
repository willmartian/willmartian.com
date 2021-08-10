const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

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
  
  eleventyConfig.addShortcode("postCard", post => {
    return `<a href="${post.url}" class="card-link">
      <article class="card">
        <header>
          <h3>${post.data.title}</h3>
        </header>
        <div>${post.data.blurb}</div>
        <footer>${post.data.date.toLocaleDateString(undefined, {
          year: 'numeric', month: 'long', day: 'numeric'
        })}</footer>
      </article>
    </a>`;
  });
  
  eleventyConfig.addPairedShortcode("card", (content, title, footer) => {
    return `<article class="card">
      <header>
        <h3>${title}</h3>
      </header>
      <div>${content}</div>
      ${footer ? `<footer>${footer}</footer>` : ''}
    </article>`;
  });

  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;

        tags = tags.filter(function(item) {
          switch(item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "page":
            case "pages":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  eleventyConfig.addPlugin(inclusiveLangPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

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