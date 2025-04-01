const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
   
    //Settings for blog posts using markdown
    /* Allow Markdown files to accept class name additions to elements*/
    const markdownIt = require('markdown-it');
    const markdownItAttrs = require('markdown-it-attrs');

    const markdownItOptions = {
        html: true,
        breaks: true,
        linkify: true
    }
    const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);
    eleventyConfig.setLibrary('md', markdownLib);

    eleventyConfig.addShortcode("imageShortcode", async function(imgSrc, imgAlt, imgClass) {
      return `<img src="${imgSrc}" class = ${imgClass} alt="${imgAlt}" />`;
    });

    // Dummy Data for Pre-Build Scripts
    eleventyConfig.on('beforeBuild', () => {
      
    });

    //Support for Eleventy Image in templates
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
      // which file extensions to process
      extensions: "html",
      // Add any other Image utility options here:
      widths: ['auto'],
      svgShortCircuit: true,
      // optional, output image formats
      formats: ["webp", "jpeg", "svg"],
  
      // optional, attributes assigned on <img> override these values.
      defaultAttributes: {
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
    eleventyConfig.addPassthroughCopy("./admin");

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
      passThroughFileCopy: "true"       // Allow the parsing of files inside specified Passthrough folders
    }
  };