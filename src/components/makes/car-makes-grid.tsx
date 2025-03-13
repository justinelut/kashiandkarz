"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface CarMakesGridProps {
  makes: any[]
}

export function CarMakesGrid({ makes }: CarMakesGridProps) {
  if (makes.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No car makes found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {makes.map((make) => (
        <Link key={make.$id} href={`/makes/${make.slug}`}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center p-3 mb-4 border border-gray-200">
                <Image
                  src={make.image || "/placeholder.svg"}
                  alt={make.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium text-center">{make.name}</h3>
              {make.car_info && (
                <p className="text-sm text-muted-foreground text-center mt-1">
                  {make.car_info.length} {make.car_info.length === 1 ? "vehicle" : "vehicles"}
                </p>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

