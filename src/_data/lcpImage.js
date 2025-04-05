import Image from "@11ty/eleventy-img";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function () {
  const src = path.join(__dirname, "../assets/images/header-image-nobg-min.png");

  const metadata = await Image(src, {
    widths: [1600],
    formats: ["webp", "jpeg"],
    outputDir: "./public/img",
    urlPath: "/img"
  });

  const fallback = metadata.webp?.[0] || metadata.jpeg?.[0];

  return {
    preloadTag: `<link rel="preload" as="image" href="${fallback.url}" type="${fallback.sourceType}">`,
    url: fallback.url,
    type: fallback.sourceType,
    width: fallback.width,
    height: fallback.height
  };
}
