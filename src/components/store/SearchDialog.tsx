import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Clock, TrendingUp, X, ShoppingCart } from "lucide-react";
import { useStore, Product } from "@/contexts/StoreContext";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";

// All products database for search
const allProducts: Product[] = [
  {
    id: 1,
    name: "بطاقة رسومات NVIDIA GeForce RTX 4090 24GB",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop",
    price: 7999,
    originalPrice: 9499,
    rating: 4.8,
    reviewCount: 156,
    discount: 16,
    freeShipping: true,
    fastDelivery: true,
  },
  {
    id: 2,
    name: "معالج AMD Ryzen 9 7950X3D",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop",
    price: 2499,
    originalPrice: 2899,
    rating: 4.9,
    reviewCount: 234,
    discount: 14,
    freeShipping: true,
    fastDelivery: false,
  },
  {
    id: 3,
    name: "لوحة أم ASUS ROG Maximus Z790 Hero",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    price: 2899,
    originalPrice: 3299,
    rating: 4.7,
    reviewCount: 89,
    discount: 12,
    freeShipping: false,
    fastDelivery: true,
  },
  {
    id: 4,
    name: "ذاكرة عشوائية G.Skill Trident Z5 RGB 64GB",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=400&fit=crop",
    price: 1199,
    originalPrice: 1499,
    rating: 4.6,
    reviewCount: 167,
    discount: 20,
    freeShipping: true,
    fastDelivery: true,
  },
  {
    id: 5,
    name: "قرص تخزين Samsung 990 Pro 2TB NVMe SSD",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop",
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    reviewCount: 312,
    discount: 18,
    freeShipping: true,
    fastDelivery: false,
  },
  {
    id: 6,
    name: "مبرد معالج NZXT Kraken Z73 RGB",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop",
    price: 1299,
    originalPrice: 1599,
    rating: 4.5,
    reviewCount: 78,
    discount: 19,
    freeShipping: false,
    fastDelivery: true,
  },
  {
    id: 7,
    name: "لابتوب جيمنج ASUS ROG Strix G16",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
    price: 5999,
    originalPrice: 6999,
    rating: 4.7,
    reviewCount: 89,
    freeShipping: true,
    fastDelivery: true,
  },
  {
    id: 8,
    name: "سماعات رأس Razer BlackShark V2 Pro",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    price: 799,
    originalPrice: 999,
    rating: 4.6,
    reviewCount: 234,
    discount: 20,
    freeShipping: true,
    fastDelivery: false,
  },
  {
    id: 9,
    name: "ماوس جيمنج Logitech G Pro X Superlight",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    price: 599,
    originalPrice: 749,
    rating: 4.9,
    reviewCount: 567,
    discount: 20,
    freeShipping: true,
    fastDelivery: true,
  },
  {
    id: 10,
    name: "لوحة مفاتيح Corsair K70 RGB Pro",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop",
    price: 699,
    originalPrice: 849,
    rating: 4.7,
    reviewCount: 123,
    discount: 18,
    freeShipping: true,
    fastDelivery: true,
  },
  {
    id: 11,
    name: "شاشة جيمنج Samsung Odyssey G7 32 بوصة 4K",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    price: 3499,
    originalPrice: 4299,
    rating: 4.8,
    reviewCount: 89,
    discount: 19,
    freeShipping: true,
    fastDelivery: false,
  },
  {
    id: 12,
    name: "كرسي جيمنج Secretlab Titan Evo 2022",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop",
    price: 2199,
    originalPrice: 2599,
    rating: 4.6,
    reviewCount: 456,
    discount: 15,
    freeShipping: true,
    fastDelivery: true,
  },
];

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
