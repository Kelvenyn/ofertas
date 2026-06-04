import { writeFileSync, mkdirSync } from "fs";
import { join, extname } from "path";

const images = [
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/a4996fc9-5b06-464a-86b1-817af5b4f1ae.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/ChatGPT-Image-21-de-mai.-de-2026-14_26_00.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/ChatGPT-Image-21-de-mai.-de-2026-14_25_56-1.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/ChatGPT-Image-21-de-mai.-de-2026-14_25_52-1.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/ChatGPT-Image-21-de-mai.-de-2026-14_25_33.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/ChatGPT-Image-21-de-mai.-de-2026-14_25_44-1.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/ChatGPT-Image-21-de-mai.-de-2026-14_25_48-1.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/2dd43d5e-6d02-4303-b0f8-be047df9bb0c.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/7886b7ae-8c1b-49a2-b185-e4955ab73050.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/CR-NINJA-15.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/CR-NINJA-16.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/CR-NINJA-17.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/CR-NINJA-18.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/06/1-5-6.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/06/1-10.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/06/1-3-6.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/06/1-2-6.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/06/1-4-6.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/05/4943e9df-5a44-4443-b18d-b7084546bdad.webp",
  "https://oferta.educahoje.store/wp-content/uploads/2026/05/Copia-de-NOVOS-CREATIVOS.webp",
  "https://oferta.educahoje.store/wp-content/uploads/2026/05/Copia-de-NOVOS-CREATIVOS-1.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/06/CR-NINJA-4-300x300.webp",
  "https://melhor-pravoce.online/wp-content/uploads/2026/06/f8301e13-4ed1-4ef7-ad10-929bab3e3f9d.webp",
  "https://educahoje.com.br/wp-content/uploads/2025/10/INCONDICIONAL-_1_-1-1.webp",
];

const outDir = join(process.cwd(), "public", "images");
mkdirSync(outDir, { recursive: true });

async function download(url) {
  const name = url.split("/").pop();
  const ext = extname(name) || ".jpg";
  const path = join(outDir, `asset-${images.indexOf(url)}${ext}`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(path, buf);
    console.log(`OK: ${name}`);
  } catch (e) {
    console.error(`FAIL: ${name} - ${e.message}`);
  }
}

// Download 4 at a time
async function batchDownload(urls, batchSize = 4) {
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    await Promise.all(batch.map(download));
  }
}

batchDownload(images).then(() => console.log("Done!"));
