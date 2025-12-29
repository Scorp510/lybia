import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-header py-4 sticky top-0 z-50 border-b border-border">
      <div className="container">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-primary font-bold text-3xl tracking-tight">
              مايكروليس
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="ابحث عن المنتجات، الماركات والمزيد..."
                className="w-full bg-secondary border-border text-foreground placeholder:text-muted-foreground pr-12 h-12 rounded-lg"
              />
              <Button 
                size="icon" 
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10 rounded-md"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary relative">
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-sale text-sale-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                3
              </span>
            </Button>
            
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                2
              </span>
            </Button>
            
            <Button variant="ghost" className="text-foreground hover:text-primary flex items-center gap-2">
              <User className="h-6 w-6" />
              <span className="hidden md:inline">حسابي</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
