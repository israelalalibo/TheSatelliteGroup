export const PORTFOLIO_ITEMS = [
  {
    title: "Large Format Printing Setup",
    category: "Machines",
    slug: "large-format-printing-setup",
    image: "/images/products/xp600-large-format.png",
    description:
      "10ft XP600 eco-solvent large format printer supplied and installed for a signage company in Lagos. Capable of high-speed flex banner and vinyl printing.",
  },
  {
    title: "Flex Banner Supply — Bulk Order",
    category: "Raw Materials",
    slug: "flex-banner-bulk-supply",
    image: "/images/products/flex-banner-rolls.png",
    description:
      "Bulk supply of frontlit and backlit flex banner rolls to print shops across Nigeria. Premium PVC material for outdoor signage and advertising.",
  },
  {
    title: "Heat Press for Custom Apparel",
    category: "Machines",
    slug: "heat-press-custom-apparel",
    image: "/images/products/heat-press-machine.png",
    description:
      "Heat press machines supplied for a custom apparel business. Used for t-shirt printing, sublimation transfers, and vinyl heat transfer production.",
  },
  {
    title: "Vinyl & Sticker Material Supply",
    category: "Raw Materials",
    slug: "vinyl-sticker-supply",
    image: "/images/products/vinyl-sticker-rolls.png",
    description:
      "Self-adhesive vinyl rolls in multiple colors supplied for vehicle wraps, signage, and wall graphics. Glossy, matte, and reflective finishes available.",
  },
  {
    title: "Warehouse & Shipping Operations",
    category: "Supply Chain",
    slug: "warehouse-shipping",
    image: "/images/products/flex-banner-shipping.png",
    description:
      "Our warehouse and logistics operations — containerized shipping of flex banner rolls, vinyl, and printing substrates to customers across West Africa.",
  },
  {
    title: "Mug & Gift Printing Setup",
    category: "Machines",
    slug: "mug-gift-printing",
    image: "/images/products/mug-cup-heat-press.png",
    description:
      "Mug heat press machines for sublimation printing of custom mugs, cups, and promotional gifts. Supplied for corporate branding businesses.",
  },
];

export function getPortfolioItemBySlug(slug: string) {
  return PORTFOLIO_ITEMS.find((item) => item.slug === slug);
}
