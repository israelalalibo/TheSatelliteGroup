/**
 * Downloads product images from satelitegroup.com.ng based on COMPLETE_PRODUCT_IMAGE_MAPPING.csv
 * Run: node scripts/download-product-images.js
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const CSV_PATH = path.join(__dirname, "..", "COMPLETE_PRODUCT_IMAGE_MAPPING.csv");
const OUTPUT_DIR = path.join(__dirname, "..", "public", "images", "products");
const BASE_URL = "https://satelitegroup.com.ng/wp-content/uploads";
const UPLOAD_PATHS = ["2020/08", "2020/09", "2020/10", "2023/06", "2023/08"];

function csvToWordPressFilename(name) {
  return name
    .replace(/_/g, "-")
    .toLowerCase();
}

function parseCSV(content) {
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    const row = {};
    headers.forEach((h, j) => (row[h] = values[j] || ""));
    rows.push(row);
  }
  return rows;
}

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { timeout: 15000 }, (res) => {
        if (res.statusCode === 200) {
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => resolve(Buffer.concat(chunks)));
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      })
      .on("error", reject);
  });
}

async function tryDownload(imageFile) {
  const ext = path.extname(imageFile).toLowerCase();
  const base = path.basename(imageFile, ext);
  const wpName = csvToWordPressFilename(base) + ext;
  const altNames = [wpName, base + ext, base.replace(/-/g, "_") + ext];

  for (const uploadPath of UPLOAD_PATHS) {
    for (const name of altNames) {
      const url = `${BASE_URL}/${uploadPath}/${name}`;
      try {
        const data = await download(url);
        const outPath = path.join(OUTPUT_DIR, wpName);
        fs.writeFileSync(outPath, data);
        return wpName;
      } catch {
        continue;
      }
    }
  }
  return null;
}

async function main() {
  const csv = fs.readFileSync(CSV_PATH, "utf8");
  const rows = parseCSV(csv);
  const imageFiles = [...new Set(rows.map((r) => r.Image_File).filter(Boolean))];
  const altFiles = [...new Set(rows.map((r) => r.Alt_Image).filter(Boolean))];
  const allFiles = [...new Set([...imageFiles, ...altFiles])];

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Downloading ${allFiles.length} unique images...`);
  let ok = 0;
  let fail = 0;

  for (const file of allFiles) {
    const result = await tryDownload(file);
    if (result) {
      console.log(`  ✓ ${file} -> ${result}`);
      ok++;
    } else {
      console.log(`  ✗ ${file} (not found)`);
      fail++;
    }
  }

  console.log(`\nDone: ${ok} downloaded, ${fail} not found.`);
}

main().catch(console.error);
