import { 
  Monitor, 
  Laptop, 
  Gamepad2, 
  Smartphone, 
  Headphones, 
  Tv, 
  Camera, 
  Printer,
  Cpu,
  HardDrive,
  Wifi,
  Watch
} from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const CategoryGrid = () => {
  const { t } = useLanguage();

  const categories = [
    { icon: Cpu, labelKey: "processors", color: "from-blue-500/20 to-transparent" },
    { icon: Monitor, labelKey: "graphicsCards", color: "from-green-500/20 to-transparent" },
    { icon: Laptop, labelKey: "laptops", color: "from-purple-500/20 to-transparent" },
    { icon: Gamepad2, labelKey: "gaming", color: "from-red-500/20 to-transparent" },
    { icon: Smartphone, labelKey: "phones", color: "from-pink-500/20 to-transparent" },
    { icon: Headphones, labelKey: "headphones", color: "from-yellow-500/20 to-transparent" },
    { icon: Tv, labelKey: "monitors", color: "from-cyan-500/20 to-transparent" },
    { icon: Camera, labelKey: "cameras", color: "from-orange-500/20 to-transparent" },
    { icon: HardDrive, labelKey: "storage", color: "from-emerald-500/20 to-transparent" },
    { icon: Wifi, labelKey: "networking", color: "from-indigo-500/20 to-transparent" },
    { icon: Watch, labelKey: "smartwatches", color: "from-rose-500/20 to-transparent" },
    { icon: Printer, labelKey: "printers", color: "from-teal-500/20 to-transparent" },
  ];

  const handleCategoryClick = (labelKey: string) => {
    toast.info(`${t("browseCategory")} ${t(labelKey)}`);
  };

  const handleViewAll = () => {
    toast.info(t("viewAllCategories"));
  };

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{t("shopByCategory")}</h2>
        <button 
          onClick={handleViewAll}
          className="text-primary hover:underline text-sm font-medium"
        >
          {t("viewAll")}
        </button>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category.labelKey)}
            className="group cursor-pointer"
          >
            <div className={`aspect-square bg-gradient-to-br ${category.color} bg-card border border-border rounded-xl flex items-center justify-center hover:border-primary/50 transition-all duration-300 hover-scale`}>
              <category.icon className="h-8 w-8 text-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-center text-sm mt-2 font-medium group-hover:text-primary transition-colors">
              {t(category.labelKey)}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;