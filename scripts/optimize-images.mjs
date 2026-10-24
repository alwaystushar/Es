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
  ["hero-classroom.png", "hero-classroom.webp"],
  ["impact-session.png", "impact-session.webp"],
  ["area-facilitation.png", "area-facilitation.webp"],
  ["area-strategy.png", "area-strategy.webp"],
  ["area-process.png", "area-process.webp"],
  ["area-technology.png", "area-technology.webp"],
  ["area-innovation.png", "area-innovation.webp"],
  ["area-excellence.png", "area-excellence.webp"],
  ["program-policies.png", "program-policies.webp"],
  ["program-governance.png", "program-governance.webp"],
  ["program-powerbi.png", "program-powerbi.webp"],
  ["program-improvement.png", "program-improvement.webp"],
  ["article-career.png", "article-career.webp"],
  ["article-strategy.png", "article-strategy.webp"],
  ["article-process.png", "article-process.webp"],
  ["license-tvtc.png", "license-tvtc.webp"],
  ["globe-dots.png", "globe-dots.webp"],
];

for (const [inputName, outputName] of photos) {
  await sharp(path.join(sourceDir, inputName))
    .resize({ width: 2560, withoutEnlargement: true })
    .webp({ quality: 92, effort: 6, smartSubsample: true })
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
