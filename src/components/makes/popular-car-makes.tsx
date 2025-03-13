"use client"

import Link from "next/link"
import Image from "next/image"

interface PopularCarMakesProps {
  makes: any[]
}

export function PopularCarMakes({ makes }: PopularCarMakesProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {makes.map((make) => (
        <Link key={make.$id} href={`/makes/${make.slug}`} className="flex flex-col items-center group">
          <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center p-2 overflow-hidden border border-gray-200 transition-transform group-hover:scale-110">
            <Image
              src={make.image || "/placeholder.svg"}
              alt={make.name}
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <span className="mt-2 text-sm font-medium text-center group-hover:text-primary">{make.name}</span>
        </Link>
      ))}
    </div>
  )
}

