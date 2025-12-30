import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Truck, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroCarousel = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      titleKey: "deliveryIn60Min",
      subtitleKey: "inDubaiAbuDhabi",
      descriptionKey: "orderNowFast",
      icon: Truck,
      image: heroSlide1,
    },
    {
      id: 2,
      titleKey: "yearEndSale",
      subtitleKey: "upTo70Off",
      descriptionKey: "dontMissDeals",
      icon: Clock,
      image: heroSlide2,
    },
    {
      id: 3,
      titleKey: "genuineWarranty",
      subtitleKey: "trustedProducts",
      descriptionKey: "allProductsOriginal",
      icon: Shield,
      image: heroSlide3,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleShopNow = (titleKey: string) => {
    toast.success(`${t("shopNow")} - ${t(titleKey)}`);
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg">
      <div className="relative h-[300px] md:h-[450px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 translate-x-full' 
                  : 'opacity-0 -translate-x-full'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={t(slide.titleKey)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-foreground/40 to-foreground/70" />
            </div>
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container">
                <div className="max-w-lg animate-fade-in-up">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 gradient-primary rounded-full shadow-lg">
                      <slide.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 text-primary-foreground drop-shadow-lg">{t(slide.titleKey)}</h2>
                  <p className="text-2xl text-primary-foreground font-semibold mb-4 drop-shadow">{t(slide.subtitleKey)}</p>
                  <p className="text-primary-foreground/90 text-lg mb-6 drop-shadow">{t(slide.descriptionKey)}</p>
                  <Button 
                    className="btn-gradient text-lg px-8 py-6 rounded-xl shadow-lg hover-scale"
                    onClick={() => handleShopNow(slide.titleKey)}
                  >
                    {t("shopNow")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm hover:bg-card text-foreground h-12 w-12 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm hover:bg-card text-foreground h-12 w-12 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-10 gradient-primary shadow-lg' 
                : 'w-3 bg-card/60 hover:bg-card'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;