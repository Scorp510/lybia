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
import { allProducts, categoryLabels, getProductsByCategory } from "@/data/products";
import { ProductCategory } from "@/contexts/StoreContext";
import { ArrowRight, Grid3X3, List, SlidersHorizontal } from "lucide-react";
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
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get products based on category
  const isAllCategories = !category || category === "all";
  const products = isAllCategories 
    ? allProducts 
    : getProductsByCategory(category as ProductCategory);

  const categoryLabel = isAllCategories 
    ? "جميع المنتجات" 
    : categoryLabels[category as ProductCategory] || "المنتجات";

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

  return (
    <>
      <Helmet>
        <title>{categoryLabel} - مايكروليس</title>
        <meta name="description" content={`تسوق ${categoryLabel} بأفضل الأسعار في الإمارات. توصيل سريع وضمان أصلي.`} />
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
              الرئيسية
            </button>
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span className="text-foreground font-medium">{categoryLabel}</span>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{categoryLabel}</h1>
              <p className="text-muted-foreground mt-1">
                {sortedProducts.length} منتج
              </p>
            </div>

            {/* Filters & Sort */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                فلتر
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">الأكثر شعبية</SelectItem>
                  <SelectItem value="newest">الأحدث</SelectItem>
                  <SelectItem value="price-low">السعر: من الأقل</SelectItem>
                  <SelectItem value="price-high">السعر: من الأعلى</SelectItem>
                  <SelectItem value="rating">التقييم</SelectItem>
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
              <p className="text-xl text-muted-foreground">لا توجد منتجات في هذه الفئة</p>
              <Button 
                className="mt-4"
                onClick={() => navigate("/category/all")}
              >
                عرض جميع المنتجات
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
