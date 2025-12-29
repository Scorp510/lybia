import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/contexts/StoreContext";
import { getProductById, getRelatedProducts } from "@/data/products";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/layout/CategoryNav";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import CartDrawer from "@/components/store/CartDrawer";
import SearchDialog from "@/components/store/SearchDialog";
import { toast } from "sonner";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id || "1");
  const product = getProductById(productId);
  const relatedProducts = getRelatedProducts(productId, 4);
  
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist,
    convertPrice,
    currencySymbol
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
          <Button onClick={() => navigate("/")} className="btn-gradient">
            العودة للمتجر
          </Button>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  // Mock multiple images for gallery
  const images = [
    product.image,
    product.image.replace("w=800", "w=801"),
    product.image.replace("w=800", "w=802"),
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`تمت إضافة ${quantity} منتج إلى السلة`);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const specifications = [
    { label: "العلامة التجارية", value: "NVIDIA / AMD / ASUS" },
    { label: "الموديل", value: "2024" },
    { label: "الضمان", value: "سنتان" },
    { label: "بلد المنشأ", value: "تايوان" },
    { label: "الحالة", value: "جديد" },
  ];

  const reviews = [
    { id: 1, name: "أحمد محمد", rating: 5, date: "2024-01-15", comment: "منتج ممتاز جداً، أنصح به بشدة!" },
    { id: 2, name: "سارة علي", rating: 4, date: "2024-01-10", comment: "جودة عالية وتوصيل سريع" },
    { id: 3, name: "محمد خالد", rating: 5, date: "2024-01-05", comment: "أفضل شراء قمت به هذا العام" },
  ];

  return (
    <>
      <Helmet>
        <title>{product.name} - مايكروليس</title>
        <meta name="description" content={`اشتري ${product.name} بأفضل سعر من مايكروليس`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        <CategoryNav />

        <main className="container py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">
              الرئيسية
            </button>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground">{product.name.slice(0, 30)}...</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-card rounded-2xl overflow-hidden border border-border shadow-lg">
                {product.discount && (
                  <Badge className="absolute top-4 right-4 z-10 bg-sale text-sale-foreground font-bold text-lg px-3 py-1.5">
                    -{product.discount}%
                  </Badge>
                )}
                <img 
                  src={images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
                
                {/* Image navigation */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm hover:bg-card"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm hover:bg-card"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${
                      selectedImage === idx ? "border-primary shadow-lg" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-primary fill-primary' 
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">({product.reviewCount} تقييم)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {convertPrice(product.price).toLocaleString()} {currencySymbol}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {convertPrice(product.originalPrice).toLocaleString()} {currencySymbol}
                    </span>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {product.freeShipping && (
                    <Badge className="bg-success/10 text-success border-success/20 gap-1 px-3 py-1.5">
                      <Truck className="h-4 w-4" />
                      شحن مجاني
                    </Badge>
                  )}
                  {product.fastDelivery && (
                    <Badge className="bg-primary/10 text-primary border-primary/20 gap-1 px-3 py-1.5">
                      <Truck className="h-4 w-4" />
                      توصيل سريع
                    </Badge>
                  )}
                  <Badge className="bg-accent text-accent-foreground gap-1 px-3 py-1.5">
                    <Check className="h-4 w-4" />
                    متوفر في المخزون
                  </Badge>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-medium">الكمية:</span>
                <div className="flex items-center gap-3 bg-secondary rounded-xl p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  className="flex-1 h-14 btn-gradient text-lg rounded-xl shadow-lg hover-scale"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 ml-2" />
                  أضف إلى السلة
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-14 w-14 rounded-xl border-2 ${inWishlist ? "border-sale text-sale" : "border-border"}`}
                  onClick={handleWishlist}
                >
                  <Heart className={`h-6 w-6 ${inWishlist ? "fill-current" : ""}`} />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center p-4 bg-card rounded-xl">
                  <Truck className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-sm font-medium">توصيل سريع</p>
                </div>
                <div className="text-center p-4 bg-card rounded-xl">
                  <Shield className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-sm font-medium">ضمان سنتين</p>
                </div>
                <div className="text-center p-4 bg-card rounded-xl">
                  <RotateCcw className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-sm font-medium">إرجاع مجاني</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="specs" className="mb-12">
            <TabsList className="w-full justify-start bg-secondary rounded-xl p-1 h-auto">
              <TabsTrigger value="specs" className="rounded-lg py-3 px-6 data-[state=active]:bg-card data-[state=active]:shadow">
                المواصفات
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg py-3 px-6 data-[state=active]:bg-card data-[state=active]:shadow">
                التقييمات ({product.reviewCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="mt-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-xl font-bold mb-4">المواصفات التقنية</h3>
                <div className="space-y-3">
                  {specifications.map((spec, idx) => (
                    <div key={idx} className={`flex justify-between py-3 ${idx !== specifications.length - 1 ? "border-b border-border" : ""}`}>
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-xl font-bold mb-6">تقييمات العملاء</h3>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-border last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{review.name}</span>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          <section>
            <h2 className="text-2xl font-bold mb-6">منتجات مشابهة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <div key={p.id} onClick={() => navigate(`/product/${p.id}`)}>
                  <ProductCard {...p} />
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <CartDrawer />
      <SearchDialog />
    </>
  );
};

export default ProductPage;
