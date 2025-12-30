import { Helmet } from "react-helmet-async";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/layout/CategoryNav";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import DealsSection from "@/components/home/DealsSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import PromoBanners from "@/components/home/PromoBanners";
import NewArrivals from "@/components/home/NewArrivals";
import FeaturedBrands from "@/components/home/FeaturedBrands";
import CartDrawer from "@/components/store/CartDrawer";
import SearchDialog from "@/components/store/SearchDialog";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("appTitle")}</title>
        <meta name="description" content={t("appDescription")} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        <CategoryNav />
        
        <main className="container py-6">
          <HeroCarousel />
          <PromoBanners />
          <DealsSection />
          <CategoryGrid />
          <NewArrivals />
          <FeaturedBrands />
        </main>
        
        <Footer />
      </div>
      
      {/* Modals & Drawers */}
      <CartDrawer />
      <SearchDialog />
    </>
  );
};

export default Index;