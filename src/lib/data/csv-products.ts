/**
 * Products from COMPLETE_PRODUCT_IMAGE_MAPPING.csv
 * Images from satelitegroup.com.ng (or run scripts/download-product-images.js for local copies)
 */
const IMAGE_BASE = "https://satelitegroup.com.ng/wp-content/uploads/2020/08";

function csvImageToPath(imageFile: string): string {
  const ext = imageFile.includes(".") ? imageFile.substring(imageFile.lastIndexOf(".")) : ".jpg";
  const base = imageFile.replace(/\.[^.]+$/, "").replace(/_/g, "-").toLowerCase();
  // Use external URL - images hosted on satelitegroup.com.ng
  return `${IMAGE_BASE}/${base}${ext}`;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface CSVProductInput {
  productGroup: string;
  productName: string;
  price: number | null;
  imageFile: string;
  altImage?: string;
  description?: string;
}

export function csvProductToProduct(input: CSVProductInput, id: string) {
  const slug = slugify(input.productName);
  const image = csvImageToPath(input.imageFile);
  const altPath = input.altImage ? csvImageToPath(input.altImage) : image;
  return {
    id: `csv-${id}`,
    slug: `csv-${id}-${slug}`,
    name: input.productName.trim(),
    description: input.description || `${input.productName} - ${input.productGroup}. Quality printing materials from Satelite Group.`,
    shortDescription: input.productName.trim(),
    image,
    images: altPath !== image ? [image, altPath] : [image],
    category: mapGroupToCategory(input.productGroup),
    basePrice: input.price ?? 0,
    rating: 4.6,
    reviewCount: 12,
    features: ["Quality assured", "Nationwide delivery", "Trusted supplier"],
  };
}

function mapGroupToCategory(group: string): string {
  const g = group.toUpperCase();
  if (
    g.includes("PLASTIC") ||
    g.includes("FOAM") ||
    g.includes("COREX") ||
    g.includes("CLADDING") ||
    g.includes("PARTITION") ||
    g.includes("POLYCARBONATE") ||
    g.includes("FLOOR TILES")
  )
    return "raw-materials";
  if (
    g.includes("STICKER") ||
    g.includes("SCOTCH") ||
    g.includes("REFLECTIVE") ||
    g.includes("VINYL")
  )
    return "stickers";
  if (g.includes("FLEX") || g.includes("BANNER") || g.includes("SAV") || g.includes("ONE WAY"))
    return "raw-materials";
  if (g.includes("TRANSFER") || g.includes("DTF") || g.includes("ECO-SOLVENT") || g.includes("HEAT TRANSFER"))
    return "raw-materials";
  if (g.includes("ROLL UP") || g.includes("LIGHT BOX") || g.includes("FLAG"))
    return "signage-materials";
  if (g.includes("CANVAS") || g.includes("PVC FILM")) return "raw-materials";
  if (g.includes("FROSTED")) return "raw-materials";
  if (g.includes("JACKET")) return "corporate-gifts";
  return "raw-materials";
}
