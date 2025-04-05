import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import path from 'node:path';
import Image from '@11ty/eleventy-img';

import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';

export default function(eleventyConfig) {
   
    //Settings for blog posts using markdown
    /* Allow Markdown files to accept class name additions to elements*/
    const markdownItOptions = {
        html: true,
        breaks: true,
        linkify: true
    }
    const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);
    eleventyConfig.setLibrary('md', markdownLib);


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
  

    eleventyConfig.addFilter("contentImgUrlFilter", contentImgUrlFilter);

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



async function contentImgUrlFilter(src) {
  const inputDir = path.dirname(this.page.inputPath);
  const imagePath = path.resolve(inputDir, src);
  const outputDir = path.dirname(this.page.outputPath);
  const urlPath = this.page.url;

  const stats = await Image(imagePath, {
    widths: [1200], // Width for Open Graph image
    formats: ["jpg", "png"],
    outputDir: outputDir, // Output directory
    urlPath: urlPath, // Public URL path
    filenameFormat: function (hash, src, width, format) {
        return `${hash}-${width}.${format}`;
    },
  });
  return stats.jpeg[0].url; // Return the URL of the processed image
}