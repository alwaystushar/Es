import path from "node:path";
import sharp from "sharp";

const pairs = [
  ["partner-99.png", "partner-inifac.webp"],
  ["partner-100.png", "partner-iaf.webp"],
  ["partner-104.png", "partner-tregear.webp"],
  ["partner-105.png", "partner-leadership.webp"],
  ["partner-106.png", "partner-grove.webp"],
  ["partner-108.png", "partner-detecon.webp"],
];

for (const [inputName, outputName] of pairs) {
  const trimmed = sharp(path.resolve("public/assets/source", inputName)).trim({
    threshold: 18,
  });
  const { data, info } = await trimmed.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let index = 0; index < data.length; index += 4) {
    const max = Math.max(data[index], data[index + 1], data[index + 2]);
    if (max < 28) data[index + 3] = 0;
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality: 86 })
    .toFile(path.resolve("public/assets/logos", outputName));
  console.log(outputName, info.width, info.height);
}
