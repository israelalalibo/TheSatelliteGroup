export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  landmark?: string;
}

export interface DeliveryOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

export type PaymentMethod = "card" | "transfer" | "delivery" | "ussd";

export interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    options: string[];
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  shippingAddress: ShippingAddress;
  deliveryOption: DeliveryOption;
  paymentMethod: PaymentMethod;
  createdAt: string;
  estimatedDelivery?: string;
}
