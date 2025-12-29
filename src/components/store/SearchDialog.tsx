import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Clock, TrendingUp, X, ShoppingCart } from "lucide-react";
import { useStore, Product } from "@/contexts/StoreContext";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { allProducts } from "@/data/products";

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
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, addToCart, convertPrice, currencySymbol } = useStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Reset local query when dialog opens
  useEffect(() => {
    if (isSearchOpen) {
      setLocalQuery(searchQuery);
    }
  }, [isSearchOpen, searchQuery]);

  // Filter products based on search query
  const searchResults = useMemo(() => {
    if (!localQuery.trim()) return [];
    const query = localQuery.toLowerCase();
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.name.includes(localQuery)
    ).slice(0, 6);
  }, [localQuery]);

  const handleSearch = (query: string) => {
    setLocalQuery(query);
  };

  const handleSubmitSearch = () => {
    if (localQuery.trim()) {
      setSearchQuery(localQuery);
      setIsSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmitSearch();
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogContent className="sm:max-w-2xl bg-card border-border p-0 gap-0 overflow-hidden">
        <div className="p-4 border-b border-border gradient-primary">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              autoFocus
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ابحث عن المنتجات..."
              className="pr-10 pl-10 h-12 text-lg bg-card border-border rounded-xl"
            />
            {localQuery && (
              <button
                onClick={() => setLocalQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {/* Search Results */}
          {searchResults.length > 0 ? (
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <Search className="h-4 w-4" />
                نتائج البحث ({searchResults.length})
              </h3>
              <div className="space-y-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-all cursor-pointer group"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-primary font-bold">
                          {currencySymbol} {convertPrice(product.price).toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-muted-foreground text-sm line-through">
                            {currencySymbol} {convertPrice(product.originalPrice).toLocaleString()}
                          </span>
                        )}
                        {product.discount && (
                          <span className="text-xs bg-sale text-sale-foreground px-2 py-0.5 rounded-full">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="btn-gradient opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : localQuery.trim() ? (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>لم يتم العثور على نتائج لـ "{localQuery}"</p>
            </div>
          ) : (
            <>
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
                        className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-full text-sm transition-all hover:shadow-md"
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
                      className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm transition-all hover:shadow-md"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
