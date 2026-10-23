import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/assets");
const sourceDir = path.join(root, "source");
const imageDir = path.join(root, "images");
const logoDir = path.join(root, "logos");

await mkdir(imageDir, { recursive: true });
await mkdir(logoDir, { recursive: true });

const photos = [
  ["hero-classroom.png", "hero-classroom.webp", 1920],
  ["impact-session.png", "impact-session.webp", 1400],
  ["area-facilitation.png", "area-facilitation.webp", 1200],
  ["area-strategy.png", "area-strategy.webp", 1200],
  ["area-process.png", "area-process.webp", 1200],
  ["area-technology.png", "area-technology.webp", 1200],
  ["area-innovation.png", "area-innovation.webp", 1200],
  ["area-excellence.png", "area-excellence.webp", 1200],
  ["program-policies.png", "program-policies.webp", 1200],
  ["program-governance.png", "program-governance.webp", 1200],
  ["program-powerbi.png", "program-powerbi.webp", 1200],
  ["program-improvement.png", "program-improvement.webp", 1200],
  ["article-career.png", "article-career.webp", 1200],
  ["article-strategy.png", "article-strategy.webp", 1200],
  ["article-process.png", "article-process.webp", 1200],
  ["license-tvtc.png", "license-tvtc.webp", 800],
  ["globe-dots.png", "globe-dots.webp", 1600],
];

for (const [inputName, outputName, width] of photos) {
  await sharp(path.join(sourceDir, inputName))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(path.join(imageDir, outputName));
  console.log(outputName);
}

const partners = [
  ["partner-99.png", "partner-inifac.webp"],
  ["partner-100.png", "partner-iaf.webp"],
  ["partner-104.png", "partner-tregear.webp"],
  ["partner-105.png", "partner-leadership.webp"],
  ["partner-106.png", "partner-grove.webp"],
  ["partner-108.png", "partner-detecon.webp"],
];

for (const [inputName, outputName] of partners) {
  const { data, info } = await sharp(path.join(sourceDir, inputName))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let index = 0; index < data.length; index += 4) {
    const max = Math.max(data[index], data[index + 1], data[index + 2]);
    if (max < 24) data[index + 3] = 0;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .webp({ quality: 86, effort: 4 })
    .toFile(path.join(logoDir, outputName));
  console.log(outputName);
}

const logo = await readFile(path.join(logoDir, "logo.svg"), "utf8");
await writeFile(
  path.join(logoDir, "logo-white.svg"),
  logo
    .replaceAll('preserveAspectRatio="none"', 'preserveAspectRatio="xMidYMid meet"')
    .replaceAll("#1F6F4E", "#FFFFFF"),
);
await writeFile(
  path.join(logoDir, "logo.svg"),
  logo.replaceAll('preserveAspectRatio="none"', 'preserveAspectRatio="xMidYMid meet"'),
);
