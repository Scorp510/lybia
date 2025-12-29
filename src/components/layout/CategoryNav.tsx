import { useNavigate, useLocation } from "react-router-dom";
import { 
  Monitor, 
  Laptop, 
  Gamepad2, 
  Smartphone, 
  Headphones, 
  Tv, 
  Camera, 
  Printer,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCategory } from "@/contexts/StoreContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryItem {
  icon: typeof Menu;
  labelKey: string;
  slug: string;
}

const categories: CategoryItem[] = [
  { icon: Menu, labelKey: "all", slug: "all" },
  { icon: Monitor, labelKey: "components", slug: "components" },
  { icon: Laptop, labelKey: "laptops", slug: "laptops" },
  { icon: Gamepad2, labelKey: "gaming", slug: "gaming" },
  { icon: Smartphone, labelKey: "phones", slug: "phones" },
  { icon: Headphones, labelKey: "audio", slug: "audio" },
  { icon: Tv, labelKey: "tvs", slug: "tvs" },
  { icon: Camera, labelKey: "cameras", slug: "cameras" },
  { icon: Printer, labelKey: "printers", slug: "printers" },
];

const CategoryNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  const currentCategory = location.pathname.startsWith("/category/") 
    ? location.pathname.split("/category/")[1] 
    : null;

  const handleCategoryClick = (slug: string) => {
    navigate(`/category/${slug}`);
  };

  return (
    <nav className="gradient-primary py-3 shadow-md">
      <div className="container">
        <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => handleCategoryClick(category.slug)}
              className={`flex items-center gap-2 text-primary-foreground hover:bg-primary-foreground/20 whitespace-nowrap font-semibold transition-all ${
                currentCategory === category.slug ? 'bg-primary-foreground/20' : ''
              }`}
            >
              <category.icon className="h-5 w-5" />
              <span>{t(category.labelKey)}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
