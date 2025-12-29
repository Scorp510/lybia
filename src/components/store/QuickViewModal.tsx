import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useStore, Product } from "@/contexts/StoreContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuickViewModal = ({ product, open, onOpenChange }: QuickViewModalProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist,
    convertPrice,
    currencySymbol
  } = useStore();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    onOpenChange(false);
  };

  const handleViewDetails = () => {
    onOpenChange(false);
    navigate(`/product/${product.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative bg-secondary/30 p-6 flex items-center justify-center min-h-[300px]">
            {product.discount && (
              <Badge className="absolute top-4 right-4 bg-sale text-sale-foreground font-bold text-sm px-2 py-1">
                -{product.discount}%
              </Badge>
            )}
            <img 
              src={product.image} 
              alt={product.name}
              className="max-w-full max-h-[280px] object-contain"
            />
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.freeShipping && (
                <Badge variant="outline" className="text-xs border-success text-success">
                  {t("freeShipping")}
                </Badge>
              )}
              {product.fastDelivery && (
                <Badge variant="outline" className="text-xs border-primary text-primary">
                  <Truck className="h-3 w-3 me-1" />
                  {t("fastDelivery")}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-foreground leading-tight">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
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
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} {t("reviews")})
              </span>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">
                {convertPrice(product.price).toLocaleString()} <span className="text-lg">{currencySymbol}</span>
              </div>
              {product.originalPrice && (
                <div className="text-lg text-muted-foreground line-through">
                  {convertPrice(product.originalPrice).toLocaleString()} {currencySymbol}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <ShoppingCart className="h-5 w-5 me-2" />
                {t("addToCart")}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlistClick}
                className={inWishlist ? "text-sale border-sale" : ""}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
              </Button>
            </div>

            <Button 
              variant="outline" 
              onClick={handleViewDetails}
              className="w-full"
            >
              {t("viewDetails")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
