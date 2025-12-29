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
  return (
    <nav className="bg-nav py-3">
      <div className="container">
        <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`flex items-center gap-2 text-nav-foreground hover:bg-nav-foreground/10 whitespace-nowrap font-semibold ${
                index === 0 ? 'bg-nav-foreground/10' : ''
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
