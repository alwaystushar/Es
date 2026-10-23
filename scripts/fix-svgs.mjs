import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dir = path.resolve("public/assets/icons");
for (const file of await readdir(dir)) {
  if (!file.endsWith(".svg")) continue;
  const filePath = path.join(dir, file);
  const source = await readFile(filePath, "utf8");
  const fixed = source.replaceAll('/ stroke-width="1.5">', ' stroke-width="1.5"/>');
  if (fixed !== source) {
    await writeFile(filePath, fixed);
    console.log(`fixed ${file}`);
  }
}
