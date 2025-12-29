import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { toast } from "sonner";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  discount?: number;
  freeShipping?: boolean;
  fastDelivery?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  // Cart drawer
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Currency
  currency: "AED" | "USD";
  setCurrency: (currency: "AED" | "USD") => void;
  convertPrice: (price: number) => number;
  currencySymbol: string;
  
  // Location
  location: string;
  setLocation: (location: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const EXCHANGE_RATE = 0.27; // AED to USD

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<"AED" | "USD">("AED");
  const [location, setLocation] = useState("أبوظبي");

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success(`تم تحديث الكمية في السلة`);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`تمت إضافة ${product.name} إلى السلة`);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) {
        toast.info(`تمت إزالة ${item.name} من السلة`);
      }
      return prev.filter((item) => item.id !== productId);
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    toast.info("تم تفريغ السلة");
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        toast.info(`${product.name} موجود بالفعل في المفضلة`);
        return prev;
      }
      toast.success(`تمت إضافة ${product.name} إلى المفضلة`);
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) {
        toast.info(`تمت إزالة ${item.name} من المفضلة`);
      }
      return prev.filter((item) => item.id !== productId);
    });
  }, []);

  const isInWishlist = useCallback((productId: number) => {
    return wishlist.some((item) => item.id === productId);
  }, [wishlist]);

  const convertPrice = useCallback((price: number) => {
    return currency === "USD" ? Math.round(price * EXCHANGE_RATE) : price;
  }, [currency]);

  const currencySymbol = currency === "AED" ? "د.إ" : "$";

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isCartOpen,
        setIsCartOpen,
        currency,
        setCurrency,
        convertPrice,
        currencySymbol,
        location,
        setLocation,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
