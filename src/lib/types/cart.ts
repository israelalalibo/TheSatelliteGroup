import type { Product } from "@/lib/data/products";

export interface CartItemOption {
  optionId: string;
  valueId: string;
  label: string;
  priceModifier?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOptions: CartItemOption[];
  unitPrice: number;
  designFile?: { name: string; url: string; size: number };
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

export function generateCartItemId(productId: string, options: CartItemOption[]): string {
  const optionStr = options
    .sort((a, b) => a.optionId.localeCompare(b.optionId))
    .map((o) => `${o.optionId}:${o.valueId}`)
    .join("-");
  return `${productId}-${optionStr || "default"}`;
}
