import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen,
    searchQuery,
    setSearchQuery 
  } = useStore();

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsSearchOpen(true);
    }
  };

  return (
    <header className="bg-header py-4 sticky top-0 z-50 border-b border-border">
      <div className="container">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div 
              onClick={() => navigate("/")}
              className="text-primary font-bold text-3xl tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            >
              {language === "ar" ? "مايكروليس" : "Microless"}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-full bg-secondary border-border text-foreground placeholder:text-muted-foreground px-12 h-12 rounded-lg cursor-pointer"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchKeyDown}
                onClick={handleSearchClick}
                readOnly
              />
              <Button 
                size="icon" 
                className={`absolute top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10 rounded-md ${language === "ar" ? "left-1" : "right-1"}`}
                onClick={handleSearchClick}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground hover:text-primary relative"
              onClick={() => navigate("/profile")}
            >
              <Heart className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-sale text-sale-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground hover:text-primary relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => navigate("/profile")}
            >
              <User className="h-6 w-6" />
              <span className="hidden md:inline">{t("profile")}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
