import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().email("البريد الإلكتروني غير صحيح");
const passwordSchema = z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل");
const nameSchema = z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل");

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateField = (field: string, value: string) => {
    try {
      if (field === "email") {
        emailSchema.parse(value);
      } else if (field === "password") {
        passwordSchema.parse(value);
      } else if (field === "name") {
        nameSchema.parse(value);
      }
      setErrors(prev => ({ ...prev, [field]: "" }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      validateField(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const isEmailValid = validateField("email", formData.email);
    const isPasswordValid = validateField("password", formData.password);
    const isNameValid = isLogin || validateField("name", formData.name);
    
    if (!isEmailValid || !isPasswordValid || (!isLogin && !isNameValid)) {
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
          } else {
            toast.error(error.message);
          }
          return;
        }

        toast.success("تم تسجيل الدخول بنجاح!");
        navigate("/");
      } else {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: formData.name,
            },
          },
        });

        if (error) {
          if (error.message.includes("User already registered")) {
            toast.error("هذا البريد الإلكتروني مسجل بالفعل");
          } else {
            toast.error(error.message);
          }
          return;
        }

        toast.success("تم إنشاء الحساب بنجاح!");
        navigate("/");
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    "تتبع طلباتك بسهولة",
    "احفظ المنتجات المفضلة",
    "عروض حصرية للأعضاء",
    "شحن مجاني على الطلبات فوق 500 درهم",
  ];

  return (
    <>
      <Helmet>
        <title>{isLogin ? "تسجيل الدخول" : "إنشاء حساب"} - مايكروليس</title>
        <meta name="description" content="سجل دخولك أو أنشئ حسابًا جديدًا للتسوق من أفضل متجر إلكترونيات في الإمارات" />
      </Helmet>

      <div className="min-h-screen bg-background flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-8 gap-2 hover:bg-secondary"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4" />
              العودة للمتجر
            </Button>

            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                مايكروليس
              </h1>
              <p className="text-muted-foreground mt-2">
                {isLogin ? "مرحبًا بعودتك!" : "انضم إلينا اليوم"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">الاسم الكامل</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      onBlur={() => validateField("name", formData.name)}
                      placeholder="أدخل اسمك الكامل"
                      className={`pr-10 h-12 rounded-xl transition-all ${errors.name ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-destructive text-sm">{errors.name}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => validateField("email", formData.email)}
                    placeholder="example@email.com"
                    className={`pr-10 h-12 rounded-xl transition-all ${errors.email ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}`}
                    dir="ltr"
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    onBlur={() => validateField("password", formData.password)}
                    placeholder="••••••••"
                    className={`pr-10 pl-10 h-12 rounded-xl transition-all ${errors.password ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}`}
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-sm">{errors.password}</p>
                )}
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 btn-gradient rounded-xl text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : isLogin ? (
                  "تسجيل الدخول"
                ) : (
                  "إنشاء حساب"
                )}
              </Button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({ name: "", email: "", password: "" });
                  }}
                  className="text-primary font-semibold hover:underline mr-2"
                >
                  {isLogin ? "إنشاء حساب جديد" : "تسجيل الدخول"}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="hidden lg:flex flex-1 gradient-primary items-center justify-center p-12">
          <div className="max-w-md text-primary-foreground">
            <h2 className="text-4xl font-bold mb-6">
              تسوق بذكاء مع مايكروليس
            </h2>
            <p className="text-lg opacity-90 mb-8">
              أكبر متجر للإلكترونيات في الإمارات مع أفضل الأسعار والعروض الحصرية
            </p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-primary-foreground/20 rounded-full p-1">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm">
              <p className="text-lg font-semibold mb-2">عرض خاص للأعضاء الجدد!</p>
              <p className="opacity-90">احصل على خصم 10% على طلبك الأول عند التسجيل</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
