import { MapPin, Phone, Globe } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-header border-b border-border py-2">
      <div className="container flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            <MapPin className="h-4 w-4" />
            <span>التوصيل إلى أبوظبي</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            <Phone className="h-4 w-4" />
            <span>800-MICRO</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            <Globe className="h-4 w-4" />
            <span>العربية</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="hover:text-primary transition-colors cursor-pointer">AED</span>
            <span>|</span>
            <span className="hover:text-primary transition-colors cursor-pointer">USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
