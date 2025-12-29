import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  MapPin, 
  ChevronLeft, 
  Truck, 
  CreditCard, 
  CheckCircle2,
  Package,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStore } from "@/contexts/StoreContext";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

type Step = "cart" | "shipping" | "confirmation";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, convertPrice, currencySymbol } = useStore();
  const [currentStep, setCurrentStep] = useState<Step>("cart");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [orderNumber, setOrderNumber] = useState("");
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    emirate: "دبي",
  });

  const shippingCost = shippingMethod === "express" ? 50 : 0;
  const total = cartTotal + shippingCost;

  const steps = [
    { id: "cart", label: "مراجعة السلة", icon: ShoppingBag },
    { id: "shipping", label: "العنوان والتوصيل", icon: Truck },
    { id: "confirmation", label: "تأكيد الطلب", icon: CheckCircle2 },
  ];

  const handleShippingSubmit = () => {
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    setCurrentStep("confirmation");
  };

  const handlePlaceOrder = () => {
    const newOrderNumber = `ORD-${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);
    clearCart();
    toast.success("تم تأكيد طلبك بنجاح!");
  };

  if (cart.length === 0 && currentStep !== "confirmation") {
    return (
      <>
        <Helmet>
          <title>السلة فارغة - مايكروليس</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <TopBar />
          <Header />
          <div className="container py-20 text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-4">السلة فارغة</h1>
            <p className="text-muted-foreground mb-6">لم تقم بإضافة أي منتجات بعد</p>
            <Button onClick={() => navigate("/")} className="btn-gradient">
              تسوق الآن
            </Button>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>إتمام الشراء - مايكروليس</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />

        <main className="container py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">
              الرئيسية
            </button>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground">إتمام الشراء</span>
          </nav>

          {/* Steps Progress */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  currentStep === step.id 
                    ? "gradient-primary text-primary-foreground" 
                    : steps.findIndex(s => s.id === currentStep) > idx
                      ? "bg-success text-success-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}>
                  <step.icon className="h-5 w-5" />
                  <span className="hidden sm:inline font-medium">{step.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-2 rounded ${
                    steps.findIndex(s => s.id === currentStep) > idx 
                      ? "bg-success" 
                      : "bg-secondary"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {currentStep === "cart" && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-bold mb-4">مراجعة المنتجات ({cart.length})</h2>
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-card rounded-2xl border border-border">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl bg-secondary"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">الكمية: {item.quantity}</p>
                      <p className="text-primary font-bold">
                        {convertPrice(item.price * item.quantity).toLocaleString()} {currencySymbol}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-card rounded-2xl border border-border p-6 h-fit sticky top-24">
                <h3 className="text-lg font-bold mb-4">ملخص الطلب</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span>{convertPrice(cartTotal).toLocaleString()} {currencySymbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الشحن</span>
                    <span className="text-success">مجاني</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>الإجمالي</span>
                      <span className="text-primary">{convertPrice(cartTotal).toLocaleString()} {currencySymbol}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full h-12 btn-gradient rounded-xl text-lg"
                  onClick={() => setCurrentStep("shipping")}
                >
                  متابعة
                </Button>
              </div>
            </div>
          )}

          {currentStep === "shipping" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Address */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    عنوان التوصيل
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">الاسم الكامل *</Label>
                      <Input
                        id="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="أدخل اسمك الكامل"
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف *</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+971 50 000 0000"
                        className="h-12 rounded-xl"
                        dir="ltr"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">العنوان بالتفصيل *</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="الشارع، المبنى، الشقة"
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">المدينة *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="المدينة"
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emirate">الإمارة</Label>
                      <Input
                        id="emirate"
                        value={shippingInfo.emirate}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, emirate: e.target.value }))}
                        placeholder="الإمارة"
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    طريقة التوصيل
                  </h2>
                  
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      shippingMethod === "standard" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="standard" id="standard" />
                        <div>
                          <p className="font-medium">توصيل عادي</p>
                          <p className="text-sm text-muted-foreground">3-5 أيام عمل</p>
                        </div>
                      </div>
                      <span className="text-success font-bold">مجاني</span>
                    </label>
                    
                    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      shippingMethod === "express" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="express" id="express" />
                        <div>
                          <p className="font-medium">توصيل سريع</p>
                          <p className="text-sm text-muted-foreground">خلال 24 ساعة</p>
                        </div>
                      </div>
                      <span className="font-bold">50 {currencySymbol}</span>
                    </label>
                  </RadioGroup>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-card rounded-2xl border border-border p-6 h-fit sticky top-24">
                <h3 className="text-lg font-bold mb-4">ملخص الطلب</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المنتجات ({cart.length})</span>
                    <span>{convertPrice(cartTotal).toLocaleString()} {currencySymbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الشحن</span>
                    <span className={shippingCost === 0 ? "text-success" : ""}>
                      {shippingCost === 0 ? "مجاني" : `${shippingCost} ${currencySymbol}`}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>الإجمالي</span>
                      <span className="text-primary">{convertPrice(total).toLocaleString()} {currencySymbol}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button 
                    className="w-full h-12 btn-gradient rounded-xl text-lg"
                    onClick={handleShippingSubmit}
                  >
                    تأكيد الطلب
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full h-12 rounded-xl"
                    onClick={() => setCurrentStep("cart")}
                  >
                    رجوع
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === "confirmation" && (
            <div className="max-w-2xl mx-auto text-center py-12">
              {orderNumber ? (
                <>
                  <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold mb-4">تم تأكيد طلبك بنجاح!</h1>
                  <p className="text-muted-foreground mb-6">
                    شكراً لتسوقك معنا. سنقوم بإرسال تفاصيل الطلب إلى بريدك الإلكتروني.
                  </p>
                  <div className="bg-card rounded-2xl border border-border p-6 mb-8">
                    <p className="text-sm text-muted-foreground mb-2">رقم الطلب</p>
                    <p className="text-2xl font-bold text-primary">{orderNumber}</p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={() => navigate("/profile")} variant="outline" className="h-12 px-6 rounded-xl">
                      <Package className="h-5 w-5 ml-2" />
                      تتبع الطلب
                    </Button>
                    <Button onClick={() => navigate("/")} className="h-12 px-6 btn-gradient rounded-xl">
                      متابعة التسوق
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold mb-6">تأكيد الطلب</h1>
                  <div className="bg-card rounded-2xl border border-border p-6 text-right mb-6">
                    <h3 className="font-bold mb-4">تفاصيل التوصيل</h3>
                    <p className="text-muted-foreground">{shippingInfo.fullName}</p>
                    <p className="text-muted-foreground">{shippingInfo.phone}</p>
                    <p className="text-muted-foreground">{shippingInfo.address}</p>
                    <p className="text-muted-foreground">{shippingInfo.city}، {shippingInfo.emirate}</p>
                  </div>
                  <div className="bg-card rounded-2xl border border-border p-6 mb-6">
                    <div className="flex justify-between font-bold text-lg">
                      <span>الإجمالي الكلي</span>
                      <span className="text-primary">{convertPrice(total).toLocaleString()} {currencySymbol}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full h-14 btn-gradient rounded-xl text-lg"
                    onClick={handlePlaceOrder}
                  >
                    تأكيد وإتمام الطلب
                  </Button>
                </>
              )}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Checkout;
