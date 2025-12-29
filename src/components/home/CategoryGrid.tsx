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

const categories = [
  { icon: Cpu, label: "معالجات", color: "from-blue-500/20 to-transparent" },
  { icon: Monitor, label: "كروت شاشة", color: "from-green-500/20 to-transparent" },
  { icon: Laptop, label: "لابتوبات", color: "from-purple-500/20 to-transparent" },
  { icon: Gamepad2, label: "ألعاب", color: "from-red-500/20 to-transparent" },
  { icon: Smartphone, label: "هواتف", color: "from-pink-500/20 to-transparent" },
  { icon: Headphones, label: "سماعات", color: "from-yellow-500/20 to-transparent" },
  { icon: Tv, label: "شاشات", color: "from-cyan-500/20 to-transparent" },
  { icon: Camera, label: "كاميرات", color: "from-orange-500/20 to-transparent" },
  { icon: HardDrive, label: "تخزين", color: "from-emerald-500/20 to-transparent" },
  { icon: Wifi, label: "شبكات", color: "from-indigo-500/20 to-transparent" },
  { icon: Watch, label: "ساعات ذكية", color: "from-rose-500/20 to-transparent" },
  { icon: Printer, label: "طابعات", color: "from-teal-500/20 to-transparent" },
];

const CategoryGrid = () => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">تسوق حسب الفئة</h2>
        <a href="#" className="text-primary hover:underline text-sm font-medium">
          عرض الكل
        </a>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer"
          >
            <div className={`aspect-square bg-gradient-to-br ${category.color} bg-card border border-border rounded-xl flex items-center justify-center hover:border-primary/50 transition-all duration-300 hover-scale`}>
              <category.icon className="h-8 w-8 text-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-center text-sm mt-2 font-medium group-hover:text-primary transition-colors">
              {category.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
