import { MapPin, Phone, ChevronDown, User } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationDialog from "@/components/store/LocationDialog";
import ThemeToggle from "@/components/layout/ThemeToggle";
import LanguageToggle from "@/components/layout/LanguageToggle";

const TopBar = () => {
  const { currency, setCurrency, location } = useStore();
  const { t } = useLanguage();
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="gradient-header text-primary-foreground py-2">
        <div className="container flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLocationDialogOpen(true)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <MapPin className="h-4 w-4" />
              <span>{t("deliveryTo")} {location}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            <a 
              href="tel:800-MICRO"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              <span>800-MICRO</span>
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrency("AED")}
                className={`hover:opacity-80 transition-opacity cursor-pointer px-2 py-0.5 rounded ${currency === "AED" ? "bg-primary-foreground/20 font-bold" : ""}`}
              >
                AED
              </button>
              <span>|</span>
              <button 
                onClick={() => setCurrency("USD")}
                className={`hover:opacity-80 transition-opacity cursor-pointer px-2 py-0.5 rounded ${currency === "USD" ? "bg-primary-foreground/20 font-bold" : ""}`}
              >
                USD
              </button>
            </div>

            <div className="h-4 w-px bg-primary-foreground/30" />
            
            <LanguageToggle />
            <ThemeToggle />

            <div className="h-4 w-px bg-primary-foreground/30" />

            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{t("login")}</span>
            </button>
          </div>
        </div>
      </div>
      
      <LocationDialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen} />
    </>
  );
};

export default TopBar;
