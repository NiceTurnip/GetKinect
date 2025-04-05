import Image from "@11ty/eleventy-img";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function () {
  const src = path.join(__dirname, "../assets/images/header-image-nobg-min.png");

  const metadata = await Image(src, {
    widths: [1600],
    formats: ["webp", "png"],
    outputDir: "./public/img", // physically saved here
    urlPath: "/img"            // exposed as this in HTML
  });

  const image = metadata.webp?.[0] || metadata.png?.[0];

  return {
    url: image.url,                      // /img/filename.webp
    preloadTag: `<link rel="preload" as="image" href="${image.url}" type="${image.sourceType}">`,
    type: image.sourceType,
    width: image.width,
    height: image.height
  };
}
