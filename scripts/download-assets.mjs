import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const assets = {
  "source/hero-classroom.png":
    "https://www.figma.com/api/mcp/asset/5540ef9c-9c81-4af0-a24c-7a447de27d1c.png",
  "source/impact-session.png":
    "https://www.figma.com/api/mcp/asset/b647167c-3d29-4b74-a6b5-a1338588f16a.png",
  "source/area-facilitation.png":
    "https://www.figma.com/api/mcp/asset/0da89101-201f-444f-9657-9d5e87b1544e.png",
  "source/area-strategy.png":
    "https://www.figma.com/api/mcp/asset/4176d0d8-3639-46b7-85c5-e1c3f191035e.png",
  "source/area-process.png":
    "https://www.figma.com/api/mcp/asset/3876e36d-ee09-4868-979b-5baf62999a7a.png",
  "source/area-technology.png":
    "https://www.figma.com/api/mcp/asset/01441fe1-75a7-4a29-b931-7324a8e30f39.png",
  "source/area-innovation.png":
    "https://www.figma.com/api/mcp/asset/1f4c2725-9978-4b6a-98ec-df843e304370.png",
  "source/area-excellence.png":
    "https://www.figma.com/api/mcp/asset/09a8dfd3-a7de-45c6-a715-93b8587850e9.png",
  "source/program-policies.png":
    "https://www.figma.com/api/mcp/asset/f7738356-4400-4754-bd4d-4f7f5da6d1bb.png",
  "source/program-governance.png":
    "https://www.figma.com/api/mcp/asset/e925eaa3-78ae-4dc6-9061-60d1baafe61c.png",
  "source/program-powerbi.png":
    "https://www.figma.com/api/mcp/asset/3009eca5-ed1b-4c81-9cc6-7224d6bdfbf3.png",
  "source/program-improvement.png":
    "https://www.figma.com/api/mcp/asset/3b358d31-ac89-41d7-a05c-fe2365b7a004.png",
  "source/article-career.png":
    "https://www.figma.com/api/mcp/asset/ad78fcf5-bee8-46e0-aaea-108d8335aaff.png",
  "source/article-strategy.png":
    "https://www.figma.com/api/mcp/asset/ac314f10-00ed-4648-bad8-a939d28cb040.png",
  "source/article-process.png":
    "https://www.figma.com/api/mcp/asset/0b4249ae-cf0c-4af1-b744-5b705fe82160.png",
  "source/partner-99.png":
    "https://www.figma.com/api/mcp/asset/7d9ec8e4-cd92-4421-8c93-6415648a7b5c.png",
  "source/partner-100.png":
    "https://www.figma.com/api/mcp/asset/405be501-b927-4a8a-8948-f3b8f6e9a51d.png",
  "source/partner-104.png":
    "https://www.figma.com/api/mcp/asset/f8da8658-e09b-4f1a-976a-3361864747c4.png",
  "source/partner-105.png":
    "https://www.figma.com/api/mcp/asset/a02168e8-d430-450a-98bc-f387a7954725.png",
  "source/partner-106.png":
    "https://www.figma.com/api/mcp/asset/bcad1729-6c66-4a35-b39b-8d4c9fccfa22.png",
  "source/partner-108.png":
    "https://www.figma.com/api/mcp/asset/e44966c1-92c2-4690-ba55-24fc8069609c.png",
  "source/license-tvtc.png":
    "https://www.figma.com/api/mcp/asset/251ce3a2-e402-48ef-82c7-4c6cdc4effbe.png",
  "source/globe-dots.png":
    "https://www.figma.com/api/mcp/asset/5531ea9a-d88e-4934-a409-0c56501ca34a.png",
  "logos/logo.svg":
    "https://www.figma.com/api/mcp/asset/828bdc78-f75c-4e56-abde-fe5ec015839b.svg",
  "icons/chevron.svg":
    "https://www.figma.com/api/mcp/asset/5387e37e-3cb7-4f5d-a0e3-88b16551be9a.svg",
  "icons/language.svg":
    "https://www.figma.com/api/mcp/asset/9ea3a3ff-1da0-4732-8765-2292df0d01cc.svg",
  "icons/arrow-a.svg":
    "https://www.figma.com/api/mcp/asset/85847af4-6fd5-497a-9725-56af8bb1362a.svg",
  "icons/arrow-b.svg":
    "https://www.figma.com/api/mcp/asset/0025098a-13b0-459e-8d2f-5bd86202608a.svg",
  "icons/star.svg":
    "https://www.figma.com/api/mcp/asset/bb960196-7ee1-43b3-9e87-7aded73b6811.svg",
  "icons/clock.svg":
    "https://www.figma.com/api/mcp/asset/861d54dc-6530-4873-9cbe-92aa2deda3f5.svg",
  "icons/riyal.svg":
    "https://www.figma.com/api/mcp/asset/232eb69b-ee8b-4fdd-8c78-5f6aa88732df.svg",
  "icons/dot.svg":
    "https://www.figma.com/api/mcp/asset/022b42d6-b6c6-4be9-ba7d-37605a465014.svg",
  "icons/why-frame.svg":
    "https://www.figma.com/api/mcp/asset/3a44cb61-1a90-48a5-9a8e-f2c26c94866b.svg",
  "icons/why-group-a.svg":
    "https://www.figma.com/api/mcp/asset/14b0a36d-743c-46ed-90dc-d8d0fbaf3848.svg",
  "icons/why-group-b.svg":
    "https://www.figma.com/api/mcp/asset/13990b3e-0384-4627-ba2e-b0c703fa57c6.svg",
  "icons/why-group-c.svg":
    "https://www.figma.com/api/mcp/asset/7c477ed0-a8ac-4d83-932b-99c9e19a7601.svg",
  "icons/social-x.svg":
    "https://www.figma.com/api/mcp/asset/c7471ffd-20d3-42a5-a45a-8b321ece24f6.svg",
  "icons/social-linkedin.svg":
    "https://www.figma.com/api/mcp/asset/ea7fbc96-0fb2-48c8-89a3-980ebce902ac.svg",
  "icons/social-instagram.svg":
    "https://www.figma.com/api/mcp/asset/6e19027a-2401-4794-86aa-8014fb930061.svg",
  "logos/badge-iso.svg":
    "https://www.figma.com/api/mcp/asset/7b8a0137-191b-4b1b-83fb-749dc0155f05.svg",
  "logos/badge-iqnet.svg":
    "https://www.figma.com/api/mcp/asset/4ddd08ae-ccf1-4dfa-9f01-c59fe25b1ac8.svg",
  "logos/badge-mada.svg":
    "https://www.figma.com/api/mcp/asset/92d05ba6-5e60-4d62-b67c-49d5a8d3ce8b.svg",
  "logos/badge-visa.svg":
    "https://www.figma.com/api/mcp/asset/36f95beb-42ad-4b27-a7a9-fd9baa4c5461.svg",
};

const root = path.resolve("public/assets");

await Promise.all(
  Object.entries(assets).map(async ([file, url]) => {
    const destination = path.join(root, file);
    await mkdir(path.dirname(destination), { recursive: true });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${file} failed: ${response.status}`);
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 80) {
      throw new Error(`${file} looks empty (${bytes.length} bytes)`);
    }
    await writeFile(destination, bytes);
    console.log(`${file} ${bytes.length}`);
  }),
);
