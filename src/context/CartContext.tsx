"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/data/products";
import type { CartItem, CartItemOption } from "@/lib/types/cart";
import { generateCartItemId } from "@/lib/types/cart";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; itemId: string }
  | { type: "UPDATE_QUANTITY"; itemId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

const CART_STORAGE_KEY = "satellite-group-cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.itemId) };
    case "UPDATE_QUANTITY":
      return {
        items: state.items
          .map((i) =>
            i.id === action.itemId ? { ...i, quantity: action.quantity } : i
          )
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR_CART":
      return { items: [] };
    case "LOAD_CART":
      return { items: action.items };
    default:
      return state;
  }
}

interface CartContextValue extends CartState {
  subtotal: number;
  /** Total quantity across all line items (e.g. 100 units) */
  itemCount: number;
  /** Number of distinct line items in the cart (e.g. 1 item) */
  lineItemCount: number;
  addItem: (
    product: Product,
    quantity: number,
    options: CartItemOption[],
    unitPrice: number,
    designFile?: CartItem["designFile"]
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "LOAD_CART", items: parsed });
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore storage errors
    }
  }, [state.items]);

  const addItem = useCallback(
    (
      product: Product,
      quantity: number,
      options: CartItemOption[],
      unitPrice: number,
      designFile?: CartItem["designFile"]
    ) => {
      const id = generateCartItemId(product.id, options);
      dispatch({
        type: "ADD_ITEM",
        item: {
          id,
          product,
          quantity,
          selectedOptions: options,
          unitPrice,
          designFile,
        },
      });
    },
    []
  );

  const removeItem = useCallback((itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", itemId });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", itemId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const subtotal = state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const lineItemCount = state.items.length;

  return (
    <CartContext.Provider
      value={{
        ...state,
        subtotal,
        itemCount,
        lineItemCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
