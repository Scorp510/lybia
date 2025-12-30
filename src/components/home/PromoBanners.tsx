import { Zap, Gift, Percent } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const PromoBanners = () => {
  const { t } = useLanguage();

  const banners = [
    {
      icon: Zap,
      titleKey: "fastDeliveryBanner",
      descriptionKey: "in60MinDubai",
      color: "from-primary/20 via-primary/10 to-transparent",
      iconColor: "text-primary",
    },
    {
      icon: Percent,
      titleKey: "discount15",
      descriptionKey: "onFirstOrder",
      color: "from-sale/20 via-sale/10 to-transparent",
      iconColor: "text-sale",
    },
    {
      icon: Gift,
      titleKey: "freeGifts",
      descriptionKey: "withOrdersOver500",
      color: "from-success/20 via-success/10 to-transparent",
      iconColor: "text-success",
    },
  ];

  const handleBannerClick = (titleKey: string) => {
    toast.info(`${t("learnMore")}: ${t(titleKey)}`);
  };

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {banners.map((banner, index) => (
          <button
            key={index}
            onClick={() => handleBannerClick(banner.titleKey)}
            className={`relative overflow-hidden bg-gradient-to-l ${banner.color} bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group cursor-pointer text-right w-full`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 bg-background/50 rounded-xl ${banner.iconColor}`}>
                <banner.icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{t(banner.titleKey)}</h3>
                <p className="text-muted-foreground text-sm">{t(banner.descriptionKey)}</p>
              </div>
            </div>
            
            {/* Decorative circle */}
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default PromoBanners;