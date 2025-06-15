import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import { DateTime } from "luxon";

export default function(eleventyConfig) {
   

    //FILTERS
    const md = new markdownIt({
      html: true, // allows raw HTML in markdown content
      breaks: true, // turns \n into <br>
      linkify: true // auto-link URLs
    });

    eleventyConfig.addFilter("readableDate", (dateInput) => {
      // Convert to ISO string to preserve the written date, then parse it in the correct zone
      const iso = typeof dateInput === "string" ? dateInput : dateInput.toISOString();
      return DateTime.fromISO(iso, { zone: "America/Toronto" }).toFormat("MMMM d, yyyy");
    });
  
    eleventyConfig.addFilter("markdown", (content) => {
      return md.render(content);
    });

    eleventyConfig.addFilter("slice", (arr, start, end) => {
      return Array.isArray(arr) ? arr.slice(start, end) : [];
    });

    eleventyConfig.addCollection("posts", collection => {
      return collection.getFilteredByTag("post").reverse(); // newest first
    });

    // Dummy Data for Pre-Build Scripts
    eleventyConfig.on('beforeBuild', () => {
      
    });

    //Support for Eleventy Image in templates
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
      // which file extensions to process
      extensions: "html",
      // Add any other Image utility options here:
      widths: [320, 640, 960],
      
      svgShortCircuit: true,
      // optional, output image formats
      formats: ["webp", "jpeg", "svg"],
  
      // optional, attributes assigned on <img> override these values.
      defaultAttributes: {
        sizes: "(max-width: 768px) 100vw, 50vw",
        alt: "Descriptive alt text",
        loading: "lazy",
        decoding: "async",
      },
    });

    // Folders to be included at build time
    eleventyConfig.addPassthroughCopy('./js');
    eleventyConfig.addPassthroughCopy('./css');
    eleventyConfig.addPassthroughCopy('./favicon.ico');
    eleventyConfig.addPassthroughCopy('./browserconfig.xml');
    eleventyConfig.addPassthroughCopy('./safari-pinned-tab.svg');
    eleventyConfig.addPassthroughCopy('./site.webmanifest');
    eleventyConfig.addPassthroughCopy('./*.png');
    eleventyConfig.addPassthroughCopy("src/admin/");

    
    // Return your Object options:
    return {
      dir: {
        input: "src",                   //Files to Convert
        output: "public",               //Static Pages Folder
        data: "_data",                  // Data File Folder
        layouts: "_includes/layouts"
      },

      dataTemplateEngine: 'njk',        // Specify njk as Templating Engine
      markdownTemplateEngine:'njk',     // Specify njk for Markdown Files
      htmlTemplateEngine: "njk",
      passThroughFileCopy: "true"       // Allow the parsing of files inside specified Passthrough folders
    }
  };