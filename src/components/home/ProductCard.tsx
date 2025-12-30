import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star, Truck, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore, Product } from "@/contexts/StoreContext";
import { useLanguage } from "@/contexts/LanguageContext";
import QuickViewModal from "@/components/store/QuickViewModal";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  discount?: number;
  freeShipping?: boolean;
  fastDelivery?: boolean;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  discount,
  freeShipping,
  fastDelivery,
}, ref) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist,
    convertPrice,
    currencySymbol
  } = useStore();

  const product: Product = {
    id,
    name,
    image,
    price,
    originalPrice,
    rating,
    reviewCount,
    discount,
    freeShipping,
    fastDelivery,
  };

  const inWishlist = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div 
        ref={ref}
        onClick={handleCardClick}
        className="group bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 card-shadow cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative aspect-square bg-secondary/50 p-4 overflow-hidden">
          {discount && (
            <Badge className="absolute top-3 right-3 bg-sale text-sale-foreground font-bold text-sm px-2 py-1 animate-pulse-scale z-10">
              -{discount}%
            </Badge>
          )}
          
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWishlistClick}
              className={`bg-background/90 backdrop-blur-sm hover:bg-background transition-all duration-300 ${
                inWishlist 
                  ? "text-sale opacity-100 scale-100" 
                  : "text-muted-foreground hover:text-sale opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
              }`}
            >
              <Heart className={`h-5 w-5 transition-transform duration-300 ${inWishlist ? "fill-current animate-heartbeat" : "group-hover:scale-110"}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleQuickView}
              className="bg-background/90 backdrop-blur-sm hover:bg-background text-muted-foreground hover:text-primary opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 delay-75"
            >
              <Eye className="h-5 w-5" />
            </Button>
          </div>
          
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {freeShipping && (
              <Badge variant="outline" className="text-xs border-success text-success">
                {t("freeShipping")}
              </Badge>
            )}
            {fastDelivery && (
              <Badge variant="outline" className="text-xs border-primary text-primary">
                <Truck className="h-3 w-3 me-1" />
                {t("fastDelivery")}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem] transition-colors duration-300 group-hover:text-primary">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) 
                      ? 'text-primary fill-primary' 
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-primary">
                {convertPrice(price).toLocaleString()} <span className="text-sm">{currencySymbol}</span>
              </div>
              {originalPrice && (
                <div className="text-sm text-muted-foreground line-through">
                  {convertPrice(originalPrice).toLocaleString()} {currencySymbol}
                </div>
              )}
            </div>
            
            <Button 
              size="icon" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            </Button>
          </div>
        </div>
      </div>
      
      <QuickViewModal 
        product={product} 
        open={quickViewOpen} 
        onOpenChange={setQuickViewOpen} 
      />
    </>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
