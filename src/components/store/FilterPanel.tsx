import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, Star, Truck, Zap, X, RotateCcw } from "lucide-react";
import { categoryLabels } from "@/data/products";
import { ProductCategory } from "@/contexts/StoreContext";

export interface FilterState {
  priceRange: [number, number];
  categories: ProductCategory[];
  minRating: number;
  freeShipping: boolean;
  fastDelivery: boolean;
  onSale: boolean;
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  maxPrice: number;
  showCategories?: boolean;
}

const FilterPanel = ({ filters, onFiltersChange, maxPrice, showCategories = false }: FilterPanelProps) => {
  const { language } = useLanguage();
  const { convertPrice, currencySymbol } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, maxPrice],
      categories: [],
      minRating: 0,
      freeShipping: false,
      fastDelivery: false,
      onSale: false,
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const toggleCategory = (category: ProductCategory) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter(c => c !== category)
      : [...localFilters.categories, category];
    updateFilter("categories", newCategories);
  };

  const activeFiltersCount = [
    localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < maxPrice,
    localFilters.categories.length > 0,
    localFilters.minRating > 0,
    localFilters.freeShipping,
    localFilters.fastDelivery,
    localFilters.onSale,
  ].filter(Boolean).length;

  const ratingOptions = [4, 3, 2, 1];

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price" className="border-border">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            {language === "ar" ? "نطاق السعر" : "Price Range"}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-4">
              <Slider
                value={localFilters.priceRange}
                min={0}
                max={maxPrice}
                step={100}
                onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{currencySymbol} {convertPrice(localFilters.priceRange[0]).toLocaleString()}</span>
                <span>{currencySymbol} {convertPrice(localFilters.priceRange[1]).toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Categories */}
      {showCategories && (
        <Accordion type="single" collapsible defaultValue="categories">
          <AccordionItem value="categories" className="border-border">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              {language === "ar" ? "الفئات" : "Categories"}
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-3">
                {(Object.keys(categoryLabels) as ProductCategory[]).map((category) => (
                  <div key={category} className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Checkbox
                      id={`category-${category}`}
                      checked={localFilters.categories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {language === "ar" ? categoryLabels[category] : category.charAt(0).toUpperCase() + category.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {/* Rating */}
      <Accordion type="single" collapsible defaultValue="rating">
        <AccordionItem value="rating" className="border-border">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            {language === "ar" ? "التقييم" : "Rating"}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-3">
              {ratingOptions.map((rating) => (
                <div key={rating} className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={localFilters.minRating === rating}
                    onCheckedChange={(checked) => updateFilter("minRating", checked ? rating : 0)}
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="flex items-center gap-1 text-sm font-normal cursor-pointer"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                      />
                    ))}
                    <span className="text-muted-foreground mr-1 rtl:ml-1 rtl:mr-0">
                      {language === "ar" ? "وأعلى" : "& up"}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Delivery Options */}
      <Accordion type="single" collapsible defaultValue="delivery">
        <AccordionItem value="delivery" className="border-border">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            {language === "ar" ? "خيارات التوصيل" : "Delivery Options"}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id="free-shipping"
                  checked={localFilters.freeShipping}
                  onCheckedChange={(checked) => updateFilter("freeShipping", !!checked)}
                />
                <Label
                  htmlFor="free-shipping"
                  className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                >
                  <Truck className="h-4 w-4 text-primary" />
                  {language === "ar" ? "شحن مجاني" : "Free Shipping"}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id="fast-delivery"
                  checked={localFilters.fastDelivery}
                  onCheckedChange={(checked) => updateFilter("fastDelivery", !!checked)}
                />
                <Label
                  htmlFor="fast-delivery"
                  className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                >
                  <Zap className="h-4 w-4 text-orange" />
                  {language === "ar" ? "توصيل سريع" : "Fast Delivery"}
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Special Offers */}
      <Accordion type="single" collapsible defaultValue="offers">
        <AccordionItem value="offers" className="border-border">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            {language === "ar" ? "العروض" : "Special Offers"}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox
                id="on-sale"
                checked={localFilters.onSale}
                onCheckedChange={(checked) => updateFilter("onSale", !!checked)}
              />
              <Label
                htmlFor="on-sale"
                className="text-sm font-normal cursor-pointer"
              >
                {language === "ar" ? "منتجات مخفضة فقط" : "On Sale Only"}
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Reset Button */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={resetFilters}
        >
          <RotateCcw className="h-4 w-4" />
          {language === "ar" ? "إعادة تعيين الفلاتر" : "Reset Filters"}
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 md:hidden relative">
            <SlidersHorizontal className="h-4 w-4" />
            {language === "ar" ? "فلتر" : "Filter"}
            {activeFiltersCount > 0 && (
              <Badge className="absolute -top-2 -right-2 rtl:-left-2 rtl:right-auto h-5 w-5 p-0 flex items-center justify-center text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side={language === "ar" ? "right" : "left"} className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              {language === "ar" ? "الفلاتر" : "Filters"}
              {activeFiltersCount > 0 && (
                <Badge variant="secondary">{activeFiltersCount} {language === "ar" ? "نشط" : "active"}</Badge>
              )}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Filter Button with Popover */}
      <div className="hidden md:block">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 relative">
              <SlidersHorizontal className="h-4 w-4" />
              {language === "ar" ? "فلتر" : "Filter"}
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 rtl:-left-2 rtl:right-auto h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side={language === "ar" ? "right" : "left"} className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                {language === "ar" ? "الفلاتر" : "Filters"}
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary">{activeFiltersCount} {language === "ar" ? "نشط" : "active"}</Badge>
                )}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default FilterPanel;
