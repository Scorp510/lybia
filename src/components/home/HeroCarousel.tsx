import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Truck, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const slides = [
  {
    id: 1,
    title: "توصيل خلال 60 دقيقة",
    subtitle: "في دبي وأبوظبي",
    description: "اطلب الآن واستلم منتجك بأسرع وقت",
    icon: Truck,
    image: heroSlide1,
  },
  {
    id: 2,
    title: "عروض نهاية العام",
    subtitle: "خصومات تصل إلى 70%",
    description: "لا تفوت أقوى العروض على الإلكترونيات",
    icon: Clock,
    image: heroSlide2,
  },
  {
    id: 3,
    title: "ضمان أصلي 100%",
    subtitle: "منتجات موثوقة",
    description: "جميع المنتجات أصلية مع ضمان المصنع",
    icon: Shield,
    image: heroSlide3,
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

  const handleShopNow = (slideTitle: string) => {
    toast.success(`تسوق الآن - ${slideTitle}`);
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
                alt={slide.title}
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
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 text-primary-foreground drop-shadow-lg">{slide.title}</h2>
                  <p className="text-2xl text-primary-foreground font-semibold mb-4 drop-shadow">{slide.subtitle}</p>
                  <p className="text-primary-foreground/90 text-lg mb-6 drop-shadow">{slide.description}</p>
                  <Button 
                    className="btn-gradient text-lg px-8 py-6 rounded-xl shadow-lg hover-scale"
                    onClick={() => handleShopNow(slide.title)}
                  >
                    تسوق الآن
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
