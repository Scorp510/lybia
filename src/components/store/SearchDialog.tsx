import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Clock, TrendingUp, X } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { useState } from "react";
import { toast } from "sonner";

const popularSearches = [
  "RTX 4090",
  "لابتوب جيمنج",
  "AMD Ryzen",
  "سماعات بلوتوث",
  "شاشة 4K",
  "لوحة مفاتيح ميكانيكية",
];

const recentSearches = [
  "NVIDIA GeForce",
  "ماوس جيمنج",
  "SSD 2TB",
];

const SearchDialog = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLocalQuery(query);
    if (query.trim()) {
      toast.info(`جاري البحث عن: ${query}`);
      setIsSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(localQuery);
    }
  };

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogContent className="sm:max-w-2xl bg-background border-border p-0 gap-0">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              autoFocus
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ابحث عن المنتجات..."
              className="pr-10 pl-10 h-12 text-lg bg-secondary border-border"
            />
            {localQuery && (
              <button
                onClick={() => setLocalQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <Clock className="h-4 w-4" />
                عمليات البحث الأخيرة
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(term)}
                    className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
              <TrendingUp className="h-4 w-4" />
              الأكثر بحثاً
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(term)}
                  className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
