const brands = [
  { name: "NVIDIA", logo: "https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/200px-Nvidia_logo.svg.png" },
  { name: "AMD", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/200px-AMD_Logo.svg.png" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/200px-Intel_logo_%282006-2020%29.svg.png" },
  { name: "ASUS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/200px-ASUS_Logo.svg.png" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/200px-Samsung_Logo.svg.png" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/100px-Apple_logo_black.svg.png" },
];

const FeaturedBrands = () => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">العلامات التجارية</h2>
        <a href="#" className="text-primary hover:underline text-sm font-medium">
          عرض الكل
        </a>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="group bg-card border border-border rounded-xl p-6 flex items-center justify-center hover:border-primary/50 transition-all duration-300 hover-scale cursor-pointer"
          >
            <img 
              src={brand.logo} 
              alt={brand.name}
              className="h-10 object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBrands;
