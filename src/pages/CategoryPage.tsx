import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/layout/CategoryNav";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import SearchDialog from "@/components/store/SearchDialog";
import ProductCard from "@/components/home/ProductCard";
import FilterPanel, { FilterState } from "@/components/store/FilterPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allProducts, getProductsByCategory } from "@/data/products";
import { ProductCategory } from "@/contexts/StoreContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, ArrowLeft, Grid3X3, List, X } from "lucide-react";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get base products based on category
  const isAllCategories = !category || category === "all";
  const baseProducts = isAllCategories 
    ? allProducts 
    : getProductsByCategory(category as ProductCategory);

  // Calculate max price for filters
  const maxPrice = useMemo(() => {
    return Math.ceil(Math.max(...allProducts.map(p => p.price)) / 1000) * 1000;
  }, []);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, maxPrice],
    categories: [],
    minRating: 0,
    freeShipping: false,
    fastDelivery: false,
    onSale: false,
  });

  const categoryLabel = isAllCategories 
    ? (language === "ar" ? "جميع المنتجات" : "All Products")
    : t(category as string);

  // Apply filters
  const filteredProducts = useMemo(() => {
    return baseProducts.filter(product => {
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Category filter (only for all categories view)
      if (isAllCategories && filters.categories.length > 0) {
        if (!filters.categories.includes(product.category as ProductCategory)) {
          return false;
        }
      }

      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // Free shipping filter
      if (filters.freeShipping && !product.freeShipping) {
        return false;
      }

      // Fast delivery filter
      if (filters.fastDelivery && !product.fastDelivery) {
        return false;
      }

      // On sale filter
      if (filters.onSale && !product.discount) {
        return false;
      }

      return true;
    });
  }, [baseProducts, filters, isAllCategories]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return b.reviewCount - a.reviewCount;
      }
    });
  }, [filteredProducts, sortBy]);

  // Get active filter tags for display
  const activeFilterTags = useMemo(() => {
    const tags: { key: string; label: string }[] = [];
    
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) {
      tags.push({
        key: "price",
        label: language === "ar" 
          ? `${filters.priceRange[0]} - ${filters.priceRange[1]} د.إ`
          : `${filters.priceRange[0]} - ${filters.priceRange[1]} AED`
      });
    }
    
    if (filters.minRating > 0) {
      tags.push({
        key: "rating",
        label: language === "ar" ? `${filters.minRating}+ نجوم` : `${filters.minRating}+ Stars`
      });
    }
    
    if (filters.freeShipping) {
      tags.push({
        key: "freeShipping",
        label: language === "ar" ? "شحن مجاني" : "Free Shipping"
      });
    }
    
    if (filters.fastDelivery) {
      tags.push({
        key: "fastDelivery",
        label: language === "ar" ? "توصيل سريع" : "Fast Delivery"
      });
    }
    
    if (filters.onSale) {
      tags.push({
        key: "onSale",
        label: language === "ar" ? "عروض" : "On Sale"
      });
    }
    
    return tags;
  }, [filters, maxPrice, language]);

  const removeFilter = (key: string) => {
    const newFilters = { ...filters };
    switch (key) {
      case "price":
        newFilters.priceRange = [0, maxPrice];
        break;
      case "rating":
        newFilters.minRating = 0;
        break;
      case "freeShipping":
        newFilters.freeShipping = false;
        break;
      case "fastDelivery":
        newFilters.fastDelivery = false;
        break;
      case "onSale":
        newFilters.onSale = false;
        break;
    }
    setFilters(newFilters);
  };

  const ArrowIcon = language === "ar" ? ArrowRight : ArrowLeft;

  return (
    <>
      <Helmet>
        <title>{categoryLabel} - {language === "ar" ? "مايكروليس" : "Microless"}</title>
        <meta name="description" content={language === "ar" 
          ? `تسوق ${categoryLabel} بأفضل الأسعار في الإمارات. توصيل سريع وضمان أصلي.`
          : `Shop ${categoryLabel} at the best prices in UAE. Fast delivery and genuine warranty.`
        } />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        <CategoryNav />
        
        <main className="container py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <button 
              onClick={() => navigate("/")}
              className="hover:text-primary transition-colors"
            >
              {language === "ar" ? "الرئيسية" : "Home"}
            </button>
            <ArrowIcon className="h-4 w-4" />
            <span className="text-foreground font-medium">{categoryLabel}</span>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{categoryLabel}</h1>
              <p className="text-muted-foreground mt-1">
                {sortedProducts.length} {language === "ar" ? "منتج" : "products"}
                {filteredProducts.length !== baseProducts.length && (
                  <span className="text-primary">
                    {" "}({language === "ar" ? `من ${baseProducts.length}` : `of ${baseProducts.length}`})
                  </span>
                )}
              </p>
            </div>

            {/* Filters & Sort */}
            <div className="flex items-center gap-3 flex-wrap">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                maxPrice={maxPrice}
                showCategories={isAllCategories}
              />

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder={language === "ar" ? "ترتيب حسب" : "Sort by"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">{language === "ar" ? "الأكثر شعبية" : "Most Popular"}</SelectItem>
                  <SelectItem value="newest">{language === "ar" ? "الأحدث" : "Newest"}</SelectItem>
                  <SelectItem value="price-low">{language === "ar" ? "السعر: من الأقل" : "Price: Low to High"}</SelectItem>
                  <SelectItem value="price-high">{language === "ar" ? "السعر: من الأعلى" : "Price: High to Low"}</SelectItem>
                  <SelectItem value="rating">{language === "ar" ? "التقييم" : "Rating"}</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFilterTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilterTags.map((tag) => (
                <Badge
                  key={tag.key}
                  variant="secondary"
                  className="gap-1 px-3 py-1.5 cursor-pointer hover:bg-secondary/80 transition-colors animate-fade-in"
                  onClick={() => removeFilter(tag.key)}
                >
                  {tag.label}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setFilters({
                  priceRange: [0, maxPrice],
                  categories: [],
                  minRating: 0,
                  freeShipping: false,
                  fastDelivery: false,
                  onSale: false,
                })}
              >
                {language === "ar" ? "مسح الكل" : "Clear All"}
              </Button>
            </div>
          )}

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "space-y-4"
            }>
              {sortedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                {language === "ar" ? "لا توجد منتجات تطابق الفلاتر المحددة" : "No products match the selected filters"}
              </p>
              <Button 
                className="mt-4"
                onClick={() => setFilters({
                  priceRange: [0, maxPrice],
                  categories: [],
                  minRating: 0,
                  freeShipping: false,
                  fastDelivery: false,
                  onSale: false,
                })}
              >
                {language === "ar" ? "إعادة تعيين الفلاتر" : "Reset Filters"}
              </Button>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
      
      <CartDrawer />
      <SearchDialog />
    </>
  );
};

export default CategoryPage;
