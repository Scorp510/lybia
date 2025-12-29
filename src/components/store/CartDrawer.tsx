import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const navigate = useNavigate();
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
      <SheetContent side="left" className="w-full sm:max-w-lg bg-card border-border">
        <SheetHeader>
          <SheetTitle className="text-right flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            سلة التسوق ({cart.length} منتجات)
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
            <ShoppingBag className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg">السلة فارغة</p>
            <p className="text-sm">ابدأ التسوق الآن!</p>
            <Button 
              className="mt-4 btn-gradient"
              onClick={() => setIsCartOpen(false)}
            >
              تسوق الآن
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-280px)] mt-4">
              <div className="space-y-4 pr-4">
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
                <span>المجموع:</span>
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
                  تفريغ السلة
                </Button>
                <Button 
                  className="btn-gradient rounded-xl"
                  onClick={handleCheckout}
                >
                  إتمام الشراء
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
