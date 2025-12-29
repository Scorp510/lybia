import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export const translations: Translations = {
  // TopBar
  deliveryTo: { ar: "التوصيل إلى", en: "Deliver to" },
  login: { ar: "تسجيل الدخول", en: "Login" },
  
  // Header
  searchPlaceholder: { ar: "ابحث عن المنتجات...", en: "Search products..." },
  
  // Categories
  all: { ar: "الكل", en: "All" },
  components: { ar: "مكونات الكمبيوتر", en: "Computer Components" },
  laptops: { ar: "لابتوبات", en: "Laptops" },
  gaming: { ar: "ألعاب", en: "Gaming" },
  phones: { ar: "هواتف", en: "Phones" },
  audio: { ar: "صوتيات", en: "Audio" },
  tvs: { ar: "تلفزيونات", en: "TVs" },
  cameras: { ar: "كاميرات", en: "Cameras" },
  printers: { ar: "طابعات", en: "Printers" },
  
  // Product Card
  freeShipping: { ar: "شحن مجاني", en: "Free Shipping" },
  fastDelivery: { ar: "توصيل سريع", en: "Fast Delivery" },
  
  // Cart
  cart: { ar: "سلة التسوق", en: "Shopping Cart" },
  emptyCart: { ar: "سلتك فارغة", en: "Your cart is empty" },
  addItems: { ar: "أضف بعض المنتجات إلى سلتك", en: "Add some products to your cart" },
  total: { ar: "المجموع", en: "Total" },
  checkout: { ar: "إتمام الطلب", en: "Checkout" },
  continueShopping: { ar: "متابعة التسوق", en: "Continue Shopping" },
  
  // Quick View
  quickView: { ar: "نظرة سريعة", en: "Quick View" },
  addToCart: { ar: "أضف للسلة", en: "Add to Cart" },
  viewDetails: { ar: "عرض التفاصيل", en: "View Details" },
  reviews: { ar: "تقييمات", en: "reviews" },
  
  // Profile
  profile: { ar: "الملف الشخصي", en: "Profile" },
  orders: { ar: "الطلبات", en: "Orders" },
  wishlist: { ar: "المفضلة", en: "Wishlist" },
  
  // Checkout
  cartReview: { ar: "مراجعة السلة", en: "Cart Review" },
  shippingAddress: { ar: "عنوان الشحن", en: "Shipping Address" },
  confirmation: { ar: "التأكيد", en: "Confirmation" },
  
  // General
  close: { ar: "إغلاق", en: "Close" },
  save: { ar: "حفظ", en: "Save" },
  cancel: { ar: "إلغاء", en: "Cancel" },
  next: { ar: "التالي", en: "Next" },
  back: { ar: "رجوع", en: "Back" },
  
  // Theme
  lightMode: { ar: "الوضع الفاتح", en: "Light Mode" },
  darkMode: { ar: "الوضع الداكن", en: "Dark Mode" },
  
  // Language
  language: { ar: "اللغة", en: "Language" },
  arabic: { ar: "العربية", en: "Arabic" },
  english: { ar: "الإنجليزية", en: "English" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    return (stored as Language) || "ar";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
