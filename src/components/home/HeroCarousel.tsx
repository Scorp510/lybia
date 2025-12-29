import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Truck, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "توصيل خلال 60 دقيقة",
    subtitle: "في دبي وأبوظبي",
    description: "اطلب الآن واستلم منتجك بأسرع وقت",
    icon: Truck,
    gradient: "from-primary/20 to-transparent",
  },
  {
    id: 2,
    title: "عروض نهاية العام",
    subtitle: "خصومات تصل إلى 70%",
    description: "لا تفوت أقوى العروض على الإلكترونيات",
    icon: Clock,
    gradient: "from-sale/20 to-transparent",
  },
  {
    id: 3,
    title: "ضمان أصلي 100%",
    subtitle: "منتجات موثوقة",
    description: "جميع المنتجات أصلية مع ضمان المصنع",
    icon: Shield,
    gradient: "from-success/20 to-transparent",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative overflow-hidden rounded-xl bg-card border border-border">
      <div className="relative h-[300px] md:h-[400px]">
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
            <div className={`h-full bg-gradient-to-l ${slide.gradient} flex items-center`}>
              <div className="container">
                <div className="flex items-center justify-between">
                  <div className="max-w-lg animate-fade-in">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/20 rounded-full">
                        <slide.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-2">{slide.title}</h2>
                    <p className="text-2xl text-primary font-semibold mb-4">{slide.subtitle}</p>
                    <p className="text-muted-foreground text-lg mb-6">{slide.description}</p>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                      تسوق الآن
                    </Button>
                  </div>
                  
                  <div className="hidden lg:block">
                    <div className="w-64 h-64 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl" />
                  </div>
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
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 text-foreground h-12 w-12 rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 text-foreground h-12 w-12 rounded-full"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-muted-foreground/50 hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
