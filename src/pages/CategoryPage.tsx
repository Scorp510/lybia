import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/layout/CategoryNav";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import SearchDialog from "@/components/store/SearchDialog";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { allProducts, getProductsByCategory } from "@/data/products";
import { ProductCategory } from "@/contexts/StoreContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, ArrowLeft, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
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

  // Get products based on category
  const isAllCategories = !category || category === "all";
  const products = isAllCategories 
    ? allProducts 
    : getProductsByCategory(category as ProductCategory);

  const categoryLabel = isAllCategories 
    ? (language === "ar" ? "جميع المنتجات" : "All Products")
    : t(category as string);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{categoryLabel}</h1>
              <p className="text-muted-foreground mt-1">
                {sortedProducts.length} {language === "ar" ? "منتج" : "products"}
              </p>
            </div>

            {/* Filters & Sort */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {language === "ar" ? "فلتر" : "Filter"}
              </Button>

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

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "space-y-4"
            }>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                {language === "ar" ? "لا توجد منتجات في هذه الفئة" : "No products in this category"}
              </p>
              <Button 
                className="mt-4"
                onClick={() => navigate("/category/all")}
              >
                {language === "ar" ? "عرض جميع المنتجات" : "View All Products"}
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
