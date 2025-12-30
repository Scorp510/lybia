import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export const translations: Translations = {
  // App Title & Meta
  appName: { ar: "مايكروليس", en: "Microless" },
  appTitle: { ar: "مايكروليس - متجر الإلكترونيات الأول في الإمارات", en: "Microless - UAE's #1 Electronics Store" },
  appDescription: { ar: "تسوق أحدث الإلكترونيات ومكونات الكمبيوتر بأفضل الأسعار. توصيل سريع في دبي وأبوظبي. ضمان أصلي 100%.", en: "Shop the latest electronics and computer components at the best prices. Fast delivery in Dubai and Abu Dhabi. 100% genuine warranty." },
  
  // TopBar
  deliveryTo: { ar: "التوصيل إلى", en: "Deliver to" },
  login: { ar: "تسجيل الدخول", en: "Login" },
  callUs: { ar: "اتصل بنا", en: "Call us" },
  
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
  processors: { ar: "معالجات", en: "Processors" },
  graphicsCards: { ar: "كروت شاشة", en: "Graphics Cards" },
  headphones: { ar: "سماعات", en: "Headphones" },
  monitors: { ar: "شاشات", en: "Monitors" },
  storage: { ar: "تخزين", en: "Storage" },
  networking: { ar: "شبكات", en: "Networking" },
  smartwatches: { ar: "ساعات ذكية", en: "Smartwatches" },
  
  // Product Card
  freeShipping: { ar: "شحن مجاني", en: "Free Shipping" },
  fastDelivery: { ar: "توصيل سريع", en: "Fast Delivery" },
  off: { ar: "خصم", en: "OFF" },
  
  // Cart
  cart: { ar: "سلة التسوق", en: "Shopping Cart" },
  emptyCart: { ar: "سلتك فارغة", en: "Your cart is empty" },
  addItems: { ar: "أضف بعض المنتجات إلى سلتك", en: "Add some products to your cart" },
  total: { ar: "المجموع", en: "Total" },
  checkout: { ar: "إتمام الطلب", en: "Checkout" },
  continueShopping: { ar: "متابعة التسوق", en: "Continue Shopping" },
  itemsInCart: { ar: "منتجات في السلة", en: "items in cart" },
  
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
  viewAll: { ar: "عرض الكل", en: "View All" },
  shopNow: { ar: "تسوق الآن", en: "Shop Now" },
  learnMore: { ar: "اكتشف المزيد", en: "Learn More" },
  
  // Theme
  lightMode: { ar: "الوضع الفاتح", en: "Light Mode" },
  darkMode: { ar: "الوضع الداكن", en: "Dark Mode" },
  
  // Language
  language: { ar: "اللغة", en: "Language" },
  arabic: { ar: "العربية", en: "Arabic" },
  english: { ar: "الإنجليزية", en: "English" },
  
  // Hero Carousel
  deliveryIn60Min: { ar: "توصيل خلال 60 دقيقة", en: "Delivery in 60 Minutes" },
  inDubaiAbuDhabi: { ar: "في دبي وأبوظبي", en: "In Dubai & Abu Dhabi" },
  orderNowFast: { ar: "اطلب الآن واستلم منتجك بأسرع وقت", en: "Order now and receive your product fastest" },
  yearEndSale: { ar: "عروض نهاية العام", en: "Year-End Sale" },
  upTo70Off: { ar: "خصومات تصل إلى 70%", en: "Up to 70% Off" },
  dontMissDeals: { ar: "لا تفوت أقوى العروض على الإلكترونيات", en: "Don't miss the best electronics deals" },
  genuineWarranty: { ar: "ضمان أصلي 100%", en: "100% Genuine Warranty" },
  trustedProducts: { ar: "منتجات موثوقة", en: "Trusted Products" },
  allProductsOriginal: { ar: "جميع المنتجات أصلية مع ضمان المصنع", en: "All products are original with manufacturer warranty" },
  
  // Promo Banners
  fastDeliveryBanner: { ar: "توصيل سريع", en: "Fast Delivery" },
  in60MinDubai: { ar: "خلال 60 دقيقة في دبي", en: "Within 60 minutes in Dubai" },
  discount15: { ar: "خصم 15%", en: "15% Discount" },
  onFirstOrder: { ar: "على أول طلب لك", en: "On your first order" },
  freeGifts: { ar: "هدايا مجانية", en: "Free Gifts" },
  withOrdersOver500: { ar: "مع الطلبات فوق 500 د.إ", en: "With orders over 500 AED" },
  
  // Deals Section
  todaysDeals: { ar: "عروض اليوم", en: "Today's Deals" },
  exclusiveDiscounts: { ar: "خصومات حصرية لفترة محدودة", en: "Exclusive limited-time discounts" },
  endsIn: { ar: "ينتهي خلال:", en: "Ends in:" },
  
  // Category Grid
  shopByCategory: { ar: "تسوق حسب الفئة", en: "Shop by Category" },
  browseCategory: { ar: "تصفح قسم:", en: "Browse category:" },
  viewAllCategories: { ar: "عرض جميع الأقسام", en: "View all categories" },
  
  // New Arrivals
  newArrivals: { ar: "وصل حديثاً", en: "New Arrivals" },
  latestProducts: { ar: "أحدث المنتجات في متجرنا", en: "Latest products in our store" },
  viewAllNewProducts: { ar: "عرض جميع المنتجات الجديدة", en: "View all new products" },
  
  // Featured Brands
  featuredBrands: { ar: "العلامات التجارية المميزة", en: "Featured Brands" },
  viewBrandProducts: { ar: "عرض منتجات", en: "View products from" },
  viewAllBrands: { ar: "عرض جميع العلامات التجارية", en: "View all brands" },
  
  // Footer
  aboutUs: { ar: "من نحن", en: "About Us" },
  contactUs: { ar: "اتصل بنا", en: "Contact Us" },
  returnPolicy: { ar: "سياسة الإرجاع", en: "Return Policy" },
  termsConditions: { ar: "الشروط والأحكام", en: "Terms & Conditions" },
  privacyPolicy: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  quickLinks: { ar: "روابط سريعة", en: "Quick Links" },
  customerService: { ar: "خدمة العملاء", en: "Customer Service" },
  trackOrder: { ar: "تتبع الطلب", en: "Track Order" },
  faq: { ar: "الأسئلة الشائعة", en: "FAQ" },
  technicalSupport: { ar: "الدعم الفني", en: "Technical Support" },
  paymentMethods: { ar: "طرق الدفع", en: "Payment Methods" },
  deliveryShipping: { ar: "التوصيل والشحن", en: "Delivery & Shipping" },
  newsletter: { ar: "اشترك في النشرة البريدية", en: "Subscribe to Newsletter" },
  newsletterDesc: { ar: "احصل على أحدث العروض والتخفيضات", en: "Get the latest deals and discounts" },
  subscribe: { ar: "اشترك", en: "Subscribe" },
  emailPlaceholder: { ar: "البريد الإلكتروني", en: "Email address" },
  footerDescription: { ar: "متجرك الموثوق للإلكترونيات ومكونات الكمبيوتر في الإمارات. توصيل سريع وأسعار تنافسية.", en: "Your trusted store for electronics and computer components in the UAE. Fast delivery and competitive prices." },
  allRightsReserved: { ar: "جميع الحقوق محفوظة.", en: "All rights reserved." },
  dubaiUAE: { ar: "دبي، الإمارات العربية المتحدة", en: "Dubai, United Arab Emirates" },
  
  // Toast Messages
  subscribeSuccess: { ar: "تم الاشتراك بنجاح! شكراً لك", en: "Subscribed successfully! Thank you" },
  enterEmail: { ar: "الرجاء إدخال البريد الإلكتروني", en: "Please enter your email" },
  enterValidEmail: { ar: "الرجاء إدخال بريد إلكتروني صحيح", en: "Please enter a valid email" },
  willOpen: { ar: "سيتم فتح", en: "Opening" },
  navigateTo: { ar: "سيتم الانتقال إلى:", en: "Navigating to:" },
  addedToCart: { ar: "تمت الإضافة إلى السلة", en: "Added to cart" },
  addedToWishlist: { ar: "تمت الإضافة للمفضلة", en: "Added to wishlist" },
  removedFromWishlist: { ar: "تمت الإزالة من المفضلة", en: "Removed from wishlist" },
  
  // Auth Page
  welcomeBack: { ar: "مرحبًا بعودتك!", en: "Welcome back!" },
  joinUs: { ar: "انضم إلينا اليوم", en: "Join us today" },
  signIn: { ar: "تسجيل الدخول", en: "Sign In" },
  signUp: { ar: "إنشاء حساب", en: "Sign Up" },
  createAccount: { ar: "إنشاء حساب جديد", en: "Create new account" },
  forgotPassword: { ar: "نسيت كلمة المرور؟", en: "Forgot password?" },
  resetPassword: { ar: "استعادة كلمة المرور", en: "Reset Password" },
  changePassword: { ar: "تغيير كلمة المرور", en: "Change Password" },
  newPassword: { ar: "كلمة المرور الجديدة", en: "New Password" },
  enterEmailForReset: { ar: "أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور", en: "Enter your email to reset password" },
  enterNewPassword: { ar: "أدخل كلمة مرور جديدة لحسابك", en: "Enter a new password for your account" },
  sendResetLink: { ar: "إرسال رابط إعادة التعيين", en: "Send Reset Link" },
  checkYourEmail: { ar: "تحقق من بريدك", en: "Check your email" },
  resetLinkSent: { ar: "تم إرسال رابط إعادة التعيين", en: "Reset link sent" },
  emailVerification: { ar: "تأكيد البريد الإلكتروني", en: "Email Verification" },
  verificationLinkSent: { ar: "تم إرسال رابط التأكيد", en: "Verification link sent" },
  backToStore: { ar: "العودة للمتجر", en: "Back to Store" },
  backToLogin: { ar: "العودة لتسجيل الدخول", en: "Back to Login" },
  fullName: { ar: "الاسم الكامل", en: "Full Name" },
  enterFullName: { ar: "أدخل اسمك الكامل", en: "Enter your full name" },
  email: { ar: "البريد الإلكتروني", en: "Email" },
  password: { ar: "كلمة المرور", en: "Password" },
  noAccount: { ar: "ليس لديك حساب؟", en: "Don't have an account?" },
  haveAccount: { ar: "لديك حساب بالفعل؟", en: "Already have an account?" },
  or: { ar: "أو", en: "or" },
  signInWithGoogle: { ar: "تسجيل الدخول بـ Google", en: "Sign in with Google" },
  signUpWithGoogle: { ar: "التسجيل بـ Google", en: "Sign up with Google" },
  shopSmartly: { ar: "تسوق بذكاء مع مايكروليس", en: "Shop Smart with Microless" },
  largestStore: { ar: "أكبر متجر للإلكترونيات في الإمارات مع أفضل الأسعار والعروض الحصرية", en: "The largest electronics store in the UAE with the best prices and exclusive offers" },
  trackOrders: { ar: "تتبع طلباتك بسهولة", en: "Track your orders easily" },
  saveFavorites: { ar: "احفظ المنتجات المفضلة", en: "Save favorite products" },
  exclusiveOffers: { ar: "عروض حصرية للأعضاء", en: "Exclusive member offers" },
  freeShippingOver500: { ar: "شحن مجاني على الطلبات فوق 500 درهم", en: "Free shipping on orders over 500 AED" },
  specialOffer: { ar: "عرض خاص للأعضاء الجدد!", en: "Special offer for new members!" },
  get10Off: { ar: "احصل على خصم 10% على طلبك الأول عند التسجيل", en: "Get 10% off your first order when you sign up" },
  passwordResetSentTo: { ar: "رابط إعادة تعيين كلمة المرور", en: "Password reset link" },
  verificationSentTo: { ar: "رابط تأكيد البريد الإلكتروني", en: "Email verification link" },
  sentTo: { ar: "تم إرسال", en: "Sent" },
  to: { ar: "إلى:", en: "to:" },
  checkInbox: { ar: "يرجى التحقق من صندوق الوارد الخاص بك واتباع التعليمات. إذا لم تجد الرسالة، تحقق من مجلد البريد العشوائي.", en: "Please check your inbox and follow the instructions. If you don't find the message, check your spam folder." },
  
  // Validation Errors
  invalidEmail: { ar: "البريد الإلكتروني غير صحيح", en: "Invalid email address" },
  passwordMin6: { ar: "كلمة المرور يجب أن تكون 6 أحرف على الأقل", en: "Password must be at least 6 characters" },
  nameMin2: { ar: "الاسم يجب أن يكون حرفين على الأقل", en: "Name must be at least 2 characters" },
  invalidCredentials: { ar: "البريد الإلكتروني أو كلمة المرور غير صحيحة", en: "Invalid email or password" },
  emailNotConfirmed: { ar: "يرجى تأكيد بريدك الإلكتروني أولاً", en: "Please confirm your email first" },
  userAlreadyRegistered: { ar: "هذا البريد الإلكتروني مسجل بالفعل", en: "This email is already registered" },
  accountCreated: { ar: "تم إنشاء الحساب بنجاح!", en: "Account created successfully!" },
  loginSuccess: { ar: "تم تسجيل الدخول بنجاح!", en: "Logged in successfully!" },
  passwordChanged: { ar: "تم تغيير كلمة المرور بنجاح!", en: "Password changed successfully!" },
  resetLinkInvalid: { ar: "رابط إعادة التعيين غير صالح أو منتهي", en: "Reset link is invalid or expired" },
  unexpectedError: { ar: "حدث خطأ غير متوقع", en: "An unexpected error occurred" },
  googleSignInError: { ar: "حدث خطأ أثناء تسجيل الدخول بـ Google", en: "Error signing in with Google" },
  
  // Currency
  aed: { ar: "د.إ", en: "AED" },
  usd: { ar: "دولار", en: "USD" },
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