import React, { forwardRef } from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const [email, setEmail] = useState("");
  const { t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error(t("enterEmail"));
      return;
    }
    if (!email.includes("@")) {
      toast.error(t("enterValidEmail"));
      return;
    }
    toast.success(t("subscribeSuccess"));
    setEmail("");
  };

  const handleSocialClick = (platform: string) => {
    toast.info(`${t("willOpen")} ${platform}`);
  };

  const handleLinkClick = (link: string) => {
    toast.info(`${t("navigateTo")} ${link}`);
  };

  return (
    <footer ref={ref} className="bg-header border-t border-border mt-12">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-primary font-bold text-xl mb-4">{t("appName")}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {t("footerDescription")}
            </p>
            <div className="flex gap-3">
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleSocialClick("Facebook")}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleSocialClick("Twitter")}
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleSocialClick("Instagram")}
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleSocialClick("YouTube")}
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t("quickLinks")}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button onClick={() => handleLinkClick(t("aboutUs"))} className="hover:text-primary transition-colors">
                  {t("aboutUs")}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(t("contactUs"))} className="hover:text-primary transition-colors">
                  {t("contactUs")}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(t("returnPolicy"))} className="hover:text-primary transition-colors">
                  {t("returnPolicy")}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(t("termsConditions"))} className="hover:text-primary transition-colors">
                  {t("termsConditions")}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(t("privacyPolicy"))} className="hover:text-primary transition-colors">
                  {t("privacyPolicy")}
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t("customerService")}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button onClick={() => handleLinkClick(t("trackOrder"))} className="hover:text-primary transition-colors">
                  {t("trackOrder")}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(t("faq"))} className="hover:text-primary transition-colors">
                  {t("faq")}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(t("technicalSupport"))} className="hover:text-primary transition-colors">
                  {t("technicalSupport")}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(t("paymentMethods"))} className="hover:text-primary transition-colors">
                  {t("paymentMethods")}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick(t("deliveryShipping"))} className="hover:text-primary transition-colors">
                  {t("deliveryShipping")}
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t("newsletter")}</h4>
            <p className="text-muted-foreground text-sm mb-4">
              {t("newsletterDesc")}
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                placeholder={t("emailPlaceholder")} 
                className="bg-secondary border-border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t("subscribe")}
              </Button>
            </form>
            
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <a href="tel:800-MICRO" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                <span>800-MICRO</span>
              </a>
              <a href="mailto:support@microless.ae" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@microless.ae</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{t("dubaiUAE")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-border py-4">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 {t("appName")}. {t("allRightsReserved")}</p>
          <div className="flex items-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain brightness-0 invert opacity-60" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;