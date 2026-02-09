module.exports = function(eleventyConfig) {
  // Ignore root-level markdown files (README, etc.)
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("DEPLOYMENT_GUIDE.md");

  // Pass through all existing static files unchanged
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("images/uploads");
  eleventyConfig.addPassthroughCopy("music");
  eleventyConfig.addPassthroughCopy("admin");

  // Pass through existing HTML files unchanged
  eleventyConfig.addPassthroughCopy("*.html");

  // Articles collection, sorted by date (newest first)
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByGlob("articles/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Persian date filter
  eleventyConfig.addFilter("persianDate", function(date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  // Persian digits filter
  eleventyConfig.addFilter("persianDigits", function(value) {
    if (value === undefined || value === null) return "";
    const digits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
    return String(value).replace(/\d/g, d => digits[d]);
  });

  // Reading time filter (for Persian text)
  eleventyConfig.addFilter("readingTime", function(content) {
    if (!content) return "۱ دقیقه";
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    const persianDigits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
    const persianMinutes = String(minutes).replace(/\d/g, d => persianDigits[d]);
    return persianMinutes + " دقیقه";
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },
    htmlTemplateEngine: false,
    templateFormats: ["njk", "md"]
  };
};
