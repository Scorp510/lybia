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

const Index = () => {
  return (
    <>
      <Helmet>
        <title>مايكروليس - متجر الإلكترونيات الأول في الإمارات</title>
        <meta name="description" content="تسوق أحدث الإلكترونيات ومكونات الكمبيوتر بأفضل الأسعار. توصيل سريع في دبي وأبوظبي. ضمان أصلي 100%." />
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
    </>
  );
};

export default Index;
