import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore, Product } from "@/contexts/StoreContext";

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

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div 
      ref={ref}
      onClick={handleCardClick}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover-lift card-shadow cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-secondary/50 p-4">
        {discount && (
          <Badge className="absolute top-3 right-3 bg-sale text-sale-foreground font-bold text-sm px-2 py-1">
            -{discount}%
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlistClick}
          className={`absolute top-3 left-3 bg-background/80 hover:bg-background transition-all ${
            inWishlist 
              ? "text-sale opacity-100" 
              : "text-muted-foreground hover:text-sale opacity-0 group-hover:opacity-100"
          }`}
        >
          <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
        </Button>
        
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {freeShipping && (
            <Badge variant="outline" className="text-xs border-success text-success">
              شحن مجاني
            </Badge>
          )}
          {fastDelivery && (
            <Badge variant="outline" className="text-xs border-primary text-primary">
              <Truck className="h-3 w-3 ml-1" />
              توصيل سريع
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
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
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
