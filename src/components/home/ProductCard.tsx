import { Heart, ShoppingCart, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

const ProductCard = ({
  name,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  discount,
  freeShipping,
  fastDelivery,
}: ProductCardProps) => {
  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover-scale card-shadow">
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
          className="absolute top-3 left-3 bg-background/80 hover:bg-background text-muted-foreground hover:text-sale opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-5 w-5" />
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
              {price.toLocaleString()} <span className="text-sm">د.إ</span>
            </div>
            {originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                {originalPrice.toLocaleString()} د.إ
              </div>
            )}
          </div>
          
          <Button 
            size="icon" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
