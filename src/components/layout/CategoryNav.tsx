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

interface CategoryItem {
  icon: typeof Menu;
  label: string;
  slug: string | null;
}

const categories: CategoryItem[] = [
  { icon: Menu, label: "جميع الفئات", slug: "all" },
  { icon: Monitor, label: "مكونات الكمبيوتر", slug: "components" },
  { icon: Laptop, label: "لابتوبات", slug: "laptops" },
  { icon: Gamepad2, label: "ألعاب", slug: "gaming" },
  { icon: Smartphone, label: "هواتف", slug: "phones" },
  { icon: Headphones, label: "صوتيات", slug: "audio" },
  { icon: Tv, label: "تلفزيونات", slug: "tvs" },
  { icon: Camera, label: "كاميرات", slug: "cameras" },
  { icon: Printer, label: "طابعات", slug: "printers" },
];

const CategoryNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentCategory = location.pathname.startsWith("/category/") 
    ? location.pathname.split("/category/")[1] 
    : null;

  const handleCategoryClick = (slug: string | null) => {
    if (slug) {
      navigate(`/category/${slug}`);
    }
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
              <span>{category.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
