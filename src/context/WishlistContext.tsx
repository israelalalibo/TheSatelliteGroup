"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface WishlistState {
  productIds: string[];
}

type WishlistAction =
  | { type: "ADD"; productId: string }
  | { type: "REMOVE"; productId: string }
  | { type: "TOGGLE"; productId: string }
  | { type: "LOAD"; productIds: string[] };

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD":
      return state.productIds.includes(action.productId)
        ? state
        : { productIds: [...state.productIds, action.productId] };
    case "REMOVE":
      return { productIds: state.productIds.filter((id) => id !== action.productId) };
    case "TOGGLE":
      return {
        productIds: state.productIds.includes(action.productId)
          ? state.productIds.filter((id) => id !== action.productId)
          : [...state.productIds, action.productId],
      };
    case "LOAD":
      return { productIds: action.productIds };
    default:
      return state;
  }
}

interface WishlistContextValue {
  productIds: string[];
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { productIds: [] });

  // Load from API on mount
  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.productIds)) {
          dispatch({ type: "LOAD", productIds: data.productIds });
        }
      })
      .catch(() => {});
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => state.productIds.includes(productId),
    [state.productIds]
  );

  const addToWishlist = useCallback((productId: string) => {
    dispatch({ type: "ADD", productId });
    fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    }).catch(() => {});
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    dispatch({ type: "REMOVE", productId });
    fetch(`/api/wishlist?productId=${productId}`, { method: "DELETE" }).catch(() => {});
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    dispatch({ type: "TOGGLE", productId });
    fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    }).catch(() => {});
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        productIds: state.productIds,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
