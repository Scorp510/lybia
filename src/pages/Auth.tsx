import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2, CheckCircle, Smartphone, Laptop, Headphones, Watch, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";

const emailSchema = z.string().email("البريد الإلكتروني غير صحيح");
const passwordSchema = z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل");
const nameSchema = z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل");

type AuthView = "login" | "signup" | "forgot-password" | "check-email" | "verification-sent";

const Auth = () => {
  const navigate = useNavigate();
  const [authView, setAuthView] = useState<AuthView>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
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
    
    if (authView === "forgot-password") {
      const isEmailValid = validateField("email", formData.email);
      if (!isEmailValid) return;

      setIsLoading(true);
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/auth?type=recovery`,
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        setAuthView("check-email");
      } catch (error) {
        toast.error("حدث خطأ غير متوقع");
      } finally {
        setIsLoading(false);
      }
      return;
    }
    
    const isEmailValid = validateField("email", formData.email);
    const isPasswordValid = validateField("password", formData.password);
    const isNameValid = authView === "login" || validateField("name", formData.name);
    
    if (!isEmailValid || !isPasswordValid || (authView === "signup" && !isNameValid)) {
      return;
    }

    setIsLoading(true);

    try {
      if (authView === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
          } else if (error.message.includes("Email not confirmed")) {
            toast.error("يرجى تأكيد بريدك الإلكتروني أولاً");
          } else {
            toast.error(error.message);
          }
          return;
        }

        toast.success("تم تسجيل الدخول بنجاح!");
        navigate("/");
      } else if (authView === "signup") {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error, data } = await supabase.auth.signUp({
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

        // Check if email confirmation is required
        if (data.user && !data.session) {
          setAuthView("verification-sent");
        } else {
          toast.success("تم إنشاء الحساب بنجاح!");
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تسجيل الدخول بـ Google");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "" });
    setErrors({ name: "", email: "", password: "" });
  };

  const features = [
    "تتبع طلباتك بسهولة",
    "احفظ المنتجات المفضلة",
    "عروض حصرية للأعضاء",
    "شحن مجاني على الطلبات فوق 500 درهم",
  ];

  const getTitle = () => {
    switch (authView) {
      case "login": return "تسجيل الدخول";
      case "signup": return "إنشاء حساب";
      case "forgot-password": return "استعادة كلمة المرور";
      case "check-email": return "تحقق من بريدك";
      case "verification-sent": return "تأكيد البريد الإلكتروني";
      default: return "تسجيل الدخول";
    }
  };

  const getSubtitle = () => {
    switch (authView) {
      case "login": return "مرحبًا بعودتك!";
      case "signup": return "انضم إلينا اليوم";
      case "forgot-password": return "أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور";
      case "check-email": return "تم إرسال رابط إعادة التعيين";
      case "verification-sent": return "تم إرسال رابط التأكيد";
      default: return "";
    }
  };

  // Email sent confirmation screens
  if (authView === "check-email" || authView === "verification-sent") {
    return (
      <>
        <Helmet>
          <title>{getTitle()} - مايكروليس</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-8 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl" />
          </div>
          
          <div className="w-full max-w-md text-center relative z-10">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <MailCheck className="h-10 w-10 text-primary" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-2">{getTitle()}</h1>
              <p className="text-muted-foreground mb-6">{getSubtitle()}</p>
              
              <div className="bg-muted/50 rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  تم إرسال {authView === "check-email" ? "رابط إعادة تعيين كلمة المرور" : "رابط تأكيد البريد الإلكتروني"} إلى:
                </p>
                <p className="text-foreground font-medium mt-1" dir="ltr">{formData.email}</p>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                يرجى التحقق من صندوق الوارد الخاص بك واتباع التعليمات. إذا لم تجد الرسالة، تحقق من مجلد البريد العشوائي.
              </p>
              
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl"
                onClick={() => {
                  resetForm();
                  setAuthView("login");
                }}
              >
                العودة لتسجيل الدخول
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getTitle()} - مايكروليس</title>
        <meta name="description" content="سجل دخولك أو أنشئ حسابًا جديدًا للتسوق من أفضل متجر إلكترونيات في الإمارات" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-2xl" />
          
          {/* Floating animated icons */}
          <div className="absolute top-20 left-20 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="bg-primary/10 p-4 rounded-2xl backdrop-blur-sm">
              <Smartphone className="h-8 w-8 text-primary/40" />
            </div>
          </div>
          <div className="absolute top-40 right-1/3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
            <div className="bg-primary/10 p-3 rounded-xl backdrop-blur-sm">
              <Laptop className="h-6 w-6 text-primary/30" />
            </div>
          </div>
          <div className="absolute bottom-32 left-1/3 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
            <div className="bg-primary/10 p-3 rounded-xl backdrop-blur-sm">
              <Headphones className="h-6 w-6 text-primary/35" />
            </div>
          </div>
          <div className="absolute bottom-48 right-20 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.3s' }}>
            <div className="bg-primary/10 p-2 rounded-lg backdrop-blur-sm">
              <Watch className="h-5 w-5 text-primary/25" />
            </div>
          </div>
        </div>
        
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8 relative z-10">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-8 gap-2 hover:bg-secondary"
              onClick={() => {
                if (authView === "forgot-password") {
                  setAuthView("login");
                } else {
                  navigate("/");
                }
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              {authView === "forgot-password" ? "العودة لتسجيل الدخول" : "العودة للمتجر"}
            </Button>

            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                مايكروليس
              </h1>
              <p className="text-muted-foreground mt-2">
                {getSubtitle()}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {authView === "signup" && (
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

              {authView !== "forgot-password" && (
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
              )}

              {authView === "login" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setAuthView("forgot-password")}
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
                ) : authView === "login" ? (
                  "تسجيل الدخول"
                ) : authView === "signup" ? (
                  "إنشاء حساب"
                ) : (
                  "إرسال رابط إعادة التعيين"
                )}
              </Button>

              {authView !== "forgot-password" && (
                <>
                  {/* Divider */}
                  <div className="relative my-6">
                    <Separator className="bg-border" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-muted-foreground">
                      أو
                    </span>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 rounded-xl gap-3 hover:bg-secondary transition-all"
                      onClick={handleGoogleSignIn}
                      disabled={isGoogleLoading}
                    >
                      {isGoogleLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      )}
                      {authView === "login" ? "تسجيل الدخول بـ Google" : "التسجيل بـ Google"}
                    </Button>
                  </div>
                </>
              )}
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {authView === "login" ? "ليس لديك حساب؟" : authView === "signup" ? "لديك حساب بالفعل؟" : ""}
                {authView !== "forgot-password" && (
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setAuthView(authView === "login" ? "signup" : "login");
                    }}
                    className="text-primary font-semibold hover:underline mr-2"
                  >
                    {authView === "login" ? "إنشاء حساب جديد" : "تسجيل الدخول"}
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary/90 to-primary/80 items-center justify-center p-12 relative overflow-hidden">
          {/* Floating animated icons on right side */}
          <div className="absolute top-16 left-12 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="bg-primary-foreground/15 p-4 rounded-2xl backdrop-blur-sm">
              <Smartphone className="h-8 w-8 text-primary-foreground/60" />
            </div>
          </div>
          <div className="absolute bottom-20 right-12 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
            <div className="bg-primary-foreground/15 p-3 rounded-xl backdrop-blur-sm">
              <Laptop className="h-7 w-7 text-primary-foreground/50" />
            </div>
          </div>
          <div className="absolute top-1/2 left-8 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
            <div className="bg-primary-foreground/10 p-2 rounded-lg backdrop-blur-sm">
              <Headphones className="h-5 w-5 text-primary-foreground/40" />
            </div>
          </div>
          
          <div className="max-w-md text-primary-foreground relative z-10">
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