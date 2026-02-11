"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/data/products";
import type { CartItem, CartItemOption } from "@/lib/types/cart";
import { generateCartItemId } from "@/lib/types/cart";
import { useAuth } from "@/context/AuthContext";

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
  itemCount: number;
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

function serializeForStorage(items: CartItem[]): string {
  return JSON.stringify(items);
}

function serializeForApi(items: CartItem[]) {
  return items.map((i) => ({
    id: i.id,
    productId: i.product.id,
    quantity: i.quantity,
    selectedOptions: i.selectedOptions,
    unitPrice: i.unitPrice,
    designFile: i.designFile ?? undefined,
  }));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const hasMergedRef = useRef(false);
  const hasLoadedRef = useRef(false);

  // Load cart: from API when logged in, from localStorage when not
  useEffect(() => {
    hasLoadedRef.current = false;
    if (isAuthenticated) {
      fetch("/api/cart", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          const items = Array.isArray(data.items) ? data.items : [];
          dispatch({ type: "LOAD_CART", items });
          hasLoadedRef.current = true;
          // If API returned empty but we have local items, merge them to DB
          if (items.length === 0 && !hasMergedRef.current) {
            try {
              const stored = localStorage.getItem(CART_STORAGE_KEY);
              if (stored) {
                const parsed = JSON.parse(stored) as CartItem[];
                if (Array.isArray(parsed) && parsed.length > 0) {
                  hasMergedRef.current = true;
                  dispatch({ type: "LOAD_CART", items: parsed });
                  fetch("/api/cart", {
                    method: "PUT",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ items: serializeForApi(parsed) }),
                  }).catch(() => {});
                }
              }
            } catch {
              // ignore
            }
          }
        })
        .catch(() => {
          hasLoadedRef.current = true;
        });
    } else {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as CartItem[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            dispatch({ type: "LOAD_CART", items: parsed });
          }
        }
      } catch {
        // ignore
      }
      hasLoadedRef.current = true;
    }
  }, [isAuthenticated]);

  // Persist: sync to API when logged in (after initial load), always save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, serializeForStorage(state.items));
    } catch {
      // ignore
    }

    if (isAuthenticated && hasLoadedRef.current) {
      fetch("/api/cart", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: serializeForApi(state.items) }),
      }).catch(() => {});
    }
  }, [state.items, isAuthenticated]);

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
