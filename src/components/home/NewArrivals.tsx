import { Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const products = [
  {
    id: 7,
    name: { ar: "لابتوب ASUS ROG Strix G16 - RTX 4070", en: "ASUS ROG Strix G16 Laptop - RTX 4070" },
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
    price: 6499,
    rating: 4.7,
    reviewCount: 45,
    freeShipping: true,
    fastDelivery: true,
  },
  {
    id: 8,
    name: { ar: "سماعة رأس SteelSeries Arctis Nova Pro", en: "SteelSeries Arctis Nova Pro Headset" },
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    price: 1399,
    rating: 4.9,
    reviewCount: 89,
    freeShipping: true,
    fastDelivery: false,
  },
  {
    id: 9,
    name: { ar: "ماوس Logitech G Pro X Superlight 2", en: "Logitech G Pro X Superlight 2 Mouse" },
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    price: 599,
    rating: 4.8,
    reviewCount: 234,
    freeShipping: false,
    fastDelivery: true,
  },
  {
    id: 10,
    name: { ar: "لوحة مفاتيح Razer BlackWidow V4 Pro", en: "Razer BlackWidow V4 Pro Keyboard" },
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
    price: 899,
    rating: 4.6,
    reviewCount: 167,
    freeShipping: true,
    fastDelivery: true,
  },
  {
    id: 11,
    name: { ar: "شاشة Samsung Odyssey G9 49 بوصة", en: "Samsung Odyssey G9 49-inch Monitor" },
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    price: 4999,
    rating: 4.8,
    reviewCount: 56,
    freeShipping: true,
    fastDelivery: false,
  },
  {
    id: 12,
    name: { ar: "صندوق حاسب Lian Li O11 Dynamic EVO", en: "Lian Li O11 Dynamic EVO PC Case" },
    image: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=400&h=400&fit=crop",
    price: 799,
    rating: 4.7,
    reviewCount: 123,
    freeShipping: false,
    fastDelivery: true,
  },
];

const NewArrivals = () => {
  const { t, language } = useLanguage();

  const handleViewAll = () => {
    toast.info(t("viewAllNewProducts"));
  };

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{t("newArrivals")}</h2>
            <p className="text-muted-foreground text-sm">{t("latestProducts")}</p>
          </div>
        </div>
        
        <button 
          onClick={handleViewAll}
          className="text-primary hover:underline text-sm font-medium"
        >
          {t("viewAll")}
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            name={typeof product.name === 'object' ? product.name[language] : product.name}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;