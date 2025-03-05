// components/car-manufacturer-grid.tsx
"use client";

import Image from "next/image";
import Link from "next/link";


export default function CarManufacturerGrid({ carMakes }) {

  return (
    <div>
      <div className="mb-6">
       
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {carMakes.map((make) => (
          <Link
            key={make.id}
            href={`/car-manufacturers/${make.id}`}
            className="flex items-center gap-3 p-4 rounded-lg hover:bg-slate-100 transition-colors group"
          >
            <div className="relative">
              <Image
                src={make.image}
                alt={`${make.name} logo`}
                width={500}
                height={500}
                className="object-contain h-[30px] w-[30px]"
              />
            </div>
            <span className="font-medium group-hover:text-black/80">
              {make.name}
            </span>
          </Link>
        ))}
      </div>
      
      {carMakes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No car manufacturers found matching your search.
        </div>
      )}
    </div>
  );
}