import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    clearCart,
    convertPrice,
    currencySymbol
  } = useStore();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side={language === "ar" ? "left" : "right"} className="w-full sm:max-w-lg bg-card border-border">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            {t("cart")} ({cart.length})
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
            <ShoppingBag className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg">{t("emptyCart")}</p>
            <p className="text-sm">{t("addItems")}</p>
            <Button 
              className="mt-4 btn-gradient"
              onClick={() => setIsCartOpen(false)}
            >
              {t("continueShopping")}
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-280px)] mt-4">
              <div className="space-y-4 px-1">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-3 bg-secondary/50 rounded-xl"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg bg-secondary cursor-pointer"
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate(`/product/${item.id}`);
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-primary font-bold mt-1">
                        {convertPrice(item.price).toLocaleString()} {currencySymbol}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-lg"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-lg"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-sale hover:text-sale hover:bg-sale/10"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>{t("total")}:</span>
                <span className="text-primary">
                  {convertPrice(cartTotal).toLocaleString()} {currencySymbol}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-sale text-sale hover:bg-sale/10 rounded-xl"
                >
                  {language === "ar" ? "تفريغ السلة" : "Clear Cart"}
                </Button>
                <Button 
                  className="btn-gradient rounded-xl"
                  onClick={handleCheckout}
                >
                  {t("checkout")}
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
