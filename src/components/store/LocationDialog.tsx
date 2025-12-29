import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Check } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { useState } from "react";

const locations = [
  "دبي",
  "أبوظبي",
  "الشارقة",
  "عجمان",
  "رأس الخيمة",
  "الفجيرة",
  "أم القيوين",
];

interface LocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LocationDialog = ({ open, onOpenChange }: LocationDialogProps) => {
  const { location, setLocation } = useStore();
  const [selectedLocation, setSelectedLocation] = useState(location);

  const handleConfirm = () => {
    setLocation(selectedLocation);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            اختر موقع التوصيل
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-2 mt-4">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                selectedLocation === loc
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <span className="font-medium">{loc}</span>
              {selectedLocation === loc && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            إلغاء
          </Button>
          <Button
            className="flex-1 bg-primary text-primary-foreground"
            onClick={handleConfirm}
          >
            تأكيد
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;
