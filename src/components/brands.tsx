import Image from "next/image";

const CarBrands = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-center mb-12">
        Explore By Brands
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
        {[
          "Subaru",
          "Toyota",
          "Honda",
          "Audi",
          "BMW",
          "Ford",
          "Mercedes",
          "Porsche",
          "Volkswagen",
        ].map((brand) => (
          <div key={brand} className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <Image
                src={`https://logo.clearbit.com/${brand.toLowerCase()}.com`}
                alt={brand}
                width={40}
                height={40}
              />
            </div>
            <span className="text-sm">{brand}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarBrands;

