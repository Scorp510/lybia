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
import { useState } from "react";
import { toast } from "sonner";

const categories = [
  { icon: Menu, label: "جميع الفئات" },
  { icon: Monitor, label: "مكونات الكمبيوتر" },
  { icon: Laptop, label: "لابتوبات" },
  { icon: Gamepad2, label: "ألعاب" },
  { icon: Smartphone, label: "هواتف" },
  { icon: Headphones, label: "صوتيات" },
  { icon: Tv, label: "تلفزيونات" },
  { icon: Camera, label: "كاميرات" },
  { icon: Printer, label: "طابعات" },
];

const CategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const handleCategoryClick = (index: number, label: string) => {
    setActiveCategory(index);
    toast.info(`تم اختيار: ${label}`);
  };

  return (
    <nav className="bg-nav py-3">
      <div className="container">
        <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => handleCategoryClick(index, category.label)}
              className={`flex items-center gap-2 text-nav-foreground hover:bg-nav-foreground/10 whitespace-nowrap font-semibold transition-all ${
                activeCategory === index ? 'bg-nav-foreground/10 text-nav-foreground' : ''
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
