import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  LogOut, 
  ChevronLeft,
  Edit2,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/contexts/StoreContext";
import { supabase } from "@/integrations/supabase/client";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import CartDrawer from "@/components/store/CartDrawer";
import SearchDialog from "@/components/store/SearchDialog";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { wishlist, convertPrice, currencySymbol } = useStore();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setProfileData({
          fullName: user.user_metadata?.full_name || "",
          email: user.email || "",
          phone: user.phone || "",
        });
      } else {
        navigate("/auth");
      }
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      }
      if (session?.user) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("تم تسجيل الخروج");
    navigate("/");
  };

  const handleSaveProfile = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: profileData.fullName }
    });

    if (error) {
      toast.error("حدث خطأ أثناء حفظ البيانات");
    } else {
      toast.success("تم حفظ البيانات بنجاح");
      setIsEditing(false);
    }
  };

  // Mock orders for display
  const orders = [
    {
      id: "ORD-12345678",
      date: "2024-01-15",
      status: "delivered",
      total: 5499,
      items: 3,
    },
    {
      id: "ORD-12345679",
      date: "2024-01-20",
      status: "shipping",
      total: 2199,
      items: 1,
    },
    {
      id: "ORD-12345680",
      date: "2024-01-25",
      status: "processing",
      total: 899,
      items: 2,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <span className="flex items-center gap-1 text-success bg-success/10 px-3 py-1 rounded-full text-sm">
            <CheckCircle className="h-4 w-4" />
            تم التوصيل
          </span>
        );
      case "shipping":
        return (
          <span className="flex items-center gap-1 text-primary bg-primary/10 px-3 py-1 rounded-full text-sm">
            <Truck className="h-4 w-4" />
            قيد الشحن
          </span>
        );
      case "processing":
        return (
          <span className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full text-sm">
            <Clock className="h-4 w-4" />
            قيد المعالجة
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>حسابي - مايكروليس</title>
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
            <span className="text-foreground">حسابي</span>
          </nav>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h2 className="font-bold text-lg">{profileData.fullName || "مستخدم"}</h2>
                  <p className="text-sm text-muted-foreground">{profileData.email}</p>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 hover:bg-secondary"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="h-5 w-5" />
                    معلومات الحساب
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 hover:bg-secondary"
                  >
                    <Package className="h-5 w-5" />
                    طلباتي
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 hover:bg-secondary"
                  >
                    <Heart className="h-5 w-5" />
                    المفضلة
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 hover:bg-secondary"
                  >
                    <MapPin className="h-5 w-5" />
                    العناوين
                  </Button>
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5" />
                      تسجيل الخروج
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full justify-start bg-secondary rounded-xl p-1 h-auto mb-6">
                  <TabsTrigger value="profile" className="rounded-lg py-3 px-6 data-[state=active]:bg-card data-[state=active]:shadow">
                    <User className="h-4 w-4 ml-2" />
                    الملف الشخصي
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="rounded-lg py-3 px-6 data-[state=active]:bg-card data-[state=active]:shadow">
                    <Package className="h-4 w-4 ml-2" />
                    الطلبات
                  </TabsTrigger>
                  <TabsTrigger value="wishlist" className="rounded-lg py-3 px-6 data-[state=active]:bg-card data-[state=active]:shadow">
                    <Heart className="h-4 w-4 ml-2" />
                    المفضلة ({wishlist.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold">معلومات الحساب</h2>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit2 className="h-4 w-4" />
                        {isEditing ? "إلغاء" : "تعديل"}
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">الاسم الكامل</Label>
                          <Input
                            id="fullName"
                            value={profileData.fullName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                            disabled={!isEditing}
                            className="h-12 rounded-xl disabled:opacity-70"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">البريد الإلكتروني</Label>
                          <Input
                            id="email"
                            value={profileData.email}
                            disabled
                            className="h-12 rounded-xl disabled:opacity-70"
                            dir="ltr"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">رقم الهاتف</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            disabled={!isEditing}
                            placeholder="+971 50 000 0000"
                            className="h-12 rounded-xl disabled:opacity-70"
                            dir="ltr"
                          />
                        </div>
                      </div>

                      {isEditing && (
                        <Button 
                          className="btn-gradient rounded-xl"
                          onClick={handleSaveProfile}
                        >
                          حفظ التغييرات
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="orders">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">طلباتي</h2>
                    
                    {orders.length === 0 ? (
                      <div className="bg-card rounded-2xl border border-border p-12 text-center">
                        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-lg font-medium mb-2">لا توجد طلبات</p>
                        <p className="text-muted-foreground mb-4">لم تقم بأي طلبات بعد</p>
                        <Button onClick={() => navigate("/")} className="btn-gradient">
                          ابدأ التسوق
                        </Button>
                      </div>
                    ) : (
                      orders.map((order) => (
                        <div key={order.id} className="bg-card rounded-2xl border border-border p-6">
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div>
                              <p className="font-bold text-lg">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                            {getStatusBadge(order.status)}
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="text-sm text-muted-foreground">
                              {order.items} منتجات
                            </div>
                            <div className="font-bold text-primary">
                              {convertPrice(order.total).toLocaleString()} {currencySymbol}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="wishlist">
                  <div>
                    <h2 className="text-xl font-bold mb-6">المفضلة</h2>
                    
                    {wishlist.length === 0 ? (
                      <div className="bg-card rounded-2xl border border-border p-12 text-center">
                        <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-lg font-medium mb-2">القائمة فارغة</p>
                        <p className="text-muted-foreground mb-4">لم تقم بإضافة أي منتجات للمفضلة</p>
                        <Button onClick={() => navigate("/")} className="btn-gradient">
                          تصفح المنتجات
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {wishlist.map((product) => (
                          <div key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                            <ProductCard {...product} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <CartDrawer />
      <SearchDialog />
    </>
  );
};

export default Profile;
