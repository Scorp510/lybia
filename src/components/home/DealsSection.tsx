import { useState, useEffect } from "react";
import { Flame, Clock } from "lucide-react";
import ProductCard from "./ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

const products = [
  {
    id: 1,
    name: { ar: "بطاقة رسومات NVIDIA GeForce RTX 4090 24GB", en: "NVIDIA GeForce RTX 4090 24GB Graphics Card" },
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop",
    price: 7999,
    originalPrice: 9499,
    rating: 4.8,
    reviewCount: 156,
    discount: 16,
    freeShipping: true,
    fastDelivery: true,
  },
  {
    id: 2,
    name: { ar: "معالج AMD Ryzen 9 7950X3D", en: "AMD Ryzen 9 7950X3D Processor" },
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop",
    price: 2499,
    originalPrice: 2899,
    rating: 4.9,
    reviewCount: 234,
    discount: 14,
    freeShipping: true,
    fastDelivery: false,
  },
  {
    id: 3,
    name: { ar: "لوحة أم ASUS ROG Maximus Z790 Hero", en: "ASUS ROG Maximus Z790 Hero Motherboard" },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    price: 2899,
    originalPrice: 3299,
    rating: 4.7,
    reviewCount: 89,
    discount: 12,
    freeShipping: false,
    fastDelivery: true,
  },
  {
    id: 4,
    name: { ar: "ذاكرة عشوائية G.Skill Trident Z5 RGB 64GB", en: "G.Skill Trident Z5 RGB 64GB RAM" },
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=400&fit=crop",
    price: 1199,
    originalPrice: 1499,
    rating: 4.6,
    reviewCount: 167,
    discount: 20,
    freeShipping: true,
    fastDelivery: true,
  },
  {
    id: 5,
    name: { ar: "قرص تخزين Samsung 990 Pro 2TB NVMe SSD", en: "Samsung 990 Pro 2TB NVMe SSD" },
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop",
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    reviewCount: 312,
    discount: 18,
    freeShipping: true,
    fastDelivery: false,
  },
  {
    id: 6,
    name: { ar: "مبرد معالج NZXT Kraken Z73 RGB", en: "NZXT Kraken Z73 RGB CPU Cooler" },
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop",
    price: 1299,
    originalPrice: 1599,
    rating: 4.5,
    reviewCount: 78,
    discount: 19,
    freeShipping: false,
    fastDelivery: true,
  },
];

const DealsSection = () => {
  const { t, language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sale/20 rounded-lg">
            <Flame className="h-6 w-6 text-sale" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{t("todaysDeals")}</h2>
            <p className="text-muted-foreground text-sm">{t("exclusiveDiscounts")}</p>
          </div>
        </div>
        
        {/* Countdown */}
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <span className="text-muted-foreground text-sm">{t("endsIn")}</span>
          <div className="flex items-center gap-1">
            <span className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-bold text-lg animate-countdown">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-primary font-bold">:</span>
            <span className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-bold text-lg">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-primary font-bold">:</span>
            <span className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-bold text-lg">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
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

export default DealsSection;