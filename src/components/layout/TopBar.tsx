import { MapPin, Phone, Globe, ChevronDown } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { useState } from "react";
import LocationDialog from "@/components/store/LocationDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopBar = () => {
  const { currency, setCurrency, location } = useStore();
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  return (
    <>
      <div className="bg-header border-b border-border py-2">
        <div className="container flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLocationDialogOpen(true)}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <MapPin className="h-4 w-4" />
              <span>التوصيل إلى {location}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            <a 
              href="tel:800-MICRO"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              <span>800-MICRO</span>
            </a>
          </div>
          
          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Globe className="h-4 w-4" />
                <span>العربية</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border-border">
                <DropdownMenuItem className="cursor-pointer">العربية</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <button 
                onClick={() => setCurrency("AED")}
                className={`hover:text-primary transition-colors cursor-pointer ${currency === "AED" ? "text-primary font-bold" : ""}`}
              >
                AED
              </button>
              <span>|</span>
              <button 
                onClick={() => setCurrency("USD")}
                className={`hover:text-primary transition-colors cursor-pointer ${currency === "USD" ? "text-primary font-bold" : ""}`}
              >
                USD
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <LocationDialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen} />
    </>
  );
};

export default TopBar;
