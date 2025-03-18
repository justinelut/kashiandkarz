import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface TopCar {
  id: string
  title: string
  image: string
  inquiries: number
  views: number
  testDrives: number
}

interface TopPerformingCarsProps {
  cars: TopCar[]
}

export function TopPerformingCars({ cars }: TopPerformingCarsProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Top Performing Cars</CardTitle>
        <CardDescription>Vehicles with the most inquiries and test drives</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div key={car.id} className="flex items-center space-x-4">
                <div className="relative h-16 w-24 overflow-hidden rounded-md">
                  <Image src={car.image || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <Link href={`/car/${car.id}`} className="font-medium hover:underline">
                    {car.title}
                  </Link>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{car.views} views</span>
                    <span>•</span>
                    <span>{car.inquiries} inquiries</span>
                    <span>•</span>
                    <span>{car.testDrives} test drives</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No data available</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

